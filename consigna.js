/* 
CONSIGNA: Realizar un proyecto de servidor basado en node.js y express, que ofrezca una API restful de productos.
Con las siguientes rutas:
GET '/api/productos' --> devuelve todos los productos.
GET '/api/productos/:id' --> devuelte un producto segun su ID.
POST '/api/productos' --> recibe y agrega un producto, y lo devuelve con su ID asignado.
PUT '/api/productos/:id' --> recibe y actualiza un producto segun su ID.
DELETE '/api/productos/:id' --> elimina un producto segun su id.

GIT IGNORE NODE_MODULES
Formato del producto:

{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
} 

ACLARACIONES:
+ Cada producto tendra un ID proporcionado por el backend, comenzando en 1 y que ira incrementando a medida que se incorporen productos.
Sino existe un producto se devolvera el objeto {error: 'producto no encontrado'}
+ Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
+ Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
+ Crear un espacio publico de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
+ El servidor debe estar basado en express y debe implementar los mensajes de conexion al puerto 8080 y en caso de error, representar la descripcion del mismo.
+ Las respuestas del servidor seran en formato JSON. La funcionalidad sera probada a traves de Postman y del formulario de ingreso.
*/


/* TIPS CLASE 7 
-Crear servidor express : abro terminal, npm init -y para iniciar proyecto de node, y luego npm i express. #OK#
-Creo app.js (npm list -g para ver que tenemos instalado.) #OK#
-Una vez creado traigo express con const express = require ('express') #OK#
-Luego le doy a app express, const app = express() y marco un servidor const server = app.listen (8080, ()=> console.log('Server UP!')) #OK#
-Nodemon app.js para iniciar el servidor. #OK#
-Preparo al servidor para recibir y leer formato JSON con app.use (express.json()) #OK#
-YA PUEDO COMENZAR CON LA CONSIGNA, FIJARME LOS ENDPOINTS.

TIPS CLASE 8
-Organizamos el proyecto, creamos la carpeta Routes, donde vamos 
-CTRL + D seleccion multiple
-PostMAN MINUTO 12:30 explicacion de uso
- Si yo en el archivo central importo por ejemplo app.use(/users, userRouter) en el archivo de users.js puedo borrar esa ruta, ya que esta seteada
- En users ponemos la carga de usuarios, actualizacion, modificacion, eliminacion (get,post,put,delete,) y en el general solo tenemos llamado a ese script.
-MIDDLEWARE MINUTO 1:06:00 explicacion: LO MAS IMPORTANTE ES EL NEXT, ES EL TERCER PARAMETRO, **NO USA RETURN**.
-Lo que nos permite express es agregar como un segudno parametro, dentro de cada metodo (get,put, etc).
- Middleware a nivel ruta, esta siendo llamado en cada ENDPOINT.
Pero es mejor directamente modularizarlo, ponerlo en un carpeta aparte(dentro de SRC) y exportar/importar. Entonces lo ponemos en nuestra script principal (de la app)
como segundo parametro del app.use de users, de mascotas, de lo que tenga enrutado y necesite, y pasa a ser un Middleware a nivel Router. 
-Hacer validaciones como middleware, en un script aparte, luego exportar/importar, y colocamos la funcion en cada user.Router que necesitemos
-Una validacion de error para los que necesitan ID seria:

const validErrors = (req,res,next) => {
    if (!request.params.id) {
        response.json({
            error: 'bad request, missing id'
        }).status(400);
    } else{
        next();
    }
}
module.exports = validErrors

-Multer: 
npm init -y --> crea el package json
npm i multer express 
-Minuto 1:39:00 importante
-La idea es crear los endpoint para que reciba los post con archivos y los guarde en un carpeta de uploads o algo por el estilo.

-Creamos un storage que viene de multer, que va a tener un destino (carpeta uploads)
-Tiene una funcion CB, que seria CALLBACK, que podriamos ejecutar.
-Filename le ponemos el nombre que querramos y le podemos concatenar la fecha.

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()-${file.originalname}}`) --> el date adelante para no romper el formato del archivo
    }
})

const upload = multer({ storage }) --> instanciamos el multer, llamando al objeto

**MULTER PARA 1 ARCHIVO**

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => { --> Creamos el endpoint para un archivo, creamos un middleware que se va a ejecutar (upload.single)   
  const file = req.file --> recibimos el archivo
  if (!file) { --> en caso de que el archivo no exista
    const error = new Error('Please upload a file')--> le mostramos un error, y un mensaje de que por favor resuba el archivo 
    error.httpStatusCode = 400--> le damos un status 400
    return next(error)--> le hacemos un next error
  }
  res.send(file) --> ponemos el file que nos mando.
})

**MULTER PARA VARIOS ARCHIVOS** 

app.post('/uploadfiles', upload.array('myFiles'), (req, res, next) => { --> en vez de single le decimos que sea ARRAY, myfile es la etiqueta del nombre del archivo
  const files = req.files 
  if (!files || files.length == 0) {
    const error = new Error('Please upload files')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
})

Multer facilita el guardado de los archivos.

*/

/// CONSEJO de MODULARIZACION: public --> html / src --> index.js y carpetas: middleware, routes y adentro el script. 


/*
{
  "title": "Chalecos",
  "price": "2500",
  "url": "",
  "id": 1
},
{
  "title": "Correa",
  "price": "252",
  "url": "",
  "id": 2
}*/

/*PUSHEAR GIT ADD .
  git commit -m "segundo commit"
  git push origin main*/