import { answer, mappedCards, orderCards, rows } from "./builders.mjs";

const sports = rows(`
Fútbol|Inglaterra|Siglo XIX|1|1|1900|Balón y porterías
Baloncesto|Estados Unidos|Siglo XIX|1|1|1936|Balón y canastas
Voleibol|Estados Unidos|Siglo XIX|1|1|1964|Balón y red
Rugby a siete|Inglaterra|Siglo XIX|1|1|2016|Balón ovalado y postes
Béisbol|Estados Unidos|Siglo XIX|1|0|1992|Bate, pelota y guante
Sóftbol|Estados Unidos|Siglo XIX|1|0|1996|Bate, pelota y guante
Críquet|Inglaterra|Siglo XVIII|1|0|1900|Bate, pelota y wickets
Hockey sobre hierba|Inglaterra|Siglo XIX|1|1|1908|Stick, pelota y porterías
Hockey sobre hielo|Canadá|Siglo XIX|0|0|1920|Stick, disco y patines
Waterpolo|Reino Unido|Siglo XIX|1|1|1900|Balón y porterías flotantes
Lacrosse|Canadá|Siglo XIX|1|0|1904|Stick con red y pelota
Fútbol sala|Uruguay|Siglo XX|1|0||Balón y porterías
Polo|India británica|Siglo XIX|1|0|1900|Caballo, taco y pelota
Netball|Inglaterra|Siglo XIX|1|0||Balón y aros sin tablero
Fútbol americano|Estados Unidos|Siglo XIX|1|0||Balón ovalado y protecciones
Fútbol australiano|Australia|Siglo XIX|1|0||Balón ovalado y postes
Fútbol gaélico|Irlanda|Siglo XIX|1|0||Balón y porterías con postes
Vóley playa|Estados Unidos|Siglo XX|1|1|1996|Balón y red
Tenis de mesa|Inglaterra|Siglo XIX|1|1|1988|Pala, pelota y mesa
Tenis|Inglaterra|Siglo XIX|1|1|1896|Raqueta, pelota y red
Bádminton|India británica e Inglaterra|Siglo XIX|0|1|1992|Raqueta, volante y red
Squash|Inglaterra|Siglo XIX|1|0||Raqueta, pelota y paredes
Golf|Escocia|Siglo XV|1|1|1900|Palos y pelota
Boxeo|Inglaterra|Siglo XIX|0|1|1904|Guantes y cuadrilátero
Judo|Japón|Siglo XIX|0|1|1964|Judogi y tatami
Taekwondo|Corea del Sur|Siglo XX|0|1|2000|Dobok y protecciones
Lucha olímpica|Europa|Siglo XIX|0|1|1896|Maillot y tapiz
Esgrima|Francia e Italia|Siglo XIX|0|1|1896|Arma, máscara y pista
Tiro con arco|Inglaterra|Siglo XIX|0|1|1900|Arco, flechas y diana
Atletismo|Reino Unido|Siglo XIX|0|1|1896|Pista y material según prueba
Natación|Inglaterra|Siglo XIX|0|1|1896|Piscina, bañador y gafas
Gimnasia artística|Alemania|Siglo XIX|0|1|1896|Aparatos gimnásticos
Gimnasia rítmica|Europa|Siglo XX|0|1|1984|Cinta, aro, pelota, mazas y cuerda
Trampolín gimnástico|Estados Unidos|Siglo XX|0|1|2000|Cama elástica
Halterofilia|Europa|Siglo XIX|0|1|1896|Barra y discos
Ciclismo en ruta|Francia|Siglo XIX|0|1|1896|Bicicleta de carretera
Ciclismo en pista|Reino Unido|Siglo XIX|0|1|1896|Bicicleta y velódromo
Remo|Inglaterra|Siglo XVIII|0|1|1900|Bote y remos
Piragüismo esprint|Europa|Siglo XIX|0|1|1936|Canoa o kayak y pala
Piragüismo eslalon|Europa|Siglo XX|0|1|1972|Canoa o kayak, pala y puertas
Vela|Reino Unido|Siglo XVII|0|1|1900|Embarcación y velas
Surf|Hawái y Polinesia|Siglo XX|0|1|2020|Tabla de surf
Skateboarding|Estados Unidos|Siglo XX|0|1|2020|Monopatín
Escalada deportiva|Europa|Siglo XX|0|1|2020|Muro, presas y material de seguridad
Breaking|Estados Unidos|Siglo XX|0|1|2024|Superficie de baile
Triatlón|Estados Unidos|Siglo XX|0|1|2000|Material de natación, bicicleta y carrera
Pentatlón moderno|Francia|Siglo XX|0|1|1912|Equipamiento de cinco disciplinas
Hípica|Europa|Siglo XIX|0|1|1900|Caballo y equipo ecuestre
Tiro deportivo|Europa|Siglo XIX|0|1|1896|Arma deportiva y blanco
Natación artística|Europa|Siglo XX|0|1|1984|Piscina y equipamiento acuático
Saltos de trampolín|Europa|Siglo XIX|0|1|1904|Trampolín o plataforma y piscina
Natación en aguas abiertas|Europa|Siglo XIX|0|1|2008|Bañador, gorro y gafas
Biatlón|Escandinavia|Siglo XX|0|0|1960|Esquís y rifle
Curling|Escocia|Siglo XVI|0|0|1924|Piedras y cepillos
Esquí alpino|Alpes europeos|Siglo XIX|0|0|1936|Esquís y bastones
Snowboard|Estados Unidos|Siglo XX|0|0|1998|Tabla de snowboard
Patinaje de velocidad|Países Bajos|Siglo XIX|0|0|1924|Patines de hielo
Patinaje artístico|Europa|Siglo XIX|0|0|1908|Patines de hielo
Bobsleigh|Suiza|Siglo XIX|0|0|1924|Trineo de bobsleigh
Luge|Europa central|Siglo XIX|0|0|1964|Trineo individual o doble
Skeleton|Suiza|Siglo XIX|0|0|1928|Trineo de skeleton
Salto de esquí|Noruega|Siglo XIX|0|0|1924|Esquís de salto
Esquí de fondo|Escandinavia|Siglo XIX|0|0|1924|Esquís y bastones
Esquí acrobático|Estados Unidos|Siglo XX|0|0|1992|Esquís
`, ["name", "origin", "century", "ball", "paris", "olympicYear", "equipment"])
  .map((sport) => ({
    ...sport,
    ball: sport.ball === "1",
    paris: sport.paris === "1",
    olympicYear: sport.olympicYear ? Number(sport.olympicYear) : null,
  }));

