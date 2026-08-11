import { answer, century, mappedCards, orderCards, rows } from "./builders.mjs";

const elements = rows(`
Hidrógeno|H|1|0
Helio|He|2|0
Litio|Li|3|1
Berilio|Be|4|1
Boro|B|5|0
Carbono|C|6|0
Nitrógeno|N|7|0
Oxígeno|O|8|0
Flúor|F|9|0
Neón|Ne|10|0
Sodio|Na|11|1
Magnesio|Mg|12|1
Aluminio|Al|13|1
Silicio|Si|14|0
Fósforo|P|15|0
Azufre|S|16|0
Cloro|Cl|17|0
Argón|Ar|18|0
Potasio|K|19|1
Calcio|Ca|20|1
Escandio|Sc|21|1
Titanio|Ti|22|1
Vanadio|V|23|1
Cromo|Cr|24|1
Manganeso|Mn|25|1
Hierro|Fe|26|1
Cobalto|Co|27|1
Níquel|Ni|28|1
Cobre|Cu|29|1
Zinc|Zn|30|1
Galio|Ga|31|1
Germanio|Ge|32|0
Arsénico|As|33|0
Selenio|Se|34|0
Bromo|Br|35|0
Kriptón|Kr|36|0
Plata|Ag|47|1
Estaño|Sn|50|1
Yodo|I|53|0
Oro|Au|79|1
Mercurio|Hg|80|1
Plomo|Pb|82|1
Uranio|U|92|1
`, ["element", "symbol", "atomicNumber", "metal"])
  .map((item) => ({ ...item, atomicNumber: Number(item.atomicNumber), metal: item.metal === "1" }));

const siUnits = rows(`
Longitud|metro|m
Masa|kilogramo|kg
Tiempo|segundo|s
Corriente eléctrica|amperio|A
Temperatura termodinámica|kelvin|K
Cantidad de sustancia|mol|mol
Intensidad luminosa|candela|cd
Frecuencia|hercio|Hz
Fuerza|newton|N
Presión|pascal|Pa
Energía|julio|J
Potencia|vatio|W
Carga eléctrica|culombio|C
Diferencia de potencial eléctrico|voltio|V
Capacitancia|faradio|F
Resistencia eléctrica|ohmio|Ω
Conductancia eléctrica|siemens|S
Flujo magnético|weber|Wb
Densidad de flujo magnético|tesla|T
Inductancia|henrio|H
Flujo luminoso|lumen|lm
Iluminancia|lux|lx
Actividad radiactiva|becquerel|Bq
Dosis absorbida|gray|Gy
Dosis equivalente|sievert|Sv
Actividad catalítica|katal|kat
`, ["quantity", "unit", "symbol"]);

const celestialObjects = rows(`
Mercurio|Planeta|1
Venus|Planeta|1
Tierra|Planeta|1
Marte|Planeta|1
Júpiter|Planeta|1
Saturno|Planeta|1
Urano|Planeta|1
Neptuno|Planeta|1
Ceres|Planeta enano|1
Plutón|Planeta enano|1
Eris|Planeta enano|1
Haumea|Planeta enano|1
Makemake|Planeta enano|1
Luna|Satélite natural|1
Ío|Satélite natural|1
Europa|Satélite natural|1
Ganímedes|Satélite natural|1
Calisto|Satélite natural|1
Titán|Satélite natural|1
Encélado|Satélite natural|1
Tritón|Satélite natural|1
Sol|Estrella|1
Cometa Halley|Cometa|1
Proxima Centauri|Estrella|0
Sirio|Estrella|0
Betelgeuse|Estrella|0
Polaris|Estrella|0
Andrómeda|Galaxia espiral|0
Galaxia del Triángulo|Galaxia espiral|0
Gran Nube de Magallanes|Galaxia irregular|0
Nebulosa de Orión|Nebulosa|0
Nebulosa del Cangrejo|Remanente de supernova|0
Pléyades|Cúmulo estelar abierto|0
Híades|Cúmulo estelar abierto|0
Omega Centauri|Cúmulo globular|0
Sagitario A*|Agujero negro supermasivo|0
`, ["object", "kind", "solarSystem"])
  .map((item) => ({ ...item, solarSystem: item.solarSystem === "1" }));

