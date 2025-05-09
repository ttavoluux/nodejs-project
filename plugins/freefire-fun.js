let handler = async (m, { conn, command, usedPrefix,text}) => {
    let name = await conn.getName(m.sender)

    if (command === 'ff') {
        let menuff = `💗 *¡Hola!* ${name} ✨

*FF 🕹️*

> .ffespacio
> .ff16vs16
> .ff12vs12
> .ffcuadrilatero
> .ffscrims
> .ffreglasfem | lideresfem
> .ffreglasmasc | lideresmasc`
        menuff += '\n\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺'
        await conn.sendFile(m.chat, imagen23, 'lp.jpg', menuff)
    }
    if (command === 'ff12vs12') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff12vs12 9`',  quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 = horaMX;
        let horaCO12 = horaCO;
        let horaAR12 = horaAR;

        let scrims12 = `*12VS12*

*HORA: 🇲🇽 ${horaMX12} / 🇨🇴 ${horaCO12} / 🇦🇷 ${horaAR12}*

*ESCUADRA 1*
- 
- 
- 
- 

*ESCUADRA 2*
- 
- 
- 
- 

*ESCUADRA 3*
- 
- 
- 
- `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === 'ff16vs16') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff16vs16 9`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO-12;
        }

        let horaMX12 = horaMX;
        let horaCO12 = horaCO;
        let horaAR12 = horaAR;

        let scrims16 = `*16VS16*

*HORA: 🇲🇽 ${horaMX12} / 🇨🇴 ${horaCO12} / 🇦🇷 ${horaAR12}*

*ESCUADRA 1*
- 
- 
- 
- 

*ESCUADRA 2*
- 
- 
- 
- 

*ESCUADRA 3*
- 
- 
- 
- 

*ESCUADRA 4*
- 
- 
- 
- `
        await conn.sendMessage(m.chat, {text:scrims16, quoted: m })
    }

    if (command === 'ffcuadrilatero') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ffcuadrilatero 9`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 = horaMX;
        let horaCO12 = horaCO;
        let horaAR12 = horaAR;

        let cuadrilatero = `*CUADRILATERO*

*HORA: 🇲🇽 ${horaMX12} / 🇨🇴 ${horaCO12} / 🇦🇷 ${horaAR12}*

*ESCUADRA 1*
- 
- 
- 
- 

*ESCUADRA 2*
- 
- 
- 
- 

*ESCUADRA 3*
- 
- 
- 
-  `
        await conn.sendMessage(m.chat, {text:cuadrilatero, quoted: m })
    }

    if (command === 'ffscrims') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ffscrims 9`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }
        let horaMX12 = horaMX;
        let horaCO12 = horaCO;
        let horaAR12 = horaAR;

        let scrims = `*SCRIMS*

*HORA: 🇲🇽 ${horaMX12} / 🇨🇴 ${horaCO12} / 🇦🇷 ${horaAR12}*

- 
- 
- 
- `
        await conn.sendMessage(m.chat, {text: scrims, quoted: m })
    }

    if (command === 'ffespacio') {
        let espacio = '(ㅤ) espacio compatible Android/IOS'
        await conn.sendMessage(m.chat, {text: espacio, quoted: m })
    }

    if (command === 'ffreglasmasc' || command === 'lideresmasc') {
        let espacio = '> *Aun no contamos con datos*'
        await conn.sendMessage(m.chat, {text: espacio, quoted: m })
    }

}

handler.help = ['ff', 'ff12vs12', 'ff16vs16', 'ffcuadrilatero', 'ffscrims']
handler.tags = ['funff']
handler.command = /^(ff|ff12vs12|ff16vs16|ffcuadrilatero|ffscrims|ffespacio|ffreglasmasc|lideresmasc)$/i
export default handler

