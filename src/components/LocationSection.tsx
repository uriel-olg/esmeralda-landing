import { useId } from 'react';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { storeLocation } from '../data/storeLocation';
import type { StoreLocation } from '../data/storeLocation';
import { container, eyebrow, primaryButton } from '../styles/ui';

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
    <section className="location-section section border-y border-[#dce2cf] bg-[#edf0e4] py-[55px] mobile:py-[36px]" id="ubicacion" aria-labelledby="location-title">
      <div className={`location-layout ${container} grid grid-cols-[.8fr_1.2fr] items-center gap-[65px] compact:gap-[40px] tablet:grid-cols-[1fr_1.25fr] tablet:gap-[28px] mobile:grid-cols-1 mobile:gap-[27px]`}>
        <div className="location-content">
          <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.7px]`}>Una ronda, un punto de encuentro</p>
          <h2 className="mt-[15px] mb-[20px] max-w-[350px] text-[43px] leading-[1.05] compact:text-[39px] tablet:text-[36px] mobile:mt-[13px] mobile:mb-[17px] mobile:max-w-[310px] mobile:text-[39px]" id="location-title">
            {address && cityLabel ? `Nos encontramos en ${cityLabel}.` : 'Siempre cerca de tu próxima ronda.'}
          </h2>
          <p className="location-description max-w-[350px] text-[13px] leading-[1.9] text-[#606b56] mobile:max-w-[340px] mobile:text-[12px]">
            {address
              ? 'Te esperamos en Raíces para conocer nuestro mundo de mates, yerbas y accesorios. Encontrá la dirección y los horarios para planear tu visita.'
              : 'Un buen mate se disfruta todavía más cuando nos encontramos. Pronto compartiremos dónde encontrarnos.'}
          </p>

          <div className="location-details my-[24px] flex flex-col gap-[18px] mobile:my-[20px] mobile:gap-[16px]">
            {address && (
              <div className="location-detail flex items-start gap-[12px]">
                <MapPin className="mt-[2px] size-[21px] text-forest" aria-hidden="true" />
                <div><h3 className="mb-[3px] text-[12px] font-medium">{location.name}</h3><address className="text-[12px] leading-[1.8] text-[#606b56] not-italic">{address}{location.city && <><br />{location.city}</>}</address></div>
              </div>
            )}
            <div className="location-detail flex items-start gap-[12px]">
              <Clock className="mt-[2px] size-[21px] text-forest" aria-hidden="true" />
              <div><h3 className="mb-[3px] text-[12px] font-medium">Horarios de atención</h3><p className="text-[12px] leading-[1.8] text-[#606b56]">{location.hours?.trim() || 'Consultá los horarios antes de acercarte.'}</p></div>
            </div>
          </div>

          {address && (
            <a className={`button button-primary ${primaryButton} mobile:text-[11px]`} href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Cómo llegar <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="location-map overflow-hidden rounded-[13px] border border-[#d2dac3] bg-paper shadow-[0_8px_30px_#30483206]">
          {address ? (
            <>
              <iframe
                className="location-map-frame block h-[340px] w-full border-0 bg-[#e6e9de] mobile:h-[300px] mobile:min-h-[300px]"
                title={`Ubicación de ${location.name}: ${query}`}
                src={embedUrl}
                width="600"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                aria-describedby={captionId}
              />
              <p className="location-caption px-[16px] py-[12px] text-[10px] leading-[1.7] text-muted mobile:text-[9px]" id={captionId}>
                ¿No ves el mapa?{' '}
                <a className="location-map-link inline-flex items-center gap-[3px] text-forest underline underline-offset-[3px]" href={mapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <ArrowUpRight className="size-[12px]" aria-hidden="true" /></a>
              </p>
            </>
          ) : (
            <div className="location-map-placeholder flex min-h-[340px] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_20%,#fdfcf8aa,transparent_80%),repeating-linear-gradient(35deg,#e8ecdf,#e8ecdf_36px,#f2f3eb_36px,#f2f3eb_39px,#e8ecdf_39px,#e8ecdf_90px)] p-[35px] text-center tablet:min-h-[330px] tablet:p-[27px] mobile:h-[300px] mobile:min-h-[300px] mobile:p-[25px]">
              <span className="location-map-icon mb-[23px] grid size-[69px] place-items-center rounded-full bg-forest text-[#f8f6f0] shadow-[0_0_0_11px_#3048320b]"><MapPin className="size-[29px]" aria-hidden="true" /></span>
              <h3 className="font-display text-[29px] leading-[1.1] font-medium mobile:text-[28px] small:text-[26px]">Estamos preparando tu visita</h3>
              <p className="mt-[11px] max-w-[300px] text-[12px] leading-[1.8] text-[#606b56] mobile:text-[11px]">Pronto compartiremos la dirección de nuestro espacio.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
