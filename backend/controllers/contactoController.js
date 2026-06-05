const db = require('../database/db');

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


    db.run(
        `
        INSERT INTO mensajes
        (
            fecha,
            nombre,
            edad,
            email,
            mensaje
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            new Date().toLocaleString(),
            nombre,
            edad,
            email,
            mensaje
        ],
        function (err) {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: 'Error al guardar mensaje'
                });

            }

            return res.json({
                success: true,
                message: 'Formulario recibido correctamente'
            });

        }
    );

};

const obtenerMensajes = (req, res) => {

    db.all(
        'SELECT * FROM mensajes ORDER BY id DESC',
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener mensajes'
                });

            }

            return res.json(rows);

        }
    );

};

module.exports = {
    enviarContacto,
    obtenerMensajes
};