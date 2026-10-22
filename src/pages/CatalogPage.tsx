import { useEffect, useMemo, useRef } from 'react';
import { ChevronRight, Heart, RotateCcw, Search, ShoppingBag, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { categories, products } from '../data/products';
import { container, demoNote, eyebrow, primaryButton } from '../styles/ui';

const sortOptions = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'nombre', label: 'Nombre: A a Z' },
] as const;

function normalized(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-AR');
}

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useShop();
  const requestedCategory = searchParams.get('categoria') ?? 'Todos';
  const category = categories.some((item) => item === requestedCategory) ? requestedCategory : 'Todos';
  const query = searchParams.get('buscar') ?? '';
  const favoritesOnly = searchParams.get('favoritos') === '1';
  const requestedSort = searchParams.get('orden') ?? 'destacados';
  const sort = sortOptions.some((option) => option.value === requestedSort) ? requestedSort : 'destacados';
  const filtersActive = category !== 'Todos' || query.trim() !== '' || favoritesOnly;
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const previousFavoriteCount = useRef(favorites.length);

  useEffect(() => {
    if (favoritesOnly && favorites.length < previousFavoriteCount.current && document.activeElement === document.body) {
      summaryRef.current?.focus({ preventScroll: true });
    }
    previousFavoriteCount.current = favorites.length;
  }, [favorites.length, favoritesOnly]);

  function updateParameter(key: string, value: string, defaultValue = '') {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value === defaultValue) next.delete(key);
      else next.set(key, value);
      return next;
    }, { replace: true, preventScrollReset: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true, preventScrollReset: true });
  }

  const visibleProducts = useMemo(() => {
    const search = normalized(query.trim());
    const result = products.filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category;
      const matchesSearch = normalized(`${product.name} ${product.category} ${product.detail}`).includes(search);
      const matchesFavorite = !favoritesOnly || favorites.includes(product.id);
      return matchesCategory && matchesSearch && matchesFavorite;
    });

    switch (sort) {
      case 'precio-asc': return result.sort((first, second) => first.price - second.price);
      case 'precio-desc': return result.sort((first, second) => second.price - first.price);
      case 'nombre': return result.sort((first, second) => first.name.localeCompare(second.name, 'es-AR'));
      default: return result.sort((first, second) => Number(second.featured) - Number(first.featured));
    }
  }, [category, query, favoritesOnly, favorites, sort]);

  return (
    <div className={`catalog-page ${container} min-h-[65vh] pt-[32px] pb-[58px] mobile:pt-[23px] mobile:pb-[35px]`}>
      <nav className="catalog-breadcrumb mb-[35px] flex items-center gap-[9px] text-[11px] text-muted mobile:mb-[25px] mobile:text-[10px]" aria-label="Ruta de navegación">
        <Link className="[&:hover]:text-forest [&:hover]:underline" to="/">Home</Link>
        <ChevronRight className="size-[13px]" aria-hidden="true" />
        <span aria-current="page">Catálogo</span>
      </nav>

      <header className="catalog-heading mb-[35px] mobile:mb-[24px]">
        <p className={`eyebrow ${eyebrow} mobile:text-[8px] mobile:tracking-[1.8px]`}>Encontrá tu próximo ritual</p>
        <h1 className="mt-[9px] mb-[12px] text-[64px] leading-[1.1] tracking-[-1.5px] tablet:text-[56px] mobile:my-[11px] mobile:text-[43px] mobile:tracking-[-1px]">La ronda empieza acá.</h1>
        <p className="catalog-intro text-[13px] text-muted mobile:max-w-[270px] mobile:text-[12px]">Yerbas, mates y accesorios para los pequeños grandes momentos.</p>
      </header>

      <div className="catalog-toolbar mb-[23px] flex items-center justify-between gap-[20px] mobile:mb-[17px] mobile:flex-col mobile:items-stretch mobile:gap-[11px]">
        <div className="catalog-search flex min-h-[49px] max-w-[550px] flex-1 items-center gap-[12px] rounded-[8px] border border-[#cbd1c1] bg-paper px-[14px] py-[8px] text-forest mobile:w-full mobile:max-w-none">
          <Search className="size-[18px]" aria-hidden="true" />
          <label className="sr-only" htmlFor="catalog-search">Buscar productos en el catálogo</label>
          <input
            id="catalog-search"
            className="w-full min-w-0 border-0 bg-transparent py-[4px] text-[12px]"
            type="search"
            placeholder="Buscá yerbas, mates, termos…"
            value={query}
            onChange={(event) => updateParameter('buscar', event.target.value)}
          />
          {query && (
            <button type="button" className="icon-button relative grid place-items-center rounded-[5px] bg-transparent p-[4px]" aria-label="Limpiar búsqueda" onClick={() => {
              updateParameter('buscar', '');
              document.getElementById('catalog-search')?.focus();
            }}>
              <X className="size-[16px]" aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          className={`catalog-favorites flex items-center justify-center gap-[9px] rounded-[7px] border px-[17px] py-[12px] text-[11px] whitespace-nowrap ${favoritesOnly ? 'is-active border-olive bg-[#e8eddf] text-forest' : 'border-[#cbd1c1]'} mobile:self-start mobile:px-[12px] mobile:py-[9px] mobile:text-[10px]`}
          type="button"
          aria-pressed={favoritesOnly}
          onClick={() => updateParameter('favoritos', favoritesOnly ? '' : '1')}
        >
          <Heart className="size-[16px]" aria-hidden="true" fill={favoritesOnly ? 'currentColor' : 'none'} />
          Mis favoritos <span>({favorites.length})</span>
        </button>
      </div>

      <div className="catalog-filters flex items-center justify-between gap-[20px] border-b border-line pt-[8px] pb-[22px] tablet:flex-col tablet:items-start tablet:gap-[16px] mobile:gap-[15px] mobile:pb-[17px]">
        <div className="filter-list flex flex-wrap gap-[7px] mobile:gap-[6px]" role="group" aria-label="Filtrar por categoría">
          {categories.map((item) => (
            <button
              className={`filter rounded-[22px] border px-[17px] py-[7px] text-[11px] [transition:background_.2s,border-color_.2s] fine:hover:border-forest ${category === item ? 'active border-forest bg-forest text-white' : 'border-[#d3d7ca] bg-transparent text-[#5c6754]'} mobile:px-[12px] mobile:py-[6px] mobile:text-[10px]`}
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => updateParameter('categoria', item, 'Todos')}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="catalog-sort flex items-center gap-[9px] text-[10px] whitespace-nowrap mobile:w-full mobile:justify-between">
          <span className="text-muted">Ordenar por</span>
          <select className="rounded-[6px] border border-line bg-paper py-[8px] pr-[24px] pl-[10px] text-[11px]" value={sort} onChange={(event) => updateParameter('orden', event.target.value, 'destacados')}>
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      <div className="catalog-summary flex min-h-[60px] items-center justify-between gap-[12px] text-[11px] text-muted focus:outline-none mobile:min-h-[59px] mobile:text-[10px]">
        <p role="status" aria-live="polite" ref={summaryRef} tabIndex={-1}>
          {visibleProducts.length} {visibleProducts.length === 1 ? 'producto' : 'productos'}
          {category !== 'Todos' && ` en ${category.toLocaleLowerCase('es-AR')}`}
          {favoritesOnly && ' guardados en tus favoritos'}
        </p>
        {filtersActive && (
          <button className="text-link inline-flex items-center gap-[10px] py-[4px] text-[11px] font-medium whitespace-nowrap text-forest [&_svg]:size-[17px] [&_svg]:[transition:transform_.2s] fine:hover:[&_svg]:[transform:translateX(4px)] mobile:gap-[6px] mobile:text-[9px] mobile:[&_svg]:w-[14px]" type="button" onClick={clearFilters}>
            Limpiar filtros <RotateCcw aria-hidden="true" />
          </button>
        )}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid catalog-grid grid grid-cols-3 gap-[22px] compact:gap-[12px] tablet:grid-cols-2 tablet:gap-[15px] mobile:gap-[12px]">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} variant="catalog" />)}
        </div>
      ) : (
        <div className="catalog-empty rounded-[12px] border border-line bg-[#f0f0e7] px-[20px] py-[60px] text-center mobile:px-[15px] mobile:py-[35px]">
          {favoritesOnly ? <Heart className="mx-auto mb-[18px] size-[42px] text-olive" aria-hidden="true" /> : <ShoppingBag className="mx-auto mb-[18px] size-[42px] text-olive" aria-hidden="true" />}
          <h2 className="text-[35px] mobile:text-[30px]">{favoritesOnly && favorites.length === 0 ? 'Tu ronda de favoritos está por empezar.' : 'No encontramos ese ritual.'}</h2>
          <p className="mx-auto mt-[13px] mb-[23px] max-w-[400px] text-[12px] text-muted mobile:text-[11px]">{favoritesOnly && favorites.length === 0 ? 'Tocá el corazón de los productos que te gustan para encontrarlos acá.' : 'Probá otra búsqueda o quitá los filtros para ver todos los productos.'}</p>
          <button className={`button button-primary ${primaryButton}`} type="button" onClick={clearFilters}>Explorar el catálogo</button>
        </div>
      )}

      <p className={`demo-note ${demoNote}`}>Catálogo de ejemplo · Precios en pesos argentinos · Fotografías ilustrativas</p>
    </div>
  );
}
