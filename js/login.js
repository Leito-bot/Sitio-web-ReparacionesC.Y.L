const formulario =
    document.getElementById(
        'formLogin'
    );

formulario.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();

        const usuario =
            document.getElementById(
                'usuario'
            ).value;

        const password =
            document.getElementById(
                'password'
            ).value;

        try {

            const respuesta =
                await fetch(
                    'http://localhost:3000/api/login',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                            usuario,
                            password
                        })
                    }
                );

            const datos =
                await respuesta.json();

            document.getElementById(
                'respuesta'
            ).textContent =
                datos.message;

            if (datos.success) {

                localStorage.setItem(
                    'logueado',
                    'true'
                );

                window.location.href =
                    'mensajes.html';

            }

        } catch (error) {

            console.error(error);

        }

    }
);