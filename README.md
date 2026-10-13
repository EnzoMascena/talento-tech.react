# Pila: e-commerce de tecnología

Pre-entrega del proyecto final del curso **React JS de Talento Tech**.

Pila es una tienda online ficticia de tecnología con catálogo, detalle de producto y carrito de compras. Los productos se cargan desde un archivo JSON local con `fetch`, la navegación usa React Router y el carrito es un estado global con Context API.

## Cómo correrlo

Necesitás Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

Otros comandos:

- `npm run build`: genera la versión de producción en `dist/`
- `npm run preview`: sirve esa versión para probarla
- `npm run lint`: revisa el código con ESLint

## Qué incluye

**Estructura y layout**
- `Layout.jsx` con `Header.jsx`, el `nav` (`NavBar.jsx`) y `Footer.jsx`. El contenido de cada página se renderiza con `<Outlet />`.
- El footer muestra la información de la empresa y las tarjetas del equipo (4 personas), que se cargan desde `public/data/nosotros.json`.

**Catálogo**
- `ItemListContainer.jsx` carga los productos desde `public/data/productos.json` con `useEffect` y `fetch`, y maneja los estados de carga y error.
- Sigue el patrón contenedor/presentacional: `ItemListContainer` → `ItemList` → `Item`. `Item.jsx` es reutilizable y recibe los datos por props (se usa en el catálogo y en los destacados del inicio).
- Filtro por categoría en `/productos`.

**Rutas (react-router-dom)**

| Ruta | Vista |
| --- | --- |
| `/` | Inicio con productos destacados |
| `/productos` | Catálogo completo |
| `/producto/:id` | Detalle de un producto |
| `/carrito` | Carrito de compras |
| `*` | Página no encontrada |

El NavBar navega con `<Link>`, sin recargar la página.

**Carrito con Context API** (`src/context/CartContext.jsx`)
- `CartProvider` envuelve la app en `main.jsx` y el custom hook `useCart` da acceso al carrito desde cualquier componente.
- Desde el detalle se elige la cantidad (limitada por el stock) y se agrega con `addToCart`.
- `CartWidget` muestra el ícono del carrito con la cantidad total, leída de `getCartQuantity` y actualizada en tiempo real.
- `/carrito` lista los productos del contexto con subtotal y total, y permite eliminar un producto, vaciar el carrito y finalizar la compra.
- El carrito se guarda en `localStorage`, así no se pierde al recargar la página.

## Estructura de carpetas

```
public/
├── data/                 productos.json y nosotros.json (simulan una API)
├── images/               ilustraciones de productos y fotos del equipo
└── _redirects            configuración de rutas para Netlify
src/
├── componentes/          una carpeta por componente, con su .jsx y su .module.css
│   ├── Layout/  Header/  NavBar/  CartWidget/  Footer/
│   ├── Inicio/  ItemListContainer/  ItemList/  Item/
│   ├── ProductoDetalle/  Contador/  Cart/
│   ├── Directorio/  TarjetaContacto/
│   └── NoEncontrada/  ScrollAlInicio/
├── context/CartContext.jsx
├── utils/formatearPrecio.js
├── App.jsx               definición de rutas
├── App.css               clases de utilidad (botones, contenedor)
├── index.css             estilos globales y variables de color
└── main.jsx              BrowserRouter + CartProvider
vercel.json               configuración de rutas para Vercel
```

## Deploy

El proyecto se puede subir a Vercel o Netlify sin configuración extra: los dos detectan Vite (comando `npm run build`, carpeta `dist`).

Como es una SPA, al recargar en una ruta como `/carrito` el servidor tiene que devolver `index.html`. Para eso están `vercel.json` (Vercel) y `public/_redirects` (Netlify); sin esos archivos, recargar en cualquier ruta que no sea `/` daría error 404.

## Tecnologías

React 19, Vite, React Router, Context API y CSS Modules.
