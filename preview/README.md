# Raíces — Vista previa para revisión de diseño

Abrí `vista-previa.html` en un navegador. Es un archivo autónomo: contiene las imágenes, las fuentes, los estilos y las interacciones, sin instalación ni conexiones externas.

`index.html` es el prototipo editable y usa los archivos de `assets/`. Para probarlo con un servidor local, desde este directorio ejecutá `python3 -m http.server 4173 --bind 127.0.0.1` y visitá el puerto 4173 en tu navegador. Detené ese servidor con Ctrl+C cuando termines.

## Qué se puede probar

- Navegación por secciones y menú móvil.
- Filtros por categoría, incluidos sets de regalo.
- Búsqueda de productos y favoritos persistentes.
- Carrito persistente, cambio de cantidades, eliminación y subtotal en pesos argentinos.
- Confirmaciones de compra y suscripción de demostración; no realizan pedidos, cobros ni envían o guardan correos.
- Diálogos accesibles con cierre mediante Escape, retorno de foco y navegación con teclado.
- Adaptación a movimiento reducido del sistema.

Los productos, precios, ofertas y canales de contacto son ejemplos. Las fotografías se generaron para esta propuesta. Las fuentes Cormorant Garamond y DM Sans se distribuyen bajo SIL Open Font License; las licencias están en `assets/fonts/` y también incluidas en el HTML autónomo.

## Próxima etapa

Este es un prototipo de diseño interactivo, anterior a la implementación final. Una vez aprobado el diseño, se desarrollará en React y TypeScript, con Tailwind CSS v4, React Router, Lucide React y Motion, separando las secciones en componentes reutilizables y los productos en datos tipados.

No se ha conectado un catálogo real, autenticación, servicio de correo, pagos ni logística.
