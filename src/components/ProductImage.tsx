import type { CSSProperties } from 'react';
import type { Product } from '../data/products';

type ProductImageProps = {
  product: Product;
  className?: string;
  loading?: 'lazy' | 'eager';
  variant?: 'featured' | 'catalog' | 'cart' | 'gift';
};

const imageSizes = {
  featured: 'h-[202px] compact:h-[175px] tablet:h-[190px] mobile:h-[179px] small:h-[151px]',
  catalog: 'h-[285px] compact:h-[245px] tablet:h-[250px] mobile:h-[179px] small:h-[151px]',
  cart: 'w-[76px] h-[84px] shrink-0 compact:h-[175px] tablet:h-[190px] mobile:h-[84px] small:h-[84px]',
  gift: 'h-[350px] compact:h-[300px] tablet:h-[280px] mobile:h-[280px] small:h-[250px]',
} as const;

/** Each product occupies one square in the locally bundled 3 × 2 contact sheet. */
export function ProductImage({
  product,
  className = '',
  loading = 'lazy',
  variant = 'featured',
}: ProductImageProps) {
  const position = {
    '--col': product.col,
    '--row': product.row,
  } as CSSProperties;

  return (
    <div
      className={`product-image relative overflow-hidden [container-type:size] ${imageSizes[variant]} ${variant === 'gift' ? 'rounded-[8px] bg-transparent' : 'rounded-[6px] bg-[#eeece4]'} ${className}`.trim()}
      role="img"
      aria-label={product.name}
    >
      <img
        className="product-sprite absolute h-[200cqh] w-[300cqh] max-w-none object-fill mix-blend-multiply left-[calc(50%_-_50cqh_-_var(--col)*100cqh)] top-[calc(var(--row)*-100cqh)] [clip-path:inset(calc(var(--row)*50%)_calc((2_-_var(--col))*33.333333%)_calc((1_-_var(--row))*50%)_calc(var(--col)*33.333333%))]"
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
