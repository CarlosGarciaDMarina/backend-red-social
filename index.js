'use strict'

// Librerias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida
console.log("API NODE para Red social");

// Conectamos a la base de datos
connection();

// Crear servidor de node
const app = express();
const puerto = 3900;

// Configurar CORS
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargamos la configuracion de las rutas
const FollowRoutes = require("./routes/follow");
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");

app.use("/api/follow", FollowRoutes);
app.use("/api/user",UserRoutes);
app.use("/api/publication", PublicationRoutes);


// ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "Carlos",
            "prueba": "probando"
        }
    );
})

// Poner servidor a escuchar peticiones HTTP
app.listen(puerto, () => {
    console.log(`Servidor de Node corriendo en el puerto ${puerto}`);
});
 