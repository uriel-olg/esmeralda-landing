export interface StoreLocation {
  name: string;
  address: string | null;
  city: string | null;
  hours: string | null;
}

/** Agregar únicamente la dirección y los horarios reales proporcionados por la tienda. */
export const storeLocation: StoreLocation = {
  name: 'Raíces',
  address: 'Avenida Este 12',
  city: 'General Alvear, Mendoza, Argentina',
  hours: '8:00 a 12:00 y 17:00 a 21:00',
};
