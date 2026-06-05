const express = require('express'); //Importo express

const router = express.Router(); //Crea un mini admin de rutas

const {
    enviarContacto,
    obtenerMensajes
} = require('../controllers/contactoController');

router.post('/contacto', enviarContacto);
router.get('/mensajes', obtenerMensajes);

module.exports = router;