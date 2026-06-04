const fs = require('fs');
const path = require('path');

const archivoMensajes = path.join(
    __dirname,
    '../data/mensajes.json'
);


const enviarContacto = async (req, res) => {

    const { nombre, edad, email, mensaje } = req.body;

    if (!nombre) {
        return res.status(400).json({
            success: false,
            message: 'El nombre es obligatorio'
        });
    }

    if (!edad) {
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
    console.log('Edad:', edad);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);

    console.log("Ruta del archivo:", archivoMensajes);
    console.log("Leyendo mensajes.json...");

    const mensajesGuardados = JSON.parse(
        fs.readFileSync(
            archivoMensajes,
            'utf8'
        )
    );

    const nuevoMensaje = {
        fecha: new Date().toLocaleString(),
        nombre,
        edad,
        email,
        mensaje
    };

    mensajesGuardados.push(nuevoMensaje);

    console.log("Cantidad de mensajes:", mensajesGuardados.length);

    fs.writeFileSync(
        archivoMensajes,
        JSON.stringify(
            mensajesGuardados,
            null,
            2
        )
    );

    console.log("Archivo guardado correctamente");

    return res.json({
        success: true,
        message: 'Formulario recibido correctamente'
    });

};

module.exports = {
    enviarContacto
};