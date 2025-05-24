//Importamos las dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// Clave que genera el token
const secret = "Esta_es_la-clav3_d3_M1-r3d*sociañ_";

// Creamos la funcion para generar tokens
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    // Devolvemos el token codificado
    return jwt.encode(payload, secret);

}

module.exports = {
    createToken,
    secret
}