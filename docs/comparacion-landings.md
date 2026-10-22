# Comparación de implementaciones públicas de tiendas de mate

Consulta: 20 de octubre de 2026 (hora del cliente). Las visitas a los sitios comerciales en vivo y buscadores devolvieron CONNECT 403 del proxy. La comparación siguiente se basa exclusivamente en fuentes HTML/React públicas leídas en GitHub; no acredita visitas a sus sitios desplegados ni valida sus afirmaciones comerciales. Muestra exploratoria de cuatro implementaciones, no un estudio representativo del mercado.

## Fuentes verificadas

1. PROMATE: https://github.com/promate-tienda/promate-web/blob/main/index.html
   Lectura: https://raw.githubusercontent.com/promate-tienda/promate-web/main/index.html
   Evidencia: "GRABADO LÁSER PERSONALIZADO EN LA PLATA", "EXPERIENCIAS REALES", "MAURICIO, FUNDADOR DE PROMATE", "UNITE A LA COMUNIDAD PROMATE", "DESPACHAMOS A TODO EL PAÍS", "Contanos qué necesitás y lo armamos juntos." El texto menciona regalos corporativos e institucionales. Footer: Villa Garibaldi, La Plata. No se verifica que reseñas o cantidades de clientes sean auténticas.

2. Yerba Mate La Rioja: https://github.com/rocketeleven/yerba-mate-landing-page/blob/main/app/page.tsx
   Personalización: https://github.com/rocketeleven/yerba-mate-landing-page/blob/main/components/personalization-section.tsx
   FAQ: https://github.com/rocketeleven/yerba-mate-landing-page/blob/main/components/faq-section.tsx
   Evidencia: Home renderiza TrustStrip, BrandStory, FeaturedProducts, PersonalizationSection, LifestyleSection, GallerySection, TestimonialsSection, FAQSection y FinalCTA. "Personalizá tu mate a tu manera" presenta tres pasos y CTA por WhatsApp. FAQ: pedido, envíos, modelos, personalización y regalos. No se verifican reseñas ni servicios fuera de su código.

3. Matear: https://github.com/martin-schvartzman03/landing/blob/main/index.html
   Evidencia: "What is Matear?", "Our products and services", "Mate Starter Kit", "Mate Course & eBook", "Yerba Mate Subscription". Tiene invitación a waitlist y seguimiento en Instagram. El kit es de iniciación, no se cuenta como regalo porque la fuente no lo identifica así.

4. El Buen Mate: https://github.com/tiago31rojas/LandingPage-Tienda-/blob/main/Landing%20Page/mates/index.html
   Evidencia: "Sobre Nosotros", "Nuestros Productos", "Lo que dicen nuestros clientes", "Contactanos", footer con dirección y redes. No se verifica autenticidad de historias, testimonios o direcciones; no se reutilizan.

## Matriz de presencia en los archivos leídos

| Bloque | PROMATE | Yerba Mate LR | Matear | El Buen Mate | Presencia |
|---|---|---|---|---|---|
| Presentación / productos / identidad de marca | Sí | Sí | Sí | Sí | 4/4 |
| Contacto, redes o comunidad | Sí | Sí | Sí | Sí | 4/4 |
| Testimonios | Sí | Sí | No observado | Sí | 3/4 |
| Propuesta específica para regalos / personalización | Sí | Sí | No observado | No observado | 2/4 |
| Pasos de pedido o sección logística | Sí | Sí | No observado | No observado | 2/4 |
| Preguntas frecuentes agrupadas | No observado | Sí | No observado | No observado | 1/4 |
| Oferta educativa / ayuda para iniciarse | No observado | No observado | Sí | No observado | 1/4 |

"No observado" no descarta contenido en otras páginas. Los porcentajes describen solo la muestra; no son una afirmación general sobre todas las tiendas del sector.

## Decisiones recomendadas para Raíces

- Mantener una sola grilla de productos favoritos (restricción del usuario).
- Añadir una propuesta de regalos con enlace al catálogo filtrado, sin duplicar tarjetas y sin inventar grabados/personalización que la tienda no ofrece.
- Añadir una guía breve para elegir/cuidar el mate con información útil; inspirada en el apoyo a principiantes observado, no presentada como patrón mayoritario.
- Añadir FAQ accesible sobre materiales, cuidados y navegación/compra demo; no inventar plazos, precios de envío ni políticas reales.
- Añadir ubicación con Google Maps antes del footer, según solicitud explícita del usuario y solo con dirección confirmada.
- No publicar testimonios, estrellas, cifras de clientes ni reseñas de ejemplo como si fueran reales. Aunque las reseñas son recurrentes, Raíces no dispone de evidencia para incorporarlas.
