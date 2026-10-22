import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, ShoppingCart, X } from 'lucide-react';
import { Brand } from './Brand';
import { useShop } from '../context/ShopContext';
import { buttonBase, container, iconButton } from '../styles/ui';

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
  const renderLinks = (mode: 'desktop' | 'mobile') => navigation.map(({ to, label }) => (
    <Link key={label} to={to} onClick={() => {
      setMenuOpen(false);
      if (location.pathname === '/') {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
        if (to === '/') window.scrollTo({ top: 0, behavior });
        else if (to.startsWith('/#')) document.getElementById(to.slice(2))?.scrollIntoView({ behavior });
      }
    }} className={mode === 'desktop'
      ? `relative whitespace-nowrap py-[9px] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-forest after:content-[''] after:[transition:right_.25s] fine:hover:after:right-0 ${active(to) ? 'active after:right-0' : 'after:right-full'}`
      : `flex items-center justify-between gap-0 border-b border-line px-[4px] py-[12px] text-[14px] ${active(to) ? 'active font-medium text-forest' : ''}`}
      aria-current={active(to) ? (to.includes('#') ? 'location' : 'page') : undefined}>
      {label}{mode === 'mobile' && <ArrowRight className="mobile-nav-arrow block size-[16px]" aria-hidden="true" />}
    </Link>
  ));

  return (
    <>
      <div className="announcement bg-forest px-[16px] py-[8px] text-center text-[10px] tracking-[1px] text-[#eef0e7] tablet:text-[9px] mobile:py-[7px] mobile:text-[8px] mobile:tracking-[.5px] small:text-[7px]">UN RITUAL QUE NOS UNE <span className="mx-[18px] opacity-[.55] mobile:mx-[7px]" aria-hidden="true">·</span> Mates, yerbas y momentos compartidos</div>
      <header className="site-header sticky top-0 z-20 border-b border-[#e1e1d788] bg-[#faf8f3f2] backdrop-blur-[16px]">
        <div className={`header-inner ${container} flex h-[88px] items-center justify-between gap-[32px] compact:gap-[20px] tablet:h-[78px] tablet:gap-[16px] mobile:h-[74px] mobile:gap-[15px]`}>
          <Brand />
          <nav className="main-nav flex items-center gap-[25px] text-[12px] compact:gap-[20px] menu:hidden" aria-label="Navegación principal">{renderLinks('desktop')}</nav>
          <div className="header-actions flex items-center justify-end gap-[16px] tablet:min-w-0 tablet:gap-[12px]">
            <Link className={`button button-primary header-catalog ${buttonBase} shrink-0 gap-[11px] bg-forest px-[18px] py-[11px] text-[12px] whitespace-nowrap text-white fine:hover:bg-[#223a26] menu:hidden`} to="/catalogo" aria-current={location.pathname === '/catalogo' ? 'page' : undefined}>
              Ver catálogo <ArrowRight aria-hidden="true" />
            </Link>
            <button className={`icon-button cart-trigger ${iconButton}`} onClick={openCart} aria-label={`Abrir carrito, ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`} aria-haspopup="dialog"><ShoppingCart className="mobile:size-[21px]" aria-hidden="true" /><span className="cart-count absolute top-[-2px] right-[-3px] grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-cream bg-forest text-[9px] text-white" aria-hidden="true">{cartCount}</span></button>
            <button ref={toggle} className={`icon-button menu-toggle ${iconButton} hidden menu:grid`} onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X className="mobile:size-[21px]" aria-hidden="true" /> : <Menu className="mobile:size-[21px]" aria-hidden="true" />}</button>
          </div>
        </div>
        <nav ref={menu} className="mobile-menu absolute top-full right-0 left-0 hidden max-h-[calc(100dvh_-_120px)] overflow-y-auto overscroll-contain border-b border-line bg-cream px-[24px] pt-[15px] pb-[24px] shadow-[0_16px_20px_#1d2a1e10] menu:block mobile:px-[20px]" id="mobile-menu" aria-label="Navegación móvil" hidden={!menuOpen}>
          {renderLinks('mobile')}
          <Link className={`button button-primary mobile-catalog ${buttonBase} mt-[20px] flex! gap-[12px] rounded-[8px]! border-0! bg-forest px-[18px] py-[13px] text-[12px] text-white fine:hover:bg-[#223a26]`} to="/catalogo" onClick={() => setMenuOpen(false)} aria-current={location.pathname === '/catalogo' ? 'page' : undefined}>
            Ver catálogo <ArrowRight aria-hidden="true" />
          </Link>
          <p className="mt-[19px] text-[10px] text-muted">Un buen mate siempre es un buen comienzo.</p>
        </nav>
      </header>
    </>
  );
}
