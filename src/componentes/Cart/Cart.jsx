import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatearPrecio } from "../../utils/formatearPrecio";
import styles from "./Cart.module.css";

export const Cart = () => {
  // Todo lo que muestra el carrito sale directamente del CartContext
  const { cart, removeItem, clearCart, getCartQuantity, getCartTotal } = useCart();
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const finalizarCompra = () => {
    clearCart();
    setCompraFinalizada(true);
  };

  // Renderizado condicional: 1) compra terminada, 2) carrito vacío, 3) carrito con productos
  if (compraFinalizada) {
    return (
      <section className={`contenedor ${styles.mensaje}`}>
        <h1>¡Gracias por tu compra!</h1>
        <p>Recibimos tu pedido. Te vamos a escribir para coordinar el envío.</p>
        <Link to="/" className="boton">
          Volver al inicio
        </Link>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className={`contenedor ${styles.mensaje}`}>
        <h1>Tu carrito está vacío</h1>
        <p>Agregá productos desde el catálogo para empezar tu compra.</p>
        <Link to="/productos" className="boton">
          Ver productos
        </Link>
      </section>
    );
  }

  const totalUnidades = getCartQuantity();

  return (
    <section className={`contenedor ${styles.carrito}`}>
      <h1 className={styles.titulo}>Tu carrito</h1>

      <div className={styles.grilla}>
        <ul className={styles.lista}>
          {cart.map((item) => (
            <li key={item.id} className={styles.fila}>
              <img src={item.imagen} alt="" className={styles.imagen} width="96" height="96" />

              <div className={styles.datos}>
                <h2 className={styles.nombre}>
                  <Link to={`/producto/${item.id}`}>{item.nombre}</Link>
                </h2>
                <p>Precio unitario: {formatearPrecio(item.precio)}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>

              <div className={styles.acciones}>
                <p className={styles.subtotal}>{formatearPrecio(item.precio * item.quantity)}</p>
                <button
                  type="button"
                  className="boton-texto"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className={styles.resumen} aria-label="Resumen de la compra">
          <h2 className={styles.resumenTitulo}>Resumen</h2>
          <p className={styles.linea}>
            <span>Productos</span>
            <span>{totalUnidades} {totalUnidades === 1 ? "unidad" : "unidades"}</span>
          </p>
          <p className={styles.linea}>
            <span>Envío</span>
            <span>Se calcula al confirmar</span>
          </p>
          <p className={`${styles.linea} ${styles.total}`}>
            <span>Total a pagar</span>
            <span>{formatearPrecio(getCartTotal())}</span>
          </p>

          <button type="button" className={`boton ${styles.finalizar}`} onClick={finalizarCompra}>
            Finalizar compra
          </button>
          <button type="button" className="boton-texto" onClick={clearCart}>
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  );
};
