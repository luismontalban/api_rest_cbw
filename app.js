'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


//CARGAR ARCHIVOS RUTAS
const emergency_routes = require('./routes/emergency');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

//CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//RUTAS

app.use('/api', emergency_routes);



//RUTAS DE PRUEBA EJEMPLOS

  /*
app.get('/', function (req, res) {
    res.status(200).send(
        "<h1>Pagina de Inicio</h1>"
    );
  });


app.get('/test', function (req, res) {
    res.status(200).send({
        message : 'Hola mundo desde mi API en NodeJS'
    });
  });



app.post('/test/:id', function (req, res) {
    console.log(req.body.nombre);
    console.log(req.query.web);
    console.log(req.params.id);
    res.status(200).send({
        message : 'Hola mundo desde mi API en NodeJS'
    });
  });

*/






//EXPORTAR

module.exports = app;

