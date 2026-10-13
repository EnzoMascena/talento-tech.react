import { Link } from "react-router-dom";
import styles from "./NoEncontrada.module.css";

// Se muestra para cualquier ruta que no exista (path="*")
export const NoEncontrada = () => {
  return (
    <section className={`contenedor ${styles.pagina}`}>
      <svg className={styles.icono} viewBox="0 0 120 64" aria-hidden="true">
        <rect x="4" y="4" width="100" height="56" rx="14" fill="none" stroke="currentColor" strokeWidth="8" />
        <rect x="106" y="20" width="10" height="24" rx="4" fill="currentColor" />
        <rect x="16" y="16" width="16" height="32" rx="5" fill="#c62a3f" />
      </svg>
      <h1 className={styles.titulo}>Esta página se quedó sin pila</h1>
      <p>Puede que la dirección esté mal escrita o que la página ya no exista.</p>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </section>
  );
};
