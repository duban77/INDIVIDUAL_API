function mostrarToast(mensaje, color = "#333") {
  const toast = document.createElement("div");
  toast.innerText = mensaje;
  toast.style.position = "fixed";
  toast.style.bottom = "80px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = color;
  toast.style.color = "white";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  toast.style.zIndex = 9999;
  toast.style.fontSize = "14px";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";

  document.body.appendChild(toast);
  requestAnimationFrame(() => (toast.style.opacity = "1"));

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function agregarFavorito(id) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    mostrarToast("Agregado a favoritos ❤️");
  } else {
    mostrarToast("Ya está en favoritos 😎", "#555");
  }
  mostrarFavoritos();
}

function mostrarFavoritos() {
  const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  const favData = productos.filter(p => favs.includes(p.id));
  renderizarProductos(favData, "contenedor-favoritos");
}

// ✅ Exportar la función globalmente para usarla con onclick en HTML
window.agregarFavorito = agregarFavorito;
