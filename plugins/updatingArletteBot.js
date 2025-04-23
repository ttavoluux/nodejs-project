
let handler = async (m, { conn, command, usedPrefix }) => {
    let picture = './media/menus/img1.jpg'
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) { process.send('uptime')
        _muptime = await new Promise(resolve => { process.once('message', resolve)
            setTimeout(resolve, 1000) }) * 1000}
    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    let uptime = clockString(_uptime)
    let estado = `> ArletteBot se esta actualizando algunos comandos podrian no funcionar!`
    await conn.sendFile(m.chat, imagen12, 'lp.jpg', estado)
}
handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(changegroup|cambiargrupo|n|on|off|todos|todas|aviso|notify|spam|ban|kick|abrir|grupo|promote|demote|resetlink|link|fantasmas|4|6|12|1|2|ia|sticker|hd|img|tts|tovideo|caracolamagica|top|topparejas|ship|top1|topgays|formarpareja|trivia|pelicula|adivinanza|gay|gay2|lesbiana|chiste|piropo|love|manco|manca|dado|ff|play|tiktok|ytmp4|ytmp3|facebook|instagram|estado|owner|ultimate|minimalist|menucompleto)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
