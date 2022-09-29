'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/centralbomberos')
        .then(() => {
            console.log("Conexion a la base de datos establecida");

            //creacion del servidor

            app.listen(port, () => {
                console.log("Servidor corriendo correctamente");
            });
        })
        .catch(err => console.log(err));