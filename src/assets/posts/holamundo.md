En este post les enseñaré el paso a paso para poder realizar el famoso “Hola mundo” con NodeJS. Este es un inicio al mundo de Node, en las siguientes publicaciones les enseñaré como conectarlo a una base de datos y como obtener resultados utilizando métodos HTTP.

![](https://julianbermolen.com/wp-content/uploads/2021/12/nodejs-express.jpg)

**Primer paso**

Antes que nada, necesitamos instalar en nuestro sistema operativo NodeJS y NPM. Para eso, debemos descargarlo de la página oficial de NodeJS e instalarlo.  **https://nodejs.org/es/**  
Una vez que realizamos este paso, podemos comprobar si realmente se instaló como corresponde en nuestro sistema ejecutando en una terminal el comando node -v (Nos mostrará la versión de node instalada en el sistema).  
![](https://julianbermolen.com/index.php/2020/09/12/proyecto-rest-en-nodejs-holamundo/)

![](https://julianbermolen.com/wp-content/uploads/2021/12/1.png)

Ahora, nos falta la instalación de NPM. Qué es NPM?  **npm** es el Node Package Manager que viene incluido y ayuda a cada desarrollo asociado a Node.  
Para su instalación debemos escribir la siguiente línea de comando en una Terminal.  

```
npm install npm@latest -g
```

Luego, verifiquemos que realmente se haya instalado el gestor de paquetes de Node.

![](https://julianbermolen.com/wp-content/uploads/2021/12/2.png)

**Iniciemos el proyecto!**

Para este primer proyecto, crearemos la siguiente estructura de carpetas. Luego explicaré el porqué de cada una.

![](https://julianbermolen.com/wp-content/uploads/2021/12/3.png)

Dentro de Controllers, agregaremos todas las funciones necesarias para cumplir la lógica del sistema.  
En Routes, describiremos las direcciones http donde el servicio estará entregando una respuesta en formato JSON. Es decir, por ejemplo: /holamundo.  
Nuestro archivo Index.js será el archivo principal del sistema donde describiremos el mismo paso a paso.  
Para iniciar el proyecto, abramos una terminal en la carpeta  **Node-Docker-example**  y escribamos el comando npm init. Esto iniciará nuestro proyecto y creará un archivo dentro llamado package.json  

![](https://julianbermolen.com/wp-content/uploads/2021/12/4.png)

Luego, instalaremos algunas librerías que utilizaremos en esta ocasión, para ello escribamos el comando:

```
npm install -g express body-parser
```

Express es un _framework de desarrollo de aplicaciones web minimalista y flexible para Node.js,_ además es robusto, rápido, flexible y muy simple. Entre otras características, ofrece Router de URL (Get, Post, Put …), facilidades para motores de plantillas (Jade, EJS, JinJS …), Middeleware via Connect y un buen test coverage.  
Básicamente, lo que **body**–**parser** es lo que permite a Express leer el cuerpo y luego analizarlo en un objeto Json que podamos entender.

![](https://julianbermolen.com/wp-content/uploads/2021/12/5.png)

**Index.js**

```
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Settings
//Process.env.PORT es el puerto dado por el ambiente. Si no existe, será 4000 nuestro puerto.
app.set('port', process.env.PORT || 4000); 

// Middlewares se utilia para 
app.use(express.json()); //Es un método incorporado en express para reconocer el objeto de solicitud entrante como objeto JSON
app.use(bodyParser.urlencoded({extended: false}));  
//Lee los encabezados que tengan Content-Type correcto y envía la información en el req.body

// Routes de la aplicación
app.use('/api/holamundo',require('./Routes/holamundo.routes'));

// Inicia la aplicación en el puerto correspondiente.
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));

});

```

****Routes – holamundo.routes.js****

```
//importamos Express y utilizamos la ufncionalidad Router() para tomar las solicitudes http.
const express = require('express');
const router = express.Router();

//importamos el controller de HolaMundo
const holaMundoCtrl = require('../Controllers/holamundo.controller');

// indicamos que cuando vengan a la ruta indicada utilicen la funcionalidad del controller getHolaMundo
router.get('/', holaMundoCtrl.getHolaMundo);

// Exportamos el router. 
//De esta manera, cuando invoquen dicho archivo tendrán las rutas indicadas en la linea anterior
module.exports = router;

```

**Controllers – holamundo.controllers.js**

```
const holaMundoCtrl = {};

//Agregamos la función Hola Mundo con el mensaje que queremos ver en pantalla
holaMundoCtrl.getHolaMundo = async (req,res) => {
    res.json({
        message: "Hola Mundo!"
    });
}

module.exports = holaMundoCtrl;

```

Listo, ya tenemos todo lo necesario para hacer funcionar nuestro servicio. Abramos una nueva terminal y escribamos el siguiente código:

```
node index.js

```

Como resultado debemos observar lo siguiente:

![](https://julianbermolen.com/wp-content/uploads/2021/12/6.png)

Recuerden que configuramos el Port 4000 para iniciar el proyecto.

Llamemos a nuestro servicio!

![](https://julianbermolen.com/wp-content/uploads/2021/12/7-1024x348-1.png)

# Conclusión

Excelente. Espero que les haya servido para iniciarse en el mundo de NodeJS, acuérdense que se aprende a prueba y error. Cualquier duda o algo que no se entienda de este post por favor coméntenmelo para corregirlo y dejar el tutorial en un perfecto estado.  
Más adelante les mostraré como aplicar este proyecto con MongoDB, utilizando algunas otras librerias de Node. También les mostraré como “Dockerizar” este proyecto, transformándolo en una imagen y corriéndolo en un Container.