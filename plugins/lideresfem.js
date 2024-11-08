let handler = async (m, { conn, text, participants, args, command }) => {
    // Definir texto base y etiquetas
    const textoBase = '🌸 ¡Hola, chicas! 🌸';
    const textoAviso = '🌸 AVISO IMPORTANTE: 🌸';
    const inv = '```';  // Usado para dar formato a las secciones
    const act = '⏩';    // Usado para marcar acciones especiales

    // Si el comando tiene texto adicional, cambiar la estructura
    let texto = textoBase;
    let texto3 = ' ';
    let texto4 = ' ';

    if (text.length > 1) {
        texto = textoAviso;
        texto3 = '*!';
        texto4 = '!*';
    }

    // Unir los argumentos en un solo mensaje
    const pesan = args.join(' ');

    // Construcción de las reglas con un formato atractivo
    let reglas = `${inv}✨ 𝐑𝐄𝐆𝐋𝐀𝐒 𝐋𝐈́𝐃𝐄𝐑𝐄𝐒 𝐅𝐄𝐌 (26/08/24) ✨${inv}\n`;

    reglas += `
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
> 🔘 *NEGRO _(P. HOMBRE)_ LADO B*
> ⚪ *BLANCO _(P. MUJER)_ LADO A* _(PONE PRIMERA SALA)_

📛 ${act}TODAS LAS JUGADORAS DEBEN TENER LOS ASPECTOS DESCARGADOS, SI NO ES ASÍ, NO SE REPETIRÁ LA SALA.${act}

🔴 *REGLAS ESPECIALES*
> ⛔ *PROHIBIDO EL USO DE FRANCO* Si se utiliza alguna de estas armas para bajar vida o matar, **será punto directo al rival**.
> 🚫 *NO REVIVIR* en ninguna circunstancia.
> 🚷 *NO MÁS DE 3 ROTES* por equipo.
> 🔞 *PROHIBIDA HORIZONALINA* (no usar esa estrategia).
> 🛑 *SIN SVD, NO VSS*.
> ✋ *SIN GARITAS, FAROS Y CARTELES*.
> 💥 *NO EXPLOSIVOS* (incluyendo lanzadoras y ganchos).
> 🚫 *NO OTHO/SONIA/RAFAEL* en el juego.
> 🚫 *PISTOLA CURATIVA* está prohibida.
> 🔴 *NO ACEPTAMOS CUENTAS CON NIVEL -60* (serán eliminadas sin previo aviso).
> ⚠️ *NO USAR PORTALES NI HABILIDADES EXTRAS* (si se usan, **se repite sala**).

✅ *SE PUEDE MATAR A JUGADORAS QUE INVADEN Y LUTEAN ZONA RIVAL INTENCIONALMENTE.*

🏳️‍🌈 *2 GAY/TRANS POR EQUIPO (MÁXIMO)*
❌ *NO HOMBRES HETEROS* en el juego.

💻 *2 PC POR EQUIPO VÁLIDOS*:
- VS de 12: 2 PCs
- VS de 16: 3 PCs
**Antes de iniciar, el equipo debe enviar captura de la cantidad de PCs.** Si se detecta que hay más PCs de los acordados, el equipo contrario puede abandonar el vs y **este no será publicado**.

⏰ *TIEMPOS DE ESPERA*
- ⏳ *10 MINUTOS* a partir de pasar los datos de la 1ra. sala.
- ⏳ *5 MINUTOS* entre cada sala.

🌟 *EN CASO DE PONER TODAS LAS SALAS*:
- 10 minutos a partir de haber pasado los datos y **3 minutos entre cada sala**.

📌 *LIMITES DE ELIMINACIONES POR VERSUS*:
- Solo **2 eliminaciones válidas por versus**.
- La **tercera eliminación será punto para el rival**.
- Si la sala está **bugueada** y un jugador se revive, tendrán **35 segundos** para eliminar al menos **5 jugadoras** para que la eliminación sea válida.

🛑 *NO SE PODRÁ ABANDONAR EL VERSUS DESPUÉS DE JUGAR LA PRIMERA SALA*. Si se abandona, el rival **puede ganar 2-1** por abandono. Si el rival está usando hacks o jugando con heteros, esto puede ser anulado si se prueba con clips.

⚠️ *MOTIVOS PARA ROLAR LOGO*:
- **USO DE HACK**, **ROBO DE LOGOS**, o **JUGAR CON PERSONAS VETADAS** en lo FEM.
  - **Rolar el logo** de las personas involucradas en el robo de logos.

💬 *Si necesitan resolver alguna situación, pueden contactar con cualquier líder, siempre y cuando sus versus hayan sido agendados con estas reglas.*

--------------------------------------------------
📲 *Gracias por leer las reglas. ¡Suerte a todas!*
                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ
`;

    // Enviar el mensaje con menciones a todos los participantes
    conn.sendMessage(m.chat, { text: reglas, mentions: participants.map(a => a.id) });
};

handler.command = /^(reglasfem|lideresfem|reglasvs|lnf|lideresnorte|reglaslideres|llf|nfl)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
