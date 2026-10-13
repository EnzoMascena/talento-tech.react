import styles from "./Contador.module.css";

// Componente presentacional: muestra la cantidad y avisa cuando se toca + o -.
// La lógica (hasta cuánto se puede sumar) la decide el componente padre.
export const Contador = ({ cantidad, onIncrementar, onDecrementar, puedeSumar, puedeRestar }) => {
  return (
    <div className={styles.contador}>
      <button
        type="button"
        className={styles.boton}
        onClick={onDecrementar}
        disabled={!puedeRestar}
        aria-label="Restar una unidad"
      >
        −
      </button>
      <span className={styles.cantidad} aria-live="polite">
        {cantidad}
      </span>
      <button
        type="button"
        className={styles.boton}
        onClick={onIncrementar}
        disabled={!puedeSumar}
        aria-label="Sumar una unidad"
      >
        +
      </button>
    </div>
  );
};
