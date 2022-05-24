# Introducción

En este Post, explicaremos lo básico de Websockets y como utilizarlos. Les mostraré un ejemplo de un chat realizado con  **Socket**.**io**, una librería en **JavaScript** para Node. **js** que permite una comunicación bidireccional en tiempo real entre cliente y servidor.

# ¿Qué es WebSocket?

Los WebSockets sirven para **realizar conexiones de manera persistente entre el navegador del usuario y el servidor.**  
De esta forma, un servidor podrá enviar a un cliente cualquier mensaje en cualquier momento y el cliente lo recibiría al instante, y lo mismo en sentido contrario: un mensaje que generemos en el navegador podrá ser enviado sin necesidad de establecer una nueva conexión ya que ya existe una llamada «**_conexión persistente_**«, sería recibido al instante.  
Por lo tanto, al recibir mensajes al instante y tener esta comunicación entre servidor-cliente, es util a la hora de realizar multiples transacciones que no cuentan con la entera necesidad de ser mediante peticiones al servidor y de esta manera disminuir dicho tráfico.

-   **WebSocket del cliente**, que en este caso es el navegador. Es quien establece la conexión inicial con el servidor.
-   **WebSocket del servidor**, que acepta las conexiones e inicia el intercambio de mensajes.

**La conexión entre ambos se mantiene activa** mientras la pestaña del navegador continúe abierta, y tanto el cliente como el servidor **pueden cerrar la conexión en cualquier momento**.

# Socket.io

Realizaré una práctica en base a la librería de nodejs Socket.io. En la página oficial de este servicio podrán encontrar también un tutorial, además de la documentación de cada funcionalidad que permite realizar:

