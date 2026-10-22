import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, ShoppingCart, X } from 'lucide-react';
import { Brand } from './Brand';
import { useShop } from '../context/ShopContext';

const navigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/#nosotros' },
  { label: 'Destacados', to: '/#productos' },
  { label: 'Guía matera', to: '/#guia' },
  { label: 'Visitános', to: '/#ubicacion' },
];

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const { cartCount, openCart } = useShop();

  useEffect(() => { setMenuOpen(false); }, [location]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggle.current?.focus(); }
    };
    const onClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target) && !toggle.current?.contains(event.target)) setMenuOpen(false);
    };
    const resize = () => { if (window.innerWidth > 1000) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onClick); window.removeEventListener('resize', resize); };
  }, [menuOpen]);

  const active = (to: string) => to.includes('#') ? location.pathname === '/' && location.hash === to.slice(1) : location.pathname === to && !location.hash;
  const links = navigation.map(({ to, label }) => (
    <Link key={label} to={to} onClick={() => {
      setMenuOpen(false);
      if (location.pathname === '/') {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
        if (to === '/') window.scrollTo({ top: 0, behavior });
        else if (to.startsWith('/#')) document.getElementById(to.slice(2))?.scrollIntoView({ behavior });
      }
    }} className={active(to) ? 'active' : undefined} aria-current={active(to) ? (to.includes('#') ? 'location' : 'page') : undefined}>
      {label}{menuOpen && <ArrowRight className="mobile-nav-arrow" aria-hidden="true" />}
    </Link>
  ));

  return (
    <>
      <div className="announcement">UN RITUAL QUE NOS UNE <span aria-hidden="true">·</span> Mates, yerbas y momentos compartidos</div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Navegación principal">{links}</nav>
          <div className="header-actions">
            <Link className="button button-primary header-catalog" to="/catalogo" aria-current={location.pathname === '/catalogo' ? 'page' : undefined}>
              Ver catálogo <ArrowRight aria-hidden="true" />
            </Link>
            <button className="icon-button cart-trigger" onClick={openCart} aria-label={`Abrir carrito, ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`} aria-haspopup="dialog"><ShoppingCart aria-hidden="true" /><span className="cart-count" aria-hidden="true">{cartCount}</span></button>
            <button ref={toggle} className="icon-button menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
          </div>
        </div>
        <nav ref={menu} className="mobile-menu" id="mobile-menu" aria-label="Navegación móvil" hidden={!menuOpen}>
          {links}
          <Link className="button button-primary mobile-catalog" to="/catalogo" onClick={() => setMenuOpen(false)} aria-current={location.pathname === '/catalogo' ? 'page' : undefined}>
            Ver catálogo <ArrowRight aria-hidden="true" />
          </Link>
          <p>Un buen mate siempre es un buen comienzo.</p>
        </nav>
      </header>
    </>
  );
}
