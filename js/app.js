const layout = document.querySelector('.chat-layout');
const botonVolver = document.getElementById('btn-volver');
const listaContactos = document.querySelector('.user-list ul');
const messageForm = document.getElementById('message-form');
const imageInput = document.getElementById('image-input');

const respuestaAleatoria = () => {
    const respuestas = [
        "Sarpado pibe!",
        "No te lo puedo creer!",
        "Jajaja, sos un crack!",
        '🔥',
        'Uruguay nomaaaaa!',
        'Buenísimo',
        'Ya te respondo, estoy ocupado',
        'No te entiendo',
        '¿En serio?',
        'Dale, hablamos después',
        '😂😂😂',
        'Impecable maestro',
        'Me encanta esa idea',
        'Vamos a romperla con ese proyecto',
    ];
    return respuestas[Math.floor(Math.random() * respuestas.length)];
}

const simularRespuesta = () => {
    setTimeout(() => {
        const respuesta = {
            id: Date.now().toString(),
            tipo: 'text',
            contenido: respuestaAleatoria(),
            timestamp: new Date().toISOString(),
            remitente: 'el'
        };
        const historial = cargarHistorial(contactoActivo);
        historial.push(respuesta);
        guardarHistorial(contactoActivo, historial);
        renderizarMensajes(historial);
    }, 1500);
}

let contactoActivo = null;

botonVolver.addEventListener('click', () => {
    layout.classList.remove('chat-abierto');
});

listaContactos.addEventListener('click', async (e) => {
    const link = e.target.closest('a'); //esto es porque el click puede ser en el nombre, en la imagen o en el contenedor del contacto, entonces busco el enlace más cercano al elemento clickeado para obtener los datos del contacto
    if (!link) return; //si no se hizo click en un enlace, no hago nada
    e.preventDefault();
    const idContacto = link.dataset.id;
    contactoActivo = idContacto;
    const nombreContacto = link.dataset.nombre;
    layout.classList.add('chat-abierto');
    document.getElementById('chat-username').innerText = nombreContacto;
    let mensajes = cargarHistorial(idContacto);
    if (!mensajes) { //en caso que no haya mensajes en localStorage para ese contacto, salgo a buscarlos a la API
        mensajes = await fetchMensajes(idContacto); //salgo a buscar los mensajes a la API
        guardarHistorial(idContacto, mensajes); //los guardo en localStorage para futuras consultas sin necesidad de ir a la API nuevamente
    }
    renderizarMensajes(mensajes); 
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); //evito que el formulario se envíe y recargue la página
    const input = document.getElementById('message-input');
    const contenido = input.value.trim(); //limpiar espacios en blanco al inicio y al final del mensaje
    if (!contenido) return;
    const mensaje = {
        id: Date.now().toString(),
        tipo: 'text',
        contenido : contenido,
        timestamp: new Date().toISOString(),
        remitente: 'yo'
    };
    const historial = cargarHistorial(contactoActivo); //cargo el historial actual
    historial.push(mensaje); //agrego el nuevo mensaje al historial
    guardarHistorial(contactoActivo, historial); //guardo el historial actualizado a localStorage
    renderizarMensajes(historial);
    input.value = '';
    simularRespuesta();
});

imageInput.addEventListener('change', (e) => {
    const archivo = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = (e) => {
        const base64 = e.target.result;
        const mensaje = {
            id: Date.now().toString(),
            tipo: 'image',
            contenido: base64,
            timestamp: new Date().toISOString(),
            remitente: 'yo'
        };
        const historial = cargarHistorial(contactoActivo);
        historial.push(mensaje);
        guardarHistorial(contactoActivo, historial);
        renderizarMensajes(historial);
        imageInput.value = ''; //limpio el input de archivos para permitir subir la misma imagen nuevamente porq no me deja ah
    }
    simularRespuesta();
});



document.addEventListener('DOMContentLoaded', async () => {
    let chats = cargarChats(); //cargarchats es de localstorage
    if (!chats) {
        chats = await fetchChats(); //salgo a buscar los chats a la API
        guardarChats(chats); //los guardo en localStorage para futuras consultas sin necesidad de ir a la API nuevamente
    }
    renderizarContactos(chats);
});