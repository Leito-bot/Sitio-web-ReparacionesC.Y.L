/* === js/script.js === */

const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

// Verificamos que existan los elementos antes de agregar eventos (para evitar errores)
if(btnSignIn && btnSignUp && container){
    btnSignIn.addEventListener("click",()=>{
        container.classList.remove("toggle");
    });
    btnSignUp.addEventListener("click",()=>{
        container.classList.add("toggle");
    });
}

function validarForm(){
    const emailValido = "admin_login@admin.com";
    const pswValido = "Admin1234";

    const usrEmail = document.getElementById('id_email').value;
    const usrPsw = document.getElementById('id_password').value;

    let esValido = true;

    if(usrEmail.length < 1){
        mostrarError('empty_email', 'El campo Email no puede estar vacio');
        esValido = false;
    } else {
        ocultarError('empty_email');
    }
    
    if(usrPsw.length < 1){
        mostrarError('empty_psw', 'El campo contraseña no puede estar vacio');
        esValido = false;
    } else {
        ocultarError('empty_psw');
    }

    if(esValido && (emailValido !== usrEmail || pswValido !== usrPsw)){
        mostrarError('login_error', 'Las credenciales no son validas');
        esValido = false;
    } else {
        ocultarError('login_error');
    }

    return esValido;
}

function mostrarError(fieldId, message){
    const errorElement = document.getElementById(fieldId + '-error');
    if(errorElement){
        errorElement.textContent = "❌" + message;
        errorElement.style.display = 'block';
    }
}

function ocultarError(fieldId){
    const errorElement = document.getElementById(fieldId + '-error');
    if(errorElement){
        errorElement.style.display = 'none';
    }
}

// LÓGICA DE INGRESO
const btnIngresar = document.getElementById('btn_login');
if(btnIngresar){
    btnIngresar.addEventListener('click', function(event){
        event.preventDefault();
        
        if(validarForm()){
            // === ¡IMPORTANTE! === 
            // Guardamos que el usuario ya entró
            localStorage.setItem('usuarioLogueado', 'true');
            
            // Redirigimos al index principal (subiendo un nivel desde 'pages')
            window.location.href = "../index.html";
        }
    });
}