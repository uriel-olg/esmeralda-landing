import { ArrowUpRight, Coffee, Gift, HeartHandshake, Leaf, Sprout, ThermometerSun, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category } from '../data/products';
import { storeProfile } from '../data/storeProfile';

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
    <section className="about-section" id="quienes-somos" aria-labelledby="about-title">
      <div className="container about-layout">
        <div className="about-intro">
          <p className="eyebrow">De {storeProfile.city}, {storeProfile.province}</p>
          <h2 id="about-title">Somos {storeProfile.name}.<br /><em>Somos de compartir.</em></h2>
          <p>{storeProfile.description}</p>
          <p>{storeProfile.story}</p>
          <div className="about-values" aria-label="Lo que nos inspira">
            {storeProfile.values.map((value) => {
              const Icon = valueIcons[value.id] ?? Sprout;

              return (
                <div className="about-value" key={value.id}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-selection">
          <p className="eyebrow">Qué encontrás en Raíces</p>
          <h3>Todo empieza con un buen mate.</h3>
          <p>Conocé los tipos de productos de nuestra tienda y explorá cada selección en el catálogo.</p>
          <div className="offerings">
            {storeProfile.productTypes.map((productType) => {
              const Icon = offeringIcons[productType.category];

              return (
                <Link
                  className="offering"
                  key={productType.category}
                  to={`/catalogo?categoria=${encodeURIComponent(productType.category)}`}
                  aria-label={`${productType.name}: explorar ${productType.category.toLowerCase()} en el catálogo`}
                >
                  <span className="offering-icon"><Icon aria-hidden="true" /></span>
                  <div className="offering-copy">
                    <h4>{productType.name}</h4>
                    <p>{productType.description}</p>
                  </div>
                  <span className="offering-link"><ArrowUpRight aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
