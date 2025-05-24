const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

// Definir rutas
// GET
router.get("/prueba-usuario", UserController.pruebaUser);

// Exportamos el router
module.exports = router;