import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { container, demoNote, eyebrow, productGrid, section, sectionHeading, textLink } from '../styles/ui';
import { ProductCard } from './ProductCard';

export function ProductsSection() {
  const reduceMotion = useReducedMotion();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 5);

  return (
    <section className={`products-section ${container} ${section} pb-[44px] mobile:pb-[34px]`} id="productos" aria-labelledby="products-title">
      <div className={`section-heading ${sectionHeading}`}>
        <div>
          <p className={`eyebrow ${eyebrow} mb-[7px] mobile:mb-[5px] mobile:text-[8px] mobile:tracking-[1.6px]`}>Elegidos para vos</p>
          <h2 id="products-title">Nuestros favoritos</h2>
        </div>
        <Link className={`text-link ${textLink} small:max-w-[100px] small:whitespace-normal small:text-right`} to="/catalogo">
          Ver el catálogo <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <motion.div
        className={`product-grid ${productGrid}`}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </motion.div>
      <p className={`demo-note ${demoNote}`}>Productos y precios de ejemplo · Fotografías ilustrativas</p>
    </section>
  );
}
