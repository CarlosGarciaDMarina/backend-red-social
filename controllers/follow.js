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

// Metodo para guadar un follow
const save = async(req, res) => {
    try {
        // Conseguimos los datos por el body
        let params = req.body;

        // Sacamos la id del usuario
        const identity = req.user;

        // Verificamos si el usuario que se quiere seguir existe
        const userToFollowExists = await User.findById(params.followed);
        if(!userToFollowExists){
            return res.status(404).send({
                status: "error",
                message: "El usuario que intentas seguir no existe."
            });
        }

        // Verificamos si el follow ya existe para evitar duplicados
        const existingFollow = await Follow.findOne({
            user: identity.id,
            followed: params.followed
        });

        if(existingFollow){
            return res.status(404).send({
                status: "error",
                message: "Ya sigues a ese usuario."
            });
        }
        
        // Creamos el objeto con modelo Follow
        let userToFollow = new Follow({
            user: identity.id,
            followed: params.followed
        });

        // Guardamos el follow
        await userToFollow.save();

        // Devolvemos OK!
        return res.status(200).send({
            status: "success",
            message: "Follow guardado correctamente.",
            userToFollow
        })

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: `Ha ocurrido un error inesperado: ${error.message}.`
        });
    }
}


module.exports = {
    pruebaFollow,
    save
}