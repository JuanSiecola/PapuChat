const baseURL = 'https://max-fernandez-utec.github.io/2026/papuchat';

const fetchChats = async () => {
    try {
        const response = await fetch(`${baseURL}/chats`);

        if (!response.ok) {
            throw new Error(`Error al obtener los chats ${response.status}`);
        }

        const data = await response.json();
        return data.chats;
    } catch (error) {
        console.error('Error al obtener los chats:', error);
        return;
    }
} 

const fetchMensajes = async (idContacto) => { 
    try {
        const response = await fetch(`${baseURL}/chats/${idContacto}`);

        if (!response.ok) {
            throw new Error(`Error al obtener los mensajes ${response.status}`);
        }

        const data = await response.json();
        console.log(data.mensajes.timestamp);
        return data.mensajes;
    } catch (error) {
        console.error('Error al obtener los chats:', error);
        return;
    }
}