"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { DEFAULT_CATEGORIES } from "@/lib/categories";
import { createGame, gameReducer } from "@/lib/game/reducer";
import { clearSavedGame, readSavedGame, saveGame } from "@/lib/game/storage";
import type {
  Category,
  GameAction,
  GameState,
  Player,
  QuestionOption,
  QuestionType,
} from "@/lib/game/types";

type AppScreen = "home" | "setup" | "game";

const TYPE_LABELS: Record<QuestionType, string> = {
  boolean: "Sí o no",
  number: "Número",
  order: "Orden",
  period: "Siglo o década",
  color: "Color",
  free_text: "Respuesta libre",
};

type LockableScreenOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape") => Promise<void>;
  unlock?: () => void;
};

async function enterImmersiveMode() {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
    }
  } catch {
    // Algunos navegadores solo permiten el modo instalado; el diseño sigue siendo funcional.
  }

  try {
    await (window.screen.orientation as LockableScreenOrientation).lock?.("landscape");
  } catch {
    // El bloqueo de orientación no está disponible en todos los navegadores móviles.
  }
}

async function exitImmersiveMode() {
  try {
    (window.screen.orientation as LockableScreenOrientation).unlock?.();
    if (document.fullscreenElement) await document.exitFullscreen();
  } catch {
    // Salir del modo inmersivo es una mejora progresiva.
  }
}

function formatSavedDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "partida reciente";
  }
}

export function GameApp() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [savedGame, setSavedGame] = useState<GameState | null>(null);
  const [game, setGame] = useState<GameState | null>(null);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameRef = useRef<GameState | null>(null);

  useEffect(() => {
    const hydrationTask = window.setTimeout(() => setSavedGame(readSavedGame()), 0);
    fetch("/api/categories", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { categories?: Category[] }) => {
        if (payload.categories?.length) setCategories(payload.categories);
      })
      .catch(() => undefined);
    return () => window.clearTimeout(hydrationTask);
  }, []);

  useEffect(() => {
    const syncFullscreenState = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreenState);
    syncFullscreenState();
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  useEffect(() => {
    gameRef.current = game;
    if (!game) return;
    if (game.status === "finished") {
      clearSavedGame();
      return;
    }
    saveGame(game);
  }, [game]);

  useEffect(() => {
    const persistLatest = () => {
      if (gameRef.current?.status === "in_progress") saveGame(gameRef.current);
    };
    document.addEventListener("visibilitychange", persistLatest);
    window.addEventListener("pagehide", persistLatest);
    return () => {
      document.removeEventListener("visibilitychange", persistLatest);
      window.removeEventListener("pagehide", persistLatest);
    };
  }, []);

  const dispatch = useCallback((action: GameAction) => {
    setGame((current) => (current ? gameReducer(current, action) : current));
  }, []);

  const startNewGame = (names: string[], targetScore: number) => {
    void enterImmersiveMode();
    const nextGame = createGame(names, targetScore);
    setGame(nextGame);
    setScreen("game");
  };

  const requestNewGame = () => {
    if (savedGame && !window.confirm("La nueva partida sustituirá a la partida guardada. ¿Continuar?")) {
      return;
    }
    setScreen("setup");
  };

  const exitToHome = () => {
    setGame(null);
    setSavedGame(readSavedGame());
    setScreen("home");
  };

  return (
    <main className="app-shell">
      <div className="studio-lights" aria-hidden="true" />
      {screen === "home" && (
        <HomeScreen
          savedGame={savedGame}
          onNew={requestNewGame}
          onContinue={() => {
            if (!savedGame) return;
            void enterImmersiveMode();
            setGame(savedGame);
            setScreen("game");
          }}
        />
      )}
      {screen === "setup" && (
        <SetupScreen onBack={() => setScreen("home")} onStart={startNewGame} />
      )}
      {screen === "game" && game && (
        <GameScreen
          game={game}
          categories={categories}
          dispatch={dispatch}
          onExit={exitToHome}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => {
            if (document.fullscreenElement) void exitImmersiveMode();
            else void enterImmersiveMode();
          }}
          onNewGame={() => {
            setGame(null);
            setScreen("setup");
          }}
        />
      )}
      <div className="portrait-lock" role="status">
        <div className="rotate-device" aria-hidden="true">↻</div>
        <strong>Gira el dispositivo</strong>
        <span>Smart 12 está diseñado para jugar en horizontal.</span>
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="brand" aria-label="Smart 12">
      <span className="brand-word">SMART</span>
      <span className="brand-number">12</span>
      <span className="brand-kicker">El reto está en tus manos</span>
    </div>
  );
}

