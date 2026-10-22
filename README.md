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

La suite comprueba la estructura de Home, el catálogo y los favoritos, el carrito persistente, la navegación y el responsive móvil. También verifica las secciones editoriales y su navegación por teclado. En otro equipo esta validación opcional requiere Python 3, el paquete Python `playwright` y Chromium; no se incorporan dependencias de pruebas al JavaScript de la aplicación. El mismo comando acepta el puerto 5173 para verificar el servidor de desarrollo.

## Páginas y componentes

- `/`: todas las secciones de la landing en una misma ruta: hero, **una única sección de productos favoritos**, beneficios, Nosotros, historia de la tienda y tipos de productos, guía matera, regalos, medios de pago, preguntas frecuentes, newsletter y ubicación como último bloque antes del footer.
- `/catalogo`: catálogo con búsqueda, categorías, productos guardados, orden y estados vacíos.
- La información de la tienda no tiene rutas separadas: la navegación y el footer llevan a anclas de Home. Los enlaces a entregas y cambios también abren la respuesta correspondiente dentro de las preguntas frecuentes.
- Navbar: logo, Home, Productos, Nosotros y Catálogo; carrito y menú móvil como controles auxiliares.
- `src/components/`: secciones reutilizables, navegación, tarjetas, imágenes, modales, carrito y notificaciones.
- `src/data/products.ts`: productos tipados y precios de ejemplo en pesos argentinos; `featured` controla la selección de Home.
- `src/data/faqs.ts`: preguntas y respuestas de elección, preparación y cuidado del mate.
- `src/data/storeProfile.ts`: presentación, historia breve redactada a pedido del usuario, valores y descripción de los cuatro tipos de productos.
- `src/data/paymentMethods.ts`: efectivo, transferencia, Mercado Pago y tarjetas, confirmados por el usuario. No configura un procesador de pagos.
- `src/data/storeLocation.ts`: dirección, ciudad y horarios confirmados por el usuario.
- `src/context/ShopContext.tsx`: carrito y favoritos persistentes con validación de datos locales.
- `src/styles.css`: Tailwind CSS v4, tokens del diseño y estilos responsive por componente.
- `public/images/` y `public/fonts/`: fotografías WebP y fuentes locales. Google Maps es la única integración externa opcional y carga de forma diferida al configurar una dirección.
- `preview/`: prototipo anterior conservado como referencia del diseño aprobado; la aplicación actual está en `src/`.

## Interacciones y accesibilidad

El carrito permite agregar, quitar y cambiar cantidades, calcula subtotales y persiste entre páginas y recargas. Tiene un límite de 99 unidades por producto. Los favoritos también persisten. Los filtros del catálogo viven en la URL (`categoria`, `buscar`, `favoritos`, `orden`) y admiten enlaces directos. La búsqueda ignora mayúsculas y tildes.

Los diálogos nativos administran el foco, permiten Escape y bloquean el fondo. Hay etiquetas para los controles, estados anunciados, enlace para saltar al contenido y adaptación a `prefers-reduced-motion`. Motion se usa para entradas sutiles; Lucide React proporciona los iconos y React Router la navegación.

La guía matera usa pestañas con flechas, Home y End; la orientación se adapta al diseño de escritorio o móvil. Las preguntas frecuentes usan acordeones nativos (`details` y `summary`). La propuesta de regalos enlaza al catálogo filtrado y no agrega una segunda grilla de productos.

## Ubicación y Google Maps

La ubicación configurada es **Avenida Este 12, General Alvear, Mendoza, Argentina**, con atención de **8:00 a 12:00 y de 17:00 a 21:00**. No se especifican días de la semana porque no fueron informados. `src/data/storeLocation.ts` centraliza esos datos, reutilizados por el mapa, el footer y las preguntas frecuentes.

El componente muestra el mapa embebido de Google con `loading="lazy"`, un título accesible y enlaces externos “Cómo llegar” y “Abrir en Google Maps”. No requiere una API key. La visualización requiere acceso a Google Maps desde el navegador; la app y el catálogo no dependen de esa conexión. Si en el futuro se elimina la dirección, se muestra un estado pendiente y no se inventa una ubicación.

La red cloud devolvió HTTP 403 al intentar acceder a Google Maps. Las pruebas de interfaz interceptan exclusivamente el iframe de Maps y verifican la consulta, los atributos y los enlaces con una respuesta local identificada como simulación. Eso valida la integración, no la disponibilidad de Google ni la precisión de su geocodificación.

## Referencias de las nuevas secciones

La [comparación de cuatro implementaciones públicas](docs/comparacion-landings.md) documenta fuentes, recurrencias y decisiones. Los sitios comerciales desplegados estaban bloqueados por la red del entorno; la investigación utilizó archivos públicos verificables de GitHub. Se añadieron regalos, ayuda para elegir/cuidar y FAQ. No se reutilizan testimonios ni datos comerciales de otras marcas.

## Datos de demostración

El catálogo y los precios son ilustrativos; la dirección, los horarios y los medios aceptados fueron proporcionados por el usuario. La historia breve es una redacción de marca solicitada por el usuario, sin nombres ni fechas de fundación inventados. El checkout no genera pedidos ni cobros. El newsletter valida el correo y muestra una confirmación de ejemplo, sin enviarlo ni guardarlo. No hay backend, autenticación ni integraciones de pagos, envíos o correo. No se necesitan secretos ni variables de entorno para desarrollar esta versión.

Las fotografías se generaron para la propuesta. Cormorant Garamond y DM Sans se distribuyen bajo SIL Open Font License; sus licencias se incluyen en `public/fonts/`.
