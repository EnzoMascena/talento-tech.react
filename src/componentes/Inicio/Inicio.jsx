import { Link } from "react-router-dom";
import { ItemListContainer } from "../ItemListContainer/ItemListContainer";
import styles from "./Inicio.module.css";

export const Inicio = () => {
  return (
    <>
      {/* El hero tiene forma de pila: el texto va en la "etiqueta" y las 5 celdas se cargan una por una */}
      <section className={`contenedor ${styles.hero}`}>
        <div className={styles.bateria}>
          <div className={styles.texto}>
            <h1 className={styles.titulo}>Tecnología con toda la pila</h1>
            <p className={styles.bajada}>
              Auriculares, teclados, monitores y más para tu día a día. Envíos a todo el país y
              hasta 6 cuotas sin interés.
            </p>
            <Link to="/productos" className="boton boton-oscuro">
              Ver productos
            </Link>
          </div>

          <div className={styles.celdas} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((celda) => (
              <span key={celda} className={styles.celda} />
            ))}
          </div>
        </div>
      </section>

      {/* Reutilizamos el mismo contenedor del catálogo, filtrando solo los destacados */}
      <ItemListContainer mensaje="Productos destacados" soloDestacados>
        <Link to="/productos" className={styles.verTodo}>
          Ver todos los productos
        </Link>
      </ItemListContainer>
    </>
  );
};
