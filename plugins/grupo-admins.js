let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg';
  const groupAdmins = participants.filter(p => p.admin);
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  let pesan = args.join` `;
  let oi = `${pesan}`;
  let textoA = "";
  if (!text) {
        textoA=`📍 *@Admins!✨*\n\n`;
  }else{
    textoA=`📍 *@Admins: ${oi}!✨*\n\n`;
  }



  // Lista de banderas por lada (código telefónico)
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

  let listAdmin = groupAdmins.map((v, i) => {
    let phoneNumber = v.id.split('@')[0];
    let lada = phoneNumber.slice(0, 3);
    let flag = americaCountries[lada];

    if (!flag) {
      lada = phoneNumber.slice(0, 2);
      flag = americaCountries[lada];
    }

    if (!flag && phoneNumber.startsWith('1')) {
      flag = americaCountries['1'];
    }

    flag = flag || "🌍";

    return `*${flag}* *@${v.id.split('@')[0]}*`;
  }).join('\n');

  let textoB =
      `${listAdmin}`.trim();

  await conn.sendFile(m.chat, pp, 'error.jpg', textoA + textoB + '\n\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ', m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
  //await conn.sendButton(m.chat, textoA, textoB, pp, [[lenguajeGB.smsConMenu(), `.menu`]], m, { mentions: [...groupAdmins.map(v => v.id), owner] })
};
handler.command = /^(admins|@admins|dmins)$/i;
handler.group = true;
export default handler;
