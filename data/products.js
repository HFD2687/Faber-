/* ==========================================================
   FABER — CONTENIDO DEL SITIO
   Para agregar una materia o un producto, editá solo este archivo
   (y copiá los archivos nuevos dentro de /assets). Ver README.md
   ========================================================== */
window.FABER_DATA = {
  brand: {
    name: "FABER",
    logo: "assets/brand/faber-logo.png",
    emblem: "assets/brand/faber-emblema.png",
    tagline: "Marca de diseño industrial. Desarrollo de productos, materiales y procesos de fabricación."
  },

  subjects: [
    {
      id: "dp2",
      code: "DP2",
      title: "Diseño de Productos 2",
      intro: "Proyecto desarrollado en la materia Diseño de Productos 2: el Banco Matero.",
      credits: "Fernandez Delpech Horacio Felipe · Badgen Martin · Segundo cuatrimestre 2026",
      tile: "assets/tiles/banco-matero.webp",
      tileStyle: "cutout",
      products: ["banco-matero"],
      documents: [
        { label: "Láminas del Banco Matero (PDF)", href: "assets/documents/banco-matero-laminas.pdf" }
      ]
    },
    {
      id: "mp1",
      code: "MP1",
      title: "Materiales y Procesos 1",
      intro: "Tres productos desarrollados en Materiales y Procesos 1: Portamaní, Pava y Portavelas. Cada uno cuenta con su modelo 3D, planos y lámina de presentación.",
      credits: "Fernandez Delpech Horacio Felipe · Sofia Sabatini · Segundo cuatrimestre 2026",
      tile: "assets/tiles/portamani.jpg",
      tileStyle: "photo",
      products: ["portamani", "pava", "portavelas"],
      documents: [
        { label: "Láminas de Materiales y Procesos 1 (PDF)", href: "assets/documents/materiales-y-procesos-1-laminas.pdf" }
      ]
    }
  ],

  products: {
    "banco-matero": {
      subject: "dp2",
      name: "Banco Matero",
      kicker: "Diseño de Productos 2",
      intro: "El banco cuenta con un cuerpo hexagonal de chapa plegada con base soldada. Su interior se divide en tres espacios de guardado mediante una división central hexagonal y dos separadores laterales en forma de T.",
      listTitle: "Espacios de guardado",
      list: [
        ["Mate", "espacio destinado al mate."],
        ["Yerbera", "compartimento para guardar la yerba."],
        ["Termo", "espacio para guardar el termo."]
      ],
      tile: "assets/tiles/banco-matero.webp",
      tileStyle: "cutout",
      model: {
        glb: "assets/models/dp2/banco-matero.glb",
        usdz: "assets/models/dp2/banco-matero.usdz",
        orbit: "35deg 70deg auto"
      },
      plans: [
        { src: "assets/boards/dp2/banco-matero-plano.jpg", title: "Planos del Banco Matero", caption: "Lámina de planos (página 2 del PDF)" }
      ],
      boards: [
        { src: "assets/boards/dp2/banco-matero-lamina.jpg", title: "Lámina de presentación", caption: "Página 1 del PDF" },
        { src: "assets/boards/dp2/banco-matero-plano.jpg", title: "Planos", caption: "Página 2 del PDF" }
      ],
      downloads: [
        { label: "Láminas y planos del Banco Matero (PDF original)", href: "assets/documents/banco-matero-laminas.pdf" }
      ],
      credits: "Fernandez Delpech Horacio Felipe · Badgen Martin · Segundo cuatrimestre 2026"
    },

    "portamani": {
      subject: "mp1",
      name: "Portamaní",
      kicker: "Materiales y Procesos 1",
      intro: "Producto de chapa metálica elaborado mediante corte y plegado de chapa. Las láminas documentan la secuencia de plegado que lo conforma.",
      listTitle: "Secuencia de plegado",
      list: [
        ["Pliegue central", "conformado del ángulo principal mediante dos pliegues consecutivos en sentidos opuestos."],
        ["Plegado de paredes", "elevación a 90° de las paredes laterales de la superficie inferior."],
        ["Cierre lateral", "plegado hacia el interior de las pestañas para cerrar y rigidizar la estructura."],
        ["Repetición del plegado", "aplicación del mismo procedimiento en las paredes y pestañas del sector inclinado."]
      ],
      tile: "assets/tiles/portamani.jpg",
      tileStyle: "photo",
      model: {
        glb: "assets/models/mp1/portamani.glb",
        usdz: "assets/models/mp1/portamani.usdz",
        orbit: "35deg 65deg auto"
      },
      plans: [
        { src: "assets/plans/mp1/portamani-desplegado.jpg", title: "Plano desplegado", caption: "Chapa desplegada" },
        { src: "assets/plans/mp1/portamani-plegado.jpg", title: "Plano plegado", caption: "Producto plegado" }
      ],
      boards: [
        { src: "assets/boards/mp1/portamani-lamina.jpg", title: "Lámina del Portamaní", caption: "Página 1 del PDF de MP1" }
      ],
      downloads: [
        { label: "Láminas de Materiales y Procesos 1 (PDF original)", href: "assets/documents/materiales-y-procesos-1-laminas.pdf" }
      ],
      credits: "Fernandez Delpech Horacio Felipe · Sofia Sabatini · Segundo cuatrimestre 2026"
    },

    "pava": {
      subject: "mp1",
      name: "Pava",
      kicker: "Materiales y Procesos 1",
      intro: "Las láminas detallan los procesos de fabricación de la Pava y de cada una de sus partes: cuerpo, tapa, base, pomo, asa y pico.",
      listTitle: "Procesos varios",
      list: [
        ["Embutido profundo (Cuerpo)", "deformación en frío de chapa AISI 304 mediante matriz y punzón en prensa hidráulica. Pestañado superior para el asiento de la tapa."],
        ["Estampado (Tapa y Base)", "conformado en matriz para tapa AISI 304 y base difusora AISI 430. Punzonado del orificio central en la tapa."],
        ["Moldeo por compresión (Pomo y Asa)", "prensado térmico de resina de Baquelita en molde calefaccionado. Alta resistencia térmica e inalterabilidad de forma."],
        ["Soldadura a tope sobre bordes derechos (Pico al Cuerpo)", "unión recta sin bisel (a tope en escuadra) entre el extremo del tubo y la pared del cuerpo."],
        ["Soldadura a tope sobre bordes derechos (Base al Cuerpo)", "unión plana perimetral sin preparación de bordes entre la chapa de la base y el cuerpo."],
        ["Remachado en frío (Asa al Cuerpo)", "fijación permanente mediante 2 remaches macizos de AISI 304 (3 mm). Deformación plástica de la cabeza en prensa."],
        ["Unión roscada (Pomo a Tapa)", "fijación con tornillo AISI 304 (M4) atravesando la chapa de la tapa hacia el orificio ciego del pomo."]
      ],
      tile: "assets/tiles/pava.webp",
      tileStyle: "cutout",
      model: {
        glb: "assets/models/mp1/pava.glb",
        usdz: "assets/models/mp1/pava.usdz",
        orbit: "35deg 65deg auto"
      },
      plans: [
        { src: "assets/plans/mp1/pava-planos.jpg", title: "Planos de la Pava", caption: "Imagen original de los planos" }
      ],
      boards: [
        { src: "assets/boards/mp1/pava-lamina.jpg", title: "Lámina de la Pava", caption: "Página 2 del PDF de MP1" }
      ],
      downloads: [
        { label: "Láminas de Materiales y Procesos 1 (PDF original)", href: "assets/documents/materiales-y-procesos-1-laminas.pdf" }
      ],
      credits: "Fernandez Delpech Horacio Felipe · Sofia Sabatini · Segundo cuatrimestre 2026"
    },

    "portavelas": {
      subject: "mp1",
      name: "Portavelas",
      kicker: "Materiales y Procesos 1",
      intro: "La propuesta busca resolver en una única pieza el soporte de dos velas, manteniendo una geometría compacta y estable. La forma integra ambos alojamientos dentro de un mismo cuerpo, priorizando la continuidad y la simplicidad.",
      listTitle: "Material y fabricación",
      list: [
        ["Material", "Aluminio"],
        ["Proceso", "Fundición de aluminio"],
        ["Cantidad de velas", "2"],
        ["Diámetro de vela", "Ø 3,5 cm"],
        ["Peso de la pieza", "0,6 lb ≈ 0,272 kg"]
      ],
      listStyle: "table",
      list2Title: "Costos",
      list2: [
        ["Impresión 3D del modelo", "$8.000 ARS"],
        ["Presupuesto de material", "27 USD/kg × 0,272 kg = 7,35 USD"],
        ["Costo final de la pieza", "$35.500 ARS"]
      ],
      tile: "assets/tiles/portavelas.webp",
      tileStyle: "cutout",
      model: {
        glb: "assets/models/mp1/portavelas.glb",
        usdz: "assets/models/mp1/portavelas.usdz",
        orbit: "0deg 60deg auto"
      },
      plans: [
        { src: "assets/plans/mp1/portavelas-plano.jpg", title: "Plano del Portavelas", caption: "Imagen original del plano" }
      ],
      boards: [
        { src: "assets/boards/mp1/portavelas-lamina.jpg", title: "Lámina del Portavelas", caption: "Página 3 del PDF de MP1" }
      ],
      downloads: [
        { label: "Láminas de Materiales y Procesos 1 (PDF original)", href: "assets/documents/materiales-y-procesos-1-laminas.pdf" }
      ],
      credits: "Fernandez Delpech Horacio Felipe · Sofia Sabatini · Segundo cuatrimestre 2026"
    }
  }
};
