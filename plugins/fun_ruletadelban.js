//Script hecho por Edder ミ⁠●⁠﹏⁠☉⁠ミ

let handler = async (m, { conn,groupMetadata, participants, usedPrefix, command, isBotAdmin,isAdmin,isSuperAdmin }) => {
let bot = global.db.data.settings[conn.user.jid] || {}
if (!bot.restrict) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsSoloOwner']()}`) 
if (!isBotAdmin) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsAllAdmin']()}`)
if (!m.isGroup) return !1
let format = a => '@' + a.split('@')[0]
let psmap = groupMetadata.participants.filter(v => v !== conn.user.jid)
psmap=psmap.filter(v => v.admin !=='superadmin')
psmap=psmap.filter(v => v.admin !=='admin')
psmap=psmap.map(v => v.id)
if (psmap == '') return m.reply(`*${lenguajeGB['smsAvisoAG']()} *Tod@s son admintrador@s :c*`)
let user = psmap.getRandom()
m.reply(`*${format(user)} ☠️*`,null,{mentions: [user]})	
await delay(2000)    
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
}

handler.command = /^(ruletaban)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler

const delay = time => new Promise(res => setTimeout(res, time))


