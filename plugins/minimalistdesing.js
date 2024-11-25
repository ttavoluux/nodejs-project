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
    let estado = `💗 *¡Holis :3!* ${name}
    
    🎨 𝑨𝒅𝒅 𝑴𝒊𝒏𝒊𝒎𝒂𝒍𝒊𝒔𝒕 𝑫𝒆𝒔𝒊𝒈𝒏 🎨


✅ *@todos*  
✅ *@aviso*
✅ *@notify*
✅ *@antidelete* 
✅ *@welcome*
✅ *@bye*
✅ *@menu*
✅ *@estado*
✅ *@trivia*
✅ *@pregunta*
✅ *@stiker*
✅ *@on*
✅ *@ban*
✅ *@fantasmas*
✅ *@top*
✅ *@hd*

> Se cambiará el diseño de cómo se muestran los comandos para darle un estilo más minimalista. Esta nueva apariencia busca hacer la interfaz más limpia y fácil de usar, eliminando elementos innecesarios y centrando la atención en lo esencial.

    
    *Versión:* ${vs}`

    await conn.sendFile(m.chat, imagen22, 'lp.jpg', estado)
}

handler.help = ['minimalist']
handler.tags = ['minimalist']
handler.command = /^(minimalist|desing|desingminimalist|minimalistdesing)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}