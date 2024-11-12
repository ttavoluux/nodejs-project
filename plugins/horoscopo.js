let handler = async (m, { conn, text }) => {
    // Lista de signos zodiacales
    const signos = [
        'aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis'
    ];

    // Verificar que el texto sea un signo válido
    if (!text || !signos.includes(text.toLowerCase())) {
        return conn.reply(m.chat, 'Por favor, ingresa un signo zodiacal válido. Ejemplo: .horoscopo libra', m);
    }

    // Definimos un horóscopo predeterminado para cada signo
    const horoscopos = {
        aries: "Hoy es un día perfecto para impulsarte hacia nuevas oportunidades. Tu energía está a su máximo nivel, lo que te da la fuerza para tomar decisiones clave en tu vida. Aprovecha para avanzar en proyectos o iniciar nuevas ideas, pero evita apresurarte. Reflexiona antes de actuar y planifica bien tus próximos pasos.",
        tauro: "Hoy, la paciencia será tu mejor aliada. Las cosas no avanzarán a gran velocidad, pero cada pequeño paso te acercará más a tus objetivos. No te desesperes por los obstáculos. Mantén el enfoque y avanza con determinación. Tu esfuerzo constante es lo que te llevará al éxito a largo plazo.",
        geminis: "La comunicación será esencial hoy. Tendrás el don de escuchar y mediar entre diferentes puntos de vista. Es un buen momento para aclarar malentendidos, resolver conflictos con seres cercanos y fortalecer tus relaciones. Tu capacidad de ver todos los ángulos te permitirá encontrar soluciones diplomáticas.",
        cancer: "Hoy, tu bienestar emocional y físico está en el centro de todo. Tómate el tiempo para relajarte, meditar o disfrutar de actividades que te den paz interior. Es un buen día para cuidar de ti mismo y de tus relaciones más cercanas. Conecta con tus seres queridos y refuerza los lazos afectivos.",
        leo: "Tu confianza está desbordante hoy, y es el momento ideal para brillar. Tienes la energía necesaria para liderar proyectos importantes o para destacar en tu entorno laboral. Aprovecha esta magnetismo para atraer a personas clave, pero mantén la humildad y escucha a quienes te rodean para lograr el mejor resultado.",
        virgo: "Hoy tu mente está especialmente clara y organizada. Es el día perfecto para estructurar tus ideas y establecer planes concretos. Tienes la capacidad de ordenar lo que te rodea, así que dedica tiempo a la organización y a poner en marcha nuevos proyectos. Recuerda ser amable contigo mismo; el perfeccionismo no siempre es necesario.",
        libra: "Hoy estarás muy introspectivo, lo que te invita a reflexionar sobre tu vida y tus relaciones. Si has tenido desacuerdos o malentendidos con alguien cercano, este es el momento ideal para resolverlos. Abre tu corazón y muestra vulnerabilidad, ya que esto fortalecerá tus conexiones con los demás y te traerá paz emocional.",
        escorpio: "Las emociones estarán intensas hoy, por lo que es crucial que busques equilibrio. Tienes la capacidad de transformar cualquier situación a tu favor, pero debes evitar dejarte llevar por el impulso. Mantén la calma, especialmente si enfrentas tensiones, y actúa con prudencia para evitar conflictos innecesarios.",
        sagitario: "Tu espíritu aventurero está más vivo que nunca, y hoy te sentirás impulsado a explorar nuevos horizontes. Aprovecha para tomar riesgos calculados, pero asegúrate de estar bien preparado antes de lanzarte. La espontaneidad puede ser beneficiosa, pero un poco de planificación te permitirá navegar cualquier sorpresa con éxito.",
        capricornio: "Hoy es un buen día para concentrarte en tus objetivos a largo plazo. La disciplina será clave para avanzar, y aunque puede que no veas resultados inmediatos, tu esfuerzo constante te llevará lejos. Mantén la mirada fija en tus metas y no te dejes distraer por lo trivial. Toma decisiones pensadas y orientadas al futuro.",
        acuario: "Tu creatividad y pensamiento innovador estarán al alza hoy. Es un buen día para explorar nuevas ideas y trabajar en proyectos que desafíen lo convencional. No dudes en compartir tus pensamientos con los demás, ya que tu visión única podría inspirar a otros y abrir nuevas puertas para ti.",
        piscis: "Tu intuición estará especialmente afinada hoy, por lo que es un buen momento para confiar en tus corazonadas. Podrás captar matices y emociones no expresadas verbalmente, lo que te permitirá conectar de manera más profunda con los demás. Aprovecha para resolver cualquier conflicto emocional que puedas estar cargando y busca la armonía en tus relaciones."
    };

    // Obtenemos el horóscopo para el signo dado
    const horoscopo = horoscopos[text.toLowerCase()];

    // Emoji para cada signo
    const emojis = {
        aries: "♈️",
        tauro: "♉️",
        geminis: "♊️",
        cancer: "♋️",
        leo: "♌️",
        virgo: "♍️",
        libra: "♎️",
        escorpio: "♏️",
        sagitario: "♐️",
        capricornio: "♑️",
        acuario: "♒️",
        piscis: "♓️"
    };

    // Obtener la fecha actual en formato día/mes
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // El mes va de 0 a 11, así que sumamos 1 y lo formateamos

    // Título del mensaje con el emoji y la fecha
    const titulo = `${emojis[text.toLowerCase()]} *Horóscopo del día ${dia}/${mes} para ${text.charAt(0).toUpperCase() + text.slice(1)}* ✨`;

    // Construimos el mensaje
    const mensaje = `
${titulo}
${horoscopo}
`.trim();

    // Enviamos el horóscopo
    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['horoscopo'];
handler.tags = ['fun'];
handler.command = /^horoscopo$/i;

export default handler;