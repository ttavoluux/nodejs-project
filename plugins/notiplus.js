import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

// Mapa para controlar si el bot está ocupado procesando un mensaje
const inProgress = new Map();

const handler = async (m, { conn, text, participants, isOwner, isAdmin, args }) => {
    const chatId = m.chat;

    // Si el comando está en progreso, evita que se procese el mismo comando nuevamente
    if (inProgress.get(chatId)) {
        console.log("Comando en progreso, evitando procesar nuevamente.");
        return; // El comando ya está en proceso
    }

    try {
        // Marcar el comando como procesado
        inProgress.set(chatId, true);
        console.log("Comando procesado, iniciando...");

        // Comprobar si el mensaje contiene uno de los comandos prioritarios
        if (/^(av|hi|no)$/i.test(m.text)) {
            let users = participants.map((u) => conn.decodeJid(u.id));

            // Si el mensaje no tiene texto ni está citado, se envía un mensaje por defecto
            if (!m.quoted && !text) {
                let quoted = m.quoted ? m.quoted : m;
                let mime = (quoted.msg || quoted).mimetype || '';
                let isMedia = /image|video|sticker|audio/.test(mime);

                // Mensaje por defecto si no hay texto
                let htextos = text || " *🐈‍⬛ Holis :3* ";
                console.log("Enviando mensaje por defecto:", htextos);
                await conn.sendMessage(m.chat, { text: htextos, mentions: users }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
                return;
            }

            // Si el mensaje tiene texto y no tiene medios, procesar y enviar la notificación
            let msgText = args.length >= 1 ? args.join(" ") : "📣📣📣";
            console.log("Enviando mensaje con texto:", msgText);
            await conn.sendMessage(m.chat, { text: msgText + '\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ', mentions: users }, { quoted: m });

        } else {
            // Si el mensaje no es de los comandos prioritarios, solo procesamos los mensajes de medios
            let quoted = m.quoted ? m.quoted : m;
            let mime = (quoted.msg || quoted).mimetype || '';
            let isMedia = /image|video|sticker|audio/.test(mime);

            if (isMedia) {
                try {
                    let users = participants.map(u => conn.decodeJid(u.id));
                    let q = m.quoted ? m.quoted : m;
                    let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;

                    console.log("Enviando mensaje con medio...");
                    let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, { quoted: m, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users });
                    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
                } catch (err) {
                    console.error("Error al procesar el mensaje con medios:", err);
                }
            }
        }
    } catch (error) {
        console.error("Error en el procesamiento del comando:", error);
    } finally {
        // Liberar el "lock" para permitir que el siguiente mensaje se procese
        console.log("Comando completado, liberando el lock.");
        inProgress.delete(chatId);
    }
};

// Definir que el comando puede ser llamado desde cualquier grupo donde el bot sea administrador
handler.command = /^(av|hi|no)$/i;
handler.group = true;
handler.admin = true;
export default handler;


