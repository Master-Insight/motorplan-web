const config = {
  // Gama de colores
  colors: [
    // https://paletton.com/#uid=43p0u0kmaGWbLTAhwNgqFAFwxuh
    { // 0 - Color complementary
      lighter: '#57B7A7',
      light: '#329D8B',
      DEFAULT: '#17947F',
      dark: '#087966',
      darker: '#006050',
    },
    { // 1 - Color principal
      lighter: '#FFAF79',
      light: '#F8934F',
      DEFAULT: '#EA7424',
      dark: '#BF550D',
      darker: '#973D00',
    },
    { // 2 - Color secondary
      lighter: '#40728D',
      light: '#255D7A',
      DEFAULT: '#144864',
      dark: '#05344D',
      darker: '#022132',
    },
    { // 3 -Color tertiary
      lighter: '#707070',
      light: '#515152',
      DEFAULT: '#323232',
      dark: '#080808',
      darker: '#020202',
    },
  ],
  // Colroes fijos
  simpleColors: {
    white: '#ffffff',      // Blanco
    black: '#111111',       // Negro
  },
  // gradient: {},
  // Información de la empresa (se autocompleta en footer y enlace redes sociales)
  empresa: {
    name: "Motorplan",
    descripcion: "Consultora integral de negocios que brinda asesoramiento a empresas, empresarios y emprendedores con la visión y el deseo de impulsar el crecimiento de sus negocios.",
    direccion: "Av. Emilio Olmos 123 - Piso 1 - CP: 5000 - Córdoba Capital",
    email: "consultas@motorplanargentina.com",
    whatsapp: "351-4733144",
  },
  social: [
    {
      name: "Email",
      href: "mailto:consultas@motorplanargentina.com",

    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/PlanX5/",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/plan.x5/",
    },
    // {
    //   name: "YouTube",
    //   href: "https://www.youtube.com/channel/UCV4sFnwo1RnMLCIT8xPZ7Yg",
    // },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
    },
  ],
  // Imagenes. se clasifica segun la pagina 
  images: {
    logo: [
      "/images/identidad/Logo-Motorplan-Blanco-1.png",   // 0- Logo horizontal       PNG
      "/images/identidad/Logo-Motorplan-Naranja-1.png",  // 1- Logo horizontal       PNG
      "/images/identidad/Logo-Motorplan-Negro-1.png",    // 2- Logo horizontal       PNG
      "/images/identidad/Logotipo-Cuad.png",             // 3- Logo horizontal       PNG
      "/images/identidad/Logo-Motorplan-alternativo-1.png", // 4- Logo horizontal    PNG
    ],
    index: [
      "/images/hero_inicio.jpeg", // pos 0 Hero
    ],
    about: [
      "/images/Diego-presentando.jpg", // pos 0 Hero
      "/images/Escuchando.jpg", // pos 1 fondo historia
      "/images/Exponiendo2.jpg", // pos 2 historia
    ],
    services: [
      "/images/capacitacion.jpeg", // pos 0 Hero
    ],
    contact: [
      "/images/Conversacion.jpeg", // pos 0 Hero
    ],
  },
  mediosPago: [
    {
      nombre: "Mercado Pago",
      detalles: [
        "CVU: 0000003100023016967228",
        "Alias: MOTORPLAN.mp",
        "Cuit: 30-71632502-0",
      ],
    },
    {
      nombre: "BANCO ICBC",
      detalles: [
        "CBU: 0150545002000108363049",
        "CUIT: 30-71632502-0",
        "CTA: 0545/02108363/04",
      ],
    },
    {
      nombre: "BANCO PROVINCIA DE NEUQUEN",
      detalles: [
        "CBU: 0970026010008205970017",
        "CUIT: 30-71632502-0",
        "CTA: 26/820597/1",
      ],
    },
  ],
  // Objeto que detalle servicios prestados
  servicios: "Markdown",
  // Equipo
  team: "Markdown",
  // blog
  blog: "Markdown",
}

// Coniguracion de extensión de Tailwind
export const tailwindExtend = {
  // fontFamily: {},
  colors: {
    primary: config.colors[1],
    secondary: config.colors[2],
    tertiary: config.colors[3],
    complementary: config.colors[0],
    white: config.simpleColors.white,
    black: config.simpleColors.black,
  },
  boxShadow: {
    // Resplandor
    'glow': '0 0 15px rgba(0, 0, 0, 0.7)',
    // Sombra abajo a la derecha
    'bottom': '4px 4px 10px rgba(0, 0, 0, 0.3)',
    // Sombra combinada (abajo a la derecha negra y arriba a la izquierda blanca)
    'double': '4px 4px 8px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.5)',
  },
  height: {
    "104": "26rem",
    "112": "28rem",
    "120": "30rem",
    "128": "32rem",
    "136": "34rem",
    "144": "36rem",
  }
}

export default config
/*
export const tailwindSizes = {
  sm: 'w-16 h-16',      // Small (64px)
  md: 'w-32 h-32',      // Medium (128px)
  lg: 'w-48 h-48',      // Large (192px)
  xl: 'w-64 h-64',      // Extra Large (256px)
  '2xl': 'w-80 h-80',   // 2X Large (320px)
  '3xl': 'w-96 h-96',   // 3X Large (384px)
  full: 'w-full h-full', // Full Size (100%)
};
*/