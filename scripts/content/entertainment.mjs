import { answer, decade, mappedCards, orderCards, rows } from "./builders.mjs";

const films = rows(`
Metrópolis|1927|Fritz Lang|Alemania|0|1
M, el vampiro de Düsseldorf|1931|Fritz Lang|Alemania|0|0
Ciudadano Kane|1941|Orson Welles|Estados Unidos|0|0
Casablanca|1942|Michael Curtiz|Estados Unidos|0|1
Ladrón de bicicletas|1948|Vittorio De Sica|Italia|0|1
Rashomon|1950|Akira Kurosawa|Japón|0|1
Los siete samuráis|1954|Akira Kurosawa|Japón|0|0
Los cuatrocientos golpes|1959|François Truffaut|Francia|0|0
Psicosis|1960|Alfred Hitchcock|Estados Unidos|0|1
Lawrence de Arabia|1962|David Lean|Reino Unido|0|1
Ocho y medio|1963|Federico Fellini|Italia|0|0
¿Teléfono rojo? Volamos hacia Moscú|1964|Stanley Kubrick|Reino Unido|0|1
2001: Una odisea del espacio|1968|Stanley Kubrick|Reino Unido|0|0
El padrino|1972|Francis Ford Coppola|Estados Unidos|0|1
Tiburón|1975|Steven Spielberg|Estados Unidos|0|1
La guerra de las galaxias|1977|George Lucas|Estados Unidos|0|0
Alien, el octavo pasajero|1979|Ridley Scott|Reino Unido|0|0
Apocalypse Now|1979|Francis Ford Coppola|Estados Unidos|0|1
Stalker|1979|Andréi Tarkovski|Unión Soviética|0|1
El resplandor|1980|Stanley Kubrick|Reino Unido|0|1
En busca del arca perdida|1981|Steven Spielberg|Estados Unidos|0|0
Blade Runner|1982|Ridley Scott|Estados Unidos|0|1
E.T., el extraterrestre|1982|Steven Spielberg|Estados Unidos|0|0
Fanny y Alexander|1982|Ingmar Bergman|Suecia|0|0
Nausicaä del Valle del Viento|1984|Hayao Miyazaki|Japón|1|1
Terminator|1984|James Cameron|Estados Unidos|0|0
Cinema Paradiso|1988|Giuseppe Tornatore|Italia|0|0
La tumba de las luciérnagas|1988|Isao Takahata|Japón|1|1
Haz lo que debas|1989|Spike Lee|Estados Unidos|0|0
Uno de los nuestros|1990|Martin Scorsese|Estados Unidos|0|1
El silencio de los corderos|1991|Jonathan Demme|Estados Unidos|0|1
La lista de Schindler|1993|Steven Spielberg|Estados Unidos|0|1
Pulp Fiction|1994|Quentin Tarantino|Estados Unidos|0|0
Toy Story|1995|John Lasseter|Estados Unidos|1|0
Fargo|1996|Joel Coen|Estados Unidos|0|0
La princesa Mononoke|1997|Hayao Miyazaki|Japón|1|0
La vida es bella|1997|Roberto Benigni|Italia|0|0
Matrix|1999|Lana y Lilly Wachowski|Estados Unidos|0|0
Tigre y dragón|2000|Ang Lee|Taiwán|0|1
Deseando amar|2000|Wong Kar-wai|Hong Kong|0|0
Amélie|2001|Jean-Pierre Jeunet|Francia|0|0
El viaje de Chihiro|2001|Hayao Miyazaki|Japón|1|0
El Señor de los Anillos: La Comunidad del Anillo|2001|Peter Jackson|Nueva Zelanda|0|1
Ciudad de Dios|2002|Fernando Meirelles y Kátia Lund|Brasil|0|1
Oldboy|2003|Park Chan-wook|Corea del Sur|0|1
¡Olvídate de mí!|2004|Michel Gondry|Estados Unidos|0|0
El laberinto del fauno|2006|Guillermo del Toro|España y México|0|0
La vida de los otros|2006|Florian Henckel von Donnersmarck|Alemania|0|0
No es país para viejos|2007|Joel y Ethan Coen|Estados Unidos|0|1
Pozos de ambición|2007|Paul Thomas Anderson|Estados Unidos|0|1
Slumdog Millionaire|2008|Danny Boyle|Reino Unido|0|1
Una separación|2011|Asghar Farhadi|Irán|0|0
The Artist|2011|Michel Hazanavicius|Francia|0|0
La caza|2012|Thomas Vinterberg|Dinamarca|0|0
12 años de esclavitud|2013|Steve McQueen|Reino Unido y Estados Unidos|0|1
Her|2013|Spike Jonze|Estados Unidos|0|0
El gran hotel Budapest|2014|Wes Anderson|Estados Unidos y Alemania|0|0
Whiplash|2014|Damien Chazelle|Estados Unidos|0|0
Mad Max: Furia en la carretera|2015|George Miller|Australia|0|0
Moonlight|2016|Barry Jenkins|Estados Unidos|0|0
La La Land|2016|Damien Chazelle|Estados Unidos|0|0
Déjame salir|2017|Jordan Peele|Estados Unidos|0|0
Roma|2018|Alfonso Cuarón|México|0|0
Parásitos|2019|Bong Joon-ho|Corea del Sur|0|0
Retrato de una mujer en llamas|2019|Céline Sciamma|Francia|0|0
Nomadland|2020|Chloé Zhao|Estados Unidos|0|1
Drive My Car|2021|Ryūsuke Hamaguchi|Japón|0|1
Todo a la vez en todas partes|2022|Daniel Kwan y Daniel Scheinert|Estados Unidos|0|0
RRR|2022|S. S. Rajamouli|India|0|0
Anatomía de una caída|2023|Justine Triet|Francia|0|0
Godzilla Minus One|2023|Takashi Yamazaki|Japón|0|0
`, ["title", "year", "director", "country", "animated", "adapted"])
  .map((film) => ({
    ...film,
    year: Number(film.year),
    animated: film.animated === "1",
    adapted: film.adapted === "1",
  }));

