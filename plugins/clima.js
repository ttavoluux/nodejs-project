import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) throw `Por favor ingresa un estado y país. Ejemplo: ${usedPrefix + command} Buenos Aires, Argentina`;

    const [estado, pais] = text.split(',').map(e => e.trim());  // Dividimos la entrada para obtener el estado y el país

    if (!estado || !pais) {
        throw `Por favor ingresa un estado y un país válidos. Ejemplo: ${usedPrefix + command} Buenos Aires, Argentina`;
    }

    try {
        // Construimos la URL de la API pública (wttr.in) con formato JSON
        const url = `https://wttr.in/${estado},${pais}?format=%C+%t+%w+%h+%p+%l+%T`;

        // Realizamos la petición a la API
        const response = await fetch(url);
        const data = await response.text();  // Respuesta en formato texto

        // Si la respuesta es vacía o hay un error en la consulta, mostramos un mensaje de error
        if (!data) {
            return conn.reply(m.chat, `No se pudo obtener la información del clima para ${estado}, ${pais}. Verifica el nombre de la ciudad y el país.`, m);
        }

        // Enviamos la respuesta al usuario
        await conn.reply(m.chat, `🌤️ *Clima de ${estado}, ${pais}:*\n${data}`, m);
    } catch (e) {
        console.log(e);
        await conn.reply(m.chat, 'Hubo un error al obtener los datos del clima. Intenta de nuevo más tarde.', m);
    }
};

handler.command = ['clima'];  // Comando .clima
handler.help = ['clima'];     // Ayuda del comando
handler.tags = ['informacion'];  // Etiqueta de información

handler.premium = false;  // No es premium

export default handler;