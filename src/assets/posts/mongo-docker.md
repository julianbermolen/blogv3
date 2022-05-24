# Introducción

En el siguiente Post aprenderemos a desarrollar un servicio Rest capaz de almacenar documentos en MongoDB. Luego, separaremos en Docker el servicio de Mongodb y el api Rest nodejs, de manera que se encuentren comunicados e independizados.

Inicio de Desarrollo

## Instalando MongoDB

Antes de que podamos comenzar a crear nuestros esquemas y modelos de Mongoose, debe instalarse y configurarse MongoDB. Podrán encontrar las últimas versiones en [descarga de MongoDB](https://www.mongodb.com/download-center?jmp=nav#community).

  
Para empezar, tomaremos las bases que aprendimos en el post anterior: https://bit.ly/2GeXPat – «**proyecto-rest-en-nodejs-holamundo**«  
Iniciaré un nuevo proyecto que podrán encontrar en:  
  
[https://gitlab.com/julianbermolen/node-docker-mongo-example](https://gitlab.com/julianbermolen/node-docker-mongo-example)

  
Como primera medida, instalaremos las siguientes dependencias:  

```
npm install express mongoose body-parser
```

Lo nuevo en este caso es «mongoose». Mongoose, es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono, cada esquema diseñado se asigna a una colección MongoDB y define la forma de los documentos dentro de esa colección. De esta manera, mongoose hace que trabajar con MongoDB sea mucho más fácil.

**Estructura del proyecto**

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-1-1.png)

Lo nuevo en este caso, sería el Modelo, que será la definición de nuestro Esquema en MongoDB y el archivo de configuración database, donde escribiremos la conexión a la base de datos no relacional.

Index.js

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-2-1024x772-1.png)

En el archivo principal dejamos las mismas configuraciones que habiamos explicado en el Post anterior, con la diferencia que agregamos la conexión a la base de datos y modificamos la ruta donde encontraremos nuestros servicios Rest. En este caso, guardaremos la información de un usuario en nuestro MongoDB.

Esquema de Usuario

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-3-1.png)

Dentro de nuestro esquema, especificamos las distintas configuraciones del mismo. Por ejemplo, el tipo de valor a guardar dentro de cada llave y podemos añadir la validación de si es o no requerido.  
De esta manera, ya tenemos definido que en nuestro MongoDB Guardaremos un usuario que tendrá como información un nombre, un email y un número de teléfono.  
Vamos a ver entonces como configuramos nuestro Moongose para realizar la conexión a la base de datos de manera exitosa.

Database.js

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-7-1024x305-1.png)

En este archivo encontraremos la configuración de nuestra base de datos. En caso de no existir, mongoose la creará de 0 en cuanto sea utilizado el connect.

usuario.routes.js

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-5-1.png)

Vamos a crear el  **CRUD (Crear, leer, editar y remover)** para poder Guardar un usuario, listar la totalidad de usuarios, traer solamente 1 usuario mediante su ID, editar y remover los mismos.

usuario.controller.js

