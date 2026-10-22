import { ArrowUpRight, Coffee, Gift, HeartHandshake, Leaf, Sprout, ThermometerSun, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category } from '../data/products';
import { storeProfile } from '../data/storeProfile';
import { container, eyebrow } from '../styles/ui';

const offeringIcons: Record<Category, LucideIcon> = {
  Yerbas: Leaf,
  Mates: Coffee,
  Accesorios: ThermometerSun,
  Regalos: Gift,
};

const valueIcons: Record<string, LucideIcon> = {
  tradicion: Sprout,
  eleccion: Coffee,
  cercania: HeartHandshake,
};

export function AboutSection() {
  return (
    <section className="about-section border-b border-line py-[65px] mobile:py-[37px]" id="quienes-somos" aria-labelledby="about-title">
      <div className={`${container} about-layout grid grid-cols-2 items-start gap-[80px] compact:gap-[50px] tablet:gap-[30px] mobile:grid-cols-1 mobile:gap-[35px]`}>
        <div className="about-intro">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>De {storeProfile.city}, {storeProfile.province}</p>
          <h2 className="mt-[16px] mb-[21px] text-[48px] leading-[1.05] compact:text-[44px] tablet:text-[39px] mobile:mt-[13px] mobile:mb-[18px] mobile:text-[42px]" id="about-title">Somos {storeProfile.name}.<br /><em className="font-medium text-forest">Somos de compartir.</em></h2>
          <p className="mb-[13px] max-w-[470px] text-[13px] leading-[1.9] text-muted tablet:text-[12px]">{storeProfile.description}</p>
          <p className="mb-[13px] max-w-[470px] text-[13px] leading-[1.9] text-muted tablet:text-[12px]">{storeProfile.story}</p>
          <div className="about-values mt-[28px] flex flex-col gap-[19px] mobile:mt-[24px] mobile:gap-[18px]" aria-label="Lo que nos inspira">
            {storeProfile.values.map((value) => {
              const Icon = valueIcons[value.id] ?? Sprout;

              return (
                <div className="about-value flex items-start gap-[13px]" key={value.id}>
                  <Icon className="mt-[2px] h-[23px] w-[23px] text-olive" aria-hidden="true" />
                  <div>
                    <h3 className="mb-[3px] text-[12px] font-medium">{value.title}</h3>
                    <p className="max-w-[385px] text-[11px] leading-[1.8] text-muted">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-selection pt-[2px]">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>Qué encontrás en Raíces</p>
          <h3 className="mt-[15px] mb-[14px] font-display text-[32px] leading-[1.1] font-medium tablet:text-[29px] mobile:text-[31px]">Todo empieza con un buen mate.</h3>
          <p className="max-w-[400px] text-[12px] leading-[1.85] text-muted">Conocé los tipos de productos de nuestra tienda y explorá cada selección en el catálogo.</p>
          <div className="offerings mt-[17px] border-t border-line">
            {storeProfile.productTypes.map((productType) => {
              const Icon = offeringIcons[productType.category];

              return (
                <Link
                  className="offering flex items-center gap-[17px] rounded-[2px] border-b border-line py-[20px] [transition:background_.2s] [&:hover]:bg-[#eff0e780] tablet:gap-[12px] mobile:gap-[13px] mobile:py-[18px]"
                  key={productType.category}
                  to={`/catalogo?categoria=${encodeURIComponent(productType.category)}`}
                  aria-label={`${productType.name}: explorar ${productType.category.toLowerCase()} en el catálogo`}
                >
                  <span className="offering-icon grid h-[43px] w-[41px] shrink-0 place-items-center rounded-[8px] bg-[#e9ecdf] text-forest mobile:h-[40px] mobile:w-[38px]"><Icon className="h-[22px] w-[22px]" aria-hidden="true" /></span>
                  <div className="offering-copy min-w-0">
                    <h4 className="mb-[4px] text-[13px] font-medium tablet:text-[12px]">{productType.name}</h4>
                    <p className="max-w-[365px] text-[11px] leading-[1.8] text-muted">{productType.description}</p>
                  </div>
                  <span className="offering-link ml-auto text-olive"><ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
