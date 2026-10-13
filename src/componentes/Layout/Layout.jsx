import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScrollAlInicio } from "../ScrollAlInicio/ScrollAlInicio";
import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <ScrollAlInicio />
      <Header />

      <main className={styles.main}>
        {/* Acá se renderiza el componente de la ruta activa */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
