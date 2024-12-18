let handler = async (m, { conn }) => {
    try {
        // Definir el contacto (fkontak) que se enviará
        let fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        }

        // Definir el mensaje que se enviará con el contacto
        const cat = `${packname} 
* *Versión: ${vs}*

❤ Holis :3

Arlette-bot Commutity Edition es un bot (open source) gratuito. Si deseas adquirirlo, contacta a mi desarrolladora.

CENTER ARLENNY
arlettebot@gmail.com
Adquirir bot:
https://wa.me/5614236722

Requisitos para el Uso del Bot:

    1. Evitar el Spam:
        No se permite el envío de mensajes repetitivos o irrelevantes.
        El bot está diseñado para interactuar de forma productiva y no soporta abuso ni spam en los grupos.

    2. Grupo Único:
        El bot solo puede ser adquirido para un único grupo. No se permite el uso del bot en múltiples grupos bajo la misma adquisición.
    
    3. Inactividad:
        Si el bot no es utilizado en un período de tres días, se retirará automáticamente del grupo.
    
    4. Sin Otros Bots:
        El bot no podrá ser agregado a un grupo si ya hay otro bot presente. (ArletteBot Community Edition, un bot diseñado para la comunidad. Solo se permite la presencia de ArletteBot en el grupo para garantizar un rendimiento óptimo y evitar conflictos con otros bots).

    5. Versión Beta:
        Ten en cuenta que el bot está en versión beta, por lo que puede tener fallos ocasionales o comportamientos inesperados. Agradecemos tu comprensión mientras seguimos mejorando y optimizando el bot.

Soporte y Colaboración:

    El bot se mantendrá online y se dará soporte el mayor tiempo posible. Si deseas colaborar o necesitas ayuda, no dudes en contactarme.

💻 Para adquirir el bot o resolver dudas:
📧 arlettebot@gmail.com
📲 Adquirir Bot

Recuerda usar el comando .menu para ver todas las opciones disponibles del bot. 😊

¿Tienes alguna sugerencia de comandos?
¿Quieres Comandos personalizados de uso unico?
¡Me encantaría escuchar tus ideas! 😄
Contáctame y sugiéreme comandos que te gustaría ver en el bot.

⚠️ *Recuerda que actualmente es un bot gratuito y está prohibida su venta. Si alguien te ofrece el bot por un costo, no es oficial y podría ser una estafa.*`

        // Ruta de la imagen a adjuntar
        let imagePath = './media/menus/img1.jpg'; // Asegúrate de que esta ruta sea correcta en tu sistema

        // Enviar el mensaje con la imagen y el texto

        await conn.sendFile(m.chat, imagen4, 'lp.jpg', cat);

        // Enviar solo el contacto con la estructura proporcionada
        await conn.sendContactArray(m.chat, [official[3]], null, { quoted: fkontak });

    } catch (e) {
        console.log('Error:', e);
    }
}

handler.command = /^(owner)$/i; // Cambia el comando según tu preferencia

export default handler;

