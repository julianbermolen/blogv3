# Introducción
En este post, la idea es dar una visión general de lo que son los contenedores y cuales son las funciones del mismo.  
En proximos posteos, añadiré un ejemplo práctico de utilización de los mismos para que cualquiera de los lectores pueda poner en practica este recurso y adentrarse en el mundo de Docker.

A divertirse!  

![](https://julianbermolen.com/wp-content/uploads/2021/12/docker-logo.png)

**¿Qué es Docker?**

> **Docker** es un proyecto de [código abierto](https://es.wikipedia.org/wiki/C%C3%B3digo_abierto) que automatiza el despliegue de [aplicaciones](https://es.wikipedia.org/wiki/Aplicaci%C3%B3n_inform%C3%A1tica) dentro de [contenedores de software](https://es.wikipedia.org/wiki/Contenedores_de_software), proporcionando una capa adicional de abstracción y automatización de virtualización de aplicaciones en múltiples sistemas operativos.
> 
> Wikipedia

Es decir, es una herramienta que nos ayuda a desplegar distintos o mismos servicios en distintos «contenedores» o paquetes dentro de una misma instancia de manera automatizada, utilizando para todos ellos el mismo Kernel Linux, evitando de esta manera la sobrecarga y mantenimiento de multiples instancias virtuales.  
Llamamos  **Kernel** al elemento principal de los sistemas operativos Linux, la interfaz necesaria entre el hardware de una computadora y sus procesos. Es quien los comunica entre si y gestiona los recursos de la manera más eficiente.

  
**Conceptos Básicos de Docker**

**Imagenes**

Una imagen puede ser interpretada como una plantilla para la creación de un contenedor Docker.  
Debido a que pueden llegar a ser bastante grandes, las imágenes están diseñadas para estar compuestas de capas de otras imágenes, lo que permite que se envíe una cantidad de datos de manera crucial al transferir imágenes a través de la red.

**Contenedores**

Son instancias de ejecución a partir de una imagen.

![](https://julianbermolen.com/wp-content/uploads/2021/12/image-4.png)

A partir de la imagen podemos ejecutar distintos contenedores

**Volumenes**

Los volumenes son una herramienta que nos sirven para guardar la información persistente fuera del contenedor, de esta manera al crear o borrar contenedores no necesitamos preocuparnos por la información que utilizan los servicios dentro.  
Además, los volumenes son creados para poder compartir información entre contenedores.

**DockerFile**

Se podría decir que el dockerFile es un archivo de texto que contiene una «receta» o instrucciones neecsarias para crear una imagen, que, posteriormente, se convertira en una aplicación utilizada para un determinado objetivo.  
En siguientes Posts, veremos más a detalle lo que es y lo que puede realizarse con este famoso archivo.

**¿Que ventajas obtenemos utilizando Docker?**

1 –  **Modularidad**

El enfoque que podemos presentar con docker permite mejorar, reparar una pequeña parte de un sistema o un microservicio sin la necesidad de impactar toda la aplicación.

**2 – Capas y Control de Versión de Imagen**

Como bien mencionamos anteriormente, los contenedores de Docker se inician atraves de imagenes.

Cada archivo de imagen de Docker está conformado por una serie de capas. Estas capas se combinan en una única imagen. Una capa se crea cuando la imagen cambia. Cada vez que un usuario especifica un comando, como _ejecutar_ o _copiar_, se crea una nueva capa.

**3 – Restauración**

Al tener un control de versión entre capas, en caso de necesitar volver a una versión anterior es posible.

**4 – Rapidez de implementación**

Utilizando Docker, se reduce el tiempo de implementación en segundos ya que no contamos con dependencias del sistema operativo en si para mover o agregar contenedores.

# Conclusión

Mediante este artículo hemos ingresado en el mundo Docker a alto nivel, podemos conocer el objetivo, las ventajas y los conceptos basicos de estos contenedores. Resta ponerlo en práctica, por eso, para el proximo Post traeré un ejercicio propio con el cual pude insertarme en este maravilloso mundo.  
Espero que les haya servido esta breve explicación, sepan que estoy abierto a realizar correcciones y a escuchar las opioniones sobre esta nota.  
Muchas gracias!!