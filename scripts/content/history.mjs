import { answer, century, mappedCards, orderCards, rows } from "./builders.mjs";

const events = rows(`
Fundación tradicional de Roma|-753|Italia|1
Batalla de Maratón|-490|Grecia|1
Muerte de Alejandro Magno en Babilonia|-323|Mesopotamia|0
Unificación de China bajo la dinastía Qin|-221|China|0
Asesinato de Julio César|-44|Italia|1
Erupción del Vesubio que sepultó Pompeya|79|Italia|1
Edicto de Milán|313|Italia|1
Caída del Imperio romano de Occidente|476|Italia|1
Hégira de Mahoma de La Meca a Medina|622|Arabia|0
Batalla de Poitiers|732|Francia|1
Coronación imperial de Carlomagno|800|Italia|1
Tratado de Verdún|843|Francia|1
Conquista normanda de Inglaterra|1066|Inglaterra|1
Inicio de la Primera Cruzada|1096|Europa y Oriente Próximo|1
Firma de la Carta Magna|1215|Inglaterra|1
Peregrinación de Mansa Musa a La Meca|1324|África occidental|0
Llegada de la peste negra a Europa|1347|Europa|1
Caída de Constantinopla|1453|Imperio otomano|0
Impresión de la Biblia de Gutenberg|1455|Alemania|1
Llegada de Cristóbal Colón a América|1492|Caribe|0
Llegada de Vasco da Gama a India por mar|1498|India|0
Publicación de las noventa y cinco tesis de Lutero|1517|Alemania|1
Caída de Tenochtitlan|1521|México|0
Final de la expedición de Magallanes y Elcano|1522|España|1
Derrota de la Armada Invencible|1588|Canal de la Mancha|1
Inicio del shogunato Tokugawa|1603|Japón|0
Inicio de la guerra de los Treinta Años|1618|Europa central|1
Paz de Westfalia|1648|Alemania|1
Revolución Gloriosa|1688|Inglaterra|1
Fundación de San Petersburgo|1703|Rusia|1
Declaración de Independencia de Estados Unidos|1776|Estados Unidos|0
Inicio de la Revolución francesa|1789|Francia|1
Independencia de Haití|1804|Haití|0
Batalla de Waterloo|1815|Bélgica|1
Reconocimiento internacional de la independencia de Grecia|1830|Grecia|1
Inicio de la Primera Guerra del Opio|1839|China|0
Publicación del Manifiesto comunista|1848|Inglaterra|1
Restauración Meiji|1868|Japón|0
Inauguración del canal de Suez|1869|Egipto|0
Unificación de Alemania|1871|Alemania|1
Inicio de la Conferencia de Berlín|1884|Alemania|1
Primeros Juegos Olímpicos modernos|1896|Grecia|1
Inicio de la rebelión de los Bóxers|1899|China|0
Inicio de la guerra ruso-japonesa|1904|Asia oriental|0
Inicio de la Primera Guerra Mundial|1914|Europa|1
Revolución rusa de Octubre|1917|Rusia|1
Armisticio de la Primera Guerra Mundial|1918|Francia|1
Crac de Wall Street|1929|Estados Unidos|0
Marcha de la Sal de Gandhi|1930|India|0
Inicio de la Segunda Guerra Mundial|1939|Europa|1
Fundación de las Naciones Unidas|1945|Estados Unidos|0
Independencia de India|1947|India|0
Proclamación de la República Popular China|1949|China|0
Inicio de la guerra de Corea|1950|Corea|0
Conferencia de Bandung|1955|Indonesia|0
Lanzamiento del Sputnik 1|1957|Unión Soviética|1
Construcción del Muro de Berlín|1961|Alemania|1
Crisis de los misiles de Cuba|1962|Cuba|0
Llegada del ser humano a la Luna|1969|Estados Unidos|0
Fin de la guerra de Vietnam|1975|Vietnam|0
Revolución iraní|1979|Irán|0
Accidente nuclear de Chernóbil|1986|Ucrania soviética|1
Caída del Muro de Berlín|1989|Alemania|1
Disolución de la Unión Soviética|1991|Unión Soviética|1
Primeras elecciones multirraciales de Sudáfrica|1994|Sudáfrica|0
Acuerdo de Viernes Santo|1998|Irlanda del Norte|1
Entrada en circulación de billetes y monedas de euro|2002|Eurozona|1
Inicio de la Primavera Árabe en Túnez|2010|Túnez|0
`, ["event", "year", "place", "europe"])
  .map((event) => ({ ...event, year: Number(event.year), europe: event.europe === "1" }));

