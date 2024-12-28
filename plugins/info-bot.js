import fs from 'fs'
import { sticker } from '../lib/sticker.js'

let handler = m => m

handler.all = async function (m) {
    // Verifica si el mensaje fue enviado por el bot
    if (m.sender === conn.user.jid) return; // Si el mensaje es del bot, no hace nada

    let fkontak = {
        "key": {
            "participants":"0@s.whatsapp.net",
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
    };

    let chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    let vn = 'https://qu.ax/Ocxm.mp3';
    let bot = `${pickRandom([
        "🌸 ¡Aquí estoy! (*≧ω≦)",
        "¡Hola, hola! Aquí llegué~ (*≧ω≦) 💖",
        "¡ya estoy aquí! 🍓",
        "¡He llegado! Estaba esperando este momento 💞",
        "¡No me fui, solo me tomé un pequeño descanso! Aquí estoy, uwu! 🌙",
        "¡Aquí estoy para ti! (*≧ω≦) 💖",
        "¡Aquí estoy, listísima para lo que sea! (≧◡≦) 💫",
        `Aqui estoy ‹𝟹 💞`,
        `Holis UwU (≧◡≦)🌸`,
        '¡Listísima para responder a todos tus comandos! (≧◡≦)🍓 '])}
    `.trim();

    const estilo = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
        },
        message: {
            orderMessage: {
                itemCount : -999999,
                status: 1,
                surface : 1,
                message: 'Super Bot WhatsApp',
                orderTitle: 'Bang',
                thumbnail: fs.readFileSync('./media/menus/Menu3.jpg'),
                sellerJid: '0@s.whatsapp.net'
            }
        }
    };

    const estiloaudio = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
        },
        message: {
            "audioMessage": {
                "mimetype":"audio/ogg; codecs=opus",
                "seconds": "99569",
                "ptt": "true"
            }
        }
    };

    // Si el mensaje contiene la palabra "bot" y no es enviado por el bot
    if (/\bbot\b(?![a-zA-ZáéíóúÁÉÍÓÚ])/i.test(m.text) && m.sender !== conn.user.jid) {
        conn.sendPresenceUpdate('recording', m.chat);

        // Opción de respuesta con un sticker aleatorio
        const numer = Math.floor(Math.random() * 12);
        let stiker;
        switch (numer) {
            case 0:
                stiker = await sticker(imagen24, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 1:
                stiker = await sticker(imagen25, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 2:
                stiker = await sticker(imagen26, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 3:
                stiker = await sticker(imagen27, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 4:
                stiker = await sticker(imagen28, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 5:
                stiker = await sticker(imagen29, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 6:
                stiker = await sticker(imagen30, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 7:
                stiker = await sticker(imagen31, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 8:
                stiker = await sticker(imagen32, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 9:
                stiker = await sticker(imagen33, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 10:
                stiker = await sticker(imagen34, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            case 11:
                stiker = await sticker(imagen35, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
                break;
            default:
                stiker = await sticker(imagen24, false, global.packname, global.author);
                await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);
        }

        await conn.sendMessage(m.chat, { text: bot, mentions: [m.sender] }, { quoted: fkontak });
    }

    return !0;
}

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
