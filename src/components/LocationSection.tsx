import { useId } from 'react';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { storeLocation } from '../data/storeLocation';
import type { StoreLocation } from '../data/storeLocation';

interface LocationSectionProps {
  location?: StoreLocation;
}

export function LocationSection({ location = storeLocation }: LocationSectionProps) {
  const captionId = useId();
  const address = location.address?.trim();
  const cityLabel = location.city?.replace(/,\s*Argentina\s*$/i, '').trim();
  const query = [address, location.city?.trim()].filter(Boolean).join(', ');
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <section className="location-section section" id="ubicacion" aria-labelledby="location-title">
      <div className="container location-layout">
        <div className="location-content">
          <p className="eyebrow">Una ronda, un punto de encuentro</p>
          <h2 id="location-title">
            {address && cityLabel ? `Nos encontramos en ${cityLabel}.` : 'Siempre cerca de tu próxima ronda.'}
          </h2>
          <p className="location-description">
            {address
              ? 'Te esperamos en Raíces para conocer nuestro mundo de mates, yerbas y accesorios. Encontrá la dirección y los horarios para planear tu visita.'
              : 'Un buen mate se disfruta todavía más cuando nos encontramos. Pronto compartiremos dónde encontrarnos.'}
          </p>

          <div className="location-details">
            {address && (
              <div className="location-detail">
                <MapPin aria-hidden="true" />
                <div><h3>{location.name}</h3><address>{address}{location.city && <><br />{location.city}</>}</address></div>
              </div>
            )}
            <div className="location-detail">
              <Clock aria-hidden="true" />
              <div><h3>Horarios de atención</h3><p>{location.hours?.trim() || 'Consultá los horarios antes de acercarte.'}</p></div>
            </div>
          </div>

          {address && (
            <a className="button button-primary" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Cómo llegar <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="location-map">
          {address ? (
            <>
              <iframe
                className="location-map-frame"
                title={`Ubicación de ${location.name}: ${query}`}
                src={embedUrl}
                width="600"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                aria-describedby={captionId}
              />
              <p className="location-caption" id={captionId}>
                ¿No ves el mapa?{' '}
                <a className="location-map-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <ArrowUpRight aria-hidden="true" /></a>
              </p>
            </>
          ) : (
            <div className="location-map-placeholder">
              <span className="location-map-icon"><MapPin aria-hidden="true" /></span>
              <h3>Estamos preparando tu visita</h3>
              <p>Pronto compartiremos la dirección de nuestro espacio.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