const teamSizes = rows(`
Fútbol|11
Baloncesto|5
Voleibol|6
Balonmano|7
Rugby union|15
Rugby league|13
Rugby a siete|7
Béisbol|9
Sóftbol|9
Críquet|11
Hockey sobre hierba|11
Hockey sobre hielo|6
Waterpolo|7
Lacrosse de campo masculino|10
Fútbol sala|5
Polo|4
Netball|7
Fútbol americano|11
Fútbol australiano|18
Fútbol gaélico|15
Vóley playa|2
Dobles de tenis|2
Dobles de bádminton|2
Curling|4
Korfbal|8
Kayak polo|5
Sepak takraw|3
Kabaddi|7
Ultimate|7
Floorball|6
Hockey sobre patines|5
Fútbol playa|5
Voleibol sentado|6
Goalball|3
Baloncesto en silla de ruedas|5
Hockey subacuático|6
`, ["name", "players"]).map((item) => ({ ...item, players: Number(item.players) }));

const numericRules = rows(`
Minutos de cada parte reglamentaria en fútbol|45
Minutos de cada cuarto FIBA de baloncesto|10
Entradas reglamentarias de un partido de béisbol|9
Hoyos de una vuelta estándar de golf|18
Bolas rojas al inicio de una mesa de snooker|15
Cuartos de un partido de waterpolo|4
Partes de un partido de balonmano|2
Puntos de un ensayo en rugby union|5
Puntos de un touchdown en fútbol americano|6
Puntos de un tiro libre de baloncesto|1
Puntos de un triple de baloncesto|3
Metros desde el punto de penalti hasta la portería en fútbol|11
Kilómetros de un maratón, con tres decimales|42.195
Aros del símbolo olímpico|5
Pruebas de un decatlón|10
Pruebas de un heptatlón|7
Disciplinas de un triatlón|3
Disciplinas del pentatlón moderno|5
Puntos necesarios para ganar normalmente un juego de bádminton|21
Puntos necesarios para ganar normalmente un juego de tenis de mesa|11
Jugadores en pista por equipo en voleibol|6
Puntos del anillo central de una diana de tiro con arco|10
Puntuación inicial habitual en una partida de dardos 501|501
Puntos del ganador de un Gran Premio de Fórmula 1|25
Piezas iniciales de cada jugador en ajedrez|16
Ends de un partido olímpico de curling|10
Bases del campo de béisbol contando el home|4
Metros de longitud de una piscina olímpica|50
Segundos máximos de posesión en baloncesto FIBA|24
Sets que debe ganar un equipo en un partido de voleibol al mejor de cinco|3
`, ["prompt", "value"]).map((item) => ({ ...item, value: Number(item.value) }));

