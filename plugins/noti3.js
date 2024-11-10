import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import path from 'path';

// Obtener el directorio del archivo actual (equivalente a __dirname en CommonJS)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const notifitimePath = '/storage/emulated/0/Music/Bot/ArCE1/ArletteBotCommunityEdition/src/game/notifitime.json';

// Función para leer el archivo JSON
const readNotifitime = () => {
    try {
        if (fs.existsSync(notifitimePath)) {
            const data = fs.readFileSync(notifitimePath, 'utf8');
            return JSON.parse(data) || {}; // Si el JSON está vacío, devolvemos un objeto vacío
        } else {
            // Si el archivo no existe, devolvemos un objeto vacío
            return {};
        }
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        return {}; // Retornamos un objeto vacío en caso de error
    }
};

// Función para escribir en el archivo JSON
const writeNotifitime = (data) => {
    try {
        fs.writeFileSync(notifitimePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error al escribir en el archivo JSON:', error);
    }
};

let lastUsed = readNotifitime(); // Leemos los tiempos almacenados en el archivo

const handler = async (m, { conn, text, participants, isOwner, isAdmin, args }) => {
    const userId = m.sender; // El ID del usuario que envió el mensaje
    const currentTime = new Date().getTime(); // Obtener la hora actual en milisegundos

    // Verificar si el usuario ya usó el comando recientemente
    if (lastUsed[userId]) {
        const expirationTime = lastUsed[userId]; // Fecha hasta la cual el usuario puede usar el comando

        if (currentTime < expirationTime) {
            const timeRemaining = expirationTime - currentTime; // Tiempo restante en milisegundos

            // Si no han pasado 24 horas, mostramos el tiempo restante
            const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

            return conn.reply(m.chat, `❌ Este comando solo puede usarse una vez cada 24 horas. Faltan ${hoursRemaining} horas y ${minutesRemaining} minutos para que puedas usarlo nuevamente.`, m);
        }
    }

    // Si no hay datos del usuario, es porque no ha usado el comando antes. Actualizamos el archivo.
    if (!lastUsed[userId]) {
        lastUsed[userId] = currentTime + 24 * 60 * 60 * 1000; // Establecemos la fecha límite para el uso del comando en 24 horas
        writeNotifitime(lastUsed); // Escribimos el nuevo tiempo en el archivo JSON
    }

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
            // Enviar mensaje sin texto adicional
            await conn.sendMessage(m.chat, { text : text ? text : `*✨${await conn.getName(m.chat)}✨*` , mentions: users}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
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

// El comando "notify3" o "noti3" ahora es accesible por todos
handler.command = /^(notify3|noti3|6|1)$/i;
handler.group = true;
handler.admin = false; // Se permite a cualquier miembro del grupo

export default handler;
