const express = require('express')
const app = express()
const port = process.env.PORT || 3003

app.use(express.json())


var coches = [
    {id: 0, company: 'BMW', model: 'X3', year: '2020' },
    {id: 1, company: 'Audi', model: 'A1', year: '2021' },
    {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022' }
]
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/cars/list',(req, res)=>{
    res.send(['BMW X1', 'AUDI A3', 'Mercedes Clase A'])
})

app.get('/api/cars/id/:id',(req, res)=>{
    res.send(req.params.id)
})

app.get('/api/cars/:company/:model',(req, res)=>{
    res.send(req.params)
})

app.get('/api/cars/', (req, res)=> {
    res.send(coches)
})

app.get('/api/cars/:company', (req, res)=>{
    const coche = coches.find(coche => coche.company === req.params.company)

    if(!coche){
        res.status(404).send('No tenemos ningun coche de esa marca')
    }else{
        res.send(coche)
    }
})

app.post('/api/cars', (req, res)=>{
    var carId = coches.length;
    var coche ={
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    coches.push(coche)
    res.send(coche)

})

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))