const layout = document.querySelector('.chat-layout');
const botonVolver = document.getElementById('btn-volver');
const contactos = document.querySelectorAll('.chat-item a');

contactos.forEach((contacto) => {
    contacto.addEventListener('click', (evento) => {
        evento.preventDefault();
        layout.classList.add('chat-abierto');
    });
});

botonVolver.addEventListener('click', () => {
    layout.classList.remove('chat-abierto');
});