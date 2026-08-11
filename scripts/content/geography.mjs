import { answer, mappedCards, orderCards, rows } from "./builders.mjs";

const countries = rows(`
Argentina|Buenos Aires|América del Sur|Peso argentino|Español|5|1|0|2780400|0
Australia|Canberra|Oceanía|Dólar australiano|Inglés|0|1|0|7692024|0
Austria|Viena|Europa|Euro|Alemán|8|0|1|83879|1
Bélgica|Bruselas|Europa|Euro|Neerlandés, francés y alemán|4|1|1|30528|1
Brasil|Brasilia|América del Sur|Real brasileño|Portugués|10|1|1|8515767|0
Canadá|Ottawa|América del Norte|Dólar canadiense|Inglés y francés|1|1|1|9984670|1
Chile|Santiago|América del Sur|Peso chileno|Español|3|1|0|756102|1
China|Pekín|Asia|Yuan renminbi|Chino mandarín|14|1|1|9596961|1
Colombia|Bogotá|América del Sur|Peso colombiano|Español|5|1|1|1141748|1
Costa Rica|San José|América Central|Colón costarricense|Español|2|1|1|51100|1
Croacia|Zagreb|Europa|Euro|Croata|5|1|1|56594|1
Cuba|La Habana|Caribe|Peso cubano|Español|0|1|1|109884|1
Chequia|Praga|Europa|Corona checa|Checo|4|0|1|78871|1
Dinamarca|Copenhague|Europa|Corona danesa|Danés|1|1|1|42933|1
Egipto|El Cairo|África|Libra egipcia|Árabe|4|1|1|1002450|1
Etiopía|Adís Abeba|África|Birr etíope|Amárico|6|0|1|1104300|1
Finlandia|Helsinki|Europa|Euro|Finés y sueco|3|1|1|338455|0
Francia|París|Europa|Euro|Francés|8|1|1|551695|1
Alemania|Berlín|Europa|Euro|Alemán|9|1|1|357022|1
Ghana|Acra|África|Cedi ghanés|Inglés|3|1|1|238533|1
Grecia|Atenas|Europa|Euro|Griego|4|1|1|131957|0
Hungría|Budapest|Europa|Forinto húngaro|Húngaro|7|0|1|93028|1
Islandia|Reikiavik|Europa|Corona islandesa|Islandés|0|1|1|103000|1
India|Nueva Delhi|Asia|Rupia india|Hindi e inglés|6|1|1|3287263|0
Irlanda|Dublín|Europa|Euro|Irlandés e inglés|1|1|1|70273|1
Italia|Roma|Europa|Euro|Italiano|6|1|1|301340|1
Japón|Tokio|Asia|Yen|Japonés|0|1|1|377975|1
Kenia|Nairobi|África|Chelín keniano|Suajili e inglés|5|1|1|580367|1
Malasia|Kuala Lumpur|Asia|Ringgit|Malayo|3|1|1|330803|1
México|Ciudad de México|América del Norte|Peso mexicano|Español|3|1|1|1964375|1
Mongolia|Ulán Bator|Asia|Tugrik|Mongol|2|0|1|1564116|1
Nepal|Katmandú|Asia|Rupia nepalesa|Nepalí|2|0|1|147516|1
Países Bajos|Ámsterdam|Europa|Euro|Neerlandés|2|1|1|41850|1
Nueva Zelanda|Wellington|Oceanía|Dólar neozelandés|Inglés y maorí|0|1|0|268838|1
Nigeria|Abuya|África|Naira|Inglés|4|1|1|923768|0
Noruega|Oslo|Europa|Corona noruega|Noruego|3|1|1|385207|1
Pakistán|Islamabad|Asia|Rupia pakistaní|Urdu e inglés|4|1|1|881913|0
Perú|Lima|América del Sur|Sol|Español|5|1|0|1285216|1
Filipinas|Manila|Asia|Peso filipino|Filipino e inglés|0|1|1|300000|1
Polonia|Varsovia|Europa|Zloty|Polaco|7|1|1|312696|1
Portugal|Lisboa|Europa|Euro|Portugués|1|1|1|92212|1
Rumanía|Bucarest|Europa|Leu rumano|Rumano|5|1|1|238397|1
Arabia Saudí|Riad|Asia|Riyal saudí|Árabe|7|1|1|2149690|0
Singapur|Singapur|Asia|Dólar de Singapur|Inglés, malayo, mandarín y tamil|0|1|1|734|1
Sudáfrica|Pretoria, Ciudad del Cabo y Bloemfontein|África|Rand|Once idiomas oficiales|6|1|0|1221037|1
Corea del Sur|Seúl|Asia|Won surcoreano|Coreano|1|1|1|100210|1
España|Madrid|Europa|Euro|Español|5|1|1|505990|1
Suecia|Estocolmo|Europa|Corona sueca|Sueco|2|1|1|450295|0
Suiza|Berna|Europa|Franco suizo|Alemán, francés, italiano y romanche|5|0|1|41285|1
Tailandia|Bangkok|Asia|Baht|Tailandés|4|1|1|513120|1
Turquía|Ankara|Asia y Europa|Lira turca|Turco|8|1|1|783562|1
Ucrania|Kiev|Europa|Grivna|Ucraniano|7|1|1|603628|0
Reino Unido|Londres|Europa|Libra esterlina|Inglés|1|1|1|243610|1
Estados Unidos|Washington D. C.|América del Norte|Dólar estadounidense|Inglés|2|1|1|9833517|1
Uruguay|Montevideo|América del Sur|Peso uruguayo|Español|2|1|0|176215|0
Vietnam|Hanói|Asia|Dong|Vietnamita|3|1|1|331212|1
Argelia|Argel|África|Dinar argelino|Árabe y bereber|6|1|1|2381741|1
Angola|Luanda|África|Kwanza|Portugués|4|1|0|1246700|1
Bolivia|Sucre y La Paz|América del Sur|Boliviano|Español y lenguas indígenas|5|0|0|1098581|1
Botsuana|Gaborone|África|Pula|Inglés y setsuana|4|0|0|581730|0
Camboya|Nom Pen|Asia|Riel|Jemer|3|1|1|181035|1
Camerún|Yaundé|África|Franco CFA de África Central|Francés e inglés|6|1|1|475442|1
Ecuador|Quito|América del Sur|Dólar estadounidense|Español|2|1|1|256370|1
Estonia|Tallin|Europa|Euro|Estonio|2|1|1|45227|0
Georgia|Tiflis|Asia y Europa|Lari|Georgiano|4|1|1|69700|1
Irán|Teherán|Asia|Rial iraní|Persa|7|1|1|1648195|1
Iraq|Bagdad|Asia|Dinar iraquí|Árabe y kurdo|6|1|1|438317|1
Jordania|Amán|Asia|Dinar jordano|Árabe|5|1|1|89342|1
Kazajistán|Astaná|Asia y Europa|Tenge|Kazajo y ruso|5|0|1|2724900|0
Letonia|Riga|Europa|Euro|Letón|4|1|1|64589|1
Lituania|Vilna|Europa|Euro|Lituano|4|1|1|65300|1
Madagascar|Antananarivo|África|Ariary|Malgache y francés|0|1|0|587041|1
Panamá|Ciudad de Panamá|América Central|Balboa y dólar estadounidense|Español|2|1|1|75417|1
Paraguay|Asunción|América del Sur|Guaraní|Español y guaraní|3|0|0|406752|1
Senegal|Dakar|África|Franco CFA de África Occidental|Francés|5|1|1|196722|1
Serbia|Belgrado|Europa|Dinar serbio|Serbio|8|0|1|88361|1
Eslovaquia|Bratislava|Europa|Euro|Eslovaco|5|0|1|49035|1
Eslovenia|Liubliana|Europa|Euro|Esloveno|4|1|1|20273|1
Sri Lanka|Sri Jayawardenepura Kotte|Asia|Rupia de Sri Lanka|Cingalés y tamil|0|1|1|65610|0
Túnez|Túnez|África|Dinar tunecino|Árabe|2|1|1|163610|1
Emiratos Árabes Unidos|Abu Dabi|Asia|Dírham de los EAU|Árabe|2|1|1|83600|1
`, ["name", "capital", "continent", "currency", "language", "borders", "coast", "north", "area", "flagRed"])
  .map((country) => ({
    ...country,
    borders: Number(country.borders),
    coast: country.coast === "1",
    north: country.north === "1",
    area: Number(country.area),
    flagRed: country.flagRed === "1",
  }));

