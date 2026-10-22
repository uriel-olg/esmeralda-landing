import { Link } from 'react-router-dom';

interface BrandProps {
  variant?: 'header' | 'footer';
}

export function Brand({ variant = 'header' }: BrandProps) {
  const nameSize = variant === 'footer'
    ? 'text-[35px] tablet:text-[34px] mobile:text-[34px]'
    : 'text-[39px] tablet:text-[34px] mobile:text-[35px]';

  return (
    <Link to="/" className="brand inline-flex shrink-0 items-center gap-[10px]" aria-label="Raíces, inicio" onClick={() => { if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>
      <svg className="brand-leaf h-[44px] w-[34px] fill-none stroke-current text-forest [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.3] tablet:w-[28px] mobile:h-[37px]" viewBox="0 0 32 44" aria-hidden="true">
        <path d="M16 42V5M16 25C4 26 2 17 3 13c9 1 13 5 13 12ZM16 35c12 0 15-8 14-12-9 0-14 5-14 12ZM16 18C8 11 12 5 16 1c6 6 7 12 0 17Z" />
        <path d="m3 13 13 12m14-2L16 35" />
      </svg>
      <span><span className={`brand-name block font-display ${nameSize} leading-[.95] font-semibold tracking-[-1px]`}>Raíces</span><span className="brand-sub mt-[7px] block text-[7px] tracking-[2.6px] uppercase tablet:text-[6px] mobile:tracking-[2px]">Mates & yerbas</span></span>
    </Link>
  );
}
