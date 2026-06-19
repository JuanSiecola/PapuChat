const layout = document.querySelector('.chat-layout');
const botonVolver = document.getElementById('btn-volver');
const listaContactos = document.querySelector('.user-list ul');
const messageForm = document.getElementById('message-form');

let contactoActivo = null;

botonVolver.addEventListener('click', () => {
    layout.classList.remove('chat-abierto');
});

listaContactos.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    e.preventDefault();
    const idContacto = link.dataset.id;
    contactoActivo = idContacto;
    const nombreContacto = link.dataset.nombre;
    layout.classList.add('chat-abierto');
    document.getElementById('chat-username').innerText = nombreContacto;
    let mensajes = cargarHistorial(idContacto);
    if (!mensajes) {
        mensajes = await fetchMensajes(idContacto); //salgo a buscar los mensajes a la API
        guardarHistorial(idContacto, mensajes);
    }
    renderizarMensajes(mensajes);
    console.log(mensajes);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const contenido = input.value.trim();
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
});

document.addEventListener('DOMContentLoaded', async () => {
    let chats = cargarChats();
    if (!chats) {
        chats = await fetchChats(); //salgo a buscar los chats a la API
        guardarChats(chats);
    }
    renderizarContactos(chats);
});