const sportColors = rows(`
Tarjeta de amonestación en fútbol|Amarillo|#f4c430
Tarjeta de expulsión en fútbol|Rojo|#e63946
Maillot del líder del Tour de Francia|Amarillo|#f4c430
Maillot del líder por puntos del Tour de Francia|Verde|#2e9f5b
Maillot del mejor joven del Tour de Francia|Blanco|#f5f7ff
Maillot del líder del Giro de Italia|Rosa|#ff76ad
Maillot del líder de la Vuelta a España|Rojo|#e63946
Bola de snooker que vale siete puntos|Negro|#151515
Bola de snooker que vale seis puntos|Rosa|#ff76ad
Bola de snooker que vale cinco puntos|Azul|#2056a8
Bola de snooker que vale cuatro puntos|Marrón|#8b572a
Bola de snooker que vale tres puntos|Verde|#2e9f5b
Bola de snooker que vale dos puntos|Amarillo|#f4c430
Bandera de automovilismo que detiene una sesión|Rojo|#e63946
Bandera de automovilismo que indica peligro|Amarillo|#f4c430
Bandera de automovilismo que indica pista libre|Verde|#2e9f5b
Bandera a cuadros que marca la llegada|Blanco y negro|#dfe5ec
Tarjeta de advertencia en esgrima|Amarillo|#f4c430
Tarjeta que concede un toque de penalización en esgrima|Rojo|#e63946
Tarjeta de exclusión en esgrima|Negro|#151515
Tarjeta de suspensión temporal en rugby|Amarillo|#f4c430
Tarjeta de expulsión en rugby|Rojo|#e63946
Tarjeta de suspensión corta en hockey sobre hierba|Verde|#2e9f5b
Tarjeta de expulsión en hockey sobre hierba|Rojo|#e63946
Vestimenta tradicional exigida en Wimbledon|Blanco|#f5f7ff
Color tradicional de una pelota de baloncesto|Naranja|#f28c28
Color permitido junto al blanco para pelotas de tenis de mesa|Naranja|#f28c28
Centro de una diana de tiro con arco|Dorado|#f4c430
Esquina neutral del ring de boxeo|Blanco|#f5f7ff
Cinturón asociado a grados dan en muchas artes marciales|Negro|#151515
`, ["prompt", "color", "hex"]);

export function buildSportsQuestions() {
  const olympicSports = sports.filter((sport) => sport.olympicYear !== null);
  const modernSports = sports.filter((sport) => sport.century);
  return [
    ...mappedCards({ category: "deportes", family: "usa-balon", title: "¿Se juega principalmente con una pelota o balón?", type: "boolean", items: sports, count: 16, prompt: (item) => item.name, response: (item) => answer(item.ball, item.ball ? "Sí" : "No"), balanceBy: (item) => item.ball }),
    ...mappedCards({ category: "deportes", family: "paris-2024", title: "¿Formó parte del programa de los Juegos Olímpicos de París 2024?", type: "boolean", items: sports, count: 14, prompt: (item) => item.name, response: (item) => answer(item.paris, item.paris ? "Sí" : "No"), balanceBy: (item) => item.paris }),
    ...mappedCards({ category: "deportes", family: "origen", title: "¿Con qué país o región se asocia el desarrollo de la versión moderna?", type: "free_text", items: sports, count: 14, prompt: (item) => item.name, response: (item) => answer(item.origin), difficulty: 3 }),
    ...mappedCards({ category: "deportes", family: "material", title: "¿Cuál es el material principal utilizado en cada deporte?", type: "free_text", items: sports, count: 12, prompt: (item) => item.name, response: (item) => answer(item.equipment) }),
    ...mappedCards({ category: "deportes", family: "jugadores", title: "¿Cuántos jugadores de cada equipo participan simultáneamente en el terreno de juego?", type: "number", items: teamSizes, count: 12, prompt: (item) => item.name, response: (item) => answer(item.players) }),
    ...mappedCards({ category: "deportes", family: "siglo-moderno", title: "¿En qué siglo se codificó o desarrolló la versión moderna de cada deporte?", type: "period", items: modernSports, count: 10, prompt: (item) => item.name, response: (item) => answer(item.century), difficulty: 3 }),
    ...orderCards({ category: "deportes", family: "debut-olimpico", title: "Ordena estos deportes por su debut olímpico, del primero (1) al más reciente (12).", items: olympicSports, count: 8, prompt: (item) => item.name, sortValue: (item) => item.olympicYear }),
    ...mappedCards({ category: "deportes", family: "colores", title: "¿Qué color corresponde a cada señal, objeto o distintivo deportivo?", type: "color", items: sportColors, count: 8, prompt: (item) => item.prompt, response: (item) => answer(item.color, item.color, { colorHex: item.hex }) }),
    ...mappedCards({ category: "deportes", family: "reglas-numericas", title: "¿Qué número completa correctamente cada regla o dato deportivo?", type: "number", items: numericRules, count: 6, prompt: (item) => item.prompt, response: (item) => answer(item.value), difficulty: 3 }),
  ];
}
