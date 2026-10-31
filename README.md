# Jose Torres · Portafolio

Sitio personal bilingüe (español / inglés) con tres proyectos que se pueden probar en vivo.

- **[PsyDesk](https://github.com/xTorres97/psydesk):** plataforma de gestión clínica para psicólogos.
- **[Sombra de Bucare](https://github.com/xTorres97/tienda-cafe):** tienda online con pagos, inventario y panel.
- **[Calendario](https://github.com/xTorres97/calendario):** aplicación interactiva con arrastrar y soltar.

**Detalles técnicos:** Next.js 16 con rutas `/es` y `/en` pre-renderizadas. `/` redirige según el idioma del navegador (`src/proxy.ts`). Incluye `hreflang`, imagen Open Graph generada por idioma, sitemap y robots. Todo el contenido vive en [`src/content.ts`](src/content.ts).

```bash
pnpm install
pnpm dev
```
