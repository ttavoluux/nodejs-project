let handler = async(m, { conn, text, args, command,usedPrefix }) => {
    let teks = '*📌Cualquier incumplimiento sera motivo de Baneo permanente/temporal para los grupos/usuarios*\n' +
        '\n' +
        '\n' +
        '⚠️ *Motivo No.1: Spam*\n' +
        '> (exceso de spam en el uso de comandos)\n' +
        '\n' +
        '⚠️ *Motivo No.2: Inactividad*\n' +
        '> (3 dias de inactividad en el chat)\n' +
        '\n' +
        '⚠️ *Motivo No.3: Otros bots*\n' +
        '> (Se detecto otro bot en el grupo)\n' +
        '\n' +
        '⚠️ *Motivo No.4: Grupo unico*\n' +
        '> (Se detecto el bot en mas grupos con el mismo creador@)\n' +
        '\n' +
        '⚠️ *Motivo No.5: N. integrantes insuficiente*\n' +
        '> (Min 5 entregrantes)\n' +
        '\n' +
        '\n' +
        '🌸Recuerda usar correctamente *ArletteBot Commutity Edition* ✨';

    // conn.sendMessage(m.chat, {text: teks})
    await conn.sendFile(m.chat, imagen36, 'lp.jpg', teks)
}
handler.command = /^(reglasbot)$/i
export default handler