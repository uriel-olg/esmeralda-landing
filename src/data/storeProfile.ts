import type { Category } from './products';

export interface StoreValue {
  id: string;
  title: string;
  description: string;
}

export interface ProductType {
  name: string;
  description: string;
  category: Category;
}

export interface StoreProfile {
  name: string;
  city: string;
  province: string;
  description: string;
  story: string;
  values: readonly StoreValue[];
  productTypes: readonly ProductType[];
}

export const storeProfile: StoreProfile = {
  name: 'Raíces',
  city: 'General Alvear',
  province: 'Mendoza',
  description: 'Somos una tienda de mates, yerbas y accesorios de General Alvear, Mendoza. Nos gusta ese momento en que baja el ritmo, empieza una charla y el mate encuentra su lugar en la mesa.',
  story: 'Raíces nació de una idea simple: acercar todo lo que hace falta para disfrutar un buen mate. Le dimos forma alrededor de una costumbre que nos acompaña cada día y que siempre encuentra una excusa para reunirnos.',
  values: [
    {
      id: 'tradicion',
      title: 'Lo cotidiano también importa',
      description: 'Un mate a solas o una ronda entre amigos: cada forma de disfrutarlo tiene su lugar.',
    },
    {
      id: 'eleccion',
      title: 'Cada ritual es distinto',
      description: 'Distintos materiales, sabores y accesorios para que encuentres lo que va con vos.',
    },
    {
      id: 'cercania',
      title: 'Compartir nos acerca',
      description: 'Creemos en los pequeños gestos: hacer una pausa, escuchar y convidar el próximo mate.',
    },
  ],
  productTypes: [
    {
      name: 'Yerbas para tu próxima ronda',
      description: 'Yerbas de selección y opciones suaves para acompañar distintas preferencias al cebar.',
      category: 'Yerbas',
    },
    {
      name: 'Mates con carácter',
      description: 'Mates de calabaza, como el imperial artesanal, con su textura natural y sus cuidados propios.',
      category: 'Mates',
    },
    {
      name: 'Termos, bombillas y compañía',
      description: 'Termos y bombillas de acero inoxidable para completar tu equipo de todos los días.',
      category: 'Accesorios',
    },
    {
      name: 'Un ritual para regalar',
      description: 'Sets que reúnen mate, yerba y accesorios: una manera de invitar a alguien a compartir.',
      category: 'Regalos',
    },
  ],
};
