// Imports 
const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");

// Ruta de prueba
router.get("/prueba-follow", FollowController.pruebaFollow);

// Exportamos el modulo 
module.exports = router;