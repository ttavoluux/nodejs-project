import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin, args }) => {
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

        // Enviar mensaje con menciones y con mensaje efímero que desaparece después de 10 segundos
        await conn.sendMessage(m.chat, {
            text: `${text}\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ`,
            mentions: users,
            ephemeralExpiration: 10 // Mensaje que desaparece en 10 segundos
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

        // Enviar el mensaje efímero con menciones que desaparecerá en 10 segundos
        await conn.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id,
            ephemeralExpiration: 10 // Mensaje que desaparece en 10 segundos
        });
    } catch (error) {
        console.error("Error al procesar el mensaje:", error);
    }
};

// Solo el comando "notify2" ahora
handler.command = /^(noti3|notify3)$/i;
handler.group = true;
handler.admin = true;


export default handler;
