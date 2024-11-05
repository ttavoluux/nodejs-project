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

await conn.sendMessage(m.chat, { text : text ? text : ' *🐈‍⬛ 𝑨𝒓𝒍𝒆𝒕𝒔𝒊𝒕𝒂 𝑩𝒐𝒕 ❤*' , mentions: users}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
return
}


if (args.length >= 1) {
text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text
} else return   

const users = participants.map((u) => conn.decodeJid(u.id))
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const more = String.fromCharCode(8206)
const masss = more.repeat(850)
const htextos = `${text ? text : '📣📣📣'}`
if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: text, mentions: users}, {quoted: m})
return
} else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: text}, {quoted: m})
return
} else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
var mediax = await quoted.download?.();
conn.sendMessage(m.chat, {audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3`}, {quoted: m})
return
} else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
var mediax = await quoted.download?.();
conn.sendMessage(m.chat, {sticker: mediax, mentions: users}, {quoted: m})
return
} else {
await conn.sendMessage(m.chat, { text: text + '\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ', mentions: users }, { quoted: m }) 
return
}
}



handler.command = /^(deprecated)$/i
handler.group = true
handler.admin = true
export default handler