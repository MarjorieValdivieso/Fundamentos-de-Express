# INTRODUCCIÓN A EXPRESS

Servidor creado con **Node.js y Express** que aplica los conceptos vistos en clase en un caso de la vida real: una tienda online de maquillaje.

## Integrantes

- Emely Bone
- Maria Jose Paredes
- Marjorie Valdivieso

## Página de referencia

Los datos del producto se tomaron de la tienda essence (Juicy Melon Tinted Lip and Cheek Balm):

https://www.essence.eu/es-ec/p/949067/juicy-melon-tinted-lip-and-cheek-balm

## Temas aplicados

| Tema | Ruta de ejemplo |
|---|---|
| Rutas GET | `/producto` |
| Request: params | `/producto/tono/melon-glow` |
| Request: query | `/catalogo?categoria=labios&orden=precio` |
| Response: sendFile | `/foto-balsamo` |
| Response: send | `/info-tienda` |
| Response: json | `/balsamo-juicy-melon` |
| Response: HTML | `/carrito` |
| Ruta pública | `/ofertas` |
| Seguridad con token | `/panel-admin` (header `token: tienda2026`) |
| Ruta no encontrada (404) | cualquier ruta inexistente |

## Cómo ejecutarlo

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor:
   ```bash
   node index.js
   ```
3. Probar las rutas en el navegador o en Postman en `http://localhost:3000`.

> Las rutas privadas necesitan el header `token` con el valor `tienda2026`.