[https://socket.io/get-started/chat/](https://socket.io/get-started/chat/)

Empezemos con el chat!

![](https://julianbermolen.com/wp-content/uploads/2021/12/imagen-1024x464-1.png)

Antes que nada, quiero compartirles el repositorio en el cual se encuentra todo el código que pasaré a explicar a continuación:  
[https://gitlab.com/julianbermolen/chat-websocket-node](https://gitlab.com/julianbermolen/chat-websocket-node)[  
](https://gitlab.com/julianbermolen/chat-websocket-node)

Crearemos una estructura de carpetas que quedará de la siguiente manera:  

![](https://julianbermolen.com/wp-content/uploads/2021/12/image.png)

Dentro de public, se encontrarán todos los archivos estaticos necesarios para poder contar con la web. HTML, CSS y el Javascript que manejará el websocket del lado del cliente. Recuerden que si bien la comunicación es constante, se necesita programar las funcionalidad que deseen realizar con ella.  
Por otro lado, contaremos con el index.js que será el archivo principal de nuestro servidor y desde donde manejaremos el websocket del mismo.

Además, comencemos iniciando el proyecto como en los post anterior, abriendo una terminal en la carpeta del proyecto y colocando los siguientes comandos:

```
npm init
npm i express nodemon socket.io
```

Esto creará la carpeta node_modules (Que contiene los archivos necesarios de node/NPM para funcionar, package.json que es el archivo principal con el cual NPM levanta nuestro servicio.

Index.js

```
const path = require('path');
const express = require('express');
const app = express();
const socketIo = require('socket.io');

//Configuraciones
app.set('port', process.env.PORT || 2000);

//Definimos ubicación de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciamos el servidor en el puerto default del ambiente o el 2000.
// Guardamos la inicialización del servidor en una constante "server"
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
```

En el archivo principal del servidor, definiremos las librerias/framework que usaremos:  **Path**, se utiliza para realizar un correcto manejo de directorios. En mi caso, lo utilicé para encontrar más adelante el directorio Public, desde la raiz del proyecto.  
**Express** ya lo conocemos y lo hemos explicado en post anteriores, es un framework de nodejs que nos ayuda con la creación de la aplicación.  
**Socket.io**  es una librearia cuya funcionalidad es la brindarnos herramientas de comunicación bidireccional en tiempo real para JavaScript.  
Seteamos el puerto, que podrá ser el default del entorno en el que se encuentre el proyecto o en el puerto 2000. Definimos donde se encontrarán nuestros archivos estaticos y por último, guardamos en una constante la inicialización del servidor, que será necesaria para poder controlar la comunicación bilateral entre el cliente y el mismo.  
Una vez realizado este paso, agregaremos al mismo archivo  **index.js**:

```
// Le decimos sobre que servidor socketio escuchará
const webSocket = socketIo(server);

// Realizaremos el manejo de usuarios creando un array de objetos.
let usuarios = [];
//WebSockets - el socket del servidor será iniciada como webSockets como definimos más arriba, entregandole la inicializacion del SV
//inicializamos un listener ".on" con el evento "connection", enviando un socket a la aplicación que se conecte.
webSocket.on('connection', (socket) => {
    socket.nickname = 'Guest'; 
    console.log('new Connection', socket.id); //cada vez que una aplicación se conecte, se visualizará el ID en consola.

    // Cuando se conecté, enviamos un usuario al array correspondiente.
    usuarios.push({
        id: socket.id,
        name: socket.nickname
        });
    //una vez conectado, emitimos el listado de usuarios online
    webSocket.sockets.emit('connected',usuarios);

//Como verán, aca estamos escuchando el listener al evento con Socket (el que enviamos a la aplicación).
//Este evento cambia el nickname cuando se escucha un evento "change" sobre el username.    
    socket.on('chat:nickname', (data) =>{
        socket.nickname = data;

        usuarios.forEach(element => {
            if(element.id == socket.id){
                element.name = data;
            }
        });

// Una vez cambiado el nombre del usuario, EMITIMOS un mensaje a TODOS los sockets con la lista de usuarios online.
        webSocket.sockets.emit('connected',usuarios);
    });

//Este evento escucha "chat:mensaje" de las aplicaciones y cuando recibe un mensaje o "data" lo emite hacia TODOS los sockets.
    socket.on('chat:mensaje', (data) => {
        webSocket.sockets.emit('chat:message', data);
    });
//Este evento escucha "chat:typing" recibiendo un nickname o "data". 
//En este caso, el socket del cliente es el que emite a TODOS menos a él con broadcast
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });

// Escuchamos el evento "disconnect" del socket de la aplicación.
//Quitamos el usuario del listado online
//Emitimos el nickname del usuario desconectado
//Emitimos nuevamente el listado de usuarios online refrescado.
    socket.on('disconnect',() => {
        usuarios.splice(usuarios.indexOf(socket.id),1);
        webSocket.sockets.emit('connected',usuarios);
        webSocket.sockets.emit('chat:disconnected', socket.nickname);
        console.log('user disconnected', socket.id);

    });

});
```

Primero que nada, definimos una constante con la definición de, sobre que servidor estará escuchando nuestra libreria Socketio. A esta, le he puesto «webSocket».  
Luego, como les comenté, esto se trata de una conversación bilateral, con lo cual, cuando un usuario se conecte, necesitamos que se informe al servidor. En este archivo definiremos con el método .on, sobre websocket el listener correspondiente a la conexión y definiremos una variable «socket» con el socket correspondiente a la aplicación en particular que se conecto a nuestro servidor.  
Dentro de esta conexión, definiremos los diferentes eventos que debemos escuchar para poder realizar nuestro chat, como por ejemplo, que usuario está escribiendo, los mensajes enviados por cada uno de los usuarios conectados, el listado de usuarios conectados, etc.  
Para emitir un mensaje desde el servidor a TODOS los usuarios, se deberá realizar desde la constante definida «webSocket» (socket del servidor) , mientras que para recibir información por parte del cliente, se debe usar la variable definida como «socket» ya que se trata del socket del cliente. Tomemos como ejemplo enviar mensaje:  
  
Cuando enviamos un mensaje, el primero en recibirlo es el servidor, quien tiene TODAS las conexiones de los distintos usuarios:

```
    socket.on('chat:mensaje', (data) => {
        webSocket.sockets.emit('chat:message', data);
    });

```

En este caso, escuchamos un evento llamado «chat:mensaje» y recibimos un mensaje que definimos como «data».  
Luego, lo que queremos es que el mensaje llegue a cada uno de los sockets conectados, con lo cual desde el servidor utilizamos la función  **sockets.emit()**.  Ahora, lo único que nos hace falta es inspeccionar como enviamos el mensaje al servidor y como recibimos su respuesta. Eso lo haremos en nuestro archivo MAIN.js que mostraré a continuación:

### MAIN.JS

```
const socket = io();

//Traemos los elementos del DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let output = document.getElementById('output');
let send = document.getElementById('send');
let actions = document.getElementById('actions');
let connectedUsers = document.getElementById('connected');

send.addEventListener('click', function () {
    socket.emit('chat:mensaje',{
        message: message.value,
        username: username.value
    });
});

username.addEventListener('change', function (){
    socket.emit('chat:nickname', username.value);
});

message.addEventListener('keypress', function (){ 
    console.log(username.value);
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message} </p> `
});

socket.on('connected', function (data) {
    connectedUsers.innerHTML = '';
    data.forEach(element => {
        connectedUsers.innerHTML += `<p>${element.name}</p>`; 
    });
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} está escribiendo ..</em></p>`
});

socket.on('chat:disconnected', function(data) {
    actions.innerHTML = `<p><em><strong>${data}</strong> Se ha desconectado :( </em></p>`
});
```

Lo primero a realizar en este archivo, es realizar la conexión, es decir, el evento con el cual el servidor escuchará ‘Connection’ utilizando  **io()**  y guardandolo en una constante llamada «**socket**«, que utilizaremos para emitir los mensajes al servidor, dado que es nuestra conexión con el mismo.  
Luego, comenzamos a realizar acciones en nuestro javascript: En el html tendremos un input de username y un input de mensaje, además de un botón para realizar el envío del mismo.

```
send.addEventListener('click', function () {
    socket.emit('chat:mensaje',{
        message: message.value,
        username: username.value
    });
});

```

Agregamos un evento click sobre el botón para que envíe esta información al servidor con el evento que vimos antes, **«chat:mensaje»**. De esta manera, podremos enviarle el objeto con la información del username y el mensaje necesario al servidor.  
Una vez enviado el mensaje, recordemos que el servidor lo emitia hacia TODOS los sockets conectados, para ello necesitamos colocar un evento que escuche dicho mensaje del servidor y realice lo que necesitemos para nuestro chat:  

```
socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message} </p> `
});

```

Cuando a mi conexión le llega un evento de tipo «chat:message» con una información llamada «data», en el output definido en el HTML, enviamos por separado la información, el username y el mensaje.

Una vez entendido este paso a paso, podremos entender dentro del código la misma funcionalidad para los usuarios conectados y para los mensajes que colocaremos en el div «actions» ( X está escribiendo … o X se desconectó .. ).  
Colocaré el código del html y del CSS para que puedan tener la base que armé del chat, intenten realizarlo ustedes mismos para entender como funcionan los sockets!.

### index.html

```
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JB - Chat</title>
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
</head>

<body>
    <h1 id="titulo">Ejemplo uso websocket</h1>
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <div id="chat-container">
                    <h4 id="titulo">Usuarios conectados</h3>
                    <div id="connected"></div>
                </div>
            </div>
            <div class="col-sm-8">
                <div id="chat-container">
                    <div id="chat-window">
                        <div id="output"></div>
                        <div id="actions"></div>
                    </div>
                    <input type="text" id="username" placeholder="Nombre de usuario">
                    <input type="text" id="message" placeholder="mensaje">
                    <button id="send">Enviar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script src="main.js" charset="utf-8"></script>
</body>

</html>
```

Main.css

```
body {
    font-family: 'Nunito', sans-serif;
}

#chat-container{
    max-width: 100%;
    margin: 30px auto;
    border:1px solid #ddd;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, .5);
}

#connected p{
    padding:14px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
}

#chat-window {
    padding: 14px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
}

#output p {
    color: #aaa;
    padding: 14px 0;
    margin: 0 20px;
}

input{
    padding: 10px 20px;
    box-sizing: border-box;
    border: 0;
    background: #eee;
    display: block;
    width: 100%;
}

#send {
    background: #575ed8;
    color:#fff;
    font-size: 18px;
    border: 0;
    padding: 12px 0;
    width: 100%;
    border-radius: 0 0 2px 2px;
}

#actions p {
    padding:14px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;

}

#titulo {
    text-align: center;
 }
```

# Conclusión

Compredimos el uso de websockets tanto la teoría como también con un ejemplo práctico y divertido.  
Existen muchos usos para los cuales se pueden utilizar los websockets y es algo complemtamente útil dado que la tecnología avanza y cada vez necesitamos más velocidad de respuesta de nuestros servidores para nuestras aplicaciones.  
  
Intenten realizar el práctico, es una linda manera de aprender y ante cualquier duda, pueden buscarme por las redes sociales! Espero les sirva!!!