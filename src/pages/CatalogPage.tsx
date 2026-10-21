import { useEffect, useMemo, useRef } from 'react';
import { ChevronRight, Heart, RotateCcw, Search, ShoppingBag, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { categories, products } from '../data/products';

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
    <div className="catalog-page container">
      <nav className="catalog-breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Home</Link>
        <ChevronRight aria-hidden="true" />
        <span aria-current="page">Catálogo</span>
      </nav>

      <header className="catalog-heading">
        <p className="eyebrow">Encontrá tu próximo ritual</p>
        <h1>La ronda empieza acá.</h1>
        <p className="catalog-intro">Yerbas, mates y accesorios para los pequeños grandes momentos.</p>
      </header>

      <div className="catalog-toolbar">
        <div className="catalog-search">
          <Search aria-hidden="true" />
          <label className="sr-only" htmlFor="catalog-search">Buscar productos en el catálogo</label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Buscá yerbas, mates, termos…"
            value={query}
            onChange={(event) => updateParameter('buscar', event.target.value)}
          />
          {query && (
            <button type="button" className="icon-button" aria-label="Limpiar búsqueda" onClick={() => {
              updateParameter('buscar', '');
              document.getElementById('catalog-search')?.focus();
            }}>
              <X aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          className={`catalog-favorites ${favoritesOnly ? 'is-active' : ''}`}
          type="button"
          aria-pressed={favoritesOnly}
          onClick={() => updateParameter('favoritos', favoritesOnly ? '' : '1')}
        >
          <Heart aria-hidden="true" fill={favoritesOnly ? 'currentColor' : 'none'} />
          Mis favoritos <span>({favorites.length})</span>
        </button>
      </div>

      <div className="catalog-filters">
        <div className="filter-list" role="group" aria-label="Filtrar por categoría">
          {categories.map((item) => (
            <button
              className={`filter ${category === item ? 'active' : ''}`}
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => updateParameter('categoria', item, 'Todos')}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="catalog-sort">
          <span>Ordenar por</span>
          <select value={sort} onChange={(event) => updateParameter('orden', event.target.value, 'destacados')}>
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      <div className="catalog-summary">
        <p role="status" aria-live="polite" ref={summaryRef} tabIndex={-1}>
          {visibleProducts.length} {visibleProducts.length === 1 ? 'producto' : 'productos'}
          {category !== 'Todos' && ` en ${category.toLocaleLowerCase('es-AR')}`}
          {favoritesOnly && ' guardados en tus favoritos'}
        </p>
        {filtersActive && (
          <button className="text-link" type="button" onClick={clearFilters}>
            Limpiar filtros <RotateCcw aria-hidden="true" />
          </button>
        )}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid catalog-grid">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="catalog-empty">
          {favoritesOnly ? <Heart aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}
          <h2>{favoritesOnly && favorites.length === 0 ? 'Tu ronda de favoritos está por empezar.' : 'No encontramos ese ritual.'}</h2>
          <p>{favoritesOnly && favorites.length === 0 ? 'Tocá el corazón de los productos que te gustan para encontrarlos acá.' : 'Probá otra búsqueda o quitá los filtros para ver todos los productos.'}</p>
          <button className="button button-primary" type="button" onClick={clearFilters}>Explorar el catálogo</button>
        </div>
      )}

      <p className="demo-note">Catálogo de ejemplo · Precios en pesos argentinos · Fotografías ilustrativas</p>
    </div>
  );
}
