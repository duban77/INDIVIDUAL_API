import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

// Función para obtener los favoritos del usuario desde Firestore
async function getFavoritos() {
  const user = auth.currentUser;
  if (!user) {
    console.log("No estás autenticado");
    return [];
  }

  const docRef = doc(db, "favoritos", user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().productos || [] : [];
}

// Función para guardar los favoritos en Firestore
async function guardarFavoritos(favs) {
  const user = auth.currentUser;
  if (!user) {
    console.log("No estás autenticado");
    return;
  }

  await setDoc(doc(db, "favoritos", user.uid), {
    productos: favs
  });
  console.log("Favoritos guardados en Firestore:", favs);
}

// Función para agregar un producto a los favoritos
window.agregarFavorito = async function (id) {
  let favs = await getFavoritos();
  console.log("Favoritos antes de agregar:", favs);

  // Si el producto no está en favoritos, lo agregamos
  if (!favs.includes(id)) {
    favs.push(id);
    await guardarFavoritos(favs);
    mostrarToast("Agregado a favoritos ❤️");
  } else {
    mostrarToast("Ya está en favoritos 😎", "#555");
  }

  console.log("Favoritos después de agregar:", favs);
  mostrarFavoritos();
};

// Función para eliminar un producto de los favoritos
window.eliminarFavorito = async function (id) {
  let favs = await getFavoritos();
  console.log("Favoritos antes de eliminar:", favs);

  // Filtramos el producto para eliminarlo de favoritos
  favs = favs.filter(f => f !== id);
  await guardarFavoritos(favs);
  mostrarToast("Eliminado de favoritos 💔", "#c00");

  console.log("Favoritos después de eliminar:", favs);
  mostrarFavoritos();
};

// Función para mostrar los productos favoritos
window.mostrarFavoritos = async function () {
  const favs = await getFavoritos();
  console.log("Favoritos en Firestore:", favs);

  // Filtramos los productos favoritos de la lista de productos
  const favData = productos.filter(p => favs.includes(p.id));
  console.log("Productos de favoritos:", favData);

  const contenedor = document.getElementById("contenedor-favoritos");
  contenedor.innerHTML = "";

  // Creación de los elementos para mostrar los productos favoritos
  favData.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <button onclick="eliminarFavorito(${p.id})">🗑️ Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
};

// Función para mostrar un mensaje (toast)
function mostrarToast(mensaje, color = "#0d6efd") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.backgroundColor = color;
  toast.innerText = mensaje;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
