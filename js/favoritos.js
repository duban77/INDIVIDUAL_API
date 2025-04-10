function agregarFavorito(id) {
    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem("favoritos", JSON.stringify(favs));
      alert("Agregado a favoritos");
    }
    mostrarFavoritos();
  }
  
  function mostrarFavoritos() {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    const favData = productos.filter(p => favs.includes(p.id));
    renderizarProductos(favData, "favoritos");
  }
  