import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <ul className={styles.links}>
        {/* Link cambia la URL sin recargar la página */}
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
};
