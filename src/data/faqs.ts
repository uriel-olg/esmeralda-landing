import { paymentMethods } from './paymentMethods';
import { storeLocation } from './storeLocation';

export interface FrequentlyAskedQuestion {
  id: string;
  question: string;
  answer: string;
}

export const frequentlyAskedQuestions: FrequentlyAskedQuestion[] = [
  {
    id: 'primer-mate',
    question: '¿Cómo elijo mi primer mate?',
    answer: 'Pensá en cómo lo vas a usar. La calabaza ofrece un ritual tradicional y requiere curado y secado cuidadoso. El acero o la cerámica suelen ser más simples de limpiar. Elegí un tamaño cómodo para tu mano y una bombilla acorde; no hace falta empezar con un mate grande.',
  },
  {
    id: 'yerba-suave',
    question: '¿Yerba suave o tradicional: por dónde empiezo?',
    answer: 'Si estás empezando, una yerba de perfil suave puede ayudarte a conocer el sabor sin tanta intensidad. La molienda, la proporción de palo y el estacionamiento también influyen: cada yerba tiene su carácter. Probá distintas opciones hasta encontrar la que mejor acompañe tu ronda.',
  },
  {
    id: 'curado',
    question: '¿Todos los mates necesitan curado?',
    answer: 'No. El curado depende del material: los mates de calabaza y algunos de madera necesitan una preparación inicial según las indicaciones del fabricante. Los de acero, vidrio o cerámica no se curan; lavalos antes del primer uso. Para tu mate artesanal, seguí siempre las recomendaciones de quien lo hizo.',
  },
  {
    id: 'agua',
    question: '¿A qué temperatura preparo el agua?',
    answer: 'Como punto de partida, usá agua entre 75 y 80 °C, sin hervir, y ajustá a tu gusto. Cebá de a poco en un mismo sector para conservar parte de la yerba seca. Si la yerba tiene indicaciones específicas de preparación, dales prioridad.',
  },
  {
    id: 'regalos',
    question: '¿Dónde encuentro una opción para regalar?',
    answer: 'En la categoría Regalos del catálogo vas a encontrar el set Nuestra Ronda, con una selección ilustrativa para compartir el ritual. Podés guardarlo en favoritos o sumarlo al carrito. Los productos y precios de esta tienda son de ejemplo; no se realizan pedidos ni cobros reales.',
  },
  {
    id: 'pagos',
    question: '¿Qué medios de pago aceptan?',
    answer: `Aceptamos ${new Intl.ListFormat('es-AR', { type: 'conjunction' }).format(paymentMethods.map((method) => method.name))}. Consultá las opciones y condiciones de cada medio al momento de abonar.`,
  },
  {
    id: 'visita',
    question: '¿Dónde están y en qué horario puedo acercarme?',
    answer: `Nos encontrás en ${storeLocation.address}, ${storeLocation.city}. Nuestro horario de atención es ${storeLocation.hours}. En la sección Ubicación tenés el mapa y un enlace para consultar cómo llegar.`,
  },
  {
    id: 'envios',
    question: '¿Cómo coordino la entrega de mi compra?',
    answer: 'Consultá con el local las opciones de entrega disponibles, sus costos y plazos antes de confirmar tu compra. Las condiciones dependen del producto y del destino, por eso preferimos coordinarlas con vos.',
  },
  {
    id: 'cambios',
    question: '¿Qué hago si necesito consultar por un cambio?',
    answer: 'Acercate al local con el comprobante y contanos qué pasó. Antes de comprar, consultá las condiciones vigentes de cambios y devoluciones para el producto que elegiste. Cada caso necesita revisar el estado del producto y las condiciones de la compra.',
  },
];
