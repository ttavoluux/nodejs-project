let handler = async (m, { conn, text, participants, args, command }) => {
    // Definir texto base y etiquetas
    const textoBase = '🌸 Holis 🌸';
    const textoAviso = '🌸 AVISO :';
    const inv = '```';  // Usado para dar formato a las secciones
    const act = '`';     // Usado para marcar acciones especiales

    // Definir el texto principal según si se pasa un argumento
    let texto = textoBase;
    let texto3 = ' ';
    let texto4 = ' ';

    // Si se pasa un texto en el comando, ajustar
    if (text.length > 1) {
        texto = textoAviso;
        texto3 = '*!';
        texto4 = '!*';
    }

    // Unir los argumentos en un solo mensaje
    const pesan = args.join(' ');

    // Construcción de las reglas en el formato adecuado
    let reglas = `${inv}𝐑𝐄𝐆𝐋𝐀𝐒 𝐋𝐈́𝐃𝐄𝐑𝐄𝐒 𝐅𝐄𝐌 (5/12/24)${inv}\n`;

    reglas += `
◼ *NEGRO _(P. HOMBRE)_ LADO B*
◻ *BLANCO _(P. MUJER)_ LADO A* _(PONE PRIMERA SALA)_

📛 TODAS LAS JUGADORAS DEBEN CONTAR CON ASPECTOS DESCARGADOS, DE LO CONTRARIO NO SERÁ VÁLIDO REPETIR SALA.

▪︎SE MATA RESTRINGIENDO 1RA. ZONA.
▪︎SOLO ALOK Y K.
▪︎ *PROHIBIDO EL USO DE CUALQUIER FRANCO* Si llegan a hacer uso de estas armas, ya sea bajar vida o matar, no se va a repetir sala, no será necesario eliminarse, *SERÁ PUNTO DIRECTO AL RIVAL*
▪︎PROHIBIDO REVIVIR.
▪︎NO MÁS DE 3 ROTES.
▪︎PROHIBIDA HORIZONALINA.
▪︎NO SVD, NO VSS.
▪︎SIN GARITAS, FAROS, CARTELES y CARROS DESPUÉS DE MARCAR PRIEMRA ZONA.
▪︎NO EXPLOSIVOS.
▪︎NO LANZADORAS PORTÁTILES Y GANCHOS.
▪︎NO OTHO/SONIA/RAFAEL/LILA.
▪︎🚫 PROHIBIDA PISTOLA CURATIVA Y.
▪︎NO CUENTAS CON NIVEL -60. (*SE SACARAN DE SALA SIN PREVIO AVISO*).
▪︎NO PORTALES Y HABILIDADES EXTRAS
(en caso de usar habilidades extra durante el versus, se repite sala, haya o no afectado al equipo rival, de no hacerlo queda en responsabilidad de cada líder.)

*EN CASO DE CUALQUIER INCUMPLIMIENTO DE REGLA LA SALA TENDRÁ QUE SER REPETIDA, AFECTANDO O NO EL INCUMPLIMIENTO*
🔸️ ES VÁLIDO MATAR JUGADORAS QUE INVADEN Y LUTEAN ZONA RIVAL *INTENCIONALMENTE.* 

*Los tokens son responsabilidad del equipo que lo lleve*

▪︎🏳️‍🌈 *2 GAY / BISEXUAL* _(MÁXIMO)_
_Las trangeneros serán consideradas como *MUJERES* y no necesitarán de una ficha para poder ser participes en versus FEMENINOS, siempre y cuando tengan la documentación que lo acredite, si no lo tiene o no quiere mostrarlo por privacidad *SI SERÁ CONTADO COMO GAY.*_
▪︎❌ *NO HOMBRES HETEROS*
▪︎💻 *VÁLIDAS 2 PC POR EQUIPO* _VS DE 12 (2PC) VS DE 16 (3PC)._ Al equipo que le toque hacer salas debe mandar captura de la cantidad *ANTES DE INICIAR PRIMER SALA.*
si hay alguna prueba de que el equipo mete más PC de lo acordado, pueden abandonar el vs  *y este NO PODRÁ SER PUBLICADO POR NINGÚN EQUIPO.*


⏰ *TIEMPO DE ESPERA*
- 10MIN. A PARTIR DE PASAR DATOS DE 1RA. SALA.
- 5 MIN ENTRE CADA SALA.
*EN CASO DE PONER TODAS LAS SALAS:* _10MIN A PARTIR DE HABER PASADO DATOS Y 3MIN ENTRE CADA SALA._

▪︎ *SERÁN VÁLIDAS SOLO 2 ELIMINACIONES _POR VERSUS_, LA TERCERA SERÁ PUNTO PARA EL RIVAL, ESTO INCLUYE VERSUS AL MEJOR DE 5.* _(PODRÁ SER ANULADO SOLO SI LA SALA ESTA BUGUEADA, EN DADO CASO QUE EL RIVAL SE REVIVA TENDRÁN 35 SEGUNDOS PARA ELIMINARSE AL MENOS 5 JUGADORAS, DE LO CONTRARIO NO SERÁ VÁLIDO, RECUERDEN SIEMPRE SACAR *CLIP* PARA PODER COMPROBARLO.)_

▪︎ *NO PODRÁN ABANDONAR VERSUS DESPUÉS DE HABER JUGADO PRIMER SALA DE LO CONTRARIO EL VERSUS PODRÁ SER PUBLICADO 2-1 POR EL RIVAL.* _(ESTE PUNTO PODRÁ SER ANULADO SI EL RIVAL ESTA HACIENDO USO DE HACKS O JUGANDO CON HETEROS, ESTO TENDRÁ QUE ESTAR COMPROBADO CON CLIPS, MANDARLOS A CUALQUIERA DE LAS LÍDERES DE NORTE PARA ASÍ LLEGAR A UNA SOLUCIÓN.)_
*_- PUBLICAR VS NO SE INCLUYE CUANDO LA CANTIDAD DE PC HA SIDO SOBREPASADO._  CON PRUEBAS.*

⚠️ *MOTIVOS VÁLIDOS PARA ROLAR LOGO: USO DE HACK, ROBO DE LOGOS Y JUGAR CON PERSONAS VETADAS EN LO FEM.*  _(SERÁ ROLADO EL LOGO DE LA O LAS PERSONAS INVOLUCRADAS EN EL ROBO DE LOGOS)_ ⚠️

*PARA PODER RESOLVER ALGUNA SITUACIÓN,  PUEDEN HACERLO LLEGAR A CUALQUIERA DE LAS LÍDERES, SIEMPRE Y CUANDO SUS VERSUS HAYAN SIDO AGENDADOS CON ESTAS REGLAS*

*TUBOS DE TRANSPORTE QUEDAN PROHIBIDO SU USO AL RESTRINGIR ZONA/COMBATE*`;

    // Agregar pie de página
    reglas += `\n\n\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺`;

    // URL de la imagen que deseas adjuntar
 // Imagen para la vista previa (puede ser la misma o diferente)

    // Enviar el mensaje con el texto de las reglas, el enlace y la imagen
    await conn.reply(m.chat,
        `${reglas}`,
        m,
        {
            contextInfo: {
                externalAdReply: {
                    mediaUrl: null,
                    mediaType: 1,
                    description: 'Descripción del mensaje',
                    title: "Lideres FEM Jossha",
                    body: "ArletteBot",
                    previewType: 0,
                    thumbnail: imagen12,
                    sourceUrl: 'https://chat.whatsapp.com/BHyF4jNrGJMEiYg0rVD2DH'
                }
            }
        }
    );
};

handler.command = /^(reglasfem|lideresfem|reglasvs|nfl|ffreglasfem|reglaslideres|reglasjossha)$/i;
handler.group = true;

export default handler;