const organisms = rows(`
Elefante africano|Mamífero|1
Ornitorrinco|Mamífero|1
Murciélago|Mamífero|1
Ballena azul|Mamífero|1
Canguro rojo|Mamífero|1
Pingüino emperador|Ave|1
Avestruz|Ave|1
Águila real|Ave|1
Colibrí|Ave|1
Dragón de Komodo|Reptil|1
Cocodrilo del Nilo|Reptil|1
Tortuga de Galápagos|Reptil|1
Pitón reticulada|Reptil|1
Ajolote|Anfibio|1
Rana dardo venenosa|Anfibio|1
Salamandra común|Anfibio|1
Tritón crestado|Anfibio|1
Tiburón blanco|Pez cartilaginoso|1
Manta gigante|Pez cartilaginoso|1
Tiburón martillo|Pez cartilaginoso|1
Atún rojo|Pez óseo|1
Pez payaso|Pez óseo|1
Caballito de mar|Pez óseo|1
Pulpo común|Molusco|0
Calamar gigante|Molusco|0
Nautilo|Molusco|0
Abeja melífera|Artrópodo|0
Araña de jardín|Artrópodo|0
Cangrejo azul|Artrópodo|0
Mariposa monarca|Artrópodo|0
Ciempiés|Artrópodo|0
Lombriz de tierra|Anélido|0
Sanguijuela medicinal|Anélido|0
Medusa luna|Cnidario|0
Coral cerebro|Cnidario|0
Estrella de mar|Equinodermo|0
Pepino de mar|Equinodermo|0
Erizo de mar|Equinodermo|0
Tenia|Platelminto|0
Esponja de mar|Porífero|0
`, ["organism", "group", "vertebrate"])
  .map((item) => ({ ...item, vertebrate: item.vertebrate === "1" }));

const scientificMilestones = rows(`
Publicación de De revolutionibus de Copérnico|1543
Primeras observaciones telescópicas publicadas por Galileo|1610
Publicación de los Principia de Newton|1687
Primera edición de Systema Naturae de Linneo|1735
Publicación del tratado químico elemental de Lavoisier|1789
Presentación de la pila de Volta|1800
Descubrimiento de la relación entre electricidad y magnetismo por Ørsted|1820
Descubrimiento de la inducción electromagnética por Faraday|1831
Publicación de El origen de las especies|1859
Presentación de la tabla periódica de Mendeléyev|1869
Descubrimiento de los rayos X por Röntgen|1895
Descubrimiento de la radiactividad por Becquerel|1896
Identificación del electrón por J. J. Thomson|1897
Publicación de la relatividad especial de Einstein|1905
Descubrimiento del núcleo atómico por Rutherford|1911
Presentación de la deriva continental por Wegener|1912
Confirmación de galaxias más allá de la Vía Láctea por Hubble|1924
Descubrimiento de la penicilina por Fleming|1928
Descubrimiento del neutrón por Chadwick|1932
Descubrimiento experimental de la fisión nuclear|1938
Publicación del modelo de doble hélice del ADN|1953
Lanzamiento del Sputnik 1|1957
Construcción del primer láser operativo|1960
Descubrimiento de la radiación cósmica de fondo|1965
Primera llegada humana a la Luna|1969
Primeras moléculas de ADN recombinante|1973
Invención de la reacción en cadena de la polimerasa|1983
Lanzamiento del telescopio espacial Hubble|1990
Descubrimiento de un exoplaneta alrededor de una estrella similar al Sol|1995
Finalización declarada del Proyecto Genoma Humano|2003
Descubrimiento del bosón de Higgs en el CERN|2012
Primera detección directa de ondas gravitacionales|2015
Primera imagen de la sombra de un agujero negro|2019
Publicación de las primeras imágenes científicas del telescopio James Webb|2022
`, ["milestone", "year"]).map((item) => ({ ...item, year: Number(item.year) }));

