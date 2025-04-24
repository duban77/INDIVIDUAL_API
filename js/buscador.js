// Añade un evento al input con id="buscador" para detectar cuando el usuario escribe
document.getElementById("buscador").addEventListener("input", e => {
  const valor = e.target.value.toLowerCase(); 
  // Obtiene el valor ingresado en el input y lo convierte a minúsculas

  const filtrados = productos.filter(p => p.title.toLowerCase().includes(valor));
  // Filtra los productos cuyo título contenga el texto buscado (también en minúsculas)

  renderizarProductos(filtrados, "productos");
  // Vuelve a renderizar los productos en el contenedor con id="productos", 
  // pero solo muestra los que coinciden con la búsqueda
});
