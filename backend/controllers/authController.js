const db = require('../database/db');
const bcrypt = require('bcrypt');

const login = async (req, res) => {

    const { usuario, password } = req.body;

    db.get(
        'SELECT * FROM usuarios WHERE usuario = ?',
        [usuario],
        async (err, row) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: 'Error del servidor'
                });

            }

            if (!row) {

                return res.status(401).json({
                    success: false,
                    message: 'Usuario o contraseña incorrectos'
                });

            }

            const passwordValida =
                await bcrypt.compare(
                    password,
                    row.password
            );

            if (!passwordValida) {

                return res.status(401).json({
                    success: false,
                    message: 'Usuario o contraseña incorrectos'
                });
            }

            return res.json({
                success: true,
                message: 'Login correcto'
            });

        }
    );

};

module.exports = {
    login
};