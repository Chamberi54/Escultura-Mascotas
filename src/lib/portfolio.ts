export type PortfolioPiece = { title: string; image: string };

export const BROCHES: PortfolioPiece[] = [
  { title: "Broche corazón rojo", image: "/portfolio/joyeria/broche-corazon-rojo.jpg" },
  { title: "Broche corazón verde", image: "/portfolio/joyeria/broche-corazon-verde.jpg" },
  { title: "Broche perro", image: "/portfolio/joyeria/broche-perro.jpg" },
  { title: "Broche coche amarillo", image: "/portfolio/joyeria/broche-coche-amarillo.jpg" },
  { title: "Broche coche rojo", image: "/portfolio/joyeria/broche-coche-rojo.jpg" },
  { title: "Broche pez", image: "/portfolio/joyeria/broche-pez.jpg" },
];

export const PENDIENTES: PortfolioPiece[] = [
  { title: "Pendientes esmalte azul cielo", image: "/portfolio/joyeria/pendiente-esmalte-azul-cielo.jpg" },
  { title: "Pendientes esmalte azul oscuro", image: "/portfolio/joyeria/pendiente-esmalte-azul-oscuro.jpg" },
  { title: "Pendientes esmalte cuadrados azul oscuro", image: "/portfolio/joyeria/pendiente-esmalte-cuadrado-azul-oscuro.jpg" },
  { title: "Pendientes esmalte cuadrados rojo", image: "/portfolio/joyeria/pendiente-esmalte-cuadrado-rojo.jpg" },
  { title: "Pendientes esmalte naranja", image: "/portfolio/joyeria/pendiente-esmalte-naranja.jpg" },
  { title: "Pendientes esmalte rojo intenso", image: "/portfolio/joyeria/pendiente-esmalte-rojo-intenso.jpg" },
  { title: "Pendientes esmalte rojo", image: "/portfolio/joyeria/pendiente-esmalte-rojo.jpg" },
  { title: "Pendientes esmalte rosa", image: "/portfolio/joyeria/pendiente-esmalte-rosa.jpg" },
  { title: "Pendientes porcelana blanco", image: "/portfolio/joyeria/pendiente-porcelana-blanco.jpg" },
  { title: "Pendientes porcelana cuadrados turquesa", image: "/portfolio/joyeria/pendiente-porcelana-cuadrado-turquesa.jpg" },
  { title: "Pendientes porcelana cuadrados verde", image: "/portfolio/joyeria/pendiente-porcelana-cuadrado-verde.jpg" },
  { title: "Pendientes porcelana multicolor", image: "/portfolio/joyeria/pendiente-porcelana-multicolor.jpg" },
  { title: "Pendientes porcelana turquesa", image: "/portfolio/joyeria/pendiente-porcelana-turquesa.jpg" },
];

export const HOGAR: PortfolioPiece[] = [
  { title: "Tulipanes en jarrón", image: "/portfolio/hogar/tulipanes-jarron.jpg" },
  { title: "Maceta esmalte cuarteado", image: "/portfolio/hogar/maceta-cuarteada.jpg" },
  { title: "Jarrón jaspeado", image: "/portfolio/hogar/jarron-jaspeado.jpg" },
  { title: "Busto de galgo", image: "/portfolio/hogar/busto-galgo.jpg" },
  { title: "Jarrón multicolor", image: "/portfolio/hogar/jarron-multicolor.jpg" },
  { title: "Cesta de cerámica", image: "/portfolio/hogar/cesta-ceramica.jpg" },
  { title: "Set de macetas verde agua", image: "/portfolio/hogar/macetas-verde-agua.jpg" },
  { title: "Set de macetas teal", image: "/portfolio/hogar/macetas-teal.jpg" },
];

export const DECORACION: PortfolioPiece[] = [
  { title: "Salchicha bronce", image: "/portfolio/decoracion/salchicha-bronce.jpg" },
  { title: "Figura abstracta esmaltada", image: "/portfolio/decoracion/figura-abstracta.jpg" },
  { title: "Figura floral", image: "/portfolio/decoracion/figura-floral.jpg" },
  { title: "Salchicha roja", image: "/portfolio/decoracion/salchicha-roja.jpg" },
  { title: "Salchicha jaspeada", image: "/portfolio/decoracion/salchicha-jaspeada.jpg" },
  { title: "Galgo crema", image: "/portfolio/decoracion/galgo-crema.jpg" },
  { title: "Salchicha moteada", image: "/portfolio/decoracion/salchicha-moteada.jpg" },
  { title: "Galgo carbón", image: "/portfolio/decoracion/galgo-carbon.jpg" },
];

export type PortfolioCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export const CATEGORIES: PortfolioCategory[] = [
  {
    slug: "joyeria",
    title: "Joyería",
    description: "Broches y pendientes de cerámica, esmaltados a mano.",
    image: "/portfolio/joyeria/conjunto-broches.jpg",
  },
  {
    slug: "hogar",
    title: "Hogar",
    description: "Jarrones, macetas y piezas para el día a día.",
    image: "/portfolio/hogar/conjunto-hogar.jpg",
  },
  {
    slug: "decoracion",
    title: "Decoración",
    description: "Figuras y esculturas de cerámica para decorar.",
    image: "/portfolio/decoracion/conjunto-decoracion.jpg",
  },
];
