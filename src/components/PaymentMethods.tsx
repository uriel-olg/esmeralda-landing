import { ArrowRight, Banknote, CreditCard, Landmark, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paymentMethods } from '../data/paymentMethods';
import type { PaymentMethodId } from '../data/paymentMethods';

const paymentIcons: Record<PaymentMethodId, LucideIcon> = {
  efectivo: Banknote,
  transferencia: Landmark,
  'mercado-pago': Wallet,
  tarjetas: CreditCard,
};

export function PaymentMethods() {
  return (
    <section
      className="payment-section"
      id="medios-de-pago"
      aria-labelledby="payment-title"
    >
      <div className="container">
        <div className="payment-heading">
          <p className="eyebrow">Opciones para tu compra</p>
          <h2 id="payment-title">Pagá como te quede más cómodo.</h2>
          <p>Efectivo, transferencia, Mercado Pago y tarjetas para elegir cómo abonar.</p>
        </div>

        <div className="payment-grid">
          {paymentMethods.map((method) => {
            const Icon = paymentIcons[method.id];
            return (
              <article className="payment-method" key={method.id}>
                <div className="payment-icon"><Icon aria-hidden="true" /></div>
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </article>
            );
          })}
        </div>

        <p className="payment-note">Las condiciones de cada medio se confirman al momento de la compra.</p>
        <Link className="text-link" to="/#ubicacion">
          Visitá nuestro espacio <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
