let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}

var texto = '🐈‍⬛ Holis :3'
var texto2 = '🐈‍⬛ AVISO :'
var texto3 = ' '
var texto4 = ' '
    let numParticipantes = participants.length;
if(text.length>1){ 
texto = texto2 
texto3='*!'
texto4='!*'
}
let pesan = args.join` `
//let oi = `ღ ${lenguajeGB['smsAddB5']()} ${pesan}`
let teks = ` *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`
    if(numParticipantes > 100){
        teks += '❗ *El grupo supera los 100 participantes considere usar .aviso* ❗\n\n';
    }
for (let mem of participants) {
teks += `*@${mem.id.split('@')[0]}* `}
teks += `\n`
teks += `\n *${packname} ${vs}* \n${numParticipantes}`
//teks += '\n *𝓑𝔂: 𝓐𝓻𝓵𝓮𝓽𝓼𝓲𝓽𝓪 𝓫𝓸𝓽 💕* '
//teks += '\n\n*💜 Nuevos comandos ⚠️*\n     *.aviso*\n     *.todosprem*'
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
