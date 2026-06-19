//Para no olvidarme, en local storage guardamos con el formato clave-valor, donde la clave es un string y el valor también es un string. 
// Entonces, para guardar objetos o arrays, necesitamos convertirlos a string usando JSON.stringify() y para recuperarlos, usamos JSON.parse() 
// para convertirlos de nuevo a su formato original.

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