const television = rows(`
The Twilight Zone|Rod Serling
Star Trek|Gene Roddenberry
Doctor Who|Sydney Newman, C. E. Webber y Donald Wilson
Fawlty Towers|John Cleese y Connie Booth
The Simpsons|Matt Groening
Twin Peaks|David Lynch y Mark Frost
The X-Files|Chris Carter
Friends|David Crane y Marta Kauffman
The Sopranos|David Chase
The Office (Reino Unido)|Ricky Gervais y Stephen Merchant
The Wire|David Simon
Lost|J. J. Abrams, Damon Lindelof y Jeffrey Lieber
Avatar: La leyenda de Aang|Michael Dante DiMartino y Bryan Konietzko
Breaking Bad|Vince Gilligan
Mad Men|Matthew Weiner
Parks and Recreation|Greg Daniels y Michael Schur
Community|Dan Harmon
Game of Thrones|David Benioff y D. B. Weiss
Black Mirror|Charlie Brooker
Adventure Time|Pendleton Ward
Sherlock|Mark Gatiss y Steven Moffat
Bob's Burgers|Loren Bouchard
Rick y Morty|Justin Roiland y Dan Harmon
BoJack Horseman|Raphael Bob-Waksberg
Better Call Saul|Vince Gilligan y Peter Gould
Mr. Robot|Sam Esmail
Stranger Things|Matt y Ross Duffer
Fleabag|Phoebe Waller-Bridge
Atlanta|Donald Glover
The Crown|Peter Morgan
Dark|Baran bo Odar y Jantje Friese
La casa de papel|Álex Pina
Succession|Jesse Armstrong
Ted Lasso|Bill Lawrence, Jason Sudeikis, Joe Kelly y Brendan Hunt
El juego del calamar|Hwang Dong-hyuk
Separación|Dan Erickson
The Bear|Christopher Storer
Andor|Tony Gilroy
Bluey|Joe Brumm
Shōgun (2024)|Rachel Kondo y Justin Marks
`, ["show", "creator"]);

