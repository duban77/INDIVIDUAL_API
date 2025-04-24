// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"; // Inicializa la app de Firebase
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; // Importa Firestore y funciones para manejar documentos
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"; // Importa autenticación y métodos relacionados

// Configuración de Firebase (proporcionada por Firebase al crear el proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyBieAZl21TezLYkpDd1E52eSXMCadJg6Og", // Clave pública para la API
  authDomain: "apifake-3dc76.firebaseapp.com", // Dominio de autenticación
  projectId: "apifake-3dc76", // ID del proyecto en Firebase
  storageBucket: "apifake-3dc76.firebasestorage.app", // Bucket de almacenamiento (para archivos)
  messagingSenderId: "929770436232", // ID del remitente para servicios de mensajería
  appId: "1:929770436232:web:3ff7f472bf98838a06113d" // ID único de la aplicación
};

// Inicializa la app de Firebase con la configuración anterior
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore para acceder a la base de datos
const db = getFirestore(app);

// Obtiene el módulo de autenticación de Firebase
const auth = getAuth(app);

// Crea un proveedor de autenticación de Google
const provider = new GoogleAuthProvider();

// Variable global para almacenar la información del usuario autenticado
let usuario = null;

// Función para iniciar sesión con Google
window.loginConGoogle = async () => {
  try {
    // Abre una ventana emergente para autenticar con Google
    const result = await signInWithPopup(auth, provider);

    // Guarda al usuario autenticado en la variable global
    usuario = result.user;

    // Muestra un mensaje de bienvenida
    alert("¡Bienvenido " + usuario.displayName + "!");

    // Llama a la función para mostrar los favoritos del usuario (debe estar definida en otro archivo)
    mostrarFavoritos();
  } catch (error) {
    // Si ocurre un error, lo muestra por consola
    console.error(error);
  }
};

// Detecta cambios en el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si hay un usuario autenticado, lo guarda en la variable global
    usuario = user;

    // Llama a la función para mostrar los favoritos
    mostrarFavoritos();
  }
});

// Escucha el evento de envío del formulario de registro
document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto del formulario (recargar la página)

  // Obtiene los valores ingresados por el usuario en el formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;
  const fecha = document.getElementById("fecha").value;
  const pais = document.getElementById("pais").value;

  // Verifica que las contraseñas coincidan
  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden");
    return; // Detiene la ejecución si no coinciden
  }

  try {
    // Crea una referencia al documento del usuario usando su correo como ID único
    const docRef = doc(db, "usuarios", correo);

    // Guarda los datos del usuario en Firestore
    await setDoc(docRef, {
      nombre,                    // Nombre del usuario
      apellido,                 // Apellido del usuario
      correo,                   // Correo electrónico
      fechaNacimiento: fecha,  // Fecha de nacimiento
      pais,                     // País
      creadoEn: new Date().toISOString() // Fecha de creación en formato ISO
    });

    // Muestra mensaje de éxito y limpia el formulario
    alert("Registro exitoso");
    document.getElementById("formRegistro").reset();
  } catch (error) {
    // Muestra errores en consola y alerta al usuario
    console.error("Error al guardar el usuario:", error);
    alert("Error al registrar. Intenta nuevamente.");
  }
});
