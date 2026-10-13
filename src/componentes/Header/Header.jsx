import { Link } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`contenedor ${styles.contenido}`}>
        <Link to="/" className={styles.logo} aria-label="Pila, ir al inicio">
          <svg className={styles.icono} viewBox="0 0 40 22" aria-hidden="true">
            <rect x="1.5" y="1.5" width="33" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
            <rect x="35.5" y="7" width="3.5" height="8" rx="1.5" fill="currentColor" />
            <rect x="5.5" y="5.5" width="7" height="11" rx="1.5" fill="#ffd23f" />
            <rect x="14.5" y="5.5" width="7" height="11" rx="1.5" fill="#ffd23f" />
            <rect x="23.5" y="5.5" width="7" height="11" rx="1.5" fill="#ffd23f" />
          </svg>
          pila
        </Link>

        <NavBar />
      </div>
    </header>
  );
};
