/*const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hola desde mi Backend');
});

/*No recomendable
app.post('/api/contacto', (req, res) => {

    const { nombre, email, mensaje } = req.body;

    console.log(nombre);
    console.log(email);
    console.log(mensaje);

    res.send('Formulario recibido');

});*/

//Esto valida que todos los campos sean llenos por el usuario
/*app.post('/api/contacto', (req, res) => {

    const { nombre, edad, email, mensaje } = req.body;

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El nombre es obligatorio'
        });
    }

    if (!edad){
        return res.status(400).json({
            success: false,
            message: 'La edad es obligatoria'
        });
    }

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'El email es obligatorio'
        });
    }

    if (!mensaje) {
        return res.status(400).json({
            success: false,
            message: 'El mensaje es obligatorio'
        });
    }

    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);

    res.json({
        success: true,
        message: 'Formulario recibido correctamente'
    });

});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
*/
const express = require('express');
const cors = require('cors');

const app = express();

const contactoRoutes = require('./routes/contacto');

app.use(cors());

app.use(express.json());

app.use('/api', contactoRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});