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

    reglas += `🔸 REGLAS LÍDERES FEM 🔸

◼ NEGRO (P. HOMBRE) LADO B
◻ BLANCO (P. MUJER) LADO A (PONE PRIMERA SALA)

📛 TODAS LAS JUGADORAS DEBEN CONTAR CON ASPECTOS DESCARGADOS, DE LO CONTRARIO NO SERÁ VÁLIDO REPETIR SALA.

Reglas del Juego:

▪︎ SE MATA RESTRINGIENDO 1RA. ZONA.
▪︎ SOLO ALOK Y K.
▪︎ PROHIBIDO EL USO DE CUALQUIER FRANCO.
- Si se hace uso de estas armas, ya sea para bajar vida o matar, NO SE REPITE SALA, será punto directo al rival.
▪︎ PROHIBIDO REVIVIR.
▪︎ NO MÁS DE 3 ROTES.
▪︎ PROHIBIDA HORIZONALINA.
▪︎ NO SVD, NO VSS.
▪︎ SIN GARITAS, FAROS, CARTELES Y CARROS después de marcar primera zona.
▪︎ NO EXPLOSIVOS.
▪︎ NO LANZADORAS PORTÁTILES Y GANCHOS.
▪︎ NO OTHO/SONIA/RAFAEL/LILA.
▪︎ 🚫 PROHIBIDA PISTOLA CURATIVA.
▪︎ NO CUENTAS CON NIVEL -60.
- SE SACARÁN DE SALA SIN PREVIO AVISO.
▪︎ NO PORTALES Y HABILIDADES EXTRAS.
- En caso de usar habilidades extra durante el versus, se repite sala, haya o no afectado al equipo rival. De no hacerlo queda en responsabilidad de cada líder.

Incumplimiento de Reglas:

🔸️ ES VÁLIDO MATAR JUGADORAS QUE INVADEN Y LUTEAN ZONA RIVAL INTENCIONALMENTE.

Requisitos de Participación:

▪︎ 🏳️‍🌈 2 GAY / BISEXUAL (MÁXIMO)
- Las transgéneros serán consideradas como MUJERES y no necesitarán ficha para participar en versus FEMENINOS, siempre que tengan la documentación que lo acredite. Si no la tienen o no quieren mostrarla por privacidad, serán contadas como GAY.
▪︎ ❌ NO HOMBRES HETEROSEXUALES.
▪︎ 💻 VÁLIDAS 2 PC POR EQUIPO.
- VS DE 12 (2PC), VS DE 16 (3PC).
- Al equipo que le toque hacer salas debe mandar captura de la cantidad ANTES DE INICIAR PRIMERA SALA.
- Si hay pruebas de que se meten más PC de lo acordado, pueden abandonar el versus y NO SERÁ PUBLICADO POR NINGÚN EQUIPO.

⏰ TIEMPO DE ESPERA:

    10 min a partir de pasar datos de 1ra. sala.
    5 min entre cada sala.
    En caso de poner todas las salas:
        10 min a partir de haber pasado datos y 3 min entre cada sala.

Eliminaciones y Abandonos:

▪︎ SOLO SE PERMITEN 2 ELIMINACIONES POR VERSUS.
- La tercera será PUNTO PARA EL RIVAL.
- Esto incluye versus al mejor de 5.
- PODRÁ SER ANULADO SOLO SI LA SALA ESTÁ BUGUEADA.
- Si el rival se revive, tendrán 35 segundos para eliminar al menos 5 jugadoras, de lo contrario no será válido. Recuerden siempre sacar clip para comprobarlo.
▪︎ NO PODRÁN ABANDONAR EL VERSUS DESPUÉS DE HABER JUGADO LA PRIMERA SALA.
- De lo contrario, el versus SERÁ PUBLICADO 2-1 POR EL RIVAL.
- Este punto podrá ser anulado si el rival está haciendo uso de hacks o jugando con heteros.
- Esto deberá ser comprobado con clips y enviados a cualquiera de las líderes de Norte.

⚠️ Motivos Válidos para Rolar Logo:

    Uso de hacks.
    Robo de logos.
    Jugar con personas vetadas en lo FEM.
        Se rolará el logo de la o las personas involucradas en el robo de logos.

Resolución de Situaciones:

Para resolver alguna situación, pueden hacer llegar los detalles a cualquiera de las líderes, siempre y cuando sus versus hayan sido agendados con estas reglas.

⚠️ Chip de Gloo Prohibido:

Solo se puede utilizar el chip amarillo.
Se repite sala al tener prueba del uso de otros chips (verde, azul, rojo).

Este formato es más estructurado y legible para WhatsApp, con encabezados claros y separación por temas para facilitar la lectura.
Dijiste:
pero no agreges nada te texto adicional
ChatGPT dijo:
ChatGPT

Aquí tienes el texto tal como lo pediste, con el formato mejorado y sin agregar ninguna palabra adicional:

🔸 LÍDERES FEM 🔸

◼ NEGRO (P. HOMBRE) LADO B
◻ BLANCO (P. MUJER) LADO A (PONE PRIMERA SALA)

📛 TODAS LAS JUGADORAS DEBEN CONTAR CON ASPECTOS DESCARGADOS, DE LO CONTRARIO NO SERÁ VÁLIDO REPETIR SALA.

▪︎ SE MATA RESTRINGIENDO 1RA. ZONA.
▪︎ SOLO ALOK Y K.
▪︎ PROHIBIDO EL USO DE CUALQUIER FRANCO

    Si llegan a hacer uso de estas armas, ya sea bajar vida o matar, no se va a repetir sala, no será necesario eliminarse, SERÁ PUNTO DIRECTO AL RIVAL.
    ▪︎ PROHIBIDO REVIVIR.
    ▪︎ NO MÁS DE 3 ROTES.
    ▪︎ PROHIBIDA HORIZONALINA.
    ▪︎ NO SVD, NO VSS.
    ▪︎ SIN GARITAS, FAROS, CARTELES Y CARROS después de marcar primera zona.
    ▪︎ NO EXPLOSIVOS.
    ▪︎ NO LANZADORAS PORTÁTILES Y GANCHOS.
    ▪︎ NO OTHO/SONIA/RAFAEL/LILA.
    ▪︎ 🚫 PROHIBIDA PISTOLA CURATIVA.
    ▪︎ NO CUENTAS CON NIVEL -60.
    SE SACARÁN DE SALA SIN PREVIO AVISO.
    ▪︎ NO PORTALES Y HABILIDADES EXTRAS.
    En caso de usar habilidades extra durante el versus, se repite sala, haya o no afectado al equipo rival, de no hacerlo queda en responsabilidad de cada líder.

Incumplimiento de Reglas:

🔸️ ES VÁLIDO MATAR JUGADORAS QUE INVADEN Y LUTEAN ZONA RIVAL INTENCIONALMENTE.

▪︎ 🏳️‍🌈 2 GAY / BISEXUAL (MÁXIMO)

    Las transgéneros serán consideradas como MUJERES y no necesitarán de una ficha para participar en versus FEMENINOS, siempre que tengan la documentación que lo acredite, si no la tiene o no quiere mostrarla por privacidad SI SERÁ CONTADO COMO GAY.
    ▪︎ ❌ NO HOMBRES HETEROSEXUALES.
    ▪︎ 💻 VÁLIDAS 2 PC POR EQUIPO.
    VS DE 12 (2PC), VS DE 16 (3PC).
    Al equipo que le toque hacer salas debe mandar captura de la cantidad ANTES DE INICIAR PRIMERA SALA.
    Si hay alguna prueba de que el equipo mete más PC de lo acordado, pueden abandonar el vs y este NO PODRÁ SER PUBLICADO POR NINGÚN EQUIPO.

⏰ TIEMPO DE ESPERA:

    10MIN. A PARTIR DE PASAR DATOS DE 1RA. SALA.
    5 MIN ENTRE CADA SALA.
    EN CASO DE PONER TODAS LAS SALAS:
    10MIN A PARTIR DE HABER PASADO DATOS Y 3MIN ENTRE CADA SALA.

▪︎ SERÁN VÁLIDAS SOLO 2 ELIMINACIONES POR VERSUS, LA TERCERA SERÁ PUNTO PARA EL RIVAL, ESTO INCLUYE VERSUS AL MEJOR DE 5.

    (PODRÁ SER ANULADO SOLO SI LA SALA ESTÁ BUGUEADA, EN DADO CASO QUE EL RIVAL SE REVIVA TENDRÁN 35 SEGUNDOS PARA ELIMINARSE AL MENOS 5 JUGADORAS, DE LO CONTRARIO NO SERÁ VÁLIDO, RECUERDEN SIEMPRE SACAR CLIP PARA PODER COMPROBARLO.)

▪︎ NO PODRÁN ABANDONAR VERSUS DESPUÉS DE HABER JUGADO PRIMER SALA DE LO CONTRARIO EL VERSUS PODRÁ SER PUBLICADO 2-1 POR EL RIVAL.

    (ESTE PUNTO PODRÁ SER ANULADO SI EL RIVAL ESTÁ HACIENDO USO DE HACKS O JUGANDO CON HETEROS, ESTO TENDRÁ QUE ESTAR COMPROBADO CON CLIPS, MANDARLOS A CUALQUIERA DE LAS LÍDERES DE NORTE PARA ASÍ LLEGAR A UNA SOLUCIÓN.)
    PUBLICAR VS NO SE INCLUYE CUANDO LA CANTIDAD DE PC HA SIDO SOBREPASADO. CON PRUEBAS.

⚠️ MOTIVOS VÁLIDOS PARA ROLAR LOGO:

    USO DE HACK, ROBO DE LOGOS Y JUGAR CON PERSONAS VETADAS EN LO FEM.
        (SERÁ ROLADO EL LOGO DE LA O LAS PERSONAS INVOLUCRADAS EN EL ROBO DE LOGOS)

PARA RESOLVER ALGUNA SITUACIÓN, PUEDEN HACERLO LLEGAR A CUALQUIERA DE LAS LÍDERES, SIEMPRE Y CUANDO SUS VERSUS HAYAN SIDO AGENDADOS CON ESTAS REGLAS.

⚠️ CHIP DE GLOO QUEDA PROHIBIDO
Solo se puede utilizar el amarillo.
Se repite sala al tener prueba del uso de los otros chips (verde, azul, rojo).
`;

    // Enviar el mensaje con menciones a todos los participantes
    conn.sendMessage(m.chat, { text: reglas, mentions: participants.map(a => a.id) });
};

handler.command = /^(reglasfem|lideresfem|reglasvs|lnf|lideresnorte|reglaslideres|llf|nfl)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
