const formulario = document.getElementById('formContacto');

formulario.addEventListener('submit', async (event) => {

    event.preventDefault();

    const datosFormulario = new FormData(formulario);

    try {
        const respuesta = await fetch(
            'https://reparacionescyl-backend.onrender.com/api/contacto',
            {
                method: 'POST',
                body: datosFormulario
            }
        );

        const datos = await respuesta.json();
        document.getElementById('respuesta').textContent = datos.message;

    } catch (error) {
        document.getElementById('respuesta').textContent = 'Error al conectar con el servidor';
        console.error(error);
    }
});