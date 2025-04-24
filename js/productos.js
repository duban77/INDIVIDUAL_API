// Declara un arreglo vacío para almacenar los productos obtenidos desde la API
let productos = [];

// Hace una solicitud a la API FakeStore para obtener todos los productos
fetch("https://fakestoreapi.com/products")
  .then(res => res.json()) // Convierte la respuesta en formato JSON
  .then(data => {
    productos = data; // Guarda los productos en la variable global

    // Muestra todos los productos en el contenedor con ID "productos"
    renderizarProductos(productos, "productos");

    // Muestra un producto destacado de forma aleatoria
    mostrarProductoDestacado();

    // Llama a la función para mostrar los productos favoritos (según el usuario)
    mostrarFavoritos(); // Esta función debe estar definida en otro archivo
  });

/**
 * Función para renderizar una lista de productos en un contenedor del DOM
 * @param {Array} lista - Lista de productos a mostrar
 * @param {string} contenedorId - ID del contenedor HTML donde se mostrarán los productos
 */
function renderizarProductos(lista, contenedorId) {
  // Obtiene el contenedor por su ID
  const contenedor = document.getElementById(contenedorId);

  // Limpia el contenido anterior del contenedor
  contenedor.innerHTML = "";

  // Recorre la lista de productos y los agrega al contenedor
  lista.forEach(p => {
    // Crea un nuevo div para cada producto
    const div = document.createElement("div");
    div.className = "producto"; // Clase CSS para estilo

    // Inserta el contenido HTML con imagen, título, precio y botón de favoritos
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}"> <!-- Imagen del producto -->
      <h3>${p.title}</h3>                      <!-- Título del producto -->
      <p>$${p.price}</p>                       <!-- Precio del producto -->
      <button onclick="agregarFavorito(${p.id})">❤️ Agregar</button> <!-- Botón para agregar a favoritos -->
    `;

    // Agrega el div del producto al contenedor
    contenedor.appendChild(div);
  });
}

/**
 * Función para mostrar un producto destacado aleatorio
 */
function mostrarProductoDestacado() {
  // Genera un índice aleatorio dentro del rango de productos disponibles
  const random = Math.floor(Math.random() * productos.length);

  // Selecciona un producto aleatorio
  const prod = productos[random];

  // Obtiene el contenedor del producto destacado
  const div = document.getElementById("productoDestacado");

  // Inserta el HTML del producto destacado
  div.innerHTML = `
    <img src="${prod.image}" alt="${prod.title}"> <!-- Imagen del producto -->
    <h3>${prod.title}</h3>                        <!-- Título del producto -->
    <p>$${prod.price}</p>                         <!-- Precio del producto -->
    <button onclick="agregarFavorito(${prod.id})">❤️ Agregar</button> <!-- Botón para agregar a favoritos -->
  `;
}
