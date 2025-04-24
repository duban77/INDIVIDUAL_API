/**
 * Muestra un mensaje tipo "toast" (emergente) en la parte inferior de la pantalla
 * @param {string} mensaje - El texto que se mostrará
 * @param {string} color - Color de fondo del toast (opcional, por defecto gris oscuro)
 */
function mostrarToast(mensaje, color = "#333") {
  const toast = document.createElement("div"); // Crea un nuevo div
  toast.innerText = mensaje; // Asigna el mensaje de texto
  toast.style.position = "fixed"; // Posición fija para que se mantenga en pantalla
  toast.style.bottom = "80px"; // Distancia desde el fondo
  toast.style.left = "50%"; // Centrado horizontalmente
  toast.style.transform = "translateX(-50%)"; // Alineación precisa al centro
  toast.style.backgroundColor = color; // Color de fondo del mensaje
  toast.style.color = "white"; // Color del texto
  toast.style.padding = "10px 16px"; // Espaciado interior
  toast.style.borderRadius = "8px"; // Bordes redondeados
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)"; // Sombra para profundidad
  toast.style.zIndex = 9999; // Asegura que esté por encima de otros elementos
  toast.style.fontSize = "14px"; // Tamaño del texto
  toast.style.opacity = "0"; // Inicialmente invisible
  toast.style.transition = "opacity 0.3s ease"; // Animación de entrada

  document.body.appendChild(toast); // Añade el toast al body
  requestAnimationFrame(() => (toast.style.opacity = "1")); // Muestra el toast con transición

  // Desaparece después de 2 segundos
  setTimeout(() => {
    toast.style.opacity = "0"; // Lo oculta
    setTimeout(() => toast.remove(), 300); // Lo elimina del DOM
  }, 2000);
}

/**
 * Agrega un producto a la lista de favoritos en localStorage
 * @param {number} id - ID del producto a agregar
 */
function agregarFavorito(id) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || []; // Obtiene favoritos existentes
  if (!favs.includes(id)) {
    favs.push(id); // Agrega el nuevo ID
    localStorage.setItem("favoritos", JSON.stringify(favs)); // Guarda en localStorage
    mostrarToast("Agregado a favoritos ❤️"); // Notifica al usuario
  } else {
    mostrarToast("Ya está en favoritos 😎", "#555"); // Si ya estaba agregado
  }
  mostrarFavoritos(); // Actualiza la sección de favoritos
  renderizarProductos(productos, "productos"); // Actualiza la vista principal
}

/**
 * Elimina un producto de la lista de favoritos
 * @param {number} id - ID del producto a eliminar
 */
function quitarFavorito(id) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || []; // Carga favoritos
  favs = favs.filter(favId => favId !== id); // Quita el producto
  localStorage.setItem("favoritos", JSON.stringify(favs)); // Guarda la nueva lista
  mostrarToast("Quitado de favoritos 💔", "#c62828"); // Notificación
  mostrarFavoritos(); // Actualiza la vista de favoritos
  renderizarProductos(productos, "productos"); // Refresca la lista principal
}

/**
 * Muestra todos los productos que están marcados como favoritos
 */
function mostrarFavoritos() {
  const favs = JSON.parse(localStorage.getItem("favoritos")) || []; // Carga IDs favoritos
  const favData = productos.filter(p => favs.includes(p.id)); // Filtra productos por ID
  renderizarProductos(favData, "contenedor-favoritos"); // Muestra en su contenedor
}

// Hace que las funciones estén disponibles globalmente (necesario para onclick en HTML)
window.agregarFavorito = agregarFavorito;
window.quitarFavorito = quitarFavorito;
