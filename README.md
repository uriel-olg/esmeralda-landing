# esmeralda-landing

Landing de **Raíces**, una tienda de mates, yerbas y accesorios. Conserva el diseño aprobado: verde bosque y oliva, blanco cálido, tipografía editorial y fotografías naturales.

## Desarrollo

Requiere Node.js 22.12 o superior; el entorno se verificó con Node 24.19.0 (ver `.nvmrc`). Usá el checkout existente del repositorio.

```bash
npm ci --include=dev
npm run dev
```

Vite inicia en el puerto 5173 con acceso desde la interfaz de red del entorno. `.npmrc` usa `/workspace/.cache/npm` para mantener la caché dentro del directorio permitido en el entorno cloud; en otro equipo podés reemplazar esa ruta por una caché local escribible.

```bash
npm run typecheck
npm run build
npm run preview
```

`build` comprueba TypeScript y genera `dist/`. `preview` sirve la compilación en el puerto 4173. Para publicar, serví `dist/` con un hosting estático que redirija las rutas de la SPA a `index.html`; así funcionan las visitas directas a `/catalogo` y las recargas.

### Validación en navegador

El entorno cloud ya dispone de Python Playwright y Chromium. Con el servidor de producción iniciado mediante `npm run preview`, ejecutá:

```bash
python3 scripts/smoke.py --base-url http://127.0.0.1:4173 --browser /usr/bin/chromium
```

Son cinco pruebas funcionales: estructura de Home, catálogo y favoritos, carrito persistente, navegación y responsive móvil. En otro equipo esta validación opcional requiere Python 3, el paquete Python `playwright` y Chromium; no se incorporan dependencias de pruebas al JavaScript de la aplicación. El mismo comando acepta el puerto 5173 para verificar el servidor de desarrollo.

## Páginas y componentes

- `/`: hero, **una única sección de productos favoritos**, beneficios, Nosotros y newsletter.
- `/catalogo`: catálogo con búsqueda, categorías, productos guardados, orden y estados vacíos.
- Navbar: logo, Home, Productos, Nosotros y Catálogo; carrito y menú móvil como controles auxiliares.
- `src/components/`: secciones reutilizables, navegación, tarjetas, imágenes, modales, carrito y notificaciones.
- `src/data/products.ts`: productos tipados y precios de ejemplo en pesos argentinos; `featured` controla la selección de Home.
- `src/context/ShopContext.tsx`: carrito y favoritos persistentes con validación de datos locales.
- `src/styles.css`: Tailwind CSS v4, tokens del diseño y estilos responsive por componente.
- `public/images/` y `public/fonts/`: fotografías WebP y fuentes locales, sin servicios externos en tiempo de ejecución.
- `preview/`: prototipo anterior conservado como referencia del diseño aprobado; la aplicación actual está en `src/`.

## Interacciones y accesibilidad

El carrito permite agregar, quitar y cambiar cantidades, calcula subtotales y persiste entre páginas y recargas. Tiene un límite de 99 unidades por producto. Los favoritos también persisten. Los filtros del catálogo viven en la URL (`categoria`, `buscar`, `favoritos`, `orden`) y admiten enlaces directos. La búsqueda ignora mayúsculas y tildes.

Los diálogos nativos administran el foco, permiten Escape y bloquean el fondo. Hay etiquetas para los controles, estados anunciados, enlace para saltar al contenido y adaptación a `prefers-reduced-motion`. Motion se usa para entradas sutiles; Lucide React proporciona los iconos y React Router la navegación.

## Datos de demostración

El catálogo, los precios y el contacto son ilustrativos. El checkout no genera pedidos ni cobros. El newsletter valida el correo y muestra una confirmación de ejemplo, sin enviarlo ni guardarlo. No hay backend, autenticación ni integraciones de pagos, envíos o correo. No se necesitan secretos ni variables de entorno para desarrollar esta versión.

Las fotografías se generaron para la propuesta. Cormorant Garamond y DM Sans se distribuyen bajo SIL Open Font License; sus licencias se incluyen en `public/fonts/`.