const games = rows(`
Pong|Atari|1972
Space Invaders|Taito|1978
Pac-Man|Namco|1980
Donkey Kong|Nintendo|1981
Tetris|Alekséi Pázhitnov|1984
Super Mario Bros.|Nintendo|1985
The Legend of Zelda|Nintendo|1986
Metroid|Nintendo R&D1|1986
Final Fantasy|Square|1987
SimCity|Maxis|1989
Sonic the Hedgehog|Sega|1991
Street Fighter II|Capcom|1991
Doom|id Software|1993
Myst|Cyan|1993
Warcraft: Orcs & Humans|Blizzard Entertainment|1994
Pokémon Rojo y Verde|Game Freak|1996
Tomb Raider|Core Design|1996
Final Fantasy VII|Square|1997
GoldenEye 007|Rare|1997
Half-Life|Valve|1998
StarCraft|Blizzard Entertainment|1998
Super Smash Bros.|HAL Laboratory|1999
Los Sims|Maxis|2000
Grand Theft Auto III|DMA Design|2001
Halo: Combat Evolved|Bungie|2001
Metroid Prime|Retro Studios|2002
World of Warcraft|Blizzard Entertainment|2004
Shadow of the Colossus|Team Ico|2005
Wii Sports|Nintendo|2006
Portal|Valve|2007
BioShock|2K Boston y 2K Australia|2007
Minecraft|Mojang|2011
Dark Souls|FromSoftware|2011
Journey|Thatgamecompany|2012
The Last of Us|Naughty Dog|2013
Stardew Valley|ConcernedApe|2016
Overwatch|Blizzard Entertainment|2016
The Legend of Zelda: Breath of the Wild|Nintendo|2017
Fortnite Battle Royale|Epic Games|2017
God of War (2018)|Santa Monica Studio|2018
Hades|Supergiant Games|2020
Elden Ring|FromSoftware|2022
Baldur's Gate 3|Larian Studios|2023
The Legend of Zelda: Tears of the Kingdom|Nintendo|2023
`, ["game", "developer", "year"]).map((game) => ({ ...game, year: Number(game.year) }));

const characters = rows(`
Sherlock Holmes|Relatos de Sherlock Holmes
Darth Vader|Star Wars
Frodo Bolsón|El Señor de los Anillos
Mario|Super Mario
Link|The Legend of Zelda
Lara Croft|Tomb Raider
Pikachu|Pokémon
Sonic|Sonic the Hedgehog
Goku|Dragon Ball
Sailor Moon|Sailor Moon
Totoro|Mi vecino Totoro
Homer Simpson|The Simpsons
Walter White|Breaking Bad
Eleven|Stranger Things
Geralt de Rivia|The Witcher
Kratos|God of War
Master Chief|Halo
Ellie Williams|The Last of Us
Cloud Strife|Final Fantasy VII
Solid Snake|Metal Gear
Indiana Jones|Indiana Jones
Rocky Balboa|Rocky
Ellen Ripley|Alien
Marty McFly|Regreso al futuro
Neo|Matrix
Jack Sparrow|Piratas del Caribe
Katniss Everdeen|Los juegos del hambre
Harry Potter|Harry Potter
Wednesday Addams|La familia Addams
Don Draper|Mad Men
Tony Soprano|The Sopranos
Fleabag|Fleabag
BoJack Horseman|BoJack Horseman
Luffy|One Piece
Naruto Uzumaki|Naruto
Tanjiro Kamado|Demon Slayer
`, ["character", "franchise"]);

