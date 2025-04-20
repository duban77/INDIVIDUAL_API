// js/favoritos.js

import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

async function getFavoritos() {
  const user = auth.currentUser;
  if (!user) return [];

  const docRef = doc(db, "favoritos", user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().productos || [] : [];
}

async function guardarFavoritos(favs) {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(doc(db, "favoritos", user.uid), {
    productos: favs
  });
}

window.agregarFavorito = async function (id) {
  let favs = await getFavoritos();
  if (!favs.includes(id)) {
    favs.push(id);
    await guardarFavoritos(favs);
    mostrarToast("Agregado a favoritos ❤️");
  } else {
    mostrarToast("Ya está en favoritos 😎", "#555");
  }
  mostrarFavoritos();
};

window.eliminarFavorito = async function (id) {
  let favs = await getFavoritos();
  favs = favs.filter(f => f !== id);
  await guardarFavoritos(favs);
  mostrarToast("Eliminado de favoritos 💔", "#c00");
  mostrarFavoritos();
};

window.mostrarFavoritos = async function () {
  const favs = await getFavoritos();
  const favData = productos.filter(p => favs.includes(p.id));

  const contenedor = document.getElementById("contenedor-favoritos");
  contenedor.innerHTML = "";
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
