const handler = async (m, {conn, text, participants, isOwner, isAdmin, args}) => {
    // Verifica si el comando tiene prioridad
    if (/^(n|notiplus)$/i.test(m.text)) {
        try {
            // Marcar el inicio de procesamiento para evitar duplicación
            if (m.isCommandProcessed) return; // Si ya fue procesado, no hacer nada
            m.isCommandProcessed = true;  // Marca el mensaje como procesado

            let users = participants.map(u => conn.decodeJid(u.id));
            let quoted = m.quoted ? m.quoted : m;
            let mime = (quoted.msg || quoted).mimetype || '';
            let isMedia = /image|video|sticker|audio/.test(mime);

            // Si es un mensaje de texto
            if (!isMedia) {
                let msgText = args.length > 0 ? args.join(" ") : `*✨${await conn.getName(m.chat)}✨*`;
                await conn.sendMessage(m.chat, { text: msgText, mentions: users }, { quoted: m });
            } else {
                // Si el mensaje tiene media (imagen/video/audio)
                let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: '' || m.text } }, { quoted: m, userJid: conn.user.id }), text || m.text, conn.user.jid, { mentions: users });
                await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
            }
        } catch (error) {
            console.error("Error procesando el comando:", error);
        } finally {
            m.isCommandProcessed = false;  // Libera el "lock" del mensaje
        }
    }
}

handler.command = /^(n|notiplus)$/i;
handler.group = true;
handler.admin = true;
export default handler;
