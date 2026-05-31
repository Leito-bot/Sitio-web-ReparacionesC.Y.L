const enviarContacto = (req, res) => {

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

    return res.json({
        success: true,
        message: 'Formulario recibido correctamente'
    });

};

module.exports = {
    enviarContacto
};