function HomeScreen({
  savedGame,
  onNew,
  onContinue,
}: {
  savedGame: GameState | null;
  onNew: () => void;
  onContinue: () => void;
}) {
  return (
    <section className="screen home-screen">
      <div className="home-orbit orbit-one" aria-hidden="true" />
      <div className="home-orbit orbit-two" aria-hidden="true" />
      <Brand />
      <div className="home-actions">
        <button className="primary-button hero-button" onClick={onNew}>
          Nueva partida
        </button>
        <button className="secondary-button hero-button" onClick={onContinue} disabled={!savedGame}>
          Continuar última partida
        </button>
        {savedGame && (
          <p className="saved-caption">
            Ronda {savedGame.roundNumber} · {savedGame.players.length} asientos · guardada {formatSavedDate(savedGame.updatedAt)}
          </p>
        )}
      </div>
      <div className="home-footer">CULTURA · RIESGO · ESTRATEGIA</div>
    </section>
  );
}

function SetupScreen({
  onBack,
  onStart,
}: {
  onBack: () => void;
  onStart: (names: string[], targetScore: number) => void;
}) {
  const [seatCount, setSeatCount] = useState(2);
  const [names, setNames] = useState(["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4"]);
  const [targetScore, setTargetScore] = useState(20);

  return (
    <section className="screen setup-screen">
      <header className="top-bar">
        <button className="icon-button" onClick={onBack} aria-label="Volver">←</button>
        <div>
          <span className="eyebrow">CONFIGURACIÓN</span>
          <h1>Prepara los asientos</h1>
        </div>
        <div className="mini-logo">S<span>12</span></div>
      </header>

      <div className="setup-grid">
        <div className="setup-panel seat-selector-panel">
          <span className="panel-label">NÚMERO DE ASIENTOS</span>
          <div className="seat-dial" aria-label={`${seatCount} asientos`}>
            <button onClick={() => setSeatCount((value) => Math.max(2, value - 1))} disabled={seatCount === 2}>−</button>
            <div>
              <strong>{seatCount}</strong>
              <span>{seatCount === 2 ? "ASIENTOS" : "ASIENTOS"}</span>
            </div>
            <button onClick={() => setSeatCount((value) => Math.min(4, value + 1))} disabled={seatCount === 4}>+</button>
          </div>
          <p>Cada asiento puede representar a una persona, pareja o equipo.</p>
        </div>

        <div className="setup-panel names-panel">
          <span className="panel-label">NOMBRES Y COLORES</span>
          <div className="name-fields">
            {names.slice(0, seatCount).map((name, index) => (
              <label className="name-field" key={index} style={{ "--seat-color": ["#31d7ff", "#ff4fa3", "#9bf15d", "#ffc857"][index] } as CSSProperties}>
                <span>{index + 1}</span>
                <input
                  maxLength={18}
                  value={name}
                  aria-label={`Nombre del asiento ${index + 1}`}
                  onChange={(event) => {
                    const next = [...names];
                    next[index] = event.target.value;
                    setNames(next);
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="setup-panel target-panel">
          <span className="panel-label">PUNTOS PARA GANAR</span>
          <div className="target-presets">
            {[15, 20, 30].map((score) => (
              <button
                key={score}
                className={targetScore === score ? "selected" : ""}
                onClick={() => setTargetScore(score)}
              >
                {score}
              </button>
            ))}
            <label className="custom-score">
              <span>Otro</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={999}
                value={targetScore}
                onChange={(event) => setTargetScore(Number(event.target.value) || 1)}
              />
            </label>
          </div>
        </div>
      </div>

      <button
        className="primary-button start-button"
        onClick={() => onStart(names.slice(0, seatCount), targetScore)}
      >
        Entrar al plató <span>→</span>
      </button>
    </section>
  );
}

function GameScreen({
  game,
  categories,
  dispatch,
  onExit,
  isFullscreen,
  onToggleFullscreen,
  onNewGame,
}: {
  game: GameState;
  categories: Category[];
  dispatch: (action: GameAction) => void;
  onExit: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onNewGame: () => void;
}) {
  const [questionError, setQuestionError] = useState<string | null>(null);

  useEffect(() => {
    if (game.phase !== "loading_question" || !game.selectedCategory) return;
    const controller = new AbortController();
    fetch("/api/questions/random", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categorySlug: game.selectedCategory.slug,
        excludedIds: game.usedQuestionIds,
      }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "No se pudo cargar la pregunta.");
        return payload;
      })
      .then((payload) => dispatch({ type: "QUESTION_LOADED", question: payload.question }))
      .catch((error: Error) => {
        if (error.name !== "AbortError") setQuestionError(error.message);
      });
    return () => controller.abort();
  }, [dispatch, game.phase, game.selectedCategory, game.usedQuestionIds]);

  const currentPlayer = game.players[game.currentPlayerIndex];

  return (
    <section className="screen game-screen">
      <header className="game-header">
        <button className="icon-button quiet" onClick={onExit} aria-label="Salir a inicio">⌂</button>
        <div className="round-chip"><span>RONDA</span><strong>{String(game.roundNumber).padStart(2, "0")}</strong></div>
        <div className="game-mini-brand">SMART <strong>12</strong></div>
        <div className="target-chip">META <strong>{game.targetScore}</strong></div>
        <button
          className="icon-button quiet fullscreen-button"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Salir de pantalla completa" : "Entrar en pantalla completa"}
          title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? "⊡" : "⛶"}
        </button>
        <button className="icon-button quiet" onClick={() => window.location.reload()} aria-label="Recargar">↻</button>
      </header>

      <PlayerLayer players={game.players} currentPlayerIndex={game.currentPlayerIndex} />

      <div className="stage-center">
        {game.phase === "selecting_starter" && (
          <StarterSelector players={game.players} onDone={(playerIndex) => dispatch({ type: "SELECT_STARTER", playerIndex })} />
        )}
        {game.phase === "category_spin" && (
          <CategorySpinner
            categories={categories}
            player={game.players[game.startingPlayerIndex ?? 0]}
            reroll={game.categoryRerollUsed}
            onLanded={(category) => {
              setQuestionError(null);
              dispatch({ type: "CATEGORY_LANDED", category });
            }}
          />
        )}
        {game.phase === "category_confirm" && game.selectedCategory && (
          <CategoryConfirmation
            category={game.selectedCategory}
            onAccept={() => dispatch({ type: "ACCEPT_CATEGORY" })}
            onReroll={() => dispatch({ type: "REROLL_CATEGORY" })}
          />
        )}
        {game.phase === "loading_question" && (
          <LoadingQuestion
            category={game.selectedCategory}
            error={questionError}
            onRetry={() => {
              setQuestionError(null);
              dispatch({ type: "QUESTION_LOAD_FAILED" });
            }}
          />
        )}
        {game.phase === "question" && game.currentQuestion && (
          <QuestionBoard game={game} dispatch={dispatch} currentPlayer={currentPlayer} />
        )}
        {game.phase === "round_summary" && (
          <RoundSummary game={game} onNext={() => dispatch({ type: "NEXT_ROUND" })} />
        )}
        {game.phase === "game_over" && (
          <GameOver game={game} onNewGame={onNewGame} onExit={onExit} />
        )}
      </div>
    </section>
  );
}

function PlayerLayer({ players, currentPlayerIndex }: { players: Player[]; currentPlayerIndex: number }) {
  return (
    <div className={`player-layer players-${players.length}`}>
      {players.map((player, index) => (
        <article
          key={player.seat}
          className={`player-card seat-${index + 1} ${index === currentPlayerIndex && player.status === "active" ? "current" : ""} status-${player.status}`}
          style={{ "--player-color": player.color.value, "--player-glow": player.color.glow } as CSSProperties}
        >
          <div className="seat-tag">ASIENTO {player.seat}</div>
          <div className="score-row">
            <strong>{String(player.totalScore).padStart(2, "0")}</strong>
            <span className={player.roundScore ? "has-points" : ""}>+{String(player.roundScore).padStart(2, "0")}</span>
          </div>
          <div className="player-name">{player.name}</div>
          <div className="player-status">
            {player.status === "banked" ? "PLANTADO" : player.status === "eliminated" ? "FUERA" : index === currentPlayerIndex ? "TU TURNO" : "EN JUEGO"}
          </div>
        </article>
      ))}
    </div>
  );
}

function StarterSelector({ players, onDone }: { players: Player[]; onDone: (index: number) => void }) {
  const [highlighted, setHighlighted] = useState(0);
  const [settled, setSettled] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const winner = Math.floor(Math.random() * players.length);
    let ticks = 0;
    const interval = window.setInterval(() => {
      ticks += 1;
      setHighlighted((value) => (value + 1) % players.length);
      if (ticks >= 14 + winner) {
        window.clearInterval(interval);
        setHighlighted(winner);
        setSettled(true);
        window.setTimeout(() => {
          if (!fired.current) {
            fired.current = true;
            onDone(winner);
          }
        }, 1100);
      }
    }, 110);
    return () => window.clearInterval(interval);
  }, [onDone, players.length]);

  return (
    <div className="phase-card starter-card">
      <span className="eyebrow">PRIMERA RONDA</span>
      <h2>{settled ? "¡Empieza la partida!" : "Buscando quién comienza…"}</h2>
      <div className="starter-display" style={{ "--winner-color": players[highlighted].color.value } as CSSProperties}>
        <span>{players[highlighted].seat}</span>
      </div>
      <strong className="starter-name">{players[highlighted].name}</strong>
    </div>
  );
}

