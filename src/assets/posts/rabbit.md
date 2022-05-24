# Introducción

En el siguiente documento explicaremos en que consiste la arquitectura de colas, Realizando un pequeño proyecto práctico de implementación de Docker, creando un productor de mensajes y un consumidor en NodeJS.  
En este caso, el servicio de mensajeria a utilizar será RabbitMQ aunque Luego, realizaremos algún otro proyecto con otro servicio que cuenta con diferentes caracteristicas: Kafka.

# Colas de mensajes: ¿Qué es y cual es su función?

![](https://julianbermolen.com/wp-content/uploads/2021/12/workflow-rabbitmq.png)

Una cola de mensajes es una forma de comunicación asíncrona de servicio a servicio que se usa en arquitecturas de microservicios y sin servidor. Los mensajes se almacenan en la cola hasta que se procesan y eliminan. Cada mensaje se procesa una vez sola, por un solo consumidor. Las colas de mensajes se pueden usar para desacoplar procesos pesados, para acumular trabajo y para clasificar cargas de trabajo.  
Las colas de mensajes permiten a diferentes partes de un sistema comunicarse y procesar las operaciones de forma asíncrona. Una cola de mensajes ofrece un búfer ligero que almacena temporalmente los mensajes, y puntos de enlace que permiten a los componentes de software conectarse a la cola para enviar y recibir mensajes. Los mensajes suelen ser pequeños y pueden ser cosas como solicitudes, respuestas, mensajes de error o, sencillamente, información. Para enviar un mensaje, un componente llamado productor añade un mensaje a la cola. El mensaje se almacena en la cola hasta que otro componente, llamado consumidor, lo recupera y hace algo con él.

# Beneficios

-   **Garantía de entrega y orden**: los mensajes se consumen, en el mismo orden que se llegaron a la cola, y son consumidos una única vez.
-   **Redundancia**: Las colas persisten los mensajes hasta que son procesados por completo.
-   **Desacoplamiento**: siendo capas intermedias de comunicación entre procesos, aportan la flexibilidad en la definición de arquitectura de cada uno de ellos de manera separada, siempre que se mantenga una interfaz común.
-   **Escalabilidad**: con más unidades de procesamiento, las colas balancean su respectiva carga.

Se pueden usar para reducir las cargas y los tiempos de entrega por parte de los servidores de aplicaciones web, ya que las tareas, que normalmente tardarían bastante tiempo en procesarse, se pueden delegar a un tercero cuyo único trabajo es realizarlas.

# RabbitMQ 

**RabbitMQ** es un software de encolado de mensajes llamado bróker de mensajería o gestor de colas. Dicho de forma simple, es un software donde se pueden definir colas, las aplicaciones se pueden conectar a dichas colas y transferir/leer mensajes en ellas.

# Vamos a la práctica**!

En el siguiente proyecto, bajaremos una imagen de docker de RabbitMQ, junto a un panel visual donde podremos ver los mensajes y las conexiones realizadas, además, crearemos un proyecto en nodeJS para «producir» los mensajes que irán a la cola y otro para «consumir» los mensajes.  
El código estará en el repositorio de Gitlab:  
  
[https://gitlab.com/julianbermolen/queue-nodejs-rabbitmq](https://gitlab.com/julianbermolen/queue-nodejs-rabbitmq)

1 – Bajamos la imagen de RabbitMQ y la corremos en Docker:  

```
docker run -d -p 15672:15672 -p 5672:5672 --name rabbitmq rabbitmq:3-management
```

En este caso, mapeamos 2 puertos. En uno, correrá el servicio RabbitMQ, mientras que en el otro tendremos el panel Front END desde donde verificaremos nuestra conexión, los canales y los mensajes correspondientes. Luego verificamos y tenemos que tener ya RabbitMQ Corriendo en un docker.  

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-1-1024x74.png)

Como ya el servicio está corriendo, podremos entrar al panel del servicio e ingresar con el usuario por default que nos brinda: Guest Guest.  
Si crean un nuevo usuario y eliminan el GUEST (que es lo recomendado) acuerdense de brindarle acceso al virtual Host o de otra manera no podrán realizar la conexión.  

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-2.png)

Como verán, en este panel podremos verificar las conexiones que se encuentran activas hacia nuestro servicio, los canales abiertos y las colas de mensajes que se encuentran creadas, además de encontrar información sobre métricas y funcionamiento que nos brinda el propio RabbitMQ.  
Creamos nuestro directorio donde crearemos el proyecto, en mi caso quedando de la siguiente manera:  

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-3.png)

El archivo  **index.js**  será el encargado de producir los mensajes que irán a la cola de mensajes RabbitMQ, mientras que el archivo  **consumer.js**  los consumirá y mostrará por consola, eliminando solamente los que sean del tipo que necesita el servicio.  
iniciemos el proyecto e instalemos la libreria amqplib. Esta librería contiene las funciones necesarias para poder realizar la comunicación con el servicio RabbitMQ.

Index.js ( Producer )

