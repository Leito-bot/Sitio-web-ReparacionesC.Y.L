// 1. LISTADO DE PRODUCTOS TECNOLÓGICOS
// NOTA IMPORTANTE: Asegúrate de que los nombres de archivo en tu carpeta 
// sean EXACTAMENTE iguales (mayúsculas, espacios y extensión .jpg/.png)

let productos = [
  {
    "id": 1,
    "image": "media/imagenes/Cargador Samsung 45w.jpeg", 
    "name": "Cargador Samsung 45w ORIGINAL",
    "price": 45000,
    "category": "Cargadores",
    "description": "Super Fast Charging 2.0 con protección de sobrecarga."
  },
  {
    "id": 2,
    "image": "media/imagenes/Cargador Motorola 68w ORIGINAL.png", 
    "name": "Cargador Motorola 68w ORIGINAL",
    "price": 55000,
    "category": "Cargadores",
    "description": "Carga TurboPower para máxima velocidad."
  },
  {
    "id": 3,
    "image": "media/imagenes/Fundas.png",
    "name": "Fundas para tu celular",
    "price": 15000,
    "category": "Fundas",
    "description": "Protección y estilo para todos los modelos."
  },
  {
    "id": 4,
    "image": "media/imagenes/Templados 9D.png",
    "name": "Vidrio Templado 9D",
    "price": 5000,
    "category": "Vidrios Templados",
    "description": "Máxima resistencia contra golpes y rayas."
  },
  {
    "id": 5,
    "image": "media/imagenes/Cables USB Samsung y Motorola.png",
    "name": "Cable USB Tipo-C",
    "price": 8000,
    "category": "Cables USB",
    "description": "Transferencia de datos y carga rápida."
  },
  {
    "id": 6,
    "image": "media/imagenes/Auriculares Samsung -Manos Libres.png",
    "name": "Auriculares Samsung",
    "price": 12000,
    "category": "Auriculares",
    "description": "Manos libres con sonido de alta fidelidad."
  },
  {
    "id": 7,
    "image": "media/imagenes/PowerBank.jpg", 
    "name": "Power Bank",
    "price": 30000,
    "category": "Baterias",
    "description": "2000mAh mas 2 cables usb"
  }
];

// Seleccionamos el contenedor
let productosContainer = document.getElementById('productos-container');

// FUNCIÓN PARA CARGAR PRODUCTOS
function loadProducts() {
  if(!productosContainer) return; 
  productosContainer.innerHTML = "";

  productos.forEach(producto => {
    // Escapamos las comillas para evitar errores en el JSON al pasar al HTML
    let objToPass = JSON.stringify(producto).replace(/"/g, '&quot;');

    let cardHTML = `
      <div class="producto">
          <div class="imagen-container">
              <img src="${producto.image}" alt="${producto.name}" onerror="this.src='media/imagenes/Logo.png'">
          </div>
          <div class="info-producto">
              <p class="categoria">${producto.category}</p>
              <h3>${producto.name}</h3>
              <p class="descripcion-corta">${producto.description}</p>
              <div class="precio-container">
                  <span class="precio">$${producto.price.toLocaleString()}</span>
                  <button class="btn-comprar" onclick='addWishList(${objToPass})'>
                    Agregar 🛒
                  </button>
              </div>
          </div>
      </div>
    `;
    
    productosContainer.innerHTML += cardHTML;
  });
}

// LOGICA DEL CARRITO / FAVORITOS
function addWishList(data) {
  const prodToAdd = {
    "id": data.id,
    "favId": Date.now(),
    "price": data.price,
    "name": data.name,
    "image": data.image
  };
  
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(prodToAdd.favId, JSON.stringify(prodToAdd));
    renderFavourites(); 
    alert("¡Producto agregado al carrito!");
  }
}

// CARGAR FAVORITOS (SECCIÓN SUPERIOR)
let seccionFavs = document.getElementById("seccion_favs");
let contenedorFavoritos = document.getElementById('lista-favoritos');
let totalFavoritos = document.getElementById('item_cantidad');
let precioTotal = document.getElementById('precio_total');

function renderFavourites() {
  if(!contenedorFavoritos) return;
  
  contenedorFavoritos.innerHTML = ""; 
  let totalPrice = 0;
  let count = localStorage.length;

  // Verificamos si los elementos existen antes de intentar modificar su estilo
  if (seccionFavs) {
      if (count > 0) {
        seccionFavs.style.display = "block";
      } else {
        seccionFavs.style.display = "none";
      }
  }

  if (totalFavoritos) {
      totalFavoritos.innerText = count;
  }

  // Recorremos el localStorage, pero filtramos solo nuestras claves
  Object.keys(localStorage).forEach(function(key) {
    // Evitamos leer la clave 'usuarioLogueado' como si fuera un producto
    if(key === 'usuarioLogueado') return;

    try {
        let item = JSON.parse(localStorage.getItem(key));
        // Verificamos que sea un objeto de producto válido antes de sumar
        if(item && item.price){
            totalPrice += item.price;
            
            contenedorFavoritos.innerHTML += `
                  <div class="card-fav">
                    <img src="${item.image}" style="width:50px; height:50px; object-fit:cover;">
                    <div class="datos-fav">
                        <h5>${item.name}</h5>
                        <span class="precio-fav">$${item.price.toLocaleString()}</span>
                    </div>
                    <button onclick="eliminar(${item.favId})" class="btn-del">❌</button>
                  </div>
              `;
        }
    } catch (e) {
        console.error("Error leyendo item del carrito", e);
    }
  });
  
  if(precioTotal) {
      precioTotal.innerText = `Total: $${totalPrice.toLocaleString()}`;
  }
}

function eliminar(id) {
  localStorage.removeItem(id.toString());
  renderFavourites();
}

const btnDeleteAll = document.getElementById('delete_all');
if(btnDeleteAll){
    btnDeleteAll.addEventListener('click', () => {
        // Borramos todo EXCEPTO la sesión del usuario
        const esLogueado = localStorage.getItem('usuarioLogueado');
        localStorage.clear();
        if(esLogueado) localStorage.setItem('usuarioLogueado', esLogueado);
        
        renderFavourites();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    renderFavourites();
});