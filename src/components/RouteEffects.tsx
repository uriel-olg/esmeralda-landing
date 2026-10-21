import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = pathname === '/catalogo' ? 'Catálogo — Raíces, mates y yerbas' : pathname === '/' ? 'Raíces — Mates, yerbas y momentos compartidos' : 'Página no encontrada — Raíces';
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      // Route changes should announce the new screen. Query edits keep the search field focused.
      if (!hash) document.getElementById('contenido')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
