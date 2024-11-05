let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}

var texto = '🐈‍⬛ Holis :3' 
var texto2 = '🐈‍⬛ AVISO :' 
var texto3 = ' '
var texto4 = ' '
if(text.length>1){ 
texto = texto2 
texto3='*!'
texto4='!*'
}
let pesan = args.join` `
//let oi = `ღ ${lenguajeGB['smsAddB5']()} ${pesan}`
let teks = `⚠️ *Spam* ⚠️\n  *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`
for (let mem of participants) {
teks += `*@${mem.id.split('@')[0]}* `}
teks += `\n *${packname} ${vs}*`
//teks += '\n *𝓑𝔂: 𝓐𝓻𝓵𝓮𝓽𝓼𝓲𝓽𝓪 𝓫𝓸𝓽 💕* '
//teks += '\n\n*💜 Nuevos comandos ⚠️*\n     *.aviso*\n     *.todosprem*'
let contador =0;
for(contador; contador < 5; contador++){
await conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}

}


handler.command = /^(spam|span)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
