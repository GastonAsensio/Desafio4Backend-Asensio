const express = require('express');
const router = express.Router()

let pets = [];

// '/' => '/pets/'
router.get('/', (req, res) => {
    res.send({pets})
})

router.get('/:id', (req, res) => {
    let parametro = req.params.id /// guardamos en parametro
    res.send(parametro)
})

/// el metodo post deben llegar los datos por BODY, el front nos envia los datos
router.post('/', (req, res) => {
    let pet = req.body;
    if (!pet.name || !pet.breed || !pet.age) return res.status (400).send ({err: 'Data is required'})
    pets.push(pet)
    res.send({ message: 'PET CREATED', pet, pets })
})


module.exports = router