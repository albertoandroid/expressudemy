const express = require('express')
const app = express()
const port = process.env.PORT || 3003
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/cars/list',(req, res)=>{
    res.send(['BMW X1', 'AUDI A3', 'Mercedes Clase A'])
})

app.get('/api/cars/id/:id',(req, res)=>{
    res.send(req.params.id)
})
 
app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))