const musicTracks = rows(`
Strange Fruit|Billie Holiday|1939|Estados Unidos|0
La vie en rose|Édith Piaf|1946|Francia|0
Hound Dog|Elvis Presley|1956|Estados Unidos|0
Johnny B. Goode|Chuck Berry|1958|Estados Unidos|0
What'd I Say|Ray Charles|1959|Estados Unidos|0
Sukiyaki|Kyu Sakamoto|1961|Japón|0
Mas, que Nada!|Jorge Ben Jor|1963|Brasil|0
A Change Is Gonna Come|Sam Cooke|1964|Estados Unidos|0
My Girl|The Temptations|1964|Estados Unidos|1
Like a Rolling Stone|Bob Dylan|1965|Estados Unidos|0
Gracias a la vida|Violeta Parra|1966|Chile|0
Good Vibrations|The Beach Boys|1966|Estados Unidos|1
Respect|Aretha Franklin|1967|Estados Unidos|0
A Day in the Life|The Beatles|1967|Reino Unido|1
(Sittin' On) The Dock of the Bay|Otis Redding|1968|Estados Unidos|0
Gimme Shelter|The Rolling Stones|1969|Reino Unido|1
I Want You Back|The Jackson 5|1969|Estados Unidos|1
Bridge over Troubled Water|Simon & Garfunkel|1970|Estados Unidos|1
What's Going On|Marvin Gaye|1971|Estados Unidos|0
Imagine|John Lennon|1971|Reino Unido|0
Superstition|Stevie Wonder|1972|Estados Unidos|0
Starman|David Bowie|1972|Reino Unido|0
Jolene|Dolly Parton|1973|Estados Unidos|0
No Woman, No Cry|Bob Marley & The Wailers|1974|Jamaica|1
Bohemian Rhapsody|Queen|1975|Reino Unido|1
Dancing Queen|ABBA|1976|Suecia|1
Heroes|David Bowie|1977|Reino Unido|0
Stayin' Alive|Bee Gees|1977|Reino Unido y Australia|1
Ojalá|Silvio Rodríguez|1978|Cuba|0
Le Freak|Chic|1978|Estados Unidos|1
London Calling|The Clash|1979|Reino Unido|1
Rapper's Delight|The Sugarhill Gang|1979|Estados Unidos|1
Don't Stop Believin'|Journey|1981|Estados Unidos|1
Billie Jean|Michael Jackson|1982|Estados Unidos|0
Sweet Dreams (Are Made of This)|Eurythmics|1983|Reino Unido|1
Every Breath You Take|The Police|1983|Reino Unido|1
Purple Rain|Prince|1984|Estados Unidos|0
Take on Me|a-ha|1985|Noruega|1
Yéké Yéké|Mory Kanté|1987|Guinea|0
Like a Prayer|Madonna|1989|Estados Unidos|0
Lambada|Kaoma|1989|Francia y Brasil|1
Fight the Power|Public Enemy|1989|Estados Unidos|1
Smells Like Teen Spirit|Nirvana|1991|Estados Unidos|1
Losing My Religion|R.E.M.|1991|Estados Unidos|1
Creep|Radiohead|1992|Reino Unido|1
Juicy|The Notorious B.I.G.|1994|Estados Unidos|0
Wonderwall|Oasis|1995|Reino Unido|1
Killing Me Softly|Fugees|1996|Estados Unidos|1
Chan Chan|Buena Vista Social Club|1997|Cuba|1
Around the World|Daft Punk|1997|Francia|1
Doo Wop (That Thing)|Lauryn Hill|1998|Estados Unidos|0
...Baby One More Time|Britney Spears|1998|Estados Unidos|0
Dragostea Din Tei|O-Zone|2003|Moldavia|1
Crazy in Love|Beyoncé|2003|Estados Unidos|0
Hey Ya!|Outkast|2003|Estados Unidos|1
Seven Nation Army|The White Stripes|2003|Estados Unidos|1
Rehab|Amy Winehouse|2006|Reino Unido|0
Paper Planes|M.I.A.|2007|Reino Unido|0
Single Ladies (Put a Ring on It)|Beyoncé|2008|Estados Unidos|0
Rolling in the Deep|Adele|2010|Reino Unido|0
Gangnam Style|Psy|2012|Corea del Sur|0
Get Lucky|Daft Punk|2013|Francia|1
Royals|Lorde|2013|Nueva Zelanda|0
Papaoutai|Stromae|2013|Bélgica|0
Uptown Funk|Mark Ronson|2014|Reino Unido|0
Formation|Beyoncé|2016|Estados Unidos|0
Redbone|Childish Gambino|2016|Estados Unidos|0
Despacito|Luis Fonsi|2017|Puerto Rico|0
Jerusalema|Master KG|2019|Sudáfrica|0
Bad Guy|Billie Eilish|2019|Estados Unidos|0
Blinding Lights|The Weeknd|2019|Canadá|0
Levitating|Dua Lipa|2020|Reino Unido|0
As It Was|Harry Styles|2022|Reino Unido|0
Flowers|Miley Cyrus|2023|Estados Unidos|0
Espresso|Sabrina Carpenter|2024|Estados Unidos|0
`, ["track", "artist", "year", "country", "group"])
  .map((track) => ({ ...track, year: Number(track.year), group: track.group === "1" }));

