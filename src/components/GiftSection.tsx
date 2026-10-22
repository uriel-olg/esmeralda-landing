import { ArrowRight, Gift, HeartHandshake, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductImage } from './ProductImage';

const giftSet = products.find((product) => product.id === 'set-ronda');

export function GiftSection() {
  return (
    <section className="gift-section" aria-labelledby="gift-title">
      <div className="container gift-layout">
        <div className="gift-visual">
          {giftSet ? (
            <ProductImage product={giftSet} className="gift-image" />
          ) : (
            <Gift aria-hidden="true" />
          )}
        </div>
        <div className="gift-copy">
          <p className="eyebrow">Para esas personas que son hogar</p>
          <h2 id="gift-title">Regalá un momento<br /><em>para compartir.</em></h2>
          <p>Para agradecer, celebrar o decir «pensé en vos». Un mate es mucho más que un objeto: es una invitación a hacer una pausa y encontrarse.</p>
          <p>Descubrí la propuesta de sets del catálogo y elegí cómo empezar esa próxima ronda.</p>
          <ul className="gift-details" aria-label="El espíritu de nuestros regalos">
            <li><HeartHandshake aria-hidden="true" /><span>Una ronda compartida</span></li>
            <li><Sprout aria-hidden="true" /><span>Un gesto con historia</span></li>
          </ul>
          <Link className="button button-primary" to="/catalogo?categoria=Regalos">
            Encontrá tu regalo <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
