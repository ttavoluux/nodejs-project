let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
//hiiiiii
var texto = '⏱️ Hora : Hasta que llenen' 
var texto2 = '⏱️ HORA :' 
var texto3 = ' '
var texto4 = ' '
if(text.length>1){ 
texto = texto2 
texto3='*!'
texto4='!*'
}
let pesan = args.join` `
//let oi = `ღ ${lenguajeGB['smsAddB5']()} ${pesan}`
let teks = '*🌸 6 vs 6 🌸*\n\n' 
teks += ` *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`
teks += `*Escuadra*

*1.*
*2.*
*3.*
*4.*
*5.*
*6.*

*Suplentes*

*1.*
*2.*`
teks += `\n`
//teks += '\n *𝓑𝔂: 𝓐𝓻𝓵𝓮𝓽𝓼𝓲𝓽𝓪 𝓫𝓸𝓽 💕* '
//teks += '\n\n*💜 Nuevos comandos ⚠️*\n     *.aviso*\n     *.todosprem*'
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}
handler.command = /^(6vs6|6vs6|6vs)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
