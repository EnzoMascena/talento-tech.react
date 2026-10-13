import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./componentes/Layout/Layout";
import { Inicio } from "./componentes/Inicio/Inicio";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import { ProductoDetalle } from "./componentes/ProductoDetalle/ProductoDetalle";
import { Cart } from "./componentes/Cart/Cart";
import { NoEncontrada } from "./componentes/NoEncontrada/NoEncontrada";

function App() {
  return (
    <Routes>
      {/* Ruta contenedora: el Layout (Header + Footer) se ve en todas las páginas */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={<ItemListContainer mensaje="Todos los productos" />}
        />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Cart />} />
        {/* Cualquier otra URL muestra la página de "no encontrada" */}
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
