// Imports 
const Publication = require("../models/publications");
const FollowService = require("../services/followUserIds");

// Controlador de prueba
const pruebaPublication = async(req, res) => {
    try{
        return res.status(200).send({
            message: "Hola mundo desde controllers/publication.js"
        });
    }catch(error){
        return res.status(500).send({
            message: "direccion no encontrada"
        });
    }
}

module.exports = {
    pruebaPublication
}