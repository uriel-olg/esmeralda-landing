export type PaymentMethodId = 'efectivo' | 'transferencia' | 'mercado-pago' | 'tarjetas';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  description: string;
}

/** Medios aceptados y confirmados por la tienda; no configura procesamiento de pagos. */
export const paymentMethods: readonly PaymentMethod[] = [
  {
    id: 'efectivo',
    name: 'Efectivo',
    description: 'Aboná en efectivo al momento de tu compra.',
  },
  {
    id: 'transferencia',
    name: 'Transferencia',
    description: 'Solicitá los datos bancarios al momento de abonar.',
  },
  {
    id: 'mercado-pago',
    name: 'Mercado Pago',
    description: 'Podés elegir Mercado Pago para abonar tu compra.',
  },
  {
    id: 'tarjetas',
    name: 'Tarjetas',
    description: 'Consultá las opciones y condiciones al momento de abonar.',
  },
];
