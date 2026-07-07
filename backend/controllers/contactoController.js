const db = require('../database/db');
const transporter = require('../config/mailer');

const enviarContacto = async (req, res) => {

    const { nombre, edad, email, mensaje } = req.body;
    const archivo = req.file;

    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    }
    if (!edad) {
        return res.status(400).json({ success: false, message: 'La edad es obligatoria' });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: 'El email es obligatorio' });
    }
    if (!mensaje) {
        return res.status(400).json({ success: false, message: 'El mensaje es obligatorio' });
    }

    db.run(
        `INSERT INTO mensajes (fecha, nombre, edad, email, mensaje) VALUES (?, ?, ?, ?, ?)`,
        [new Date().toLocaleString(), nombre, edad, email, mensaje],
        function (err) {
            if (err) {
                console.error('Error al guardar en la base de datos:', err);
            }
        }
    );

    const mailOptions = {
        from: `"Formulario Web - Reparaciones C.Y.L" <${process.env.EMAIL_USER}>`,
        to: 'reparacionescyl.tech@gmail.com',
        replyTo: email,
        subject: `Nuevo mensaje de contacto de ${nombre}`,
        text: `Nombre: ${nombre}\nEdad: ${edad}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
        attachments: archivo
            ? [{ filename: archivo.originalname, content: archivo.buffer }]
            : []
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: 'Formulario recibido correctamente' });
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return res.status(500).json({
            success: false,
            message: 'El mensaje se guardó, pero hubo un error al enviar la notificación por email'
        });
    }
};

const obtenerMensajes = (req, res) => {
    db.all('SELECT * FROM mensajes ORDER BY id DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener mensajes' });
        }
        return res.json(rows);
    });
};

module.exports = { enviarContacto, obtenerMensajes };