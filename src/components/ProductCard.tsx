import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

type ProductCardProps = {
  product: Product;
  variant?: 'featured' | 'catalog';
};

export function ProductCard({ product, variant = 'featured' }: ProductCardProps) {
  const { addItem, toggleFavorite, favorites, cart, notify } = useShop();
  const isFavorite = favorites.includes(product.id);
  const quantityLimitReached = (cart[product.id] ?? 0) >= 99;

  function addToCart() {
    if (quantityLimitReached) return;
    addItem(product.id);
    notify(`${product.name} se sumó a tu carrito.`);
  }

  function changeFavorite() {
    toggleFavorite(product.id);
    notify(
      isFavorite
        ? `${product.name} se quitó de tus favoritos.`
        : `${product.name} se guardó en tus favoritos.`,
    );
  }

  return (
    <article className="product-card relative min-w-0 rounded-[12px] border border-line bg-paper p-[11px] [transition:box-shadow_.25s,transform_.25s] fine:hover:shadow-[0_9px_25px_#293b2a0a] fine:hover:[transform:translateY(-3px)] compact:p-[8px] tablet:p-[10px] mobile:rounded-[10px] mobile:p-[8px]">
      {product.badge && <span className="product-label absolute top-[20px] left-[19px] z-[1] rounded-[3px] bg-[#e8ebdf] px-[7px] py-[3px] text-[8px] tracking-[.4px] text-forest compact:top-[15px] compact:left-[13px] compact:text-[7px] mobile:px-[5px] mobile:py-[2px] small:text-[6px]">{product.badge}</span>}
      <button
        className="favorite absolute top-[18px] right-[18px] z-[1] grid size-[29px] place-items-center rounded-full bg-[#fdfdf8f0] [transition:background_.2s] aria-pressed:bg-[#e6ecd9] aria-pressed:text-forest compact:top-[14px] compact:right-[14px] mobile:top-[12px] mobile:right-[12px] mobile:size-[28px]"
        type="button"
        aria-label={`${isFavorite ? 'Quitar' : 'Guardar'} ${product.name} ${isFavorite ? 'de' : 'en'} favoritos`}
        aria-pressed={isFavorite}
        onClick={changeFavorite}
      >
        <Heart className="size-[16px]" aria-hidden="true" fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      <ProductImage product={product} variant={variant} />
      <div className={`product-details ${variant === 'catalog' ? 'px-[6px] pt-[17px] pb-[6px] mobile:pb-[3px]' : 'px-[3px] pt-[14px] pb-[3px]'} compact:px-0 mobile:pt-[11px]`}>
        <p className={`product-kind mb-[3px] min-h-[14px] tracking-[1px] uppercase text-muted ${variant === 'catalog' ? 'text-[9px]' : 'text-[8px]'} mobile:min-h-[23px] mobile:text-[7px]`}>{product.detail}</p>
        <h3 className={`product-name font-normal leading-[1.5] ${variant === 'catalog' ? 'min-h-[21px] text-[14px]' : 'min-h-[36px] text-[12px]'} compact:min-h-[33px] compact:text-[11px] tablet:min-h-[36px] tablet:text-[12px] mobile:min-h-[33px] mobile:text-[11px] small:text-[10px]`}>{product.name}</h3>
        <p className={`product-price mb-[12px] font-medium ${variant === 'catalog' ? 'mt-[6px] text-[18px]' : 'mt-[4px] text-[15px]'} compact:text-[14px] mobile:mb-[10px]`}>
          {formatPrice(product.price)} <small className="ml-[4px] text-[9px] font-normal text-muted mobile:text-[8px]">ARS</small>
        </p>
        <button
          className={`add-button flex w-full items-center justify-center gap-[6px] rounded-[6px] bg-forest px-[6px] text-white [transition:background_.2s] fine:hover:enabled:bg-[#476243] ${variant === 'catalog' ? 'py-[12px] text-[12px]' : 'py-[11px] text-[10px]'} compact:gap-[4px] compact:text-[9px] tablet:text-[10px] mobile:px-[4px] mobile:py-[11px] mobile:text-[9px] small:text-[8px]`}
          type="button"
          onClick={addToCart}
          disabled={quantityLimitReached}
          aria-label={quantityLimitReached ? `Límite de 99 unidades de ${product.name} alcanzado` : `Agregar ${product.name} al carrito`}
        >
          <ShoppingCart className="size-[14px] mobile:w-[12px]" aria-hidden="true" />
          {quantityLimitReached ? 'Límite alcanzado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
