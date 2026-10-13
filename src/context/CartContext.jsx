/* eslint-disable react-refresh/only-export-components */
// Como en la clase 8, este archivo exporta el contexto, el custom hook y el Provider juntos.
// La regla desactivada arriba solo avisa que el recargado en caliente de Vite funciona mejor
// cuando un archivo exporta únicamente componentes. Preferimos tener todo el carrito en un solo lugar.
import { createContext, useContext, useEffect, useState } from "react";

// 1. Creamos el contexto: la "caja" donde vamos a compartir el carrito
export const CartContext = createContext();

// 2. Custom hook para consumir el contexto sin escribir useContext(CartContext) cada vez
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

// Lee el carrito guardado en el navegador (si había uno) para no perderlo al recargar la página
const leerCarritoGuardado = () => {
  try {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
};

// 3. El Provider: el "cerebro" del carrito que envuelve a toda la app (ver main.jsx)
export const CartProvider = ({ children }) => {
  // Le pasamos una función a useState: React la ejecuta solo la primera vez para obtener el valor inicial
  const [cart, setCart] = useState(leerCarritoGuardado);

  // Cada vez que cambia el carrito, lo guardamos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(cart));
    } catch {
      // Si el navegador no permite guardar, el carrito igual funciona mientras la página esté abierta
    }
  }, [cart]);

  // Agrega un producto. Si ya estaba en el carrito, le suma la cantidad.
  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  // Elimina un producto puntual (clase 9)
  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Vacía el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Devuelve true si el producto ya está en el carrito (clase 9)
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // Cuántas unidades de un producto puntual hay en el carrito (clase 9)
  const getCantidadActual = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Total de unidades en el carrito (lo muestra el CartWidget)
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Precio total del carrito
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        isInCart,
        getCantidadActual,
        getCartQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
