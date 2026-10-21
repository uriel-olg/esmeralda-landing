export type Category = 'Yerbas' | 'Mates' | 'Accesorios' | 'Regalos';

export interface Product {
  id: string;
  name: string;
  detail: string;
  category: Category;
  price: number;
  col: number;
  row: number;
  badge?: string;
  featured: boolean;
}

/** Catálogo ilustrativo. Los precios en ARS no representan una oferta comercial. */
export const products: Product[] = [
  { id: 'yerba-raices', name: 'Yerba Raíces Selección', detail: '1 kg', category: 'Yerbas', price: 7900, col: 0, row: 0, badge: 'La favorita', featured: true },
  { id: 'yerba-suave', name: 'Yerba Suave del Litoral', detail: '1 kg', category: 'Yerbas', price: 7200, col: 1, row: 0, featured: true },
  { id: 'mate-imperial', name: 'Mate Imperial de Calabaza', detail: 'Artesanal', category: 'Mates', price: 24900, col: 2, row: 0, featured: true },
  { id: 'termo-bosque', name: 'Termo Bosque', detail: '1 litro', category: 'Accesorios', price: 82000, col: 0, row: 1, featured: true },
  { id: 'bombillas', name: 'Set de Bombillas Artesanales', detail: 'Acero inoxidable · 2 unidades', category: 'Accesorios', price: 19500, col: 1, row: 1, featured: true },
  { id: 'set-ronda', name: 'Set Nuestra Ronda', detail: 'Para regalar', category: 'Regalos', price: 115000, col: 2, row: 1, badge: 'Para compartir', featured: false },
];

export const categories = ['Todos', 'Yerbas', 'Mates', 'Accesorios', 'Regalos'] as const;

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return formatter.format(amount);
}
