import { ArrowRight, Sprout } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';
import { RouteEffects } from './components/RouteEffects';
import HomePage from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { container, eyebrow, primaryButton } from './styles/ui';

function NotFound() {
  return <div className={`not-found ${container} text-center py-[90px] mobile:py-[60px]`}><Sprout className="size-[50px] mx-auto mb-[20px] text-olive" aria-hidden="true" /><p className={`eyebrow ${eyebrow}`}>Nos fuimos de ronda</p><h1 className="text-[58px] leading-[1.1] my-[12px] mobile:text-[42px]">Este camino no está en el mapa.</h1><p className="text-muted mb-[27px]">Volvé al inicio y encontrá tu próximo ritual.</p><Link className={`button button-primary ${primaryButton}`} to="/">Volver a Home <ArrowRight aria-hidden="true" /></Link></div>;
}

export default function App() {
  return (
    <>
      <a className="skip fixed -top-[100px] left-[16px] bg-forest text-white p-[12px] z-[100] rounded-[5px] focus:top-[12px]" href="#contenido">Saltar al contenido</a>
      <RouteEffects />
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Routes><Route path="/" element={<HomePage />} /><Route path="/catalogo" element={<CatalogPage />} /><Route path="*" element={<NotFound />} /></Routes>
      </main>
      <Footer />
      <Cart />
      <Toast />
    </>
  );
}
