import {generateWAMessageFromContent} from '@whiskeysockets/baileys'
import * as fs from 'fs';
const handler = async (m, {conn, text, participants, isOwner, isAdmin, args}) => {


if (!m.quoted && !text){
let users = participants.map(u => conn.decodeJid(u.id))
let quoted = m.quoted ? m.quoted : m
let mime = (quoted.msg || quoted).mimetype || ''
let isMedia = /image|video|sticker|audio/.test(mime)
let more = String.fromCharCode(8206)
let masss = more.repeat(850)
let htextos = `${text ? text : " *🐈‍⬛ Holis :3* "}`

await conn.sendMessage(m.chat, { text : text ? text : `*✨${await conn.getName(m.chat)}✨*` , mentions: users}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
return
} 





const users = participants.map((u) => conn.decodeJid(u.id))
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
//const isMedia = /image|video|sticker|audio/.test(mime)
var isMedia = /image|video|sticker|audio/.test(mime)
if(!(isMedia)){

if (args.length >= 1) {
text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text
} else return   

const users = participants.map((u) => conn.decodeJid(u.id))
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
isMedia = /image|video|sticker|audio/.test(mime)
const more = String.fromCharCode(8206)
const masss = more.repeat(850)
const htextos = `${text ? text : '📣📣📣'}`

await conn.sendMessage(m.chat, { text: text + '\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ', mentions: users }, { quoted: m }) 


}else{




try {
let users = participants.map(u => conn.decodeJid(u.id))
let q = m.quoted ? m.quoted : m || m.text || m.sender
let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, { quoted: m, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users })
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch {

/*if (args.length >= 1) {
text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text
} else return   

/*const users = participants.map((u) => conn.decodeJid(u.id))
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
var isMedia = /image|video|sticker|audio/.test(mime)
const more = String.fromCharCode(8206)
const masss = more.repeat(850)
const htextos = `${text ? text : '📣📣📣'}`

await conn.sendMessage(m.chat, { text: text + '\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ', mentions: users }, { quoted: m }) 
return*/
}

}


}

handler.command = /^(aviso|hidetag|notificar|notify|noti)$/i
handler.group = true
handler.admin = true
export default handler