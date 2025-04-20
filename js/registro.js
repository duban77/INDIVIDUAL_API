// js/registro.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyAgP3HY3aJjBR2ye-VTOg_2s-wAr9xYd6A",
  authDomain: "apifakestoreapi.firebaseapp.com",
  projectId: "apifakestoreapi",
  storageBucket: "apifakestoreapi.appspot.com",
  messagingSenderId: "222824660477",
  appId: "1:222824660477:web:3d562bf37471f93922ad94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

let usuario = null;

// Iniciar sesión con Google
window.loginConGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    usuario = result.user;
    alert("¡Bienvenido " + usuario.displayName + "!");
    mostrarFavoritos(); // Recarga favoritos desde Firestore
  } catch (error) {
    console.error(error);
  }
};

// Detectar usuario activo
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuario = user;
    mostrarFavoritos();
  }
});
