// Muestra los precios con el formato argentino, por ejemplo: $ 89.999
const formateador = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export const formatearPrecio = (precio) => formateador.format(precio);
