import { useEffect, useState } from "react";
import { TarjetaContacto } from "../TarjetaContacto/TarjetaContacto";
import styles from "./Directorio.module.css";

// Componente contenedor: trae los datos del equipo y se los pasa a TarjetaContacto
export const Directorio = () => {
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/nosotros.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información del equipo.");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setNosotros(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <section className={styles.directorio} aria-labelledby="titulo-equipo">
      <h2 id="titulo-equipo" className={styles.titulo}>
        Nuestro equipo
      </h2>

      {cargando && <p>Cargando equipo...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.grilla}>
        {nosotros.map((persona) => (
          <li key={persona.id}>
            <TarjetaContacto {...persona} />
          </li>
        ))}
      </ul>
    </section>
  );
};
