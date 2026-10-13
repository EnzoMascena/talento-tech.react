import { Link } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatearPrecio";
import styles from "./Item.module.css";

// El "exhibidor": componente presentacional y reutilizable.
// No sabe de dónde vienen los datos, solo muestra lo que recibe por props.
export const Item = ({ id, nombre, categoria, precio, stock, imagen }) => {
  return (
    <article className={styles.item}>
      <Link to={`/producto/${id}`} className={styles.imagen} tabIndex={-1}>
        <img src={imagen} alt={nombre} width="400" height="400" loading="lazy" />
      </Link>

      <div className={styles.info}>
        <p className={styles.categoria}>{categoria}</p>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>{formatearPrecio(precio)}</p>

        {/* Renderizado condicional según el stock */}
        {stock === 0 && <p className={styles.aviso}>Sin stock</p>}
        {stock > 0 && stock <= 3 && (
          <p className={styles.aviso}>{stock === 1 ? "Última unidad" : `Últimas ${stock} unidades`}</p>
        )}
      </div>

      <Link to={`/producto/${id}`} className={`boton boton-borde ${styles.detalle}`}>
        Ver detalle
      </Link>
    </article>
  );
};
