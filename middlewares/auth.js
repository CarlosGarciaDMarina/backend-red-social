// Importamos los modulos
const jwt = require("jwt-simple");
const moment = require("moment");

// Importar clave secreta
const lib_jwt = require("../services/jwt");
const secret = lib_jwt.secret;

// Middleware de autenticación
const auth = (req, res, next) => {
    try {
        // Comprobamos si nos llega la cabecera del auth
        if(!req.headers.authorization){
            return res.status(403).send({
                status: "error",
                message: "La petición no tiene la cabecera de autenticación"
            });
        }

        // Limpiamos el token
        let token = req.headers.authorization.replace(/['"]+/g, '');

        try {
            // Decodificamos el token
            let payload = jwt.decode(token, secret);

            // Comprobamos la expiracion del token
            if (payload.exp <= moment().unix()) {
                return res.status(401).send({
                    status: "error",
                    message: "Token expirado",
                });
            }

            // Agregar datos de usuario o request
            req.user = payload;

        } catch (error) {
            return res.status(404).send({
                status: "error",
                message: "Token invalido",
                error // Quitalo luego porque puede dar pistas
            });
        }

        // Ejecutar la siguiente accion
        next();


    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Ha ocurrido un error inesperado",
            error 
        });
    }
}

module.exports = {
    auth
}