const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");

// GET
router.get("/prueba-publication", PublicationController.pruebaPublication);

// Exportamos el router
module.exports = router;