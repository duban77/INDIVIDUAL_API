let productos = [];

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderizarProductos(productos, "productos");
    mostrarFavoritos();
  });

function renderizarProductos(lista, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <button onclick="agregarFavorito(${p.id})">❤️ Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}