const musicArtists = [...new Map(musicTracks.map((track) => [track.artist, track])).values()];

const musicAlbums = rows(`
Kind of Blue|Miles Davis
Blue|Joni Mitchell
Abbey Road|The Beatles
What's Going On|Marvin Gaye
Tapestry|Carole King
The Dark Side of the Moon|Pink Floyd
Innervisions|Stevie Wonder
Horses|Patti Smith
Rumours|Fleetwood Mac
Songs in the Key of Life|Stevie Wonder
Never Mind the Bollocks, Here's the Sex Pistols|Sex Pistols
The Rise and Fall of Ziggy Stardust and the Spiders from Mars|David Bowie
Off the Wall|Michael Jackson
London Calling|The Clash
Remain in Light|Talking Heads
Purple Rain|Prince and the Revolution
Born in the U.S.A.|Bruce Springsteen
Graceland|Paul Simon
The Joshua Tree|U2
Sign o' the Times|Prince
Disintegration|The Cure
Doolittle|Pixies
Blue Lines|Massive Attack
Nevermind|Nirvana
Achtung Baby|U2
The Miseducation of Lauryn Hill|Lauryn Hill
OK Computer|Radiohead
Homogenic|Björk
The Velvet Rope|Janet Jackson
Discovery|Daft Punk
Is This It|The Strokes
The College Dropout|Kanye West
Back to Black|Amy Winehouse
In Rainbows|Radiohead
My Beautiful Dark Twisted Fantasy|Kanye West
21|Adele
To Pimp a Butterfly|Kendrick Lamar
Lemonade|Beyoncé
Melodrama|Lorde
El mal querer|Rosalía
Un verano sin ti|Bad Bunny
Motomami|Rosalía
Cowboy Carter|Beyoncé
`, ["album", "artist"]);

const entertainmentColors = rows(`
Sable de luz de Darth Vader|Rojo|#e63946
Sable de luz de Luke Skywalker en El retorno del Jedi|Verde|#2e9f5b
Sable de luz de Mace Windu|Morado|#8e5bd9
Piel de los personajes de Los Simpson|Amarillo|#f4c430
Piel de los Pitufos|Azul|#2056a8
Piel de Hulk|Verde|#2e9f5b
Pelaje principal de Pikachu|Amarillo|#f4c430
Exterior de la TARDIS|Azul|#2056a8
Anillo Único de El Señor de los Anillos|Dorado|#f4c430
Código digital de Matrix|Verde|#2e9f5b
Gorra de Mario|Rojo|#e63946
Gorra de Luigi|Verde|#2e9f5b
Pelaje de Sonic|Azul|#2056a8
Cuerpo de Pac-Man|Amarillo|#f4c430
Cuerpo de Kirby|Rosa|#ff76ad
Túnica clásica de Link|Verde|#2e9f5b
Armadura de Master Chief|Verde|#5d7f3a
Portal de entrada de Portal|Azul|#31a7ff
Portal de salida de Portal|Naranja|#f28c28
Carretera de baldosas de El mago de Oz|Amarillo|#f4c430
Mono de La Novia en Kill Bill|Amarillo|#f4c430
Uniformes de los guardias de El juego del calamar|Rosa|#ff4fa3
Esferas del dragón|Naranja|#f28c28
Mitad superior de una Poké Ball clásica|Rojo|#e63946
`, ["prompt", "color", "hex"]);

