import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

let lastUsed = {}; // Objeto para almacenar la fecha del último uso de cada usuario

const handler = async (m, { conn, text, participants, isOwner, isAdmin, args }) => {
    const userId = m.sender; // El ID del usuario que envió el mensaje
    const currentTime = new Date().getTime(); // Obtener la hora actual en milisegundos

    // Verificar si el usuario ya usó el comando recientemente
    if (lastUsed[userId]) {
        const timeElapsed = currentTime - lastUsed[userId];
        const timeRemaining = 24 * 60 * 60 * 1000 - timeElapsed; // Tiempo restante en milisegundos para los 24h

        if (timeElapsed < 24 * 60 * 60 * 1000) {
            // Si no han pasado 24 horas, mostramos el tiempo restante
            const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

            return conn.reply(m.chat, `❌ Este comando solo puede usarse una vez cada 24 horas. Faltan ${hoursRemaining} horas y ${minutesRemaining} minutos para que puedas usarlo nuevamente.`, m);
        }
    }

    // Ahora actualizamos el tiempo de uso del comando
    lastUsed[userId] = currentTime;

    // Verificamos si hay un mensaje citado o texto en el comando
    let messageToSend = text ? text : " *🐈‍⬛ Holis :3* ";
    const users = participants.map(u => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';

    // Determinamos si el mensaje tiene algún tipo de medio (imagen, video, sticker, audio)
    const isMedia = /image|video|sticker|audio/.test(mime);

    // Si no es un medio, procesamos el texto normal
    if (!isMedia) {
        if (args.length >= 1) {
            text = args.join(" ");
        } else if (m.quoted && m.quoted.text) {
            text = m.quoted.text;
        } else {
            return; // Si no hay texto ni cita, no hacemos nada
        }

        // Enviar mensaje con menciones
        await conn.sendMessage(m.chat, {
            text: `${text}\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ`,
            mentions: users,
        }, { quoted: m });

        return;
    }

    // Si es un medio, intentamos enviar el mensaje modificado
    try {
        const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {
            [m.quoted ? 'extendedTextMessage' : 'extendedTextMessage']: {
                text: text || (m.quoted ? m.quoted.text : ''),
            }
        }, {
            quoted: m,
            userJid: conn.user.id
        }), text || m.quoted.text, conn.user.jid, { mentions: users });

        // Enviar el mensaje con menciones
        await conn.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        });
    } catch (error) {
        console.error("Error al procesar el mensaje:", error);
    }
};

// El comando "notify2" o "noti2" ahora es accesible por todos
handler.command = /^(notify3|noti3|6)$/i;
handler.group = true;
handler.admin = false; // Se permite a cualquier miembro del grupo

export default handler;
