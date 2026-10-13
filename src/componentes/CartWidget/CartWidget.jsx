import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./CartWidget.module.css";

export const CartWidget = () => {
  // Leemos la cantidad directamente del contexto: se actualiza sola al agregar o quitar productos
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <Link
      to="/carrito"
      className={styles.widget}
      aria-label={`Carrito: ${totalItems} ${totalItems === 1 ? "producto" : "productos"}`}
    >
      <svg
        className={styles.icono}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.5L21 8H6.1" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
      <span className={styles.texto}>Carrito</span>
      {/* La key cambia con el número, así React vuelve a montar el span y se repite la animación */}
      <span
        key={totalItems}
        className={totalItems > 0 ? styles.contador : `${styles.contador} ${styles.vacio}`}
      >
        {totalItems}
      </span>
    </Link>
  );
};
