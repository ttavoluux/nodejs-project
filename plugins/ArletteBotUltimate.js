
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
    let estado = `🖤 ArletteBot Ultimate 🖤
    
Herramientas exclusivas:

┃ Algoritmos IA avanzados 

┃ Procesamiento UltraRápido - Velocidad 3x mayor sobre la version Community

┃ Sin restricciones

┃ API Privadas - servidores dedicados 24/7

┃ Soporte VIP - Atención prioritaria vía Whatsapp/Email

💎🛠️ COMANDOS PERSONALIZADOS
🚀 ¡Contacto: wa.me/5614236722`
    await conn.sendFile(m.chat, imagen5, 'lp.jpg', estado)
}
handler.help = ['ultimate']
handler.tags = ['pro']
handler.command = /^(pro|ultimate|arlettepro|arlettebotultimate)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