const flagColors = rows(`
El círculo central de la bandera de Japón|Rojo|#e63946
La hoja de arce de la bandera de Canadá|Rojo|#e63946
El disco de la bandera de Bangladesh|Rojo|#e63946
La cruz nórdica de la bandera de Finlandia|Azul|#2764b8
La cruz nórdica de la bandera de Dinamarca|Blanco|#f5f7ff
La cruz nórdica de la bandera de Suecia|Amarillo|#f4c430
El cedro de la bandera del Líbano|Verde|#2e9f5b
Las estrellas de la bandera de China|Amarillo|#f4c430
El Sol de Mayo de la bandera de Argentina|Dorado|#f4c15d
El disco de la bandera de Palaos|Amarillo|#f4c430
El triángulo de la bandera de Chequia|Azul|#2056a8
La franja central de la bandera de Nigeria|Blanco|#f5f7ff
La franja central de la bandera de Francia|Blanco|#f5f7ff
La franja central de la bandera de Italia|Blanco|#f5f7ff
La franja superior de la bandera de Alemania|Negro|#151515
La franja inferior de la bandera de Alemania|Dorado|#f4c430
La franja superior de la bandera de Países Bajos|Rojo|#e63946
La franja inferior de la bandera de Rusia|Rojo|#e63946
La franja central ancha de la bandera de España|Amarillo|#f4c430
La franja central de la bandera de Austria|Blanco|#f5f7ff
El dragón de la bandera de Gales|Rojo|#e63946
La estrella de la bandera de Chile|Blanco|#f5f7ff
El disco de la bandera de Laos|Blanco|#f5f7ff
La rueda de Ashoka de la bandera de India|Azul|#2056a8
El rombo de la bandera de Brasil|Amarillo|#f4c430
El círculo de la bandera de Brasil|Azul|#2056a8
La media luna de la bandera de Turquía|Blanco|#f5f7ff
Las estrellas de la bandera de Australia|Blanco|#f5f7ff
El triángulo de la bandera de Bahamas|Negro|#151515
La franja central de la bandera de México|Blanco|#f5f7ff
`, ["prompt", "color", "hex"]);