function CategorySpinner({
  categories,
  player,
  reroll,
  onLanded,
}: {
  categories: Category[];
  player: Player;
  reroll: boolean;
  onLanded: (category: Category) => void;
}) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const gradient = useMemo(
    () => `conic-gradient(${categories.map((category, index) => `${category.color} ${index * (100 / categories.length)}% ${(index + 1) * (100 / categories.length)}%`).join(",")})`,
    [categories],
  );

  const spin = () => {
    if (spinning || !categories.length) return;
    const winnerIndex = Math.floor(Math.random() * categories.length);
    const segment = 360 / categories.length;
    const target = 360 * 5 + (360 - (winnerIndex * segment + segment / 2));
    setSpinning(true);
    setRotation((value) => value + target);
    window.setTimeout(() => onLanded(categories[winnerIndex]), 2200);
  };

  return (
    <div className="spinner-layout">
      <div className="phase-copy">
        <span className="eyebrow">{reroll ? "SEGUNDO GIRO · RESULTADO DEFINITIVO" : "ELIGE CATEGORÍA"}</span>
        <h2>Gira la rueda, <em style={{ color: player.color.value }}>{player.name}</em></h2>
        <p>{reroll ? "Esta vez tendrás que aceptar la categoría." : "Después podrás aceptar el resultado o usar un segundo giro."}</p>
        <button className="primary-button" onClick={spin} disabled={spinning}>
          {spinning ? "Girando…" : "Girar la rueda"}
        </button>
      </div>
      <div className="category-wheel-wrap">
        <div className="wheel-pointer" aria-hidden="true">▼</div>
        <button
          className={`category-wheel ${spinning ? "spinning" : ""}`}
          style={{ background: gradient, transform: `rotate(${rotation}deg)` }}
          onClick={spin}
          aria-label="Girar rueda de categorías"
        >
          {categories.map((category, index) => (
            <span
              key={category.id}
              className="wheel-category-label"
              style={{ transform: `rotate(${index * (360 / categories.length) + 360 / categories.length / 2}deg) translateY(-34%)` }}
            >
              <b>{category.icon}</b>
              <small>{category.name}</small>
            </span>
          ))}
          <i>12</i>
        </button>
      </div>
    </div>
  );
}

