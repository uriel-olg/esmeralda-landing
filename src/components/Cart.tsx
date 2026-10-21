import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, products } from '../data/products';
import { Modal } from './Modal';
import { ProductImage } from './ProductImage';

export function Cart() {
  const { cart, cartOpen, closeCart, cartCount, subtotal, setQuantity, removeItem } = useShop();
  const [demoOpen, setDemoOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const entries = products.filter((product) => cart[product.id]);

  function remove(id: string) {
    const next = entries.find((product) => product.id !== id)?.id;
    removeItem(id);
    requestAnimationFrame(() => {
      const target = next ? body.current?.querySelector<HTMLButtonElement>(`[data-item="${next}"] button`) : body.current?.querySelector<HTMLElement>('a');
      target?.focus();
    });
  }

  return (
    <>
      <Modal open={cartOpen} onClose={closeCart} title="Tu próxima ronda" id="cart" className="cart-modal">
        <div className="modal-body cart-items" ref={body}>
          {entries.length ? entries.map((product) => (
            <div className="cart-item" data-item={product.id} key={product.id}>
              <ProductImage product={product} className="cart-thumb" />
              <div className="cart-item-info"><h3>{product.name}</h3><p className="cart-item-price">{formatPrice(product.price)}</p>
                <div className="quantity">
                  <button onClick={() => cart[product.id] === 1 ? remove(product.id) : setQuantity(product.id, cart[product.id] - 1)} aria-label={`Quitar una unidad de ${product.name}`}><Minus aria-hidden="true" /></button>
                  <span aria-label={`Cantidad: ${cart[product.id]}`}>{cart[product.id]}</span>
                  <button disabled={cart[product.id] >= 99} onClick={() => setQuantity(product.id, cart[product.id] + 1)} aria-label={`Agregar una unidad de ${product.name}`}><Plus aria-hidden="true" /></button>
                  <button className="remove-item" onClick={() => remove(product.id)} aria-label={`Eliminar ${product.name} del carrito`}><Trash2 aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          )) : <div className="empty-cart"><ShoppingBag aria-hidden="true" /><h3>La ronda está por empezar.</h3><p>Elegí tus favoritos y prepará ese próximo mate.</p><Link to="/catalogo" className="button button-primary" onClick={closeCart}>Explorar el catálogo <ArrowRight aria-hidden="true" /></Link></div>}
        </div>
        {cartCount > 0 && <div className="cart-summary"><div className="cart-total"><span>Subtotal</span><strong aria-live="polite">{formatPrice(subtotal)}</strong></div><p className="cart-shipping">Los envíos se calcularán en la tienda real.</p><button className="button button-primary" onClick={() => { closeCart(); setDemoOpen(true); }}>Continuar mi compra <ArrowRight aria-hidden="true" /></button><p className="cart-note">Carrito de demostración. Sin cobros ni pedidos reales.</p></div>}
      </Modal>
      <Modal open={demoOpen} onClose={() => setDemoOpen(false)} title="Tu próxima ronda, lista." id="checkout-demo"><div className="modal-body info-copy"><div className="demo-check"><Check aria-hidden="true" /></div><p>Este es un carrito de demostración. No se generó un pedido ni se realizó un cobro.</p><p>Tu selección queda guardada para que sigas explorando. La compra real necesita conectar pagos, envíos y un catálogo comercial.</p><button className="button button-primary" onClick={() => setDemoOpen(false)}>Seguir disfrutando <ArrowRight aria-hidden="true" /></button></div></Modal>
    </>
  );
}