const scienceColors = rows(`
Azufre elemental sólido|Amarillo|#f4c430
Cobre metálico limpio|Cobrizo|#b87333
Oro metálico|Dorado|#d4af37
Plata metálica|Plateado|#c0c0c0
Gas cloro|Amarillo verdoso|#b7c94b
Bromo líquido|Pardo rojizo|#8b2f24
Vapor de yodo|Violeta|#7f3f98
Cristales de sulfato de cobre pentahidratado|Azul|#2774c7
Disolución concentrada de permanganato de potasio|Morado|#6f2c91
Papel tornasol en medio ácido|Rojo|#d83a3a
Papel tornasol en medio básico|Azul|#2764b8
Fenolftaleína en medio básico|Rosa|#ec6fa8
Naranja de metilo en medio ácido|Rojo|#e63946
Indicador universal en pH neutro|Verde|#2e9f5b
Clorofila|Verde|#2e9f5b
Sangre humana oxigenada|Rojo|#b51f2e
Superficie aparente de Marte|Rojo|#c1440e
Aspecto visible de Neptuno|Azul|#3155a6
Llama producida por sodio|Amarillo|#ffd23f
Llama producida por potasio|Lila|#b38bd4
Llama producida por sales de cobre|Azul verdoso|#28a9a1
Llama producida por litio|Carmesí|#c41e3a
Oxígeno líquido|Azul pálido|#9ccff4
Malaquita|Verde|#2e8b57
Azurita|Azul|#2457a6
Amatista|Violeta|#8f63b8
`, ["prompt", "color", "hex"]);

export function buildScienceQuestions() {
  return [
    ...mappedCards({ category: "ciencia", family: "simbolos-elementos", title: "¿Cuál es el símbolo químico de cada elemento?", type: "free_text", items: elements, count: 12, prompt: (item) => item.element, response: (item) => answer(item.symbol) }),
    ...mappedCards({ category: "ciencia", family: "numeros-atomicos", title: "¿Cuál es el número atómico de cada elemento?", type: "number", items: elements, count: 10, prompt: (item) => item.element, response: (item) => answer(item.atomicNumber), difficulty: 3 }),
    ...mappedCards({ category: "ciencia", family: "elementos-metalicos", title: "¿Se clasifica este elemento como metal?", type: "boolean", items: elements, count: 8, prompt: (item) => item.element, response: (item) => answer(item.metal, item.metal ? "Sí" : "No"), balanceBy: (item) => item.metal }),
    ...orderCards({ category: "ciencia", family: "orden-periodico", title: "Ordena estos elementos por número atómico, del menor (1) al mayor (12).", items: elements, count: 8, prompt: (item) => item.element, sortValue: (item) => item.atomicNumber }),
    ...mappedCards({ category: "ciencia", family: "unidades-si", title: "¿Cuál es la unidad del Sistema Internacional para cada magnitud?", type: "free_text", items: siUnits, count: 10, prompt: (item) => item.quantity, response: (item) => answer(item.unit), difficulty: 2 }),
    ...mappedCards({ category: "ciencia", family: "simbolos-si", title: "¿Cuál es el símbolo de cada unidad del Sistema Internacional?", type: "free_text", items: siUnits, count: 6, prompt: (item) => item.unit, response: (item) => answer(item.symbol), difficulty: 3 }),
    ...mappedCards({ category: "ciencia", family: "tipos-astronomicos", title: "¿Qué tipo de objeto astronómico es cada uno?", type: "free_text", items: celestialObjects, count: 10, prompt: (item) => item.object, response: (item) => answer(item.kind), difficulty: 2 }),
    ...mappedCards({ category: "ciencia", family: "sistema-solar", title: "¿Pertenece este objeto al Sistema Solar?", type: "boolean", items: celestialObjects, count: 8, prompt: (item) => item.object, response: (item) => answer(item.solarSystem, item.solarSystem ? "Sí" : "No"), balanceBy: (item) => item.solarSystem }),
    ...mappedCards({ category: "ciencia", family: "grupos-animales", title: "¿A qué gran grupo zoológico pertenece cada organismo?", type: "free_text", items: organisms, count: 10, prompt: (item) => item.organism, response: (item) => answer(item.group), difficulty: 2 }),
    ...mappedCards({ category: "ciencia", family: "vertebrados", title: "¿Es vertebrado este animal?", type: "boolean", items: organisms, count: 8, prompt: (item) => item.organism, response: (item) => answer(item.vertebrate, item.vertebrate ? "Sí" : "No"), balanceBy: (item) => item.vertebrate }),
    ...mappedCards({ category: "ciencia", family: "hitos-cientificos", title: "¿En qué siglo ocurrió cada hito científico?", type: "period", items: scientificMilestones, count: 6, prompt: (item) => item.milestone, response: (item) => answer(century(item.year)), difficulty: 3 }),
    ...mappedCards({ category: "ciencia", family: "colores-cientificos", title: "¿Qué color caracteriza cada sustancia, indicador u objeto?", type: "color", items: scienceColors, count: 4, prompt: (item) => item.prompt, response: (item) => answer(item.color, item.color, { colorHex: item.hex }), difficulty: 2 }),
  ];
}
