document.getElementById("buscador").addEventListener("input", e => {
    const valor = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => p.title.toLowerCase().includes(valor));
    renderizarProductos(filtrados, "productos");
  });
  