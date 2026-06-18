
const renderizarContactos = (chats) => {
    const listaContactos = document.querySelector('.user-list ul');
    listaContactos.innerHTML = '';
    chats.forEach((chat) => {
        const li = document.createElement('li');
        li.className = 'chat-item';
        li.innerHTML = `
            <a href="#" data-id="${chat.idContacto}" data-nombre="${chat.nombre}">
                <div class="avatar"></div>
                <div class="chat-meta">
                    <span class="chat-name">${chat.nombre}</span>
                    <span class="chat-preview">${chat.ultMensaje}</span>
                </div>
            </a>
        `;
        listaContactos.appendChild(li);
    });
}

const renderizarMensajes = (mensajes) => {
    const listaMensajes = document.getElementById('message-list');
    listaMensajes.innerHTML = '';
    mensajes.forEach((mensaje) => {
        const li = document.createElement('li');
        li.className = `message message-${mensaje.remitente}`;
        if (mensaje.tipo === 'image') {
            li.innerHTML = `<img src="${mensaje.contenido}" alt="Imagen enviada">`;
        } else {
            li.innerHTML = `<p>${mensaje.contenido}</p>`;
        }
        listaMensajes.appendChild(li);
    });
}