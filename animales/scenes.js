/**
 * Base de datos científica y ecológica de escenas, historias y hotspots interactivos
 * Proyecto: Dinámica de Dispersión de Semillas en las Selvas de Tabasco
 * Especies: Periquito Azteca (Eupsittula nana), Ratón de Campo (Peromyscus mexicanus teapensis) y Mono Araña (Ateles geoffroyi)
 */

// Escena Principal en Común (Menú de Selección)
const menuScene = {
  id: "menu",
  title: "Pantalla Principal: Dispersión de Semillas en las Selvas de Tabasco",
  video: "assets/videos/1 Escena en comun principal.mp4",
  audio: "assets/audio/comun.mp3",
  hotspots: [] // Navegación interactiva por selección de animal
};

// Historias individuales de cada animal con información científica basada en investigaciones de Tabasco
const storiesData = {
  perico: {
    id: "perico",
    name: "Periquito Azteca",
    scientificName: "Eupsittula nana",
    fruit: "Jobo (Spondias mombin)",
    icon: "🦜",
    scenes: [
      {
        id: 1,
        title: "Periquito Azteca - Escena 1: En la Ceiba de la Selva",
        video: "assets/videos/Perico escena 1.mp4",
        audio: "assets/audio/perico_1.mp3",
        hotspots: [
          {
            x: 48,
            y: 38,
            label: "🦜",
            boxOffset: { x: 22, y: -16 },
            title: "Periquito Pecho Sucio / Azteca",
            bullets: [
              "Nombre científico: Eupsittula nana (Familia Psittacidae).",
              "Distribución en Tabasco: Habita en la Chontalpa, Centro, Sierra y la región de los Ríos.",
              "Adaptación del pico: Pico corto, robusto y curvado, ideal para desprender pulpa y trozar frutos.",
              "Comportamiento social: Ave gregaria que forma bandadas numerosas en el dosel superior de la selva.",
              "Estado de conservación: Especie bajo Protección Especial (Pr) en la NOM-059-SEMARNAT."
            ]
          },
          {
            x: 24,
            y: 52,
            label: "🌳",
            boxOffset: { x: -6, y: 16 },
            title: "Árbol de Ceiba (Ceiba pentandra)",
            bullets: [
              "Nombre científico: Ceiba pentandra (Familia Malvaceae).",
              "Porte en Tabasco: Árbol gigante emergente que supera de 40 a 60 metros de altura.",
              "Refugio y atalaya: Sus robustas ramas horizontales sirven de percha, vigilancia y despegue para aves.",
              "Simbolismo: Árbol sagrado de la cosmovisión maya que conecta los distintos niveles del bosque tropical."
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Periquito Azteca - Escena 2: Alimentación y Dispersión del Jobo",
        video: "assets/videos/Perico escena 2.mp4",
        audio: "assets/audio/perico_2.mp3",
        hotspots: [
          {
            x: 28,
            y: 22,
            label: "🦜",
            boxOffset: { x: -10, y: 28 },
            title: "Alimentación y Sinzoocoria",
            bullets: [
              "Dieta en la selva: Frugívoro y granívoro; aprovecha intensamente los frutos carnosos estacionales.",
              "Manipulación con pico y patas: Sujeta el fruto firmemente para desgarrar la pulpa carnosa.",
              "Dispersión por caída accidental: Al comer con rapidez, desprende frutos enteros y porciones con semillas.",
              "Barocoria asistida: Facilita que las semillas caigan lejos del tronco madre hacia zonas con luz en el suelo."
            ]
          },
          {
            x: 34,
            y: 32,
            label: "🍈",
            boxOffset: { x: 44, y: 12 },
            title: "Fruto de Jobo (Spondias mombin)",
            bullets: [
              "Nombre científico: Spondias mombin (Familia Anacardiaceae).",
              "Características: Drupa carnosa amarilla al madurar, con pulpa jugosa agridulce rica en azúcares y agua.",
              "Endocarpio leñoso: Estructura dura y fibrosa que protege eficazmente las semillas del impacto de la caída.",
              "Recurso clave en Tabasco: Alimento vital para aves, monos y roedores silvestres en los bosques tabasqueños."
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Periquito Azteca - Escena 3: Germinación del Jobo en el Suelo",
        video: "assets/videos/Perico escena 3.mp4",
        audio: "assets/audio/perico_3.mp3",
        hotspots: [
          {
            x: 42,
            y: 68,
            label: "🌰",
            boxOffset: { x: -20, y: -16 },
            title: "Semilla de Jobo en la Hojarasca",
            bullets: [
              "Llegada al suelo: Semilla transportada y depositada tras desprenderse durante el forrajeo del cotorro.",
              "Protección seminal: El endocarpio fibroso protegió al embrión vegetal durante la caída desde el dosel.",
              "Activación: Las lluvias tropicales de Tabasco y la materia orgánica ablandan la cubierta protectora."
            ]
          },
          {
            x: 48,
            y: 50,
            label: "🌱",
            boxOffset: { x: 26, y: -18 },
            title: "Brote y Regeneración Forestal",
            bullets: [
              "Sin competencia materna: Al germinar lejos de la sombra del árbol original, recibe luz solar directa.",
              "Enraizamiento: Emerge una radícula que se ancla al sustrato y despliega las primeras hojas fotosintéticas.",
              "Regeneración en Tabasco: Gracias a la dispersión de las aves, se renueva y conserva la biodiversidad del bosque."
            ]
          }
        ]
      }
    ]
  },

  raton: {
    id: "raton",
    name: "Ratón de Campo",
    scientificName: "Peromyscus mexicanus teapensis",
    fruit: "Guayaba (Psidium guajava)",
    icon: "🐭",
    scenes: [
      {
        id: 1,
        title: "Ratón de Campo - Escena 1: Forrajeo de la Guayaba en la Sierra",
        video: "assets/videos/Raton escena 1.mp4",
        audio: "assets/audio/raton_1.mp3",
        hotspots: [
          {
            x: 36,
            y: 54,
            label: "🐭",
            boxOffset: { x: -16, y: -16 },
            title: "Ratón de Campo de Teapa",
            bullets: [
              "Nombre científico: Peromyscus mexicanus teapensis (Familia Cricetidae; afín a P. totontepecus).",
              "Localidad tipo en Tabasco: Descrito originalmente en Teapa y presente en la región de la Sierra tabasqueña.",
              "Hábitos nocturnos: Posee grandes ojos oscuros, orejas desarrolladas y bigotes para detectar alimento en penumbra.",
              "Alimentación omnívora comprobada: Estudios microscópicos confirman consumo de pulpa de frutos (66%), semillas e insectos.",
              "Comportamiento de transporte: Roedor que corta trozos de fruta para trasladarlos y almacenarlos en su madriguera."
            ]
          },
          {
            x: 74,
            y: 70,
            label: "🍈",
            boxOffset: { x: 4, y: -22 },
            title: "Fruto: Guayaba (Psidium guajava)",
            bullets: [
              "Nombre científico: Psidium guajava (Familia Myrtaceae).",
              "Aroma atrayente: Baya carnosa y aromática que al caer al suelo atrae a pequeños mamíferos terrestres.",
              "Semillas duras: Contiene múltiples semillas de cubierta resistente que sobreviven a la manipulación del roedor.",
              "Dispersión secundaria: Los trozos dejados por el ratón en el suelo inician el proceso de propagación vegetal."
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Ratón de Campo - Escena 2: Crecimiento y Brote de Plantas",
        video: "assets/videos/Raton escena 2.mp4",
        audio: "assets/audio/raton_2.mp3",
        hotspots: [
          {
            x: 30,
            y: 48,
            label: "🌱",
            boxOffset: { x: -14, y: -20 },
            title: "Plántulas en la Madriguera",
            bullets: [
              "Almacenamiento de semillas: Semillas transportadas por el ratón hacia la entrada y cámaras de su refugio.",
              "Microambiente fértil: La tierra removida por la excavación y la humedad de la madriguera facilitan la germinación.",
              "Colonización agrupada: Se forman brotes juveniles de guayabo en el entorno protegido de la madriguera."
            ]
          },
          {
            x: 68,
            y: 66,
            label: "🍈🌱",
            boxOffset: { x: 8, y: -22 },
            title: "Crecimiento desde el Fruto Caído",
            bullets: [
              "Brote sobre pulpa: Planta nacida directamente del fragmento de guayaba abandonado en el sendero.",
              "Abono orgánico natural: La pulpa en descomposición retiene agua y nutre directamente las primeras raíces.",
              "Regeneración en Tabasco: La dispersión terrestre por roedores mantiene la regeneración de frutales en la sierra."
            ]
          }
        ]
      }
    ]
  },

  mono: {
    id: "mono",
    name: "Mono Araña",
    scientificName: "Ateles geoffroyi",
    fruit: "Cacao (Theobroma cacao)",
    icon: "🐒",
    scenes: [
      {
        id: 1,
        title: "Mono Araña - Escena 1: Forrajeo de la Mazorca de Cacao",
        video: "assets/videos/Mono escena 1.mp4",
        audio: "assets/audio/mono_1.mp3",
        hotspots: [
          {
            x: 48,
            y: 38,
            label: "🐒",
            boxOffset: { x: -20, y: -16 },
            title: "Mono Araña (Ateles geoffroyi)",
            bullets: [
              "Nombre científico: Ateles geoffroyi (Familia Atelidae; subespecie A. g. vellerosus en Tabasco).",
              "Presencia en Tabasco: Protegido en Pantanos de Centla, Parque Estatal de la Sierra, Tenosique y Balancán.",
              "Adaptación física: Brazos largos, manos prensiles sin pulgar y cola prensil con piel sensitiva para braquiación.",
              "Dieta frugívora comprobada: Estudios mesoamericanos revelan que más del 80% de su alimentación son frutos maduros.",
              "Capacidad motriz: Recorre grandes distancias diarias entre el dosel en busca de árboles con mazorcas maduras."
            ]
          },
          {
            x: 68,
            y: 50,
            label: "🍫",
            boxOffset: { x: 18, y: -22 },
            title: "Mazorca de Cacao (Theobroma cacao)",
            bullets: [
              "Nombre científico: Theobroma cacao (Familia Malvaceae).",
              "Estructura del fruto: Baya elipsoidal dura que resguarda entre 30 y 50 semillas.",
              "Mucílago blanco atrayente: Pulpa gelatinosa dulce y jugosa que cubre las semillas, alimento favorito del mono.",
              "Cosecha arborícola: Los monos son de los pocos mamíferos capaces de abrir la corteza coriácea del cacao silvestre."
            ]
          },
          {
            x: 78,
            y: 68,
            label: "🌳",
            boxOffset: { x: -60, y: 2 },
            title: "Árbol de Cacao en el Sotobosque",
            bullets: [
              "Hábitat en Tabasco: Crece en el estrato bajo y sotobosque de las selvas húmedas tabasqueñas.",
              "Caulifloria botánica: Sus flores y mazorcas nacen directamente pegadas a la corteza del tronco y ramas leñosas.",
              "Dependencia ecológica: Depende de primates y mamíferos para liberar sus semillas y dispersarlas por la selva."
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Mono Araña - Escena 2: Dispersión Múltiple en el Dosel",
        video: "assets/videos/Mono escena 2.mp4",
        audio: "assets/audio/mono_2.mp3",
        hotspots: [
          {
            x: 36,
            y: 26,
            label: "🐒",
            boxOffset: { x: 25, y: 4 },
            title: "Dispersión Múltiple por el Primate",
            bullets: [
              "1. Escupido de semillas: Saborea el mucílago y escupe las semillas grandes intactas desde la copa.",
              "2. Caída por manipulación: Al quebrar la mazorca, deja caer porciones con semillas al suelo selvático.",
              "3. Endozoocoria: Traga semillas enteras que atraviesan su tracto digestivo y son defecadas sin dañarse.",
              "Largo alcance: Investigaciones científicas demuestran dispersión media de 682 metros (hasta 1,741 metros en selva)."
            ]
          },
          {
            x: 38,
            y: 38,
            label: "🌰",
            boxOffset: { x: -18, y: 26 },
            title: "Semillas y Tránsito Digestivo",
            bullets: [
              "Escarificación natural: El tránsito intestinal limpia el mucílago e inicia la activación metabólica de la semilla.",
              "Escape a patógenos: Al ser llevadas lejos del árbol progenitor, las semillas escapan de hongos y depredadores de la copa.",
              "Abono nutritivo: Las heces del mono proporcionan nitrógeno, fósforo y humedad que enriquecen el sustrato del suelo."
            ]
          },
          {
            x: 75,
            y: 45,
            label: "🌳",
            boxOffset: { x: 10, y: 6 },
            title: "Jardinero de la Selva Tabasqueña",
            bullets: [
              "Regeneración natural: Conecta fragmentos de bosque y conserva la diversidad de árboles en el sureste mexicano.",
              "Impacto de su ausencia: Sin primates frugívoros, las mazorcas se pudrirían sin dispersarse bajo el tronco materno.",
              "Conservación prioritaria: Su protección en Tabasco beneficia el equilibrio de toda la cadena biológica tropical."
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Mono Araña - Escena 3: Germinación y Crecimiento del Cacao",
        video: "assets/videos/Mono escena 3.mp4",
        audio: "assets/audio/mono_3.mp3",
        hotspots: [
          {
            x: 20,
            y: 74,
            label: "🌰",
            boxOffset: { x: 0, y: -36 },
            title: "Semillas Dispersadas en el Suelo",
            bullets: [
              "Tres vías de llegada: Semillas caídas por manipulación, semillas escupidas limpias y semillas expulsadas en heces.",
              "Viabilidad acelerada: Libres de la cáscara y del mucílago inhibidor, las semillas absorben humedad rápidamente.",
              "Suelo enriquecido: La hojarasca descompuesta y los nutrientes del estiércol actúan como fertilizante natural."
            ]
          },
          {
            x: 48,
            y: 72,
            label: "🌱",
            boxOffset: { x: 30, y: -40 },
            title: "Brote y Plántula de Cacao",
            bullets: [
              "Germinación vigorosa: En pocos días emerge la radícula que se ancla al sustrato y el tallo se yergue hacia la luz.",
              "Desarrollo juvenil: Se despliegan hojas tiernas con pigmentos protectores adaptadas al sotobosque sombreado.",
              "Ciclo ecológico completo: Así culmina la dispersión del mono araña, asegurando la continuidad de la selva tabasqueña."
            ]
          }
        ]
      }
    ]
  }
};
