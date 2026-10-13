import styles from "./TarjetaContacto.module.css";

// Componente presentacional: solo muestra los datos que recibe por props
export const TarjetaContacto = ({ nombre, puesto, email, foto }) => {
  return (
    <article className={styles.tarjeta}>
      <img src={foto} alt={`Foto de ${nombre}`} className={styles.foto} width="72" height="72" />
      <div>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.puesto}>{puesto}</p>
        <a href={`mailto:${email}`} className={styles.email}>
          {email}
        </a>
      </div>
    </article>
  );
};
