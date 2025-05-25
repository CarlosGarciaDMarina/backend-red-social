// Importamos modelos
const Follow = require("../models/follow");
const User = require("../models/user");
const Publication = require("../models/publications");

// Importamos dependencias y modulos
const bcrypt = require("bcrypt");
const mongoosePagination = require("mongoose-pagination")
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


// Importamos el servicio
const FollowService = require("../services/followUserIds");
const validate = require("../helpers/validate");
const jwt = require("../services/jwt");

// Controlador de prueba
const pruebaUser = async(req, res) => {
    try{
        return res.status(200).send({
            message: "Hola mundo desde controllers/user.js"
        });
    }catch(error){
        return res.status(500).send({
            message: "direccion no encontrada"
        });
    }
}

// Registro de usuarios
const register = async (req, res) => {
    try {
        // Recoger los datos
        let params = req.body;

        // Comprobar que me llegan correctamente
        if(!params.name || !params.email || !params.password || !params.nick){
            // Debug
            console.log("Validación no pasada.");
            return res.status(404).json({
                status: "error",
                message: "No ha pasado la validacion minima, se necesita: nombre, apellidos, contraseña y nick."
            })
        }

        // Validamos el usuario usando la funcion 'validate'
        const validationResult = validate.validate(params);

        if (!validationResult.valid) {
            return res.status(400).json({
                status: "error",
                message: validationResult.message
            });
        }

        // Creamos el objeto de usuario
        let user_to_save = new User(params);

        // Controlamos que no haya duplicados
        const users = await User.find({ $or:[
            {email: user_to_save.email.toLowerCase()},
            {nick: user_to_save.nick.toLowerCase()}
        ]}).exec();

        if(users && users.length >= 1){
            return res.status(409).json({
                status: "error",
                message: "El usuario ya existe"
            });
        }

        // Ciframos la contraseña
        user_to_save.password = await bcrypt.hash(user_to_save.password, 10);

        // Guardamos el usuario
        await user_to_save.save();

        // Devolvemos OK!!
        return res.status(200).json({
            status: "success",
            message: "Usuario registrado con éxito",
            user: user_to_save
        });
        
    }catch (error) {
        return res.status(500).json({
            status: "error",
            message: `Ha ocurrido un error inesperado: ${error}`
        });
    }
}


module.exports = {
    pruebaUser,
    register
}