import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Necesario para leer el body en formato JSON en las rutas POST
app.use(express.json());

// TEMA 1: Rutas GET
// Ruta GET básica para obtener información general del producto estrella
app.get('/producto', (req, res) => {
    res.json({
        nombre: "juicy melon tinted lip and cheek balm",
        marca: "essence",
        sku: "949067",
        descripcion: "Bálsamo colorante para labios y mejillas con un fresco toque frutal de melón.",
        precioUSD: 4.10,
        disponible: true
    });
});

// TEMA 2: Request

// PARAMS - Uso real: el cliente elige un tono específico del producto
// Ejemplo: /producto/tono/melon-glow
app.get('/producto/tono/:nombreTono', (req, res) => {
    const { nombreTono } = req.params;
    res.send(`Has seleccionado el bálsamo juicy melon en el tono específico: ${nombreTono}. ¡Realza tus labios y mejillas de forma natural!`);
});

// QUERY - Uso real: el cliente filtra el catálogo por categoría
// Ejemplo: /catalogo?categoria=labios&orden=precio
app.get('/catalogo', (req, res) => {
    const { categoria, orden } = req.query;
    
    // Simulamos un filtrado simple con los parámetros query
    let mensaje = "Mostrando catálogo de essence.";
    if (categoria) {
        mensaje += ` Filtrado por categoría: ${categoria}.`;
    }
    if (orden) {
        mensaje += ` Ordenado por: ${orden}.`;
    }
    
    res.json({
        resultado: mensaje,
        itemDestacado: "juicy melon tinted lip and cheek balm (SKU: 949067)"
    });
});


// TEMA 3: Response

// sendFile - Uso real: la tienda muestra la foto del producto
// Aplicación práctica: cuando el cliente quiere ver cómo es el bálsamo
// Juicy Melon, el servidor le envía la imagen guardada en la carpeta "public".
// path.resolve arma la ruta completa del archivo, que sendFile necesita.
app.get('/foto-balsamo', (req, res) => {
  res.sendFile(path.resolve('public', 'balsamo.jpg'));
})


// send - Uso real: mensaje informativo de la tienda
// Aplicación práctica: el cliente consulta los datos básicos de la tienda
// y el servidor le responde con un mensaje de texto simple.
app.get('/info-tienda', (req,res) => {
    res.send('Bienvenido a Essence Ecuador: maquillaje vegano, divertido y a buen precio')
})


// json - Uso real: consulta de un producto
// Aplicación práctica: el cliente consulta el producto y el servidor
// devuelve su información en formato JSON (nombre, precio, contenido
// y características), igual que lo haría una tienda en línea.
app.get('/balsamo-juicy-melon', (req, res) => {
  res.json({
    producto: 'Bálsamo tinte para labios y mejillas JUICY MELON',
    referencia: '949067',
    precio: 3.99,
    moneda: 'USD',
    contenido: '3 g',
    caracteristicas: ['Vegano', 'Aroma a sandía', 'Reacciona al pH'],
    url: 'https://www.essence.eu/es-ec/p/949067/juicy-melon-tinted-lip-and-cheek-balm'
  });
});

// HTML - Uso real: resumen del carrito de compras
// Aplicación práctica: antes de pagar, la clienta ve en pantalla un resumen
// con el producto elegido, la cantidad y el total. res.send puede enviar
// HTML, por eso el navegador lo muestra con títulos y lista.
app.get('/carrito', (req, res) => {
  res.send(`
    <h1>Resumen de tu carrito</h1>
    <ul>
      <li>Bálsamo JUICY MELON (3 g)</li>
      <li>Cantidad: 2</li>
      <li>Precio unitario: $3.99</li>
    </ul>
    <h2>Total: $7.98</h2>
  `);
});

// Ruta pública (queda ANTES del middleware, por eso no pide token)
// Uso real: las ofertas las puede ver cualquier visitante
// Aplicación práctica: cualquier persona, sin iniciar sesión, puede ver
// las promociones de la semana. Devuelve el precio normal y el de oferta.
app.get('/ofertas', (req, res) => {
  res.json({
    mensaje: 'Ofertas de la semana',
    ofertas: [
      { producto: 'Bálsamo JUICY MELON', precioNormal: 3.99, precioOferta: 2.99 }
    ]
  });
});



// TEMA 4: Seguridad con token
// Uso real: solo el personal de la tienda con token puede entrar al panel de administración
app.use((req, res, next) => {
  const { token } = req.headers;
  if (token === 'tienda2026') {
    next(); // el token es correcto: sigue a la siguiente ruta
  } else {
    res.status(401).send('No tiene acceso, no posee token o no tiene permiso');
  }
});

// Ruta privada: queda protegida porque está DESPUÉS del middleware
app.get('/panel-admin', (req, res) => res.send('Bienvenida al panel de administración'));


// TEMA 5: Ruta no encontrada
// Uso real: ruta no encontrada, cuando alguien escribe una dirección
// que no existe en la tienda, se le avisa y se le ofrece volver al inicio
// Aplicación práctica: app.use sin dirección atrapa todo lo que no coincidió
// con ninguna ruta anterior. status(404) indica que la página no existe.
app.use((req, res) => {
  res.status(404).send(`
    <h1>Error 404</h1>
    <p>Lo sentimos, esa página no existe en la tienda Essence.</p>
    <a href="/">Volver al inicio</a>
  `);
});


// Enciende el servidor en el puerto 3000 y deja la terminal ocupada
// esperando peticiones. Debe ir al final de todo el archivo.
app.listen(3000, () => {
  console.log('Server running on port 3000');
});


