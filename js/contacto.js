const formulario = document.getElementById('formContacto');

formulario.addEventListener('submit', async (event) => {

    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    try {
        const respuesta = await fetch(
            'https://reparacionescyl-backend.onrender.com/api/contacto',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, edad, email, mensaje })
            }
        );

        const datos = await respuesta.json();
        document.getElementById('respuesta').textContent = datos.message;

    } catch (error) {
        document.getElementById('respuesta').textContent = 'Error al conectar con el servidor';
        console.error(error);
    }
});