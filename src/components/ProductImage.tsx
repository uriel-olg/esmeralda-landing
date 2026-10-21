import type { CSSProperties } from 'react';
import type { Product } from '../data/products';

type ProductImageProps = {
  product: Product;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/** Each product occupies one square in the locally bundled 3 × 2 contact sheet. */
export function ProductImage({
  product,
  className = '',
  loading = 'lazy',
}: ProductImageProps) {
  const position = {
    '--col': product.col,
    '--row': product.row,
  } as CSSProperties;

  return (
    <div className={`product-image ${className}`.trim()} role="img" aria-label={product.name}>
      <img
        className="product-sprite"
        src="/images/products.webp"
        alt=""
        aria-hidden="true"
        width={1536}
        height={1024}
        loading={loading}
        decoding="async"
        style={position}
      />
    </div>
  );
}
