import { Link } from 'react-router-dom';

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Raíces, Home" onClick={() => { if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>
      <svg className="brand-leaf" viewBox="0 0 32 44" aria-hidden="true">
        <path d="M16 42V5M16 25C4 26 2 17 3 13c9 1 13 5 13 12ZM16 35c12 0 15-8 14-12-9 0-14 5-14 12ZM16 18C8 11 12 5 16 1c6 6 7 12 0 17Z" />
        <path d="m3 13 13 12m14-2L16 35" />
      </svg>
      <span><span className="brand-name">Raíces</span><span className="brand-sub">Mates & yerbas</span></span>
    </Link>
  );
}