const people = rows(`
Código legal babilónico que lleva su nombre|Hammurabi
Edad de Oro de la democracia ateniense|Pericles
Unificación imperial de China en 221 a. C.|Qin Shi Huang
Expansión del Imperio maurya y difusión del budismo|Ashoka
Última gobernante de la dinastía ptolemaica|Cleopatra VII
Primer emperador romano|Augusto
Conversión imperial y Edicto de Milán|Constantino I
Corpus Juris Civilis y basílica de Santa Sofía|Justiniano I
Hégira de La Meca a Medina|Mahoma
Coronación como emperador en el año 800|Carlomagno
Recuperación de Jerusalén en 1187|Saladino
Fundación del gran Imperio mongol|Gengis Kan
Peregrinación extraordinariamente rica desde Mali a La Meca|Mansa Musa
Intervención militar francesa durante la guerra de los Cien Años|Juana de Arco
Conquista otomana de Constantinopla|Mehmed II
Patrocinio del primer viaje de Colón junto a Fernando de Aragón|Isabel I de Castilla
Inicio de la Reforma protestante con las noventa y cinco tesis|Martín Lutero
Apogeo territorial y cultural del Imperio otomano|Solimán el Magnífico
Derrota de la Armada Invencible durante su reinado|Isabel I de Inglaterra
Unificación de Japón bajo el shogunato que lleva su apellido|Tokugawa Ieyasu
Defensa del heliocentrismo mediante observaciones telescópicas|Galileo Galilei
Monarquía absoluta francesa y palacio de Versalles|Luis XIV
Modernización de Rusia y fundación de San Petersburgo|Pedro el Grande
Comandante del Ejército Continental y primer presidente estadounidense|George Washington
Liderazgo de la fase inicial de la Revolución haitiana|Toussaint Louverture
Imperio francés y Código Civil de 1804|Napoleón Bonaparte
Independencias de varios territorios del norte de Sudamérica|Simón Bolívar
Largo reinado británico que da nombre a una era|Reina Victoria
Unificación alemana mediante la política de sangre y hierro|Otto von Bismarck
Restauración japonesa que lleva su nombre|Emperador Meiji
Resistencia no violenta y Marcha de la Sal|Mahatma Gandhi
Revolución china de 1911 y fundación de la República de China|Sun Yat-sen
Revolución bolchevique de Octubre|Vladímir Lenin
Fundación de la República de Turquía|Mustafa Kemal Atatürk
New Deal durante la Gran Depresión|Franklin D. Roosevelt
Gobierno británico durante gran parte de la Segunda Guerra Mundial|Winston Churchill
Lucha contra el apartheid y primera presidencia negra de Sudáfrica|Nelson Mandela
Perestroika y glásnost en la Unión Soviética|Mijaíl Gorbachov
`, ["prompt", "person"]);

const capitals = rows(`
Imperio bizantino|Constantinopla
Califato abasí|Bagdad
Imperio inca|Cuzco
Imperio azteca|Tenochtitlan
Imperio romano de Occidente|Roma
Imperio romano de Oriente|Constantinopla
Imperio carolingio bajo Carlomagno|Aquisgrán
Imperio otomano desde 1453|Constantinopla
Dinastía Tang|Chang'an
Dinastía Ming desde 1421|Pekín
Imperio aqueménida|Persépolis
Imperio sasánida|Ctesifonte
Imperio de Mali|Niani
Imperio mongol temprano|Karakórum
Reino nabateo|Petra
Antiguo Reino de Egipto|Menfis
Imperio Nuevo de Egipto|Tebas
Civilización hitita|Hattusa
Imperio maurya|Pataliputra
Imperio jemer|Angkor
Reino de Aksum|Aksum
Imperio Songhai|Gao
Reino visigodo de Hispania|Toledo
Rus de Kiev|Kiev
Imperio austrohúngaro|Viena
Imperio ruso desde Pedro el Grande|San Petersburgo
Japón del período Heian|Heian-kyo
Califato omeya de Córdoba|Córdoba
Reino de Kush|Meroe
Imperio portugués en Brasil desde 1763|Río de Janeiro
`, ["civilization", "capital"]);

export function buildHistoryQuestions() {
  return [
    ...mappedCards({ category: "historia", family: "siglos", title: "¿En qué siglo ocurrió cada acontecimiento?", type: "period", items: events, count: 16, prompt: (item) => item.event, response: (item) => answer(century(item.year)) }),
    ...mappedCards({ category: "historia", family: "antes-1800", title: "¿Ocurrió este acontecimiento antes del año 1800?", type: "boolean", items: events, count: 12, prompt: (item) => item.event, response: (item) => answer(item.year < 1800, item.year < 1800 ? "Sí" : "No"), balanceBy: (item) => item.year < 1800 }),
    ...orderCards({ category: "historia", family: "cronologia", title: "Ordena estos acontecimientos del más antiguo (1) al más reciente (12).", items: events, count: 14, prompt: (item) => item.event, sortValue: (item) => item.year }),
    ...mappedCards({ category: "historia", family: "lugares", title: "¿Con qué país o región se asocia principalmente cada acontecimiento?", type: "free_text", items: events, count: 18, prompt: (item) => item.event, response: (item) => answer(item.place) }),
    ...mappedCards({ category: "historia", family: "europa", title: "¿Tuvo lugar principalmente en Europa este acontecimiento?", type: "boolean", items: events, count: 12, prompt: (item) => item.event, response: (item) => answer(item.europe, item.europe ? "Sí" : "No"), balanceBy: (item) => item.europe }),
    ...mappedCards({ category: "historia", family: "personajes", title: "¿Qué figura histórica se asocia con cada descripción?", type: "free_text", items: people, count: 14, prompt: (item) => item.prompt, response: (item) => answer(item.person), difficulty: 2 }),
    ...mappedCards({ category: "historia", family: "capitales-historicas", title: "¿Cuál fue la capital o principal sede de este Estado histórico?", type: "free_text", items: capitals, count: 14, prompt: (item) => item.civilization, response: (item) => answer(item.capital), difficulty: 3 }),
  ];
}
