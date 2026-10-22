import { ArrowRight, Sprout } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

export function StorySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="story" id="nosotros" aria-labelledby="story-title">
      <img
        className="story-photo"
        src="/images/story.webp"
        loading="lazy"
        decoding="async"
        width={1672}
        height={941}
        alt="Un mate entre las manos, junto a un lago rodeado de bosque al atardecer"
      />
      <motion.div
        className="container story-content"
        initial={false}
        whileInView={reduceMotion ? undefined : { y: [8, 0] }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <p className="eyebrow">De nuestras raíces, a tu mesa</p>
        <h2 id="story-title">
          El mate<br />
          <em>nos acerca.</em>
        </h2>
        <p className="story-description">
          Hay costumbres que se sienten como estar en casa.<br />
          Una charla sin apuro, el agua a punto y un mate que va de mano en mano.<br />
          Somos Raíces, una tienda de mates, yerbas y accesorios de General Alvear, Mendoza. Elegimos acompañarte en esos pequeños grandes momentos.
        </p>
        <Link className="button" to="/catalogo">
          Compartí el ritual <ArrowRight aria-hidden="true" />
        </Link>
      </motion.div>
      <div className="story-stamp" aria-hidden="true">
        <span>Hecho para</span>
        <Sprout />
        <span>Compartir</span>
      </div>
    </section>
  );
}
