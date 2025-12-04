1. Configuración del Entorno y Arquitectura de Carpetas 📂
El primer paso fue establecer una jerarquía limpia para facilitar el mantenimiento del código.
Cree una carpeta raíz (Pre-entrega) y dentro de ella todo el contenido de mi proyecto estableciendo una organizacion clara.

♦️css/: Contenedor exclusivo para las hojas de estilo.

♦️js/: Contenedor para los scripts de funcionalidad.

♦️media/: Repositorio centralizado de activos multimedia, subdividido en imagenes y videos para mayor orden.

♦️pages/: Carpeta para alojar las páginas secundarias del sitio, manteniendo la raíz limpia.

2. Estructura Semántica (HTML) 📂
El desarrollo del esqueleto del sitio se dividió en dos niveles:

La Página Principal (login.html): Ubicada en la raíz, seguida de un index.html como pagina principal que vera el usuario. Aquí se define la estructura base, el menú de navegación principal y la presentación inicial de la marca.

♦️Secciones Internas (pages/): Para evitar un archivo HTML gigante, se crearon archivos específicos para cada sección:

♦️login.html: Interfaz de usuario para acceso.

♦️productos.html: El catálogo o tienda.

♦️noticias.html, sucursales.html, sobre-nosotros.html: Páginas informativas.

♦️centro-ayuda.html, terminos.html: Soporte y legal.

Esta estructura sugiere que el sitio utiliza navegación multipágina, donde cada clic recarga el contenido correspondiente.

3. Diseño y Estilos (CSS) 📂
La estrategia de estilos revela un enfoque inteligente hacia la modularidad:

♦️Estilos Globales (styles.css): CSS, variables de colores, tipografías, y los estilos comunes que se repiten en todas las páginas (header, footer, botones generales).

♦️Estilos Específicos (productos.css y style_login.css):

♦️Se creó style_login.css para aislar el diseño del formulario de ingreso, evitando conflictos con el resto del sitio.

Se creó productos.css para manejar específicamente la grilla de productos, las tarjetas (cards) de artículos y los filtros, manteniendo el código ordenado.

4. Lógica e Interactividad (JavaScript) 📂
La capa de interacción se dividió en dos scripts para optimizar la carga:

♦️Lógica General (script.js): Este archivo gestiona la interactividad de la página de inicio de sesión (login.html). Sus funciones principales son:

♦️Animación de Interfaz: Controla la clase .toggle en el contenedor principal para alternar visualmente entre el panel de "Iniciar Sesión" y "Registrarse" mediante Event Listeners.

♦️Simulación de Login (Mock Auth): Implementa una validación de credenciales hardcodeadas (Usuario: admin_login@admin.com / Pass: Admin1234) para simular un proceso de autenticación real.

♦️Manejo de Errores en el DOM: Valida que los campos no estén vacíos y manipula el DOM para mostrar u ocultar mensajes de error específicos (mostrarError, ocultarError) sin recargar la página.

♦️Redireccionamiento: Si la validación es exitosa, redirige al usuario a la página principal (index.html).

♦️Lógica de Negocio (productos.js):

♦️Base de Datos Simulada (Mock Data): Contiene un array de objetos JSON (productos) que actúa como inventario. Esto permite agregar o modificar productos desde un solo lugar sin tocar el HTML.

♦️Renderizado Dinámico (DOM Injection): La función loadProducts() recorre el inventario e inyecta el código HTML de las tarjetas (cards) automáticamente en la página. Incluye formateo de precios (toLocaleString) y asignación de eventos.

♦️Persistencia de Datos (LocalStorage): El carrito de compras no se pierde al recargar la página. Se utiliza el localStorage del navegador para guardar los productos seleccionados (addWishList), recuperar el estado del carrito (renderFavourites) y eliminar ítems (eliminar).

♦️Cálculo en Tiempo Real: Calcula y actualiza dinámicamente el contador de productos y el precio total de la compra cada vez que se modifica el contenido del carrito.

5. Gestión de Activos (Media)
Se organizaron los recursos visuales dentro de la carpeta media. Esto asegura que las rutas relativas en el código (por ejemplo: src="../media/imagenes/logo.png") sean consistentes y fáciles de rastrear si el proyecto crece.