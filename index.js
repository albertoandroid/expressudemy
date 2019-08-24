const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const { check, validationResult } = require('express-validator');
const date = require('./date')
const morgan = require('morgan')

app.use(express.json())

app.use(morgan('tiny'))

app.use(date)

app.use('/api/cars/list', function(req, res, next){
    console.log('Request Type: ', req.method)
    next()
})

app.use('/api/loggin', function(req, res, next){
    console.log('loggin')
    next()
})


var coches = [
    {id: 0, company: 'BMW', model: 'X3', year: '2020' },
    {id: 1, company: 'Audi', model: 'A1', year: '2021' },
    {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022' }
]
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))