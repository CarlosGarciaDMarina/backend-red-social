'use strict'

// Libreria
var express = require("express");
var body_parser = require("body-parser");

// ejecutamos la funcion de express
var app = express();

//Middlewares:
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

// Ruta de prueba
app.get('/test', (req, res) => {
    res.status(200).send({
        message: "Hola mundo desde mi API de NodeJS"
    })
});


// Exportamos la variable app con la config
module.exports = app;