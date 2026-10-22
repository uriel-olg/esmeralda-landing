import { ArrowRight, Banknote, CreditCard, Landmark, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paymentMethods } from '../data/paymentMethods';
import type { PaymentMethodId } from '../data/paymentMethods';
import { container, eyebrow, textLink } from '../styles/ui';

const paymentIcons: Record<PaymentMethodId, LucideIcon> = {
  efectivo: Banknote,
  transferencia: Landmark,
  'mercado-pago': Wallet,
  tarjetas: CreditCard,
};

export function PaymentMethods() {
  return (
    <section
      className="payment-section border-y border-[#e0e3d4] bg-[#eeefe5] py-[54px] mobile:py-[36px]"
      id="medios-de-pago"
      aria-labelledby="payment-title"
    >
      <div className={container}>
        <div className="payment-heading mx-auto mb-[30px] max-w-[630px] text-center mobile:mb-[23px]">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>Opciones para tu compra</p>
          <h2 className="mt-[13px] mb-[15px] text-[42px] mobile:mb-[16px] mobile:text-[36px] mobile:leading-[1.05]" id="payment-title">Pagá como te quede más cómodo.</h2>
          <p className="text-[12px] leading-[1.85] text-muted mobile:text-[11px]">Efectivo, transferencia, Mercado Pago y tarjetas para elegir cómo abonar.</p>
        </div>

        <div className="payment-grid grid grid-cols-4 gap-[18px] compact:gap-[13px] tablet:grid-cols-2 tablet:gap-[15px] mobile:gap-[12px]">
          {paymentMethods.map((method) => {
            const Icon = paymentIcons[method.id];
            return (
              <article className="payment-method rounded-[11px] border border-[#dce1d1] bg-[#fbfaf5] px-[23px] py-[25px] compact:px-[19px] compact:py-[22px] tablet:p-[23px] mobile:px-[15px] mobile:py-[19px]" key={method.id}>
                <div className="payment-icon mb-[18px] grid h-[44px] w-[44px] place-items-center rounded-full bg-[#e9eede] text-forest mobile:mb-[15px] mobile:h-[39px] mobile:w-[39px]"><Icon className="h-[23px] w-[23px]" aria-hidden="true" /></div>
                <h3 className="mb-[8px] text-[13px] font-medium mobile:text-[12px]">{method.name}</h3>
                <p className="text-[11px] leading-[1.8] text-muted mobile:text-[10px]">{method.description}</p>
              </article>
            );
          })}
        </div>

        <p className="payment-note mt-[23px] text-center text-[10px] leading-[1.8] text-muted mobile:text-[9px]">Las condiciones de cada medio se confirman al momento de la compra.</p>
        <div className="mt-[10px] flex justify-center">
          <Link className={`text-link ${textLink}`} to="/#ubicacion">
            Visitá nuestro espacio <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
