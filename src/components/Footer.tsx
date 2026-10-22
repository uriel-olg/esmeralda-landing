import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from './Brand';
import { storeLocation } from '../data/storeLocation';
import { container } from '../styles/ui';

const footerTitle = 'mb-[13px] font-sans text-[11px] font-medium tracking-normal mobile:mb-[10px] mobile:tracking-[-.7px]';
const footerLinks = 'flex flex-col items-start gap-[7px] text-[10px] text-[#5f6a57] [&_a:hover]:underline [&_a:hover]:underline-offset-4';

export function Footer() {
  return (
    <footer className={container} id="contacto">
      <div className="footer-main grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-[40px] py-[43px] compact:gap-[25px] tablet:grid-cols-[1.4fr_1fr_1fr] mobile:grid-cols-2 mobile:gap-x-[18px] mobile:gap-y-[29px] mobile:py-[31px]">
        <div className="footer-brand mobile:col-span-full">
          <Brand variant="footer" />
          <p className="footer-description mt-[16px] max-w-[220px] text-[10px] leading-[1.9] text-muted mobile:mt-[14px] mobile:max-w-[290px]">Mates, yerbas y accesorios desde General Alvear, Mendoza.<br />Pequeños rituales. Grandes momentos.</p>
        </div>
        <div>
          <h2 className={`footer-title ${footerTitle}`}>Explorá la tienda</h2>
          <nav className={`footer-links ${footerLinks}`} aria-label="Tienda">
            <Link to="/catalogo?categoria=Yerbas">Yerbas seleccionadas</Link>
            <Link to="/catalogo?categoria=Mates">Mates artesanales</Link>
            <Link to="/catalogo?categoria=Accesorios">Termos y accesorios</Link>
            <Link to="/catalogo?categoria=Regalos">Sets para regalar</Link>
          </nav>
        </div>
        <div>
          <h2 className={`footer-title ${footerTitle}`}>Estamos cerca</h2>
          <nav className={`footer-links ${footerLinks}`} aria-label="Información de la tienda">
            <Link to="/#nosotros">Quiénes somos</Link>
            <Link to="/#guia">Guía matera</Link>
            <Link to="/#medios-de-pago">Medios de pago</Link>
            <Link to="/#preguntas-frecuentes">Preguntas frecuentes</Link>
            <Link to="/#faq-envios">Entregas</Link>
            <Link to="/#faq-cambios">Cambios y devoluciones</Link>
          </nav>
        </div>
        <div className="footer-contact tablet:col-span-full tablet:flex tablet:items-center tablet:justify-between tablet:gap-[15px] mobile:block">
          <h2 className="footer-title mb-[13px] font-sans text-[11px] font-medium tracking-normal tablet:mb-0 mobile:mb-[11px] mobile:tracking-[-.7px]">Vení a conocernos</h2>
          <div className={`footer-links ${footerLinks} tablet:flex-row tablet:flex-wrap tablet:gap-x-[20px] tablet:gap-y-[12px] mobile:gap-[10px]`}>
            <address className="leading-[1.85] not-italic">{storeLocation.address}<br />{storeLocation.city}</address>
            <span>{storeLocation.hours}</span>
            <Link className="footer-location-link inline-flex items-center gap-[6px]" to="/#ubicacion"><MapPin className="size-[14px]" aria-hidden="true" />Ubicación y cómo llegar</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom flex justify-between gap-[20px] border-t border-line py-[17px] text-[9px] text-muted mobile:flex-col mobile:gap-[7px] mobile:py-[16px] mobile:text-[8px]">
        <span>© {new Date().getFullYear()} Raíces. Hecho con tiempo, para compartir.</span>
        <span className="demo-badge flex items-center gap-[6px]"><span className="demo-dot size-[5px] shrink-0 rounded-full bg-olive" aria-hidden="true" />Catálogo de ejemplo · Las compras online son una demostración</span>
      </div>
    </footer>
  );
}