function CategoryConfirmation({
  category,
  onAccept,
  onReroll,
}: {
  category: Category;
  onAccept: () => void;
  onReroll: () => void;
}) {
  return (
    <div className="phase-card category-result" style={{ "--category-color": category.color } as CSSProperties}>
      <span className="result-icon">{category.icon}</span>
      <span className="eyebrow">LA RUEDA HA ELEGIDO</span>
      <h2>{category.name}</h2>
      <p>¿Aceptas esta categoría?</p>
      <div className="inline-actions">
        <button className="primary-button" onClick={onAccept}>Sí, continuar</button>
        <button className="secondary-button" onClick={onReroll}>Segundo giro</button>
      </div>
      <small>El segundo resultado será definitivo.</small>
    </div>
  );
}

function LoadingQuestion({
  category,
  error,
  onRetry,
}: {
  category: Category | null;
  error: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="phase-card loading-card">
      {error ? (
        <>
          <span className="loading-symbol error">!</span>
          <h2>No hemos podido cargar la pregunta</h2>
          <p>{error}</p>
          <button className="secondary-button" onClick={onRetry}>Volver a la ruleta</button>
        </>
      ) : (
        <>
          <span className="loading-symbol">12</span>
          <span className="eyebrow">{category?.name ?? "CATEGORÍA"}</span>
          <h2>Preparando la pregunta…</h2>
          <div className="loading-bar"><i /></div>
        </>
      )}
    </div>
  );
}

