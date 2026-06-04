const fs = require('fs');
const path = require('path');

const archivoMensajes = path.join(
    __dirname,
    '../data/mensajes.json'
);

/*const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});*/

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

    fs.writeFileSync(
        archivoMensajes,
        JSON.stringify(
            mensajesGuardados,
            null,
            2
        )
    );

    /*const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Nuevo mensaje desde la web',
        text: `
    Nombre: ${nombre}
    Edad: ${edad}
    Email: ${email}

    Mensaje:
    ${mensaje}
    `
    };*/

    //console.log("Intentando enviar correo...");
    //await transporter.sendMail(mailOptions);
    //console.log("Correo enviado correctamente");

    return res.json({
        success: true,
        message: 'Formulario recibido correctamente'
    });

};

module.exports = {
    enviarContacto
};