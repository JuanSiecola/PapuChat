
const guardarChats = (contactos) => {
    localStorage.setItem('contactos', JSON.stringify(contactos));
}

const cargarChats = () => {
    const contactos = localStorage.getItem('contactos');
    return contactos ? JSON.parse(contactos) : null;
}

const guardarHistorial = (idContacto, mensajes) => { 
    localStorage.setItem(`chat_${idContacto}`, JSON.stringify(mensajes));
}

const cargarHistorial = (idContacto) => {
    const historial = localStorage.getItem(`chat_${idContacto}`);
    return historial ? JSON.parse(historial) : null;
}