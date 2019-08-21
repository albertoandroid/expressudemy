const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/cars/list',(req, res)=>{
    res.send(['BMW S1', 'AUDI A3', 'Mercedes Clase A'])
})
 
app.listen(3003, ()=> console.log('Escuchando Puerto 3003'))