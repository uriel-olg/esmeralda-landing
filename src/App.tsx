import { ArrowRight, Sprout } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { Toast } from "./components/Toast";
import { RouteEffects } from "./components/RouteEffects";
import HomePage from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";

function NotFound() {
  return (
    <div className="container not-found">
      <Sprout aria-hidden="true" />
      <p className="eyebrow">Nos fuimos de ronda</p>
      <h1>Este camino no está en el mapa.</h1>
      <p>Volvé al inicio y encontrá tu próximo ritual.</p>
      <Link className="button button-primary" to="/">
        Volver a Home <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <RouteEffects />
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Cart />
      <Toast />
    </>
  );
}