export function buildGeographyQuestions() {
  return [
    ...mappedCards({ category: "geografia", family: "capitales", title: "¿Cuál es la capital de cada país?", type: "free_text", items: countries, count: 14, prompt: (item) => item.name, response: (item) => answer(item.capital) }),
    ...mappedCards({ category: "geografia", family: "continentes", title: "¿En qué continente o región se encuentra cada país?", type: "free_text", items: countries, count: 12, prompt: (item) => item.name, response: (item) => answer(item.continent) }),
    ...mappedCards({ category: "geografia", family: "monedas", title: "¿Cuál es la moneda oficial de cada país?", type: "free_text", items: countries, count: 12, prompt: (item) => item.name, response: (item) => answer(item.currency) }),
    ...mappedCards({ category: "geografia", family: "idiomas", title: "¿Qué idioma oficial o principal corresponde a cada país?", type: "free_text", items: countries, count: 10, prompt: (item) => item.name, response: (item) => answer(item.language) }),
    ...mappedCards({ category: "geografia", family: "fronteras", title: "¿Con cuántos estados soberanos comparte frontera terrestre cada país?", type: "number", items: countries, count: 10, prompt: (item) => item.name, response: (item) => answer(item.borders) }),
    ...mappedCards({ category: "geografia", family: "costa", title: "¿Tiene costa marítima este país?", type: "boolean", items: countries, count: 10, prompt: (item) => item.name, response: (item) => answer(item.coast, item.coast ? "Sí" : "No"), balanceBy: (item) => item.coast }),
    ...mappedCards({ category: "geografia", family: "hemisferio", title: "¿Está este país total o parcialmente en el hemisferio norte?", type: "boolean", items: countries, count: 10, prompt: (item) => item.name, response: (item) => answer(item.north, item.north ? "Sí" : "No"), balanceBy: (item) => item.north }),
    ...orderCards({ category: "geografia", family: "superficie", title: "Ordena estos países del más extenso (1) al menos extenso (12).", items: countries, count: 8, prompt: (item) => item.name, sortValue: (item) => item.area, direction: "desc" }),
    ...mappedCards({ category: "geografia", family: "bandera-rojo", title: "¿Aparece el color rojo en la bandera nacional?", type: "boolean", items: countries, count: 8, prompt: (item) => item.name, response: (item) => answer(item.flagRed, item.flagRed ? "Sí" : "No"), balanceBy: (item) => item.flagRed }),
    ...mappedCards({ category: "geografia", family: "colores-bandera", title: "¿De qué color es este elemento de la bandera?", type: "color", items: flagColors, count: 6, prompt: (item) => item.prompt, response: (item) => answer(item.color, item.color, { colorHex: item.hex }), difficulty: 2 }),
  ];
}
