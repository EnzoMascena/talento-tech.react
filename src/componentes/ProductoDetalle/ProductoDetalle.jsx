import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Contador } from "../Contador/Contador";
import { formatearPrecio } from "../../utils/formatearPrecio";
import styles from "./ProductoDetalle.module.css";

export const ProductoDetalle = () => {
  // Tomamos el id de la URL (/producto/:id)
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregadas, setAgregadas] = useState(0); // unidades del último "Agregar", para el mensaje

  const { addToCart, isInCart, getCantidadActual } = useCart();

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información del producto.");
        }
        return respuesta.json();
      })
      .then((datos) => {
        // Buscamos el producto cuyo id coincide con el de la URL (la URL siempre trae texto)
        const productoEncontrado = datos.find((p) => p.id === Number(id));
        setProducto(productoEncontrado ?? null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <p className="contenedor estado">Cargando detalle del producto...</p>;
  }

  if (error) {
    return <p className="contenedor estado estado-error">Error: {error}</p>;
  }

  if (!producto) {
    return (
      <section className={`contenedor ${styles.noEncontrado}`}>
        <h1>No encontramos ese producto</h1>
        <p>Puede que ya no esté en el catálogo o que el link tenga un error.</p>
        <Link to="/productos" className="boton">
          Ver productos
        </Link>
      </section>
    );
  }

  // Cuántas unidades ya hay en el carrito y cuántas se pueden sumar sin pasar el stock
  const enCarrito = getCantidadActual(producto.id);
  const disponibles = producto.stock - enCarrito;

  const incrementar = () => {
    if (cantidad < disponibles) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    setAgregadas(cantidad);
    setCantidad(1);
  };

  return (
    <section className={`contenedor ${styles.detalle}`}>
      <Link to="/productos" className={styles.volver}>
        Volver a productos
      </Link>

      <div className={styles.grilla}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={styles.imagen}
          width="400"
          height="400"
        />

        <div className={styles.info}>
          <p className={styles.categoria}>{producto.categoria}</p>
          <h1 className={styles.nombre}>{producto.nombre}</h1>
          <p className={styles.precio}>{formatearPrecio(producto.precio)}</p>
          <p className={styles.cuotas}>
            6 cuotas sin interés de {formatearPrecio(Math.ceil(producto.precio / 6))}
          </p>
          <p className={styles.descripcion}>{producto.descripcion}</p>

          {producto.stock === 0 ? (
            <p className={styles.sinStock}>Sin stock por el momento.</p>
          ) : (
            <>
              <p className={styles.stock}>Stock disponible: {producto.stock} unidades</p>

              {disponibles > 0 ? (
                <div className={styles.compra}>
                  <Contador
                    cantidad={cantidad}
                    onIncrementar={incrementar}
                    onDecrementar={decrementar}
                    puedeSumar={cantidad < disponibles}
                    puedeRestar={cantidad > 1}
                  />
                  <button type="button" className="boton" onClick={handleAddToCart}>
                    Agregar al carrito
                  </button>
                </div>
              ) : (
                <p className={styles.aviso}>Ya agregaste todo el stock disponible.</p>
              )}
            </>
          )}

          {/* Mensaje de confirmación después de agregar */}
          <div aria-live="polite">
            {agregadas > 0 && (
              <p className={styles.confirmacion}>
                Agregaste {agregadas} {agregadas === 1 ? "unidad" : "unidades"} al carrito.{" "}
                <Link to="/carrito">Ir al carrito</Link>
              </p>
            )}
          </div>

          {isInCart(producto.id) && agregadas === 0 && (
            <p className={styles.enCarrito}>
              Ya tenés {enCarrito} en el carrito. <Link to="/carrito">Ver carrito</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
