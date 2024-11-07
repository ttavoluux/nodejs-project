import fs from 'fs'
import fetch from 'node-fetch';
import axios from 'axios';

let timeout = 50000
let poin = 500

let handler = async (m, { conn, command, usedPrefix }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }

    if (!db.data.chats[m.chat].game) throw `${lenguajeGB['smsAvisoAG']()}𝙇𝙊𝙎 𝙅𝙐𝙀𝙂𝙊𝙎 𝙀𝙎𝙏𝘼𝙎 𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊𝙎 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊, 𝙎𝙄 𝙀𝙍𝙀𝙎 𝘼𝘿𝙈𝙄𝙉𝙎 𝙋𝙐𝙀𝘿𝙀 𝘼𝘾𝙏𝙄𝙑𝘼𝙍𝙇𝙊 𝘾𝙊𝙉 : #on juegos`

    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavía hay un juego sin responder en este chat', conn.tekateki[id][0])
        throw false
    }

    try {
        // Comando trivia (modificado para redirigir a trivia2)
        if (command == 'trivia' || command == 'triviador') {
            await conn.reply(m.chat, 'El juego de trivia ahora se juega con el comando *trivia2*. Usa ese comando para jugar!', m)
        }

        // Comando acertijo
        if (command == 'acertijo' || command == 'acert' || command == 'adivinanza' || command == 'tekateki') {
            let tekateki = JSON.parse(fs.readFileSync(`./src/game/acertijo.json`))
            let json = tekateki[Math.floor(Math.random() * tekateki.length)]
            let _clue = json.response
            let clue = _clue.replace(/[A-Za-z]/g, '_')
            let caption = `
ⷮ *${json.question}*

*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()
            conn.tekateki[id] = [
                await conn.reply(m.chat, caption, m),
                json, poin, setTimeout(async () => {
                    if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0])
                    delete conn.tekateki[id]
                }, timeout)
            ]
        }

        // Comando para adivinanza de películas
        if (command == 'advpe' || command == 'adv' || command == 'peliculas' || command == 'pelicula') {
            let tekateki = JSON.parse(fs.readFileSync(`./src/game/peliculas.json`))
            let json = tekateki[Math.floor(Math.random() * tekateki.length)]
            let _clue = json.response
            let clue = _clue.replace(/[A-Za-z]/g, '_')
            let caption = `
ⷮ *${json.question}*

*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()
            conn.tekateki[id] = [
                await conn.sendMessage(m.chat, { text: caption, contextInfo: { forwardingScore: 9999999, isForwarded: true, "externalAdReply": { "showAdAttribution": true, "containsAutoReply": true, "body": `• ADIVINAN LA PELÍCULA CON EMOJIS •`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: md } } }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 }), json, poin, setTimeout(async () => {
                    if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0])
                    delete conn.tekateki[id]
                }, timeout)
            ]
        }

        // Resto de comandos...

    } catch (e) {
        console.log(e)
    }
}

handler.help = ['acertijo']
handler.tags = ['game']
handler.command = /^(acertijo|acert|adivinanza|tekateki|advpe|adv|peliculas|pelicula|cancion|canción|palabra|word|ordenar|order|hint|pista)$/i

export default handler

async function fetchJson(url, options) {
    try {
        options ? options : {};
        const res = await axios({ method: 'GET', url: url, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' }, ...options });
        return res.data;
    } catch (err) {
        return err;
    }
}

