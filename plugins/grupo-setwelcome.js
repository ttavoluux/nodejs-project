let handler = async (m, { conn, text, isROwner, isOwner }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactmessage": { "vcard": `begin:vcard\nversion:3.0\nn:sy;bot;;;\nfn:y\nitem1.tel;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.x-ablabel:ponsel\nend:vcard` }}, "participant": "0@s.whatsapp.net" }
if (text) {
global.db.data.chats[m.chat].sWelcome = text
conn.reply(m.chat, lenguajeGB.smsSetW(), fkontak, m)
//conn.sendButton(m.chat, wm, lenguajeGB['smsSetW'](), null, [[lenguajeGB.smsConMenu(), `/menu`]], fkontak, m)
} else throw `${lenguajeGB['smsSetW2']()}`
}
handler.command = ['setwelcome', 'bienvenida'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
