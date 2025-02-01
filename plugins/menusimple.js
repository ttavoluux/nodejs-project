/**
POR FAVOR TENGAN LA AMABILIDAD Y BONDAD DE NO CAMBIAR MÍNIMAMENTE LOS CRÉDITOS DE GATABOT-MD, 
SI VAS A AÑADIR TUS DATOS O CRÉDITOS, ESTA BIEN. PERO NO QUITEN LOS QUE YA ESTAN DE GATABOT-MD, GRACIAS 
**/

/** PLEASE BE KIND AND KINDNESS NOT TO MINIMALLY CHANGE GATABOT-MD CREDITS, 
IF YOU ARE GOING TO ADD YOUR DATA OR CREDITS, IT'S OK. BUT DO NOT REMOVE THOSE THAT ARE ALREADY FROM GATABOT-MD, THANK YOU **/
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
    //𝑨 𝑩 𝑪 𝑫 𝑬 𝑭 𝑮 𝑯 𝑰 𝑱 𝑲 𝑳 𝑴 𝑵 𝑶 𝑷 𝑸 𝑹 𝑺 𝑻 𝑼 𝑽 𝑾 𝑿 𝒀 𝒁 𝑼𝑷𝑫𝑨𝑻𝑬
    //
    // 𝒂 𝒃 𝒄 𝒅 𝒆 𝒇 𝒈 𝒉 𝒊 𝒋 𝒌 𝒍 𝒎 𝒏 𝑜 𝒑 𝒒 𝒓 𝒔 𝒕 𝒖 𝒗 𝒘 𝒙 𝒚 𝒛
let estado = `💗 *¡Hola!* ${name} ✨

🚀 𝑨𝒅𝒅 / 𝑼𝑷𝑫𝑨𝑻𝑬

> *.changegroup | cambiargrupo

💬 𝑮𝒓𝒖𝒑𝒐𝒔

> *.on/.off (Activar y desactivar funciones)*
> *.todos / .todas*
> *.aviso / notify*
> *.spam*
> *.ban / .kick [@]*
> *.grupo abrir / cerrar*
> *.promote / .demote [@]*
> *.resetlink*
> *.link*
> *.fantasmas*
> *.set welcome / bye*
> *.on welcome*
> *.on antidelete*
> *+|1|6|12|2| 1/24hrs*

🛠️ 𝙐𝙩𝙞𝙡𝙨

> *.ia [text]*
> *.sticker [img / vid]*
> *.hd [img]*
> *.img [sticker]*
> *.tts [audio]*
> *.tovideo [sticker]*

🕹️ 𝑱𝒖𝒆𝒈𝒐𝒔

> *.caracolamagica [pregunta]*
> *.top [text]*
> *.topparejas*
> *.ship [@ , @]*
> *.top1 [text]*
> *.topgays*
> *.formarpareja*
> *.trivia*
> *.pelicula*
> *.adivinanza*
> *.gay [@]*
> *.gay2 [@]*
> *.lesbiana [@}*
> *.chiste*
> *.piropo*
> *.pelicula*
> *.love [@]*
> *.manco / .manca*
> *.dado*
> *.ff*

🌐 𝑫𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒔

> *.play [text/link]*
> *.tiktok [link]*
> *.ytmp4 [link]*
> *.ytmp3 [link]*
> *.facebook [link]*
> *.instagram [link]*

📍 𝑰𝒏𝒇𝒐

> *.estado*
> *.owner*

🎨 𝑨𝒅𝒅 𝑴𝒊𝒏𝒊𝒎𝒂𝒍𝒊𝒔𝒕 𝑫𝒆𝒔𝒊𝒈𝒏 🎨

> *.minimalist*

📌
> .menucompleto

*Versión:* ${vs}
*Tiempo Activo:* ${uptime}`
await conn.sendFile(m.chat, imagen17, 'lp.jpg', estado)
}
handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(menu|comandos)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
