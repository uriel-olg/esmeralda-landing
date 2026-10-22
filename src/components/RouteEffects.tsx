import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  const previousRoute = useRef<string | null>(null);
  useEffect(() => {
    document.title = pathname === '/catalogo' ? 'Catálogo — Raíces, mates y yerbas' : pathname === '/' ? 'Raíces — Mates y yerbas en General Alvear' : 'Página no encontrada — Raíces';
    const route = pathname + hash;
    const queryOnlyChange = previousRoute.current === route && pathname === '/catalogo';
    previousRoute.current = route;
    if (queryOnlyChange) return;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      const accordion = target.closest('details');
      if (accordion) accordion.open = true;
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Route changes should announce the new screen. Query edits keep the search field focused.
    if (!hash) document.getElementById('contenido')?.focus({ preventScroll: true });
  }, [pathname, hash, key]);
  return null;
}
