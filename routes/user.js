const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const middleware = require("../middlewares/auth");
const multer = require("multer");

// Configuracion de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatar/")
    },
    filename: (req, file, cb) => {
        cb(null, `avatar-${Date.now()}-${file.originalname}`)
    }
});

const uploads = multer({storage});

// Definir rutas
// GET
router.get("/prueba-usuario", UserController.pruebaUser);

// POST
router.post("/register", UserController.register);

// PUT

// DELETE

// Exportamos el router
module.exports = router;