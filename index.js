const express = require('express')
const app = express()

const car = require('./routes/car')
app.use(express.json())
app.use('/api/cars/', car)

const port = process.env.PORT || 3003
const date = require('./date')
const morgan = require('morgan')



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
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))