function QuestionBoard({
  game,
  dispatch,
  currentPlayer,
}: {
  game: GameState;
  dispatch: (action: GameAction) => void;
  currentPlayer: Player;
}) {
  const question = game.currentQuestion!;
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const selectedOption = question.options.find((option) => option.position === selectedPosition);
  const pendingOption = question.options.find((option) => option.position === game.pendingRevealPosition);
  const canStop = currentPlayer.status === "active" && currentPlayer.hasAnsweredThisRound && game.pendingRevealPosition === null;

  return (
    <div className="question-layout">
      <div className="question-meta">
        <span style={{ color: game.selectedCategory?.color }}>{game.selectedCategory?.icon} {question.categoryName}</span>
        <b>{TYPE_LABELS[question.type]}</b>
      </div>
      <QuestionWheel
        title={question.title}
        options={question.options}
        revealed={game.revealedPositions}
        disabled={game.pendingRevealPosition !== null || selectedPosition !== null}
        onReveal={setSelectedPosition}
      />
      <div className="question-footer">
        <div className="turn-instruction">
          Turno de <strong style={{ color: currentPlayer.color.value }}>{currentPlayer.name}</strong>
          {!currentPlayer.hasAnsweredThisRound && <span> · Debe destapar al menos una opción</span>}
        </div>
        <div className="round-controls">
          <button className="pass-button" disabled={!canStop} onClick={() => dispatch({ type: "PASS" })}>
            <span>⇥</span> Pasar turno
          </button>
          <button className="bank-button" disabled={!canStop} onClick={() => dispatch({ type: "BANK" })}>
            <span>◆</span> Plantarse y guardar {currentPlayer.roundScore}
          </button>
        </div>
      </div>
      {selectedOption && game.pendingRevealPosition === null && (
        <OptionPreviewDialog
          option={selectedOption}
          player={currentPlayer}
          onCancel={() => setSelectedPosition(null)}
          onReveal={() => {
            dispatch({ type: "REVEAL_OPTION", position: selectedOption.position });
            setSelectedPosition(null);
          }}
        />
      )}
      {pendingOption && (
        <AnswerDialog
          option={pendingOption}
          type={question.type}
          player={currentPlayer}
          onResult={(correct) => dispatch({ type: "MARK_ANSWER", correct })}
        />
      )}
    </div>
  );
}

function OptionPreviewDialog({
  option,
  player,
  onCancel,
  onReveal,
}: {
  option: QuestionOption;
  player: Player;
  onCancel: () => void;
  onReveal: () => void;
}) {
  return (
    <div className="modal-backdrop">
      <section className="answer-dialog preview-dialog" style={{ "--answer-color": player.color.value } as CSSProperties} role="dialog" aria-modal="true">
        <div className="answer-position">OPCIÓN {option.position}</div>
        <h3>{option.prompt}</h3>
        <p><b>{player.name}</b> debe decir su respuesta en voz alta antes de destapar.</p>
        <div className="result-buttons">
          <button className="secondary-button" onClick={onCancel}>Elegir otra</button>
          <button className="primary-button" onClick={onReveal}>Destapar respuesta</button>
        </div>
      </section>
    </div>
  );
}

function QuestionWheel({
  title,
  options,
  revealed,
  disabled,
  onReveal,
}: {
  title: string;
  options: QuestionOption[];
  revealed: number[];
  disabled: boolean;
  onReveal: (position: number) => void;
}) {
  return (
    <div className="question-wheel">
      <div className="question-core">
        <span>PREGUNTA</span>
        <h2>{title}</h2>
        <small>{12 - revealed.length} opciones disponibles</small>
      </div>
      {options.map((option, index) => {
        const isRevealed = revealed.includes(option.position);
        return (
          <button
            key={option.position}
            className={`question-cap ${isRevealed ? "revealed" : ""}`}
            style={{ "--angle": `${index * 30}deg` } as CSSProperties}
            disabled={disabled || isRevealed}
            onClick={() => onReveal(option.position)}
            aria-label={`Opción ${option.position}: ${option.prompt}`}
          >
            <span className="cap-face"><b>{option.position}</b></span>
            <span className="cap-prompt">{option.prompt}</span>
          </button>
        );
      })}
    </div>
  );
}

function AnswerDialog({
  option,
  type,
  player,
  onResult,
}: {
  option: QuestionOption;
  type: QuestionType;
  player: Player;
  onResult: (correct: boolean) => void;
}) {
  return (
    <div className="modal-backdrop">
      <section className="answer-dialog" style={{ "--answer-color": player.color.value } as CSSProperties} role="dialog" aria-modal="true">
        <div className="answer-position">OPCIÓN {option.position}</div>
        <h3>{option.prompt}</h3>
        <div className={`revealed-answer answer-${type}`}>
          {option.answer.colorHex && <i style={{ background: option.answer.colorHex }} />}
          <strong>{option.answer.display}</strong>
        </div>
        <p>¿La respuesta de <b>{player.name}</b> ha sido correcta?</p>
        <div className="result-buttons">
          <button className="wrong-button" onClick={() => onResult(false)}><span>×</span> Falló</button>
          <button className="correct-button" onClick={() => onResult(true)}><span>✓</span> Acertó</button>
        </div>
      </section>
    </div>
  );
}

function RoundSummary({ game, onNext }: { game: GameState; onNext: () => void }) {
  return (
    <div className="phase-card summary-card">
      <span className="eyebrow">RONDA {game.roundNumber} COMPLETADA</span>
      <h2>Marcador del plató</h2>
      <div className="summary-scores">
        {[...game.players]
          .sort((a, b) => b.totalScore - a.totalScore)
          .map((player) => (
            <div key={player.seat} style={{ "--summary-color": player.color.value } as CSSProperties}>
              <span>{player.name}</span>
              <strong>{String(player.totalScore).padStart(2, "0")}</strong>
            </div>
          ))}
      </div>
      <button className="primary-button" onClick={onNext}>Siguiente ronda →</button>
    </div>
  );
}

function GameOver({
  game,
  onNewGame,
  onExit,
}: {
  game: GameState;
  onNewGame: () => void;
  onExit: () => void;
}) {
  const winners = game.winners.map((index) => game.players[index]).filter(Boolean);
  return (
    <div className="phase-card game-over-card">
      <div className="winner-rays" aria-hidden="true" />
      <span className="eyebrow">FINAL DE PARTIDA</span>
      <h2>{winners.length > 1 ? "¡Empate en cabeza!" : "¡Tenemos ganador!"}</h2>
      <div className="winner-name">{winners.map((winner) => winner.name).join(" · ")}</div>
      <div className="winner-score">{winners[0]?.totalScore ?? 0}<span>puntos</span></div>
      <div className="inline-actions">
        <button className="primary-button" onClick={onNewGame}>Nueva partida</button>
        <button className="secondary-button" onClick={onExit}>Volver al inicio</button>
      </div>
    </div>
  );
}
