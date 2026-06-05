if (
    localStorage.getItem(
        'logueado'
    ) !== 'true'
) {

    window.location.href =
        'login.html';

}

async function cargarMensajes() {

    try {

        const respuesta =
            await fetch(
                'http://localhost:3000/api/mensajes'
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
                'logueado'
            );

            window.location.href =
                'login.html';

        }
    );

}

cargarMensajes();