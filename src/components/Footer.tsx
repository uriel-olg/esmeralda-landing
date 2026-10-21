import { useState } from 'react';
import { Camera, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from './Brand';
import { Modal } from './Modal';

const info = {
  shipping: { title: 'Un mate, en cualquier lugar.', paragraphs: ['La propuesta contempla envíos a todo el país. En una tienda real, el costo y los plazos se informan antes de confirmar la compra.', 'Este catálogo es ilustrativo: todavía no se realizan envíos ni se reciben pedidos.'] },
  returns: { title: 'Queremos que lo disfrutes.', paragraphs: ['Las condiciones de cambios y devoluciones se incorporarán al conectar la tienda real, junto con un canal de atención para acompañarte.', 'Esta demostración no realiza pedidos ni establece una política comercial definitiva.'] },
  care: { title: 'Un ritual que se cuida.', paragraphs: ['Después de cada mate, retirá la yerba y enjuagá con agua tibia. Evitá el detergente en los mates de calabaza y dejalos secar con buena ventilación.', 'El curado y los cuidados dependen del material. Seguí siempre las indicaciones de quien fabrica tu mate.'] },
  contact: { title: 'Estamos para acompañarte.', paragraphs: ['hola@raices.ejemplo es un contacto ilustrativo. No se envían mensajes desde esta demostración.', 'Los canales reales de atención y el perfil de Instagram se incorporarán con los datos de la tienda.'] },
} as const;
type InfoKey = keyof typeof info;

export function Footer() {
  const [selected, setSelected] = useState<InfoKey | null>(null);
  const content = selected ? info[selected] : null;
  return (
    <>
      <footer className="container" id="contacto">
        <div className="footer-main">
          <div className="footer-brand"><Brand /><p className="footer-description">Pequeños rituales. Grandes momentos.<br />Todo para disfrutar un buen mate, siempre.</p></div>
          <div><h2 className="footer-title">Explorá la tienda</h2><nav className="footer-links" aria-label="Tienda"><Link to="/catalogo?categoria=Yerbas">Yerbas seleccionadas</Link><Link to="/catalogo?categoria=Mates">Mates artesanales</Link><Link to="/catalogo?categoria=Accesorios">Termos y accesorios</Link><Link to="/catalogo?categoria=Regalos">Sets para regalar</Link></nav></div>
          <div><h2 className="footer-title">Estamos cerca</h2><nav className="footer-links" aria-label="Ayuda"><Link to="/#nosotros">Nuestra historia</Link><button onClick={() => setSelected('shipping')}>Envíos y entregas</button><button onClick={() => setSelected('returns')}>Cambios y devoluciones</button><button onClick={() => setSelected('care')}>Cómo cuidar tu mate</button></nav></div>
          <div className="footer-contact"><h2 className="footer-title">Conversemos</h2><div className="footer-links"><button onClick={() => setSelected('contact')}>hola@raices.ejemplo</button><span>Un buen mate siempre nos encuentra.</span></div><div className="socials"><button onClick={() => setSelected('contact')} aria-label="Información de Instagram de Raíces"><Camera aria-hidden="true" /></button><button onClick={() => setSelected('contact')} aria-label="Información de contacto"><MessageCircle aria-hidden="true" /></button></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Raíces. Hecho con tiempo, para compartir.</span><span className="demo-badge"><span className="demo-dot" aria-hidden="true" />Tienda de ejemplo · Productos, precios y contacto ilustrativos</span></div>
      </footer>
      <Modal open={selected !== null} onClose={() => setSelected(null)} title={content?.title ?? 'Raíces'} id="footer-info"><div className="modal-body info-copy">{content?.paragraphs.map((text) => <p key={text}>{text}</p>)}</div></Modal>
    </>
  );
}
