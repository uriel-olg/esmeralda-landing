import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from './Brand';
import { storeLocation } from '../data/storeLocation';

export function Footer() {
  return (
    <footer className="container" id="contacto">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p className="footer-description">Mates, yerbas y accesorios desde General Alvear, Mendoza.<br />Pequeños rituales. Grandes momentos.</p>
        </div>
        <div>
          <h2 className="footer-title">Explorá la tienda</h2>
          <nav className="footer-links" aria-label="Tienda">
            <Link to="/catalogo?categoria=Yerbas">Yerbas seleccionadas</Link>
            <Link to="/catalogo?categoria=Mates">Mates artesanales</Link>
            <Link to="/catalogo?categoria=Accesorios">Termos y accesorios</Link>
            <Link to="/catalogo?categoria=Regalos">Sets para regalar</Link>
          </nav>
        </div>
        <div>
          <h2 className="footer-title">Estamos cerca</h2>
          <nav className="footer-links" aria-label="Información de la tienda">
            <Link to="/#nosotros">Quiénes somos</Link>
            <Link to="/#guia">Guía matera</Link>
            <Link to="/#medios-de-pago">Medios de pago</Link>
            <Link to="/#preguntas-frecuentes">Preguntas frecuentes</Link>
            <Link to="/#faq-envios">Entregas</Link>
            <Link to="/#faq-cambios">Cambios y devoluciones</Link>
          </nav>
        </div>
        <div className="footer-contact">
          <h2 className="footer-title">Vení a conocernos</h2>
          <div className="footer-links">
            <address>{storeLocation.address}<br />{storeLocation.city}</address>
            <span>{storeLocation.hours}</span>
            <Link className="footer-location-link" to="/#ubicacion"><MapPin aria-hidden="true" />Ubicación y cómo llegar</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Raíces. Hecho con tiempo, para compartir.</span>
        <span className="demo-badge"><span className="demo-dot" aria-hidden="true" />Catálogo de ejemplo · Las compras online son una demostración</span>
      </div>
    </footer>
  );
}