export function buildEntertainmentQuestions() {
  return [
    ...mappedCards({ category: "entretenimiento", family: "directores", title: "¿Quién dirigió cada película?", type: "free_text", items: films, count: 17, prompt: (item) => item.title, response: (item) => answer(item.director) }),
    ...mappedCards({ category: "entretenimiento", family: "decadas", title: "¿En qué década se estrenó originalmente cada película?", type: "period", items: films, count: 8, prompt: (item) => item.title, response: (item) => answer(decade(item.year)) }),
    ...orderCards({ category: "entretenimiento", family: "cronologia-cine", title: "Ordena estas películas por estreno, de la más antigua (1) a la más reciente (12).", items: films, count: 8, prompt: (item) => item.title, sortValue: (item) => item.year }),
    ...mappedCards({ category: "entretenimiento", family: "paises-cine", title: "¿Con qué país o territorio de producción se asocia principalmente cada película?", type: "free_text", items: films, count: 10, prompt: (item) => item.title, response: (item) => answer(item.country), difficulty: 3 }),
    ...mappedCards({ category: "entretenimiento", family: "animacion", title: "¿Es una película de animación?", type: "boolean", items: films, count: 8, prompt: (item) => item.title, response: (item) => answer(item.animated, item.animated ? "Sí" : "No"), balanceBy: (item) => item.animated }),
    ...mappedCards({ category: "entretenimiento", family: "adaptaciones", title: "¿Se basa explícitamente en una obra literaria anterior?", type: "boolean", items: films, count: 8, prompt: (item) => item.title, response: (item) => answer(item.adapted, item.adapted ? "Sí" : "No"), balanceBy: (item) => item.adapted }),
    ...mappedCards({ category: "entretenimiento", family: "creadores-tv", title: "¿Quién creó o desarrolló originalmente cada serie?", type: "free_text", items: television, count: 10, prompt: (item) => item.show, response: (item) => answer(item.creator), difficulty: 3 }),
    ...mappedCards({ category: "entretenimiento", family: "videojuegos-estudio", title: "¿Qué estudio o creador desarrolló originalmente cada videojuego?", type: "free_text", items: games, count: 11, prompt: (item) => item.game, response: (item) => answer(item.developer), difficulty: 2 }),
    ...mappedCards({ category: "entretenimiento", family: "videojuegos-decadas", title: "¿En qué década apareció originalmente cada videojuego?", type: "period", items: games, count: 6, prompt: (item) => item.game, response: (item) => answer(decade(item.year)), difficulty: 3 }),
    ...mappedCards({ category: "entretenimiento", family: "personajes", title: "¿A qué obra, saga o franquicia pertenece cada personaje?", type: "free_text", items: characters, count: 8, prompt: (item) => item.character, response: (item) => answer(item.franchise) }),
    ...mappedCards({ category: "entretenimiento", family: "colores-iconicos", title: "¿Qué color identifica este elemento de ficción o entretenimiento?", type: "color", items: entertainmentColors, count: 6, prompt: (item) => item.prompt, response: (item) => answer(item.color, item.color, { colorHex: item.hex }) }),
    ...mappedCards({ category: "entretenimiento", family: "musica-interprete", title: "¿Quién interpreta principalmente cada canción?", type: "free_text", items: musicTracks, count: 14, prompt: (item) => item.track, response: (item) => answer(item.artist), difficulty: 2 }),
    ...mappedCards({ category: "entretenimiento", family: "musica-origen", title: "¿Con qué país o territorio se asocia principalmente cada intérprete?", type: "free_text", items: musicArtists, count: 8, prompt: (item) => item.artist, response: (item) => answer(item.country), difficulty: 3 }),
    ...mappedCards({ category: "entretenimiento", family: "musica-grupo", title: "¿Es el intérprete principal un grupo, banda o dúo?", type: "boolean", items: musicArtists, count: 8, prompt: (item) => item.artist, response: (item) => answer(item.group, item.group ? "Sí" : "No"), balanceBy: (item) => item.group }),
    ...mappedCards({ category: "entretenimiento", family: "musica-decadas", title: "¿En qué década se publicó originalmente cada canción?", type: "period", items: musicTracks, count: 4, prompt: (item) => item.track, response: (item) => answer(decade(item.year)), difficulty: 3 }),
    ...orderCards({ category: "entretenimiento", family: "musica-cronologia", title: "Ordena estas canciones por publicación, de la más antigua (1) a la más reciente (12).", items: musicTracks, count: 6, prompt: (item) => item.track, sortValue: (item) => item.year }),
    ...mappedCards({ category: "entretenimiento", family: "musica-albumes", title: "¿Qué artista publicó cada álbum?", type: "free_text", items: musicAlbums, count: 10, prompt: (item) => item.album, response: (item) => answer(item.artist), difficulty: 2 }),
  ];
}