```
//libreria utilizada para realizar las comunicaciones con rabbitmq
const amqp = require("amqplib");

//Para realizar la conexión, precisamos enviar ciertas configuraciones
const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'bermo',
    password: 'bermo',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

//Estableceremos la conexión, crearemos un canal y crearemos una cola de mensajes sobre empleados
async function connect(){

    const queue = "empleados";

    const msgs = [
        {"name":"Julian","years":26,"description":"Developer"},
        {"name":"Julian","years":24,"description":"Analyst"}
    ] ;

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log("Conexión a RabbitMQ Creada");

        const channel = await conn.createChannel();
        console.log("Canal creado");

        const res = await channel.assertQueue(queue);
        console.log("Cola de mensajes Empleados creada");

        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Mensaje enviado: ${msg}`);
        }

    } catch (error) {
        console.error(`error -> ${error}`);
    }
}
```

Como vemos, instanciamos la librearía AMQPLIB y creamos como primera medida la conexión. Una vez realizada la conexión enviandole las configuraciones del ambiente, podemos crear el canal por el cual vamos a comunicarnos y la cola de nombre «empleados» donde dejaremos los mensajes.  
Como verán, creamos un array con 2 objetos dentro de empleados, donde uno es analyst y el otro developer.  
Recorreremos dicho objeto y enviaremos al Buffer de la cola, el mensage correspondiente:

```
for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Mensaje enviado: ${msg}`);
        }
```

Una vez que corremos el servicio productor de mensajes, si la conexión es correcta, veremos como nuestro servicio envió los dos mensajes que teniamos en nuestro objeto, buscandolos en la cola que creamos: «Empleados»

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-4-1024x472-1.png)

Tenemos los 2 mensajes correspondientes.

Ahora, necesitamos un servicio que pueda Obtener y realizar acciones con todos los mensajes o con algún mensaje en particular. A este servicio lo llamaremos Consumidor y tendrá la siguiente estructura, similar al productor:

consumer.js

```
const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'bermo',
    password: 'bermo',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

async function connect(){

    const queue = "empleados";

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log("Conexión a RabbitMQ Creada");

        const channel = await conn.createChannel();
        console.log("Canal creado");

        const res = await channel.assertQueue(queue);
        console.log("Cola de mensajes Empleados creada");

        channel.consume(queue, message =>{
            let empleado = JSON.parse(message.content.toString());
            console.log(`Mensaje recibido: ${empleado.name}`);
            console.log(empleado);

//Eliminar mensaje de cola
            if(empleado.description == 'Developer'){
                channel.ack(message);
                console.log('Deleted message from queue');
            }else{
                console.log(`Este mensaje no lo borro, ya que es util para algien más: ${empleado}`);
            }
        })

    } catch (error) {
        console.error(`error -> ${error}`);
    }
}
```

La diferencia se encuentra en que el consumidor no necesita producir mensajes, si no recibirlos. Esta diferencia la notaremos en el método implementado:  

```
 channel.consume(queue, message =>{
            let empleado = JSON.parse(message.content.toString());
            console.log(`Mensaje recibido: ${empleado.name}`);
            console.log(empleado);
```

Desde el canal, utilizamos la función «consume» para recibir el mensaje y mostrarlo por consola.  
Como antes bien dijimos, un mensaje es para solamente un consumidor en la mayoria de los casos, con lo cual una vez que lo hayamos leido no tiene sentido almacenarlo aún en la cola. Por ello es que se encuentra la siguiente línea de código:  

```
//Eliminar mensaje de cola
            if(empleado.description == 'Developer'){
                channel.ack(message);
                console.log('Deleted message from queue');
            }else{
                console.log(`Este mensaje no lo borro, ya que es util para algien más: ${empleado}`);
            }
```

En este caso, solo nos interesan los empleados cuya descripción es «Developer». De este modo, leemos el mensaje y una vez que lo obtuvimos utilizamos la función ack, para eliminarlo de la cola correspondiente.  

En este caso, solo nos interesan los empleados cuya descripción es «Developer». De este modo, leemos el mensaje y una vez que lo obtuvimos utilizamos la función ack, para eliminarlo de la cola correspondiente.  
  
Iniciamos el consumidor, en mi caso cree un script pero podrían iniciarlo haciendo «node consumer.js» y verán lo siguiente:

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-5.png)

El mensaje developer es leido y eliminado de la cola, mientras que el mensaje Analyst se guarda ya que no es para nosotros.  
  
Por otro lado, dentro del panel del rabbit, verán que ahora existen 2 conexiones al mismo, el productor y el consumidor:  

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-6.png)

Para identificarlos podríamos haber creado 2 usuarios particulares para ellos, pero la idea se entiende. Ahora tenemos el flujo completo conectado a nuestro RabbitMQ.

# Conclusión

Hemos aprendido sobre lo que es la «arquitectura de colas» y esto nos puede ayudar a desprender procesos que quizás quitan performance a nuestro servicios, siendo que pueden realizarse de manera asincrona sin necesidad de una respuesta en tiempo real.  
Espero les sirva y cualquier aporte será bienvenido en cualquiera de los Post que fui creando. Gracias!