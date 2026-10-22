import { ArrowRight, Gift, HeartHandshake, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductImage } from './ProductImage';
import { buttonBase, container, eyebrow } from '../styles/ui';

const giftSet = products.find((product) => product.id === 'set-ronda');

export function GiftSection() {
  return (
    <section className="gift-section py-[65px] tablet:py-[48px] mobile:py-[36px]" aria-labelledby="gift-title">
      <div className={`${container} gift-layout grid grid-cols-2 items-center gap-[75px] compact:gap-[45px] tablet:gap-[30px] mobile:grid-cols-1 mobile:gap-[25px]`}>
        <div className="gift-visual relative overflow-hidden rounded-[16px] bg-[#e9e5d8] p-[20px] after:pointer-events-none after:absolute after:inset-[13px] after:rounded-[8px] after:border after:border-[#b9b99e70] after:content-[''] tablet:p-[10px] mobile:p-[15px]">
          {giftSet ? (
            <ProductImage product={giftSet} variant="gift" className="gift-image" />
          ) : (
            <Gift className="mx-auto my-[80px] block h-[100px] w-[100px] text-forest" aria-hidden="true" />
          )}
        </div>
        <div className="gift-copy">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>Para esas personas que son hogar</p>
          <h2 className="mt-[16px] mb-[20px] text-[49px] leading-[1.02] compact:text-[45px] tablet:text-[39px] mobile:mt-[13px] mobile:mb-[17px] mobile:text-[42px]" id="gift-title">Regalá un momento<br /><em className="font-medium text-forest">para compartir.</em></h2>
          <p className="mb-[10px] max-w-[420px] text-[13px] leading-[1.9] text-muted tablet:text-[12px] mobile:max-w-[350px]">Para agradecer, celebrar o decir «pensé en vos». Un mate es mucho más que un objeto: es una invitación a hacer una pausa y encontrarse.</p>
          <p className="mb-[10px] max-w-[420px] text-[13px] leading-[1.9] text-muted tablet:text-[12px] mobile:max-w-[350px]">Descubrí la propuesta de sets del catálogo y elegí cómo empezar esa próxima ronda.</p>
          <ul className="gift-details mt-[21px] mb-[25px] flex flex-wrap gap-x-[20px] gap-y-[15px] tablet:gap-[13px] mobile:gap-[15px] mobile:text-[9px] small:flex-col small:gap-[12px]" aria-label="El espíritu de nuestros regalos">
            <li className="flex items-center gap-[7px] text-[10px] text-forest"><HeartHandshake className="h-[20px] w-[20px]" aria-hidden="true" /><span>Una ronda compartida</span></li>
            <li className="flex items-center gap-[7px] text-[10px] text-forest"><Sprout className="h-[20px] w-[20px]" aria-hidden="true" /><span>Un gesto con historia</span></li>
          </ul>
          <Link className={`button button-primary ${buttonBase} gap-[15px] bg-forest px-[22px] py-[13px] text-[12px] text-white fine:hover:bg-[#223a26] mobile:px-[19px] mobile:py-[12px] mobile:text-[11px]`} to="/catalogo?categoria=Regalos">
            Encontrá tu regalo <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
