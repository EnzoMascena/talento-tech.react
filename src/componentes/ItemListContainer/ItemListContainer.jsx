import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";

// El "cerebro": consigue los productos y decide cuáles mostrar.
// - mensaje: el título de la sección
// - soloDestacados: si es true, muestra solo los productos con "destacado": true (lo usa Inicio)
// - children: contenido extra que se muestra al lado del título (por ejemplo, un link)
export const ItemListContainer = ({ mensaje, soloDestacados = false, children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState("Todas");

  // Pedimos los productos una sola vez, cuando el componente se monta
  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos.");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className="contenedor estado">Cargando productos...</p>;
  }

  if (error) {
    return <p className="contenedor estado estado-error">Error: {error}</p>;
  }

  // Lista de categorías sin repetir, para armar los filtros
  const categorias = ["Todas", ...new Set(productos.map((producto) => producto.categoria))];

  let productosAMostrar = productos;
  if (soloDestacados) {
    productosAMostrar = productos.filter((producto) => producto.destacado);
  } else if (categoria !== "Todas") {
    productosAMostrar = productos.filter((producto) => producto.categoria === categoria);
  }

  // En /productos el título es el principal de la página (h1); en Inicio es una sección (h2)
  const Titulo = soloDestacados ? "h2" : "h1";

  return (
    <section className={`contenedor ${styles.seccion}`}>
      <div className={styles.encabezado}>
        <Titulo className={styles.titulo}>{mensaje}</Titulo>
        {children}
      </div>

      {!soloDestacados && (
        <div className={styles.filtros} role="group" aria-label="Filtrar por categoría">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={cat === categoria ? `${styles.filtro} ${styles.activo}` : styles.filtro}
              aria-pressed={cat === categoria}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <ItemList productos={productosAMostrar} />
    </section>
  );
};
