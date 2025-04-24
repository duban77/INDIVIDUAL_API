// Agrega un listener al elemento con ID "filtro" (un <select> o similar)
// Este listener se activa cada vez que el valor del filtro cambia
document.getElementById("filtro").addEventListener("change", e => {
  
  // Obtiene la categoría seleccionada desde el evento
  const cat = e.target.value;

  // Filtra los productos según la categoría seleccionada
  // Si el valor es "all", se muestran todos los productos
  // Si no, se filtran por coincidencia exacta con la categoría del producto
  const filtrados = cat === "all"
    ? productos // Muestra todos los productos
    : productos.filter(p => p.category === cat); // Filtra por categoría

  // Renderiza los productos filtrados en el contenedor con ID "productos"
  renderizarProductos(filtrados, "productos");
});
