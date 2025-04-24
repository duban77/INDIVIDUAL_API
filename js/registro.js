import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBieAZl21TezLYkpDd1E52eSXMCadJg6Og",
  authDomain: "apifake-3dc76.firebaseapp.com",
  projectId: "apifake-3dc76",
  storageBucket: "apifake-3dc76.firebasestorage.app",
  messagingSenderId: "929770436232",
  appId: "1:929770436232:web:3ff7f472bf98838a06113d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let usuario = null;

// Iniciar sesión con Google
window.loginConGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    usuario = result.user;
    alert("¡Bienvenido " + usuario.displayName + "!");
    mostrarFavoritos();
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

// Manejar envío del formulario
document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;
  const fecha = document.getElementById("fecha").value;
  const pais = document.getElementById("pais").value;

  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const docRef = doc(db, "usuarios", correo); // usa el correo como ID único
    await setDoc(docRef, {
      nombre,
      apellido,
      correo,
      fechaNacimiento: fecha,
      pais,
      creadoEn: new Date().toISOString()
    });

    alert("Registro exitoso");
    document.getElementById("formRegistro").reset();
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    alert("Error al registrar. Intenta nuevamente.");
  }
});
