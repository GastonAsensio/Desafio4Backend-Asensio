const express = require('express');
const router = express.Router();
const validError = require ('../Middleware/validError');
const logRequestInfo = require ('../Middleware/logRequestInfo');


let products = [];

router.get('/', logRequestInfo, (req, res) => {
    res.send({products})
})

router.get('/:id', validError, (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id)); 
  res.json(req.params.id);
  /// res.send({product: products[req.params.id]})
})

router.post('/', (req,res) => {
  let product = req.body;
  if (!product.name || !product.id) return res.status (400).send ({err: 'Please complete the dates'})
  products.push(product)
  res.send({ message: 'Product CREATED', product, products })
})

router.put('/:id', validError, (req,res) =>{
const productToUpdate = products.findIndex((item) => item.id === parseInt(req.params.id))
const product = products.splice(productToUpdate, 1, req.body)
console.log('put usuario id')
res.json(req.body)

})

router.delete ('/:id', validError, (req,res) =>{
  const productToDelete = products.findIndex((item) => item.id === parseInt(req.params.id));
  const product = products.splice(productToDelete, 1);
  res.json(product);
});


module.exports = router