import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página, React Router no mueve el scroll. Este componente
// vuelve arriba de todo cada vez que cambia la ruta. No muestra nada en pantalla.
export const ScrollAlInicio = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
