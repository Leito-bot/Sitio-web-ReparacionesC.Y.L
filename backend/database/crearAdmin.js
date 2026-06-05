const bcrypt = require('bcrypt'); //Importamos Bcrypt
const db = require('./db');

async function crearAdmin() {

    try {

        const hash = await bcrypt.hash(
            '123456',
            10
        );

        db.run(
            `
            INSERT INTO usuarios
            (
                usuario,
                password
            )
            VALUES (?, ?)
            `,
            [
                'admin',
                hash
            ],
            function (err) {

                if (err) {

                    console.error(
                        err.message
                    );

                    return;

                }

                console.log(
                    'Administrador creado correctamente'
                );

            }
        );

    } catch (error) {

        console.error(error);

    }

}

crearAdmin();