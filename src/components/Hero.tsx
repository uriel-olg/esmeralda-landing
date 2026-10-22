import { ArrowRight, CreditCard, Leaf, MapPin, Sprout } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

const heroPerks = [
  { icon: Sprout, firstLine: 'Yerbas', secondLine: 'seleccionadas' },
  { icon: MapPin, firstLine: 'General Alvear', secondLine: 'Mendoza' },
  { icon: CreditCard, firstLine: 'Pagos', secondLine: 'seguros' },
  { icon: Leaf, firstLine: 'Elegimos', secondLine: 'lo natural' },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <img
        className="hero-photo"
        src="/images/hero.webp"
        alt="Mate artesanal de calabaza y termo verde, junto a un paisaje de sierras y naturaleza"
        width={1536}
        height={1024}
        fetchPriority="high"
      />

      <motion.div
        className="container hero-content"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className="eyebrow">El ritual de compartir</p>
        <h1 id="hero-title">
          Más que<br />
          un mate,<br />
          <em>una tradición.</em>
        </h1>
        <p className="hero-description">
          Yerbas seleccionadas, mates únicos y accesorios{' '}
          <br />
          que hacen especial cada momento.
        </p>
        <div className="hero-buttons">
          <Link className="button button-primary" to="/catalogo">
            Encontrá tu próximo mate <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="button button-outline" to="/#nosotros">
            Conocé nuestra historia
          </Link>
        </div>
        <div className="hero-perks" aria-label="Nuestra propuesta">
          {heroPerks.map(({ icon: Icon, firstLine, secondLine }) => (
            <div className="hero-perk" key={secondLine}>
              <Icon aria-hidden="true" />
              <span>
                {firstLine}<br />{secondLine}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="hero-note" aria-hidden="true">
        Buenos mates,<br />mejores momentos.
        <Sprout />
      </div>
    </section>
  );
}
