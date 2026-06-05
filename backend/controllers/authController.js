const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

            const token = jwt.sign(
                {
                    id: row.id,
                    usuario: row.usuario
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            return res.json({
                success: true,
                message: 'Login correcto',
                token
            });

        }
    );

};

module.exports = {
    login
};