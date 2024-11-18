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
let estado = `💗 *¡Hola!* ${name} ✨

💬 𝑼𝑷𝑫𝑨𝑻𝑬 🚀

> *Se quito .verificar para todos los comandos!*
> (beta) new +1|2|6|12 "1/24hs"

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

🛠️ 𝙐𝙩𝙞𝙡𝙨

> *.ia [text]*
> *.sticker [img / vid]*
> *.hd [img]*
> *.img [sticker]*
> *.tts [audio]*
> *.tovideo [sticker]*

🕹️ 𝑱𝒖𝒆𝒈𝒐𝒔

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
