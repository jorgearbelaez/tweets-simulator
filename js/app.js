// variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];
// Event Listeners
eventListeners();
function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);
}
//functios
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
  console.log(tweets);

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
  if (tweets.length > 0)
    tweets.forEach((tweet) => {
      //crear el HTML
      const li = document.createElement("li");
      li.innerText = tweet.tweet; // porque es un arreglo de objetos y estoy usando el forEach
      listaTweets.appendChild(li);
    });
}

// limpiar el html
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
