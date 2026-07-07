const express = require('express'); //Importo express

const router = express.Router(); //Crea un mini admin de rutas

const {
    enviarContacto,
    obtenerMensajes
} = require('../controllers/contactoController');

const verificarToken =
    require('../middleware/authMiddleware');

router.post('/contacto', enviarContacto);
router.get(
    '/mensajes',
    verificarToken,
    obtenerMensajes
);

module.exports = router;