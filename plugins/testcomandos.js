import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { sticker } from '../lib/sticker.js'
import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin, args }) => {
    const allowedNumber = '5215614236722'; // Número permitido
    let users = participants.map(u => conn.decodeJid(u.id))
    let quoted = m.quoted ? m.quoted : m

    const senderNumber = m.sender.split('@')[0];
    // Verificamos si el número que envió el mensaje es el permitido
    if (senderNumber !== allowedNumber) {
        return m.react("❌");
    }

    // Generamos el sticker y lo enviamos
    let stiker = await sticker(imagen13, false, global.packname, global.author);
    await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false, { mentions: users }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
}

handler.command = /^(yo|t)$/i
handler.group = true
export default handler