```
const Usuario = require('../Models/usuario');

// instanciamos un array donde almacenaremos las respuestas de nuestras funciones.
const usuarioCtrl = {};

// Este servicio listará todos los usuarios en la BDD
// Toda solicitud tiene un request y un response. Usaremos el Response para devolverlo en forma de JSON.
// Como verán, el esquema puede utilizar la funcion find(), que en mongo debe nos traerá la seleccion de ese mismo esquema.
usuarioCtrl.getUsers = async (req,res) => {
    let usuarios = await Usuario.find();
    res.json(usuarios);
};

// Creamos un usuario. COmo verán, la información vendrá en el Request por Body. El verbo utilizado es POST como lo indica el router.
// En este caso, utilizamos la función del esquema Save, para guardar el usuario en BDD.
usuarioCtrl.createUser = async (req,res) => {
    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono
    });
    await usuario.save();
    res.json({
        req,
        'status':'Employee saved'
    });
};

//Obtenemos el ID por parámetro y buscamos con la funcion findById del esquema Mongoose.
// Si obtenemos el usuario, lo respondemos en forma de JSON y Si no, respondemos con error.
usuarioCtrl.getUser = async (req,res) => {
    let user = await Usuario.findById(req.params.id, function(err,usuario){
        if(err){
            res.status(404).json({'status':'Usuario no encontrado en MongoDB'});
        }
        else res.json(usuario);
    });
};

//Usamos la funcionalidad findByIdAndUpdate para buscar y actualizar con la nueva información.
usuarioCtrl.editUser = async (req,res) => {
    let user = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono
    };
    let usuario = await Usuario.findByIdAndUpdate(req.params.id, {$set: user}, {new:true});
    res.json({'status': 'Usuario actualizado',usuario});
};

//De la misma forma, buscamos por id y lo removemos con la funcionalidad findByIdAndRemove
usuarioCtrl.deleteUser = async (req,res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({'Status':'Usuario eliminado'});
};

module.exports = usuarioCtrl;
```

Aqui tenemos todas las funciones que necesitamos para poder tener una coleccion completa de Node. Vamos a probarlo!!

Corremos el proyecto

En mi caso configuré un script en package.json para iniciarlo con npm run start. Pero podés iniciarlizar el proyecto simplemente con  **node index.js**

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-6-1.png)

Como verán, los logs nos indican que el proyecto está corriendo en el puerto 4000 y además que nuestra DB está conectada. Excelente! Vamos a probar los servicios.

Creemos un usuario

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-8-1024x381-1.png)

Listemos los usuarios en BDD!

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-9-1024x578-1.png)

Traer solo 1 usuario

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-10.png)

Actualicemos este usuario, el email está mal!

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-11-1024x687-1.png)

Borremos el usuario que sobraba

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-12.png)

Docker

Ahora que ya comprobamos que nuestro servicios Rest funcionan y que estamos pudiendo guardar información en nuestro MondoDB, creemos el container de Docker de ambos servicios por separados y unamoslo con «Links».  
Creemos nuestros archivos DockerFile y docker-compose.yml

DockerFile

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-13.png)

Creamos el archivo docker en base a la última versión de Node. Creamos el directorio de trabajo, nos situamos en él y copiamos nuestro archivo package.json que contiene todas las dependencias del proyecto.  
Luego, corremos npm install en nuestro Docker, para instalar dichas dependencias. Luego, instalé un servicio «concurrently» que ayuda a que podamos correr comandos de NPM y que el servicio se inicie con el script del package.json «Start».

docker-compose.yml

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-16.png)

Creamos en el docker compose los dos servicios que necesitamos. App (Nodejs services rest) y MongoDB.  
Intanciamos que el servicio de Node ante caídas se reinicie automaticamente, ligamos el puerto 4000 del docker al 4000 del localhost. Es decir, que cuando iniciemos el puerto 4000 de nuestra maquina estará conectado al 4000 del docker.  
Utilizamos LINKS para poder vincular al siguiente contenedor, hay que tener en cuenta que los container se crean en redes donde no son visibles para los demás containers, por este motivo está la necesidad de vincularlos. Dentro del container de mongo, lo creamos a partir de una imagen de mongo (Podes encontrar imagenes de mongo en docker.hub) y ligamos el puerto 27017 de nuestro localhost a 27017 del container.)  
  
Finalmente, ponemos en terminal docker-compose up y veamos el resultado.  

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-17-1024x123.png)

Listo, tenemos corriendo los dos servicios en 2 docker separados, lo cual hace facilmente escalable cualquiera de los dos contenedores.

Conclusión

Aprendimos a realizar CRUD en Nodejs almacenando información en una base de datos no relacional, además de lograr «Dockerizar» dichos servicios.  
Recuerden que en el camino pueden encontrar distintos errores y es importante tener la paciencia de saber leer esos errores para poder corregirlos y avanzar.  
Espero les haya servido a modo de introducción al tema y que puedan seguir avanzando en sus proyecto!