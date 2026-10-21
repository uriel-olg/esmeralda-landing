import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
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
    <article className="product-card">
      {product.badge && <span className="product-label">{product.badge}</span>}
      <button
        className="favorite"
        type="button"
        aria-label={`${isFavorite ? 'Quitar' : 'Guardar'} ${product.name} ${isFavorite ? 'de' : 'en'} favoritos`}
        aria-pressed={isFavorite}
        onClick={changeFavorite}
      >
        <Heart aria-hidden="true" fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      <ProductImage product={product} />
      <div className="product-details">
        <p className="product-kind">{product.detail}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          {formatPrice(product.price)} <small>ARS</small>
        </p>
        <button
          className="add-button"
          type="button"
          onClick={addToCart}
          disabled={quantityLimitReached}
          aria-label={quantityLimitReached ? `Límite de 99 unidades de ${product.name} alcanzado` : `Agregar ${product.name} al carrito`}
        >
          <ShoppingCart aria-hidden="true" />
          {quantityLimitReached ? 'Límite alcanzado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
