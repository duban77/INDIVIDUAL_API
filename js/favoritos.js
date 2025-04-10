function mostrarTodos() {
  document.getElementById("productos").style.display = "block";
  document.getElementById("favoritos").style.display = "none";
  renderizarProductos(productos, "productos");
}

function mostrarFavoritos() {
  const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  const favData = productos.filter(p => favs.includes(p.id));
  document.getElementById("productos").style.display = "none";
  document.getElementById("favoritos").style.display = "block";
  renderizarProductos(favData, "favoritos");
}
