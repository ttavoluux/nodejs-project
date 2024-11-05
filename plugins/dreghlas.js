let handler = async(m, { conn, text, participants, args, command }) => {

let teks = ' *⚠️ Este es un comando exclusivo*'

if(m.sender.split`@`[0] == '5215614236722'){ 
//texto = texto2 
//texto3='*!'
//texto4='!*'

teks = `*❤Hola mi creadora* \n*@${m.sender.split`@`[0]}*`
}
let pesan = args.join` `
//let oi = `ღ ${lenguajeGB['smsAddB5']()} ${pesan}`


conn.sendMessage(m.chat, { text: teks, mentions: [m.sender] }, )  
}
handler.command = /^(arlettef)$/i
//handler.admin = false
handler.group = true
handler.botAdmin = true
export default handler


