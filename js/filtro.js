document.getElementById("filtro").addEventListener("change", e => {
    const cat = e.target.value;
    const filtrados = cat === "all" ? productos : productos.filter(p => p.category === cat);
    renderizarProductos(filtrados, "productos");
  });
  