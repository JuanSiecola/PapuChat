
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

const formatearFecha = (fechaIsoString) => {
    const fecha = new Date(fechaIsoString);

    const opciones = {
    dateStyle: 'short',
    timeStyle: 'short'   
    };

  return new Intl.DateTimeFormat('default', opciones).format(fecha);
}

const renderizarMensajes = (mensajes) => {
    const listaMensajes = document.getElementById('message-list');
    listaMensajes.innerHTML = '';
    mensajes.forEach((mensaje) => {
        const li = document.createElement('li');
        li.className = `message message-${mensaje.remitente}`;
        if (mensaje.tipo === 'image') {
            li.innerHTML = `<div class="burbuja"><img src="${mensaje.contenido}" alt="Imagen enviada"><span class="message-time">${formatearFecha(mensaje.timestamp)}</span></div>`;
        } else {
            li.innerHTML = `<div class="burbuja"><p>${mensaje.contenido}</p><span class="message-time">${formatearFecha(mensaje.timestamp)}</span></div>`;
        }
        listaMensajes.appendChild(li);
    });
    const contenedor = document.querySelector('.messages');
    contenedor.scrollTop = contenedor.scrollHeight; //esto hace que el scroll se mantenga abajo cada vez que se renderizan los mensajes
}