let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}

var texto = '📍 @todoos ✨'
var texto2 = '✨ AVISO :'
var texto3 = ' '
var texto4 = ' '
    let numParticipantes = participants.length;
if(text.length>1){ 
texto = texto2 
texto3='*!'
texto4='✨ !*'
    //*🎄 Holis :3🎄*
    //
    // *@⁨> Arlette Bot ;⁩* *@⁨✨    Arlennysssssss    ❤️⁩*
    //
    //                                                      ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺
}
let pesan = args.join` `
    let teks = ''
    if(numParticipantes > 100){
        teks += '❗ *El grupo supera los 100 participantes considere usar .aviso* ❗\n\n';
    }
    if(numParticipantes <= 1){
        const americaCountries = {
            "1": "🇺🇸", // Estados Unidos// Canadá
            "52": "🇲🇽", // México
            "501": "🇧🇿", // Belice
            "506": "🇨🇷", // Costa Rica
            "503": "🇸🇻", // El Salvador
            "502": "🇬🇹", // Guatemala
            "504": "🇭🇳", // Honduras
            "505": "🇳🇮", // Nicaragua
            "507": "🇵🇦", // Panamá
            "1268": "🇦🇬", // Antigua y Barbuda
            "1242": "🇧🇸", // Bahamas
            "1246": "🇧🇧", // Barbados
            "53": "🇨🇺", // Cuba
            "1767": "🇩🇲", // Dominica
            "1473": "🇬🇩", // Granada
            "509": "🇭🇹", // Haití
            "1876": "🇯🇲", // Jamaica
            "1809": "🇩🇴", // República Dominicana
            "1869": "🇰🇳", // San Cristóbal y Nieves
            "1758": "🇱🇨", // Santa Lucía
            "1784": "🇻🇨", // San Vicente y las Granadinas
            "1868": "🇹🇹", // Trinidad y Tobago
            "54": "🇦🇷", // Argentina
            "591": "🇧🇴", // Bolivia
            "55": "🇧🇷", // Brasil
            "56": "🇨🇱", // Chile
            "57": "🇨🇴", // Colombia
            "593": "🇪🇨", // Ecuador
            "592": "🇬🇾", // Guyana
            "595": "🇵🇾", // Paraguay
            "51": "🇵🇪", // Perú
            "597": "🇸🇷", // Surinam
            "598": "🇺🇾", // Uruguay
            "58": "🇻🇪", // Venezuela
        };

        let groupedParticipants = {};
        // Asignamos la bandera según el código de lada
        for (let mem of participants) {
            let phoneNumber = mem.id.split('@')[0];  // Obtenemos el número de teléfono (sin el '@c.us')

            let lada = phoneNumber.slice(0, 3);  // Obtenemos los primeros 3 dígitos

            // Intentamos encontrar la lada en el objeto 'americaCountries'
            let flag = americaCountries[lada];

            // Si no encontramos una bandera, probamos con los primeros 2 dígitos
            if (!flag) {
                lada = phoneNumber.slice(0, 2);  // Probamos con los primeros 2 dígitos
                flag = americaCountries[lada];
            }

            // Si todavía no encontramos una bandera, asignamos la de Estados Unidos si el primer número es '1'
            if (!flag && phoneNumber.startsWith('1')) {
                flag = americaCountries['1'];  // Bandera de Estados Unidos / Canadá
            }

            // Si no encontramos ninguna coincidencia, asignamos la bandera del mundo
            flag = flag || "🌍";

            //new code
            if (!groupedParticipants[flag]) {
                groupedParticipants[flag] = [];
            }

            // Añadimos el participante a la lista correspondiente a la bandera
            groupedParticipants[flag].push(mem);
        }

        // Ahora construimos el texto ordenado por bandera
        for (let flag in groupedParticipants) {
            //teks += `${flag}\n`; // Añadimos la bandera al mensaje
            groupedParticipants[flag].forEach(mem => {
                //teks += `*️⃣ *@${mem.id.split('@')[0]}*\n`; // Añadimos los participantes con esa bandera
                teks += `${flag} *@${mem.id.split('@')[0]}*\n`;
            });
            //teks += '\n'; // Añadimos un salto de línea entre grupos de países
        }
        //teks += `${flag} *@${mem.id.split('@')[0]}*\n`;


        teks += `\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺`;

        conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) });

    }else{


//let oi = `ღ ${lenguajeGB['smsAddB5']()} ${pesan}`
teks += ` *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`
for (let mem of participants) {
teks += `*@${mem.id.split('@')[0]}* `}
teks += `\n`
    teks += `\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺`
//teks += '\n *𝓑𝔂: 𝓐𝓻𝓵𝓮𝓽𝓼𝓲𝓽𝓪 𝓫𝓸𝓽 💕* '
//teks += '\n\n*💜 Nuevos comandos ⚠️*\n     *.aviso*\n     *.todosprem*'
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}}
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
