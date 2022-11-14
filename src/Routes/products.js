const express = require('express');
const router = express.Router();
const validError = require ('../Middleware/validError');
const logRequestInfo = require ('../Middleware/logRequestInfo');
const { request, response } = require('express');

let products = [];

router.get('/products', logRequestInfo, (req, res) => {
    res.json('Hello products')
})

router.get('/products/:id', validError, (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id)); 
  response.json(product);
  /// res.send({product: products[req.params.id]})
})

router.post('/products', (req,res) => {
  let product = req.body;
  if (!product.name || !product.id) return res.status (400).send ({err: 'Please complete the dates'})
  products.push(product)
  res.send({ message: 'Product CREATED', product, products })
})

router.put('/products/:id', validError, (req,res) =>{
console.log('put usuario id')
console.log(req.params.id)
console.log(req.body)
response.json(req.body)

})

router.delete ('/products/:id', validError, (req,res) =>{
  const productToDelete = products.findIndex((item) => item.id === parseInt(request.params.id));
  const product = products.splice(productToDelete, 1);
  console.log(product);
  response.json(product);
});


module.exports = router