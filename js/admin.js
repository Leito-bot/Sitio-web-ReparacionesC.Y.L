const token =
    localStorage.getItem(
        'token'
    );

if (!token) {

    window.location.href =
        'login.html';

}

async function cargarMensajes() {

    try {

        const respuesta =
            await fetch(
                'https://reparacionescyl-backend.onrender.com/api/mensajes',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const mensajes =
            await respuesta.json();

        const tabla =
            document.getElementById(
                'tablaMensajes'
            );

        mensajes.forEach(mensaje => {

            tabla.innerHTML += `
                <tr>
                    <td>${mensaje.id}</td>
                    <td>${mensaje.fecha}</td>
                    <td>${mensaje.nombre}</td>
                    <td>${mensaje.edad}</td>
                    <td>${mensaje.email}</td>
                    <td>${mensaje.mensaje}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

const botonCerrarSesion =
    document.getElementById(
        'cerrarSesion'
    );

if (botonCerrarSesion) {

    botonCerrarSesion.addEventListener(
        'click',
        () => {

            localStorage.removeItem(
                'token'
            );

            window.location.href =
                'login.html';

        }
    );

}

cargarMensajes();