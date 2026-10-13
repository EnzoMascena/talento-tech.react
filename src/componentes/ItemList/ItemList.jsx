import { Item } from "../Item/Item";
import styles from "./ItemList.module.css";

// El "organizador": recorre la lista y le pasa los datos de cada producto a Item
export const ItemList = ({ productos }) => {
  if (productos.length === 0) {
    return <p className="estado">No hay productos para mostrar.</p>;
  }

  return (
    <ul className={styles.grilla}>
      {productos.map((prod) => (
        <li key={prod.id}>
          {/* Con el spread pasamos todas las propiedades del producto como props */}
          <Item {...prod} />
        </li>
      ))}
    </ul>
  );
};
