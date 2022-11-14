const express = require ('express')
const multer = require ('multer')
const usersRouter = require ('./src/Routes/users.js')
const petsRouter = require ('./src/Routes/pets.js')
const productsRouter = require ('./src/Routes/products.js')
const logRequestInfo = require('./src/Middleware/logRequestInfo')

const app = express()

const server = app.listen (8080, ()=> console.log('Server UP!'));

/*SET STORAGE*/ 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-'+ file.originalname)
    }
})

const upload = multer ({ storage });

/* Upload 1 file */ 
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }res.send(file) 
})

/* Upload some files */

app.post('/uploadfiles', upload.array('myFiles'), (req, res, next) => {
  const files = req.files 
  if (!files || files.length == 0) {
    const error = new Error('Please upload files')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
})

/*JSON*/

app.use(express.json())

app.use('/', express.static('Public'));
app.use('/products',logRequestInfo, productsRouter);
app.use('/users', logRequestInfo, usersRouter);
app.use('/pets', logRequestInfo, petsRouter);

/// FETCH ES PARA CONSULTAR UNA RUTA.

////
//// MULTER : https://github.com/alexmarinmendez/backend-clase-8-multer
////
//// DESAFIO : desafio de archivos, como crear ID
//// thumnail es un string
//// no se usa multer. 
//// como creamos USERS y PETS, crear API y PRODUCTOS CON ROUTER
//// 


/* HACER MIDDLEWARE DE VALIDACION Y ENRUTAR.
*/


