// variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];
// Event Listeners
eventListeners();
function eventListeners() {
  //cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  //cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    crearHTML();
  });
}
//function
function agregarTweet(e) {
  e.preventDefault();

  // seleccionamos el area especifica donde el usuario escribira (textarea)
  const tweet = document.querySelector("#tweet").value; // seleccionamos el valor que sera el texto que el usuario escriba

  if (tweet === "") {
    mostrarError("Debes escribir algo");
    return; // evita que se ejecuten mas lineas de codigo
  }

  const tweetObj = {
    id: Date.now(), // identificador
    tweet, // ==> expresa lo mismo que decir tweet: tweet
  };
  //Añadir al arreglo de tweets

  tweets = [...tweets, tweetObj];

  //una vez agregado mis tweets a mi arreglo, ahora vamos a mostrarlos en el
  //HTML

  crearHTML();
  // reiniciar el formulario
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //insertar el mensaje generado
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  // elimina la alerta despues de 3 segundos

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// muestra el listado de los tweets
function crearHTML() {
  //limpiar Html
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //agregar un boton
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "delete tweet";
      // añadimos la funcion que eliminar los tweets
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //crear el HTML
      const li = document.createElement("li");
      li.innerText = tweet.tweet; // porque es un arreglo de objetos y estoy usando el forEach
      //asignar al boton
      li.appendChild(btnEliminar);

      //insertarlo en el html
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}
//agrega los tweets actuales a local Storage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
//eliminar un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  console.log(tweets);
  crearHTML();
}

// limpiar el html
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
