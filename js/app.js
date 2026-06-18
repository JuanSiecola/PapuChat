const layout = document.querySelector('.chat-layout');
const botonVolver = document.getElementById('btn-volver');
const listaContactos = document.querySelector('.user-list ul');

botonVolver.addEventListener('click', () => {
    layout.classList.remove('chat-abierto');
});

listaContactos.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    e.preventDefault();
    const idContacto = link.dataset.id;
    const nombreContacto = link.dataset.nombre;
    layout.classList.add('chat-abierto');
    document.getElementById('chat-username').textContent = nombreContacto;
    const mensajes = await fetchMensajes(idContacto);
    renderizarMensajes(mensajes);
    console.log(mensajes);
});

document.addEventListener('DOMContentLoaded', async () => {
    const chats = await fetchChats();
    renderizarContactos(chats);
    console.log(chats);
});