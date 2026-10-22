import { ArrowRight, CreditCard, Leaf, MapPin, Sprout } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { container, eyebrow, outlineButton, primaryButton } from '../styles/ui';

const heroPerks = [
  { icon: Sprout, firstLine: 'Yerbas', secondLine: 'seleccionadas' },
  { icon: MapPin, firstLine: 'General Alvear', secondLine: 'Mendoza' },
  { icon: CreditCard, firstLine: 'Pagos', secondLine: 'seguros' },
  { icon: Leaf, firstLine: 'Elegimos', secondLine: 'lo natural' },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="hero relative isolate min-h-[620px] overflow-hidden bg-[#f1eee5] after:absolute after:inset-0 after:-z-[1] after:bg-[linear-gradient(90deg,#f1eee5_0%,#f1eee5_31%,#f1eee5e8_39%,#f1eee548_55%,transparent_68%)] after:content-[''] wide:min-h-[660px] compact:min-h-[560px] tablet:after:bg-[linear-gradient(90deg,#f1eee5,#f1eee5_31%,#f1eee5b3_45%,transparent_75%)] mobile:flex mobile:min-h-0 mobile:flex-col mobile:after:hidden mobile:before:pointer-events-none mobile:before:absolute mobile:before:inset-x-0 mobile:before:bottom-0 mobile:before:-z-[1] mobile:before:h-[310px] mobile:before:bg-[linear-gradient(90deg,#20382570,transparent_70%)] mobile:before:content-['']"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <img
        className="hero-photo absolute inset-y-0 right-0 left-auto -z-[2] h-full w-[min(70%,1080px)] object-cover object-[right_center] mobile:relative mobile:order-2 mobile:h-[310px] mobile:w-full mobile:object-[78%_65%]"
        src="/images/hero.webp"
        alt="Mate artesanal de calabaza y termo verde, junto a un paisaje de sierras y naturaleza"
        width={1536}
        height={1024}
        fetchPriority="high"
      />

      <motion.div
        className={`${container} hero-content pt-[64px] pb-[48px] wide:pt-[79px] compact:pt-[53px] mobile:bg-[#f0eee5] mobile:pt-[31px] mobile:pb-[29px]`}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[2px]`}>El ritual de compartir</p>
        <h1 className="mt-[21px] mb-[24px] max-w-[600px] text-[clamp(60px,6.15vw,87px)] leading-[.95] tracking-[-2.8px] compact:text-[72px] tablet:text-[64px] mobile:mt-[16px] mobile:mb-[19px] mobile:max-w-[370px] mobile:text-[61px] mobile:leading-[.94] mobile:tracking-[-1.8px] small:text-[55px]" id="hero-title">
          Más que<br />
          un mate,<br />
          <em className="font-medium text-forest">una tradición.</em>
        </h1>
        <p className="hero-description max-w-[390px] text-[14px] leading-[1.9] text-[#555e4f] tablet:max-w-[310px] tablet:text-[13px] mobile:max-w-[320px] mobile:text-[12px]">
          Yerbas seleccionadas, mates únicos y accesorios{' '}
          <br className="mobile:hidden" />
          que hacen especial cada momento.
        </p>
        <div className="hero-buttons mt-[29px] flex flex-wrap gap-[12px] mobile:mt-[22px] mobile:gap-[9px]">
          <Link className={`button button-primary ${primaryButton} mobile:gap-[9px] mobile:px-[17px] mobile:py-[12px] mobile:text-[10px] small:px-[14px] small:py-[11px] small:text-[9px]`} to="/catalogo">
            Encontrá tu próximo mate <ArrowRight aria-hidden="true" />
          </Link>
          <Link className={`button button-outline ${outlineButton} mobile:gap-[9px] mobile:px-[17px] mobile:py-[12px] mobile:text-[10px] small:px-[14px] small:py-[11px] small:text-[9px]`} to="/#nosotros">
            Conocé nuestra historia
          </Link>
        </div>
        <div className="hero-perks mt-[43px] flex gap-[28px] text-forest compact:gap-[18px] tablet:max-w-[355px] tablet:flex-wrap tablet:gap-[15px] mobile:mt-[27px] mobile:max-w-none mobile:flex-nowrap mobile:gap-[18px] small:gap-[13px]" aria-label="Nuestra propuesta">
          {heroPerks.map(({ icon: Icon, firstLine, secondLine }) => (
            <div className="hero-perk flex items-center gap-[9px] text-[9px] leading-[1.55] tablet:text-[8px] mobile:gap-[6px] mobile:text-[8px] mobile:last:hidden small:text-[7px]" key={secondLine}>
              <Icon className="h-[25px] w-[25px] tablet:w-[23px] mobile:h-[22px] mobile:w-[20px]" aria-hidden="true" />
              <span>
                {firstLine}<br />{secondLine}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="hero-note absolute top-[28%] right-[23%] max-w-[115px] font-display text-[30px] leading-[1.03] text-[#fffdf3] italic [transform:rotate(-8deg)] [text-shadow:0_1px_16px_#20342070] compact:top-[25%] compact:right-[22%] compact:text-[26px] tablet:hidden mobile:top-auto mobile:right-auto mobile:bottom-[105px] mobile:left-[24px] mobile:block mobile:max-w-[110px] mobile:text-[31px] mobile:[text-shadow:0_1px_10px_#15251a70]" aria-hidden="true">
        Buenos mates,<br />mejores momentos.
        <Sprout className="mt-[13px] ml-[26px] h-[38px] w-[38px]" />
      </div>
    </section>
  );
}
