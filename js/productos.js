let productos = [];

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderizarProductos(productos, "productos");
    mostrarProductoDestacado();

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
function mostrarProductoDestacado() {
    const random = Math.floor(Math.random() * productos.length);
    const prod = productos[random];
  
    const div = document.getElementById("productoDestacado");
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.title}">
      <h3>${prod.title}</h3>
      <p>$${prod.price}</p>
      <button onclick="agregarFavorito(${prod.id})">❤️ Agregar</button>
    `;
  }
  