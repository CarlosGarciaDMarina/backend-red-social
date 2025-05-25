// Imports 
const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const middleware = require("../middlewares/auth");

// Definimos las rutas
// GET
router.get("/prueba-follow", FollowController.pruebaFollow);

// POST
router.post("/save", middleware.auth, FollowController.save);

// PUT

// DELETE

// Exportamos el modulo 
module.exports = router;