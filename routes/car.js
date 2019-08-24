const express = require('express')
//const app = express()
const router = express.Router()
const { check, validationResult } = require('express-validator');

var coches = [
    {id: 0, company: 'BMW', model: 'X3', year: '2020' },
    {id: 1, company: 'Audi', model: 'A1', year: '2021' },
    {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022' }
]

router.get('/list',(req, res)=>{
    res.send(['BMW X1', 'AUDI A3', 'Mercedes Clase A'])
})

router.get('/id/:id',(req, res)=>{
    res.send(req.params.id)
})

router.get('/:company/:model',(req, res)=>{
    res.send(req.params)
})

router.get('/', (req, res)=> {
    res.send(coches)
})

router.get('/:company', (req, res)=>{
    const coche = coches.find(coche => coche.company === req.params.company)

    if(!coche){
        res.status(404).send('No tenemos ningun coche de esa marca')
    }else{
        res.send(coche)
    }
})

router.post('/', (req, res)=>{
    var carId = coches.length;
    var coche ={
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    coches.push(coche)
    res.status(201).send(coche)

})

router.post('/2', (req, res)=>{
    if(!req.body.company || req.body.company.length < 3 ){
        res.status(400).send('Introduce la empresa correcto')
        return
    }

    var carId = coches.length;
    var coche ={
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    
    coches.push(coche)
    res.status(201).send(coche)

})

router.post('/3', [
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var carId = coches.length;
    var coche ={
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    
    coches.push(coche)
    res.status(201).send(coche)

})

router.put('/:id', [
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

    if(!coche){
        return res.status(404).send('El coche con ese ID no esta')
    }

    coche.company = req.body.company
    coche.model = req.body.model
    coche.year = req.body.year
    
    res.status(204).send()

})

router.delete('/:id', (req, res)=>{
    const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

    if(!coche){
        return res.status(404).send('El coche con ese ID no esta, no se puede borrar')
    }

    const index = coches.indexOf(coche)
    coches.splice(index,1)
    res.status(200).send('coche borrado')

})

module.exports = router