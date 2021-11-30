let newSW;
if ('serviceWorker' in  navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(result =>{
            result.addEventListener('updatefound', () => {
                newSW = result.installing;
                console.log('Hay un nuevo SW', newSW)

                newSW.addEventListener('statechange', () => {
                    if(newSW.state == "installed"){
                        showSnackbar(skipWaiting);
                    }
                })
            })
        })
        
    })
}


let bd;

function iniciar(){
    boton=document.getElementById("agregar");
    boton.addEventListener("click", agregarobjeto, false);
    let solicitud=indexedDB.open("base");
    solicitud.onsuccess=function(e){
        bd=e.target.result;
    }
    solicitud.onupgradeneeded=function(e){
        bd=e.target.result;
        bd.createObjectStore("reserva",{keyPath: "Nombre"});
    }
}

function agregarobjeto(){
    let Nombre=document.getElementById("Nombre").value;
    let Email=document.getElementById("Email").value;
    let Tamaño=document.getElementById("Tamaño").value;
    let Tipo=document.getElementById("Tipo").value;
    let Fecha=document.getElementById("Fecha").value;
    let Horario=document.getElementById("Horario").value;

    let transaccion=bd.transaction(["reserva"], "readwrite");
    let almacen=transaccion.objectStore("reserva");
    let agregar=almacen.add({Nombre: Nombre, email: Email, tamaño: Tamaño, tipo: Tipo, fecha:Fecha, horario: Horario});

    document.getElementById("Nombre").value=""
    document.getElementById("Email").value=""
    document.getElementById("Tamaño").value=""
    document.getElementById("Tipo").value=""
    document.getElementById("Fecha").value=""
    document.getElementById("Horario").value=""
}


window.addEventListener("load", iniciar, false);



