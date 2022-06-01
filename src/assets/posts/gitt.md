# Introducción
La idea principal de este post es dar a conocer una herramienta que toda persona del mundo IT debe conocer y que todos deberiamos utilizar para llevar un control de nuestro código.
De esto se trata GIT, un software de control de versiones creado por Linus Torvalds, pensado para el mantenimiento de archivos de código de manera eficiente y rápida. Vamos al lio!

### ¿Qué es un repositorio?
El repositorio de proyectos es una plataforma robusta y sobre todo muy segura, lo que permite realizar la gestión de toda la información de los proyectos de manera colaborativa, generando confianza en los participantes del proyecto.
Es decir, y para decirlo en palabras simples, es un lugar en el cual guardaremos nuestros archivos de proyecto y el cual nos brindará distintas ventajas, como por ejemplo, la posibilidad de trabajar colaborativamente.

### ¿Cuales son estas ventajas?
- **Unidad**: Todos los documentos están almacenados en una misma base de datos, es más fácil su recuperación.
- **Libre acceso a los contenidos**
- **Preservación a largo plazo**. La garantía de preservación que supone el depósito en un repositorio es mucho mayor que la que ofrecen las páginas web personales, los servidores de las revistas, etc.
- **Mayor visibilidad**: El autor ve incrementado el impacto de su trabajo.
- **Posibilidad de rollback**: En caso de que una nueva versión de nuestro proyecto tenga un fallo, siempre podremos volver un paso atras, o los pasos atras necesarios para que el sistema vuelva a funcionar.

### ¿Qué es GIT?
Git es un Sistema de Control de Versiones Distribuido (DVCS) utilizado para guardar diferentes versiones de un archivo (o conjunto de archivos) para que cualquier versión sea recuperable cuando lo desee.

Git también facilita el registro y comparación de diferentes versiones de un archivo. Esto significa que los detalles sobre qué cambió, quién cambió qué, o quién ha iniciado una propuesta, se pueden revisar en cualquier momento.

¿Qué es un Sistema de Control de Versiones?
Un Sistema de Control de Versiones (VCS) se refiere al método utilizado para guardar las versiones de un archivo para referencia futura.

### Flujo de trabajo básico en GIT
![](https://www.freecodecamp.org/news/content/images/2020/08/git-basic-workflow-codesweetly.png)
1 - Modificamos el archivo en nuestra area de trabajo, es decir, en nuestra PC.

2 - En el siguiente paso, confirmamos los archivos que iremos a subir al directorio de GIT. En este caso quedarán en el are de staging/preparación. Veremos más adelante que esto se logra gracias al comando "commit" de GIT.

3 - Confirmamos los archivos ya preparados en el area de staging y los guardamos en el repositorio de GIT. Esto se logrará con el comando "Push" que veremos a continuación.

### ¿ Qué es Github ? ¿ Qué es Gitlab ?
Ambas son plataformas basadas en la web donde los usuarios alojan sus repositorios GIT. Facilita la colaboración en proyectos con cualquier persona en cualquier momento.
Actualmente Gitlab ha evolucionado y ofrece una amplia gama de características DevOps, como la integración continua, la seguridad e incluso herramientas de despliegue de aplicaciones.
Github en cambio, opta por dar a los desarrolladores la opción de implementar aplicaciones e integraciones libremente a través del mercado de GitHub.

# Conceptos básicos - Comandos básicos

1 - Git clone: Es un comando básico para descargar el código fuente existente desde un repositorio remoto (Github - Gitlab).

```
git clone https://gitlab.com/julianbermolen/react-redux-imbd.git
```
2 - Git branch: Las ramas son muy importantes para el correcto uso de GIT. Digamos que tu código principal es la rama principal, llamemosla master. (Main o master suelen ser las ramas por default). Un desarrollador puede partir de ese código en el momento en el que desee y trabajar de manera aislada al mismo. Es decir, crea una nueva rama llamada "desarrollo01", realiza los cambios correspondientes al desarrollo y luego, una vez terminado y probado, une esta rama a la rama principal. Lo que nos permite también, que un desarrollador b trabaje en paralelo en otra rama llamada "desarrollo02" en simultaneo y luego pueda unirse a la rama principal.
* Para crear una nueva rama en el repositorio local (tu pc):*

```sh
git branch nueva-rama
```
*Para unir la rama al repositorio remoto (en github o gitlab)*

```sh
git push -u origin nueva-rama
```

*Para ver las ramas*

```sh
git branch --list
```
*Para borrar una rama*

```sh
git branch -d nueva-rama
```

3 - Git checkout: Para poder moverse entre ramas. Es decir, originalmente estarás en la rama Master o principal pero que pasa si queres moverte a la rama "nueva-rama"?, con este comando podrás moverte a gusto.

```sh
git checkout nueva-rama
```

4 - Git status: Es un comando de estado, nos brindará la información necesaria sobre la rama actual. La información recopilada será:
- Si la rama actual está actualizada.    
- Si hay algo que necesita un commit, un add, o borrarse.  
- Si hay archivos preparados, sin preparar o sin seguimiento    
- Si hay archivos creados, modificados o eliminados

```sh
git status
```
5 - Git add: Sirve para agregar el o los archivos modificados al area de staging, es decir, prepararlos para subirlos al repositorio remoto.
*Para agregar un archivo*

```sh
git add <nombre-de-archivo>
```

*Para añadir todos los archivos modificados*

```sh
git add .
```

6 - Git commit: Como mencionamos anteriormente, este comando guarda los archivos modificados para luego poder ser enviados al repositorio remoto, generando un punto de control al cual podremos volver en caso de ser necesario. Requiere un mensaje que será el "titulo" del cambio.

```sh
git commit -m "Modificación 1"
```

7 - Git push: Una vez confirmados los cambios con git commit remotamente, para enviarlos al repositorio remoto se requiere de este comando. Es el encargado de subir dichos cambios.

```sh
git push origin master(Nombre de tu rama)
```

8 - Git pull: Se utiliza para obtener las actualizaciones del repositorio remoto. 

```sh
git pull
```

9 - Git revert: Se utiliza para deshacer cambios realizados. Primero debemos obtener el hash correspondiente al cambio que necesitamos deshacer, para ello utilizamos el comando:

```sh
git log --oneline
```

Por ejemplo, en mi consola obtengo esto:

```sh
PS C:\xampp\htdocs\gitlab-react-component> git log --oneline
ca0b4e3 (HEAD -> main, tag: v1.0.2) 1.0.2
431f27e (origin/main) change on package.json
0ffc74e (tag: v1.0.1) 1.0.1
dcf3f60 readme
8949dff Initial commit
```

Si quisiera revertir el último cambio, debería aplicar la siguiente linea de código:

```sh
git revert ca0b4e3
```

10 - Git merge : Se utiliza para fusionar una rama en la rama principal. Es importante primero estar parado en la rama que deseas fusionar. Por ejemplo:

```sh
git checkout master
```

```sh
git merge nueva-rama
```

# Conclusión
Este es un articulo que da una introducción a los conceptos básicos y que además menciona los comandos más utilizados (al menos por mi) en mi día a día. El asunto de control de versiones, repositorios da para hablar y mencionar en varios post más pero creo que leyendo este post se tienen los conceptos necesarios para comenzar. Luego, escribiré mostrando un ejemplo practico utilizando todos los comandos mencionados y danto más detalles sobre ciertos conceptos.
Espero que les guste!