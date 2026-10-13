import { Directorio } from "../Directorio/Directorio";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="contenedor">
        {/* Tarjetas del equipo, cargadas desde public/data/nosotros.json */}
        <Directorio />

        {/* Información de la empresa */}
        <div className={styles.empresa}>
          <div className={styles.marca}>
            <p className={styles.logo}>pila</p>
            <p>
              Tienda online de tecnología. Estamos en La Plata y hacemos envíos a todo el país.
            </p>
          </div>

          <div>
            <h2 className={styles.titulo}>Contacto</h2>
            <ul className={styles.lista}>
              <li>
                <a href="mailto:hola@pila.com.ar">hola@pila.com.ar</a>
              </li>
              <li>La Plata, Buenos Aires</li>
            </ul>
          </div>

          <div>
            <h2 className={styles.titulo}>Horario de atención</h2>
            <ul className={styles.lista}>
              <li>Lunes a viernes de 9 a 18 h</li>
              <li>Sábados de 10 a 14 h</li>
            </ul>
          </div>

          <div>
            <h2 className={styles.titulo}>Medios de pago</h2>
            <ul className={styles.lista}>
              <li>Tarjetas de crédito y débito</li>
              <li>Transferencia bancaria</li>
              <li>Hasta 6 cuotas sin interés</li>
            </ul>
          </div>
        </div>

        <p className={styles.legal}>
          © {new Date().getFullYear()} Pila. Proyecto del curso React JS de Talento Tech.
        </p>
      </div>
    </footer>
  );
};
