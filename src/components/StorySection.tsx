import { ArrowRight, Sprout } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { buttonBase, container, eyebrow } from '../styles/ui';

export function StorySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="story relative isolate min-h-[403px] overflow-hidden bg-[#233827] text-white after:absolute after:inset-0 after:-z-[1] after:bg-[linear-gradient(90deg,#152919ed,#152919ad_32%,#15291918_66%,#1529191a)] after:content-[''] tablet:min-h-[390px] mobile:min-h-[477px] mobile:after:bg-[linear-gradient(90deg,#142e20e8,#142e20a1_45%,#142e201c),linear-gradient(0deg,#142e2059,transparent)]" id="nosotros" aria-labelledby="story-title">
      <img
        className="story-photo absolute inset-0 -z-[2] h-full w-full object-cover object-[center_48%] mobile:object-[68%_center]"
        src="/images/story.webp"
        loading="lazy"
        decoding="async"
        width={1672}
        height={941}
        alt="Un mate entre las manos, junto a un lago rodeado de bosque al atardecer"
      />
      <motion.div
        className={`${container} story-content py-[53px] mobile:pt-[40px] mobile:pb-[42px]`}
        initial={false}
        whileInView={reduceMotion ? undefined : { y: [8, 0] }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <p className={`eyebrow ${eyebrow} !text-[#d4ddbc] mobile:text-[8px] mobile:tracking-[1.8px]`}>De nuestras raíces, a tu mesa</p>
        <h2 className="my-[18px] text-[66px] leading-[.94] tracking-[-1.7px] tablet:text-[61px] mobile:mt-[17px] mobile:text-[60px] mobile:tracking-[-.7px]" id="story-title">
          El mate<br />
          <em className="font-medium text-[#e0e7ca]">nos acerca.</em>
        </h2>
        <p className="story-description max-w-[345px] text-[12px] leading-[1.9] text-[#efefe6] mobile:max-w-[240px] mobile:text-[11px]">
          Hay costumbres que se sienten como estar en casa.<br />
          Una charla sin apuro, el agua a punto y un mate que va de mano en mano.<br />
          Somos Raíces, una tienda de mates, yerbas y accesorios de General Alvear, Mendoza. Elegimos acompañarte en esos pequeños grandes momentos.
        </p>
        <Link className={`button ${buttonBase} mt-[24px] gap-[15px] bg-cream px-[22px] py-[11px] text-[12px] text-forest mobile:mt-[25px] mobile:px-[18px] mobile:py-[11px] mobile:text-[10px]`} to="/catalogo">
          Compartí el ritual <ArrowRight aria-hidden="true" />
        </Link>
      </motion.div>
      <div className="story-stamp absolute right-[7%] bottom-[35px] flex h-[102px] w-[102px] flex-col items-center justify-center gap-[3px] rounded-full border border-[#e9eed59c] bg-[#29442a20] text-[7px] tracking-[1.8px] text-[#f1f2df] uppercase backdrop-blur-[3px] [transform:rotate(10deg)] mobile:right-[23px] mobile:bottom-[24px] mobile:h-[77px] mobile:w-[77px] mobile:text-[5px] mobile:tracking-[1.4px]" aria-hidden="true">
        <span>Hecho para</span>
        <Sprout className="h-[27px] w-[27px] mobile:w-[24px]" />
        <span>Compartir</span>
      </div>
    </section>
  );
}
