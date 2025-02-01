let handler = async (m, { conn, command, usedPrefix, text }) => {
    let message = ``;

    // Si no se pasa un link, enviamos las instrucciones
    if (!text) {
        message = `📍 *Instrucciones para cambiar de grupo*

> 1.enviar link .cambiargrupo [link]

> 2. *El bot enviará una solicitud de cambio*

> 3. *Después de enviar la solicitud, el bot ingresara al nuevo grupo*

🌸Recuerda usar correctamente *ArletteBot Commutity Edition* ✨`;
        await conn.sendFile(m.chat, imagen17, 'lp.jpg', message)
    } else {
        // Obtener el número del bot (el JID)
        const botNumber = conn.user.jid;  // El número del bot es el JID

        // const gruponame = conn.getName(m.chat);
        // Enviar el mensaje con la solicitud al mismo número del bot
        await conn.sendMessage(botNumber, `El grupo: ${await conn.getName(m.chat)} solicito un cambio a: ${text} `);

        // Enviar confirmación al grupo
        let solienviada = '📌 *INFO: Solicitud de cambio recibida correctamente* ✅ \n' +
            '\n' +
            '> ⏱️ En max 48hrs se realizara el cambio ❗'
        await conn.sendFile(m.chat, imagen17, solienviada);

        // Salir del grupo
        // await conn.groupLeave(m.chat);
    }

    // Enviar la imagen si es necesario
    // await conn.sendFile(m.chat, imagen12, 'lp.jpg', message);
}

handler.command = /^(changegroup|cambiargrupo)$/i;
export default handler;

