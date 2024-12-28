let handler = async(m, { conn, text, args, command }) => {
    let teks = '📝 *Formulario para Solicitar el Bot:*😊\n' +
        '\n' +
        ' *Nombre:*\n' +
        '\n' +
        '\n' +
        '*Tipo de grupo:* ejemplo: juegos,amigos,estudio etc.\n' +
        '\n' +
        '\n' +
        '*Link del grupo:*\n' +
        '\n' +
        '\n' +
        '*Cumples con todos los requisitos?*\n' +
        '\n' +
        '\n' +
        '📌 *!El bot tiene que tener rol de admin*'

    conn.sendMessage(m.chat, {text: teks})
}
handler.command = /^(solicitarbot)$/i
export default handler
