import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export function ProductsSection() {
  const reduceMotion = useReducedMotion();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 5);

  return (
    <section className="products-section section container" id="productos" aria-labelledby="products-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Elegidos para vos</p>
          <h2 id="products-title">Nuestros favoritos</h2>
        </div>
        <Link className="text-link" to="/catalogo">
          Ver el catálogo <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <motion.div
        className="product-grid"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </motion.div>
      <p className="demo-note">Productos y precios de ejemplo · Fotografías ilustrativas</p>
    </section>
  );
}
