// Importamos el modelo 
const Follow = require("../models/follow");
const User = require("../models/user");


// Importamos el servicio
const FollowService = require("../services/followUserIds");

// Controlador de prueba
const pruebaFollow = async(req, res) => {
    try{
        return res.status(200).send({
            message: "Hola mundo desde controllers/follow.js"
        });
    }catch(error){
        return res.status(500).send({
            message: "direccion no encontrada"
        });
    }
}

module.exports = {
    pruebaFollow
}