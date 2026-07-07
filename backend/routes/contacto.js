const express = require('express');
const multer = require('multer');

const router = express.Router();

// Guarda el archivo en memoria (RAM), no en disco.
// En Render el disco no es persistente, así que no conviene escribirlo ahí.
// Se adjunta directo al email y nunca se guarda en el servidor.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // máximo 5MB
});

const {
    enviarContacto,
    obtenerMensajes
} = require('../controllers/contactoController');

const verificarToken =
    require('../middleware/authMiddleware');

router.post('/contacto', upload.single('archivo'), enviarContacto);
router.get(
    '/mensajes',
    verificarToken,
    obtenerMensajes
);

module.exports = router;