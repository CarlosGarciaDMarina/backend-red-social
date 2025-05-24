// Importamos mongoose
const mongoose = require("mongoose");

// Conexión
const connection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/red_social_linkedin')

        console.log("Conexión a la base de datos establecida con éxito....");
    } catch (error) {
        console.log(error)
        throw new Error("No se ha podido establecer la conexión a la BBDD")
    }
}

// Exportamos
module.exports = connection
