import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, products } from '../data/products';
import { Modal } from './Modal';
import { ProductImage } from './ProductImage';
import { primaryButton } from '../styles/ui';

const modalBody = 'px-[25px] py-[23px] mobile:p-[20px]';
const quantityButton = 'grid place-items-center bg-transparent border border-[#c9d2be] rounded-[4px] size-[30px] [&_svg]:size-[13px]';

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
      <Modal open={cartOpen} onClose={closeCart} title="Tu próxima ronda" id="cart" className="cart-modal" variant="cart">
        <div className={`modal-body cart-items ${modalBody} overflow-auto flex-1 overscroll-contain`} ref={body}>
          {entries.length ? entries.map((product) => (
            <div className="cart-item flex gap-[15px] py-[18px] border-b border-line first:pt-0" data-item={product.id} key={product.id}>
              <ProductImage product={product} className="cart-thumb" variant="cart" />
              <div className="cart-item-info flex-1 min-w-0"><h3 className="font-medium text-[13px]">{product.name}</h3><p className="cart-item-price text-[12px] mt-[3px]">{formatPrice(product.price)}</p>
                <div className="quantity flex items-center gap-[12px] mt-[9px]">
                  <button className={quantityButton} onClick={() => cart[product.id] === 1 ? remove(product.id) : setQuantity(product.id, cart[product.id] - 1)} aria-label={`Quitar una unidad de ${product.name}`}><Minus aria-hidden="true" /></button>
                  <span className="text-[11px]" aria-label={`Cantidad: ${cart[product.id]}`}>{cart[product.id]}</span>
                  <button className={quantityButton} disabled={cart[product.id] >= 99} onClick={() => setQuantity(product.id, cart[product.id] + 1)} aria-label={`Agregar una unidad de ${product.name}`}><Plus aria-hidden="true" /></button>
                  <button className="remove-item grid place-items-center bg-transparent rounded-[4px] size-[30px] [&_svg]:size-[13px] text-muted ml-auto border-none" onClick={() => remove(product.id)} aria-label={`Eliminar ${product.name} del carrito`}><Trash2 aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          )) : <div className="empty-cart text-center py-[50px] px-[10px]"><ShoppingBag className="size-[50px] mx-auto mb-[20px] text-[#839077]" aria-hidden="true" /><h3 className="font-display text-[29px] font-medium">La ronda está por empezar.</h3><p className="text-[12px] text-muted mt-[8px] mb-[24px]">Elegí tus favoritos y prepará ese próximo mate.</p><Link to="/catalogo" className={`button button-primary ${primaryButton}`} onClick={closeCart}>Explorar el catálogo <ArrowRight aria-hidden="true" /></Link></div>}
        </div>
        {cartCount > 0 && <div className="cart-summary py-[22px] px-[25px] bg-[#f0f0e6] border-t border-line [&_.button]:w-full [&_.button]:rounded-[7px] mobile:p-[20px]"><div className="cart-total flex justify-between text-[16px] mb-[7px]"><span>Subtotal</span><strong aria-live="polite">{formatPrice(subtotal)}</strong></div><p className="cart-shipping text-[10px] text-muted mb-[17px]">Los envíos se calcularán en la tienda real.</p><button className={`button button-primary ${primaryButton}`} onClick={() => { closeCart(); setDemoOpen(true); }}>Continuar mi compra <ArrowRight aria-hidden="true" /></button><p className="cart-note text-[9px] text-center text-muted mt-[12px]">Carrito de demostración. Sin cobros ni pedidos reales.</p></div>}
      </Modal>
      <Modal open={demoOpen} onClose={() => setDemoOpen(false)} title="Tu próxima ronda, lista." id="checkout-demo"><div className={`modal-body info-copy ${modalBody} [&_p]:text-[13px] [&_p]:mb-[15px] [&_p]:leading-[1.9] [&_p]:text-[#5d6757]`}><div className="demo-check grid place-items-center size-[42px] bg-[#e3ebd7] text-forest rounded-full mb-[20px]"><Check aria-hidden="true" /></div><p>Este es un carrito de demostración. No se generó un pedido ni se realizó un cobro.</p><p>Tu selección queda guardada para que sigas explorando. La compra real necesita conectar pagos, envíos y un catálogo comercial.</p><button className={`button button-primary ${primaryButton}`} onClick={() => setDemoOpen(false)}>Seguir disfrutando <ArrowRight aria-hidden="true" /></button></div></Modal>
    </>
  );
}
