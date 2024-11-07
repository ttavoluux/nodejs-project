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
        aries: "Hoy es un buen día para tomar decisiones importantes. Tu energía estará en su punto máximo, lo que te permitirá afrontar cualquier desafío con determinación. No dudes en hacer avanzar tus proyectos o dar un paso hacia nuevas oportunidades. Sin embargo, asegúrate de no actuar impulsivamente; planifica antes de lanzarte.",
        tauro: "Las cosas avanzarán lentamente, pero con paciencia llegarás a tu destino. Es un día para enfocarte en los pequeños pasos y construir una base sólida. Evita tomar riesgos innecesarios, ya que el éxito llegará con persistencia y esfuerzo constante. Confía en tu ritmo natural y en tu capacidad para superar obstáculos.",
        geminis: "La comunicación será clave hoy. Aprovecha para resolver problemas pendientes con amigos, familiares o compañeros de trabajo. Tienes la capacidad de mediar entre diferentes puntos de vista, así que no dudes en poner tus habilidades sociales al servicio de la armonía. Es un buen momento para fortalecer relaciones y aclarar malentendidos.",
        cancer: "La armonía emocional estará presente. Relájate y disfruta de lo que te rodea. Es un día perfecto para dedicar tiempo a tu bienestar emocional y físico. Busca actividades que te llenen de paz, como la meditación o una caminata tranquila. Aprovecha para reconectar contigo mismo y tus seres queridos.",
        leo: "La confianza en ti mismo estará por las nubes. Es un buen momento para destacar en tu trabajo o proyectos personales. Tu presencia será magnética y las personas se sentirán atraídas por tus ideas y energía. No dudes en liderar y tomar decisiones importantes, pero recuerda ser humilde y escuchar las opiniones de los demás.",
        virgo: "Hoy tu mente estará especialmente aguda. Aprovecha para organizarte y dejar todo en orden, tanto en tu vida personal como profesional. Es un buen momento para hacer listas, establecer metas y comenzar nuevos proyectos. Asegúrate de no ser demasiado crítico contigo mismo, pues tu perfeccionismo podría frenarte en algún momento.",
        libra: "Hoy es un buen día para la introspección. Puede que te sientas más inclinado a evaluar tu vida desde una perspectiva más profunda. Aprovecha esta energía para reorganizar tus prioridades y reflexionar sobre tus relaciones y metas. En el ámbito personal, es un buen momento para resolver malentendidos con los demás. Si has estado en desacuerdo con alguien cercano, hoy puedes encontrar el momento adecuado para hablar con sinceridad y calidez. No tengas miedo de abrir tu corazón y mostrar vulnerabilidad.",
        escorpio: "Intensa energía en tu vida hoy. Asegúrate de canalizarla de forma positiva para no sentirte abrumado. Tienes la capacidad de transformar las situaciones a tu favor, pero es importante que no te dejes llevar por emociones extremas. Si surgen tensiones, busca el equilibrio y la calma interior antes de tomar decisiones importantes.",
        sagitario: "La aventura te llama. Es un buen momento para explorar nuevas oportunidades o tomar riesgos calculados. Tu espíritu libre y optimista está en su punto más alto, lo que te lleva a buscar nuevos horizontes. Sin embargo, antes de embarcarte en cualquier nueva travesía, asegúrate de tener un plan claro y de estar preparado para lo inesperado.",
        capricornio: "Hoy es un buen día para concentrarte en tus metas a largo plazo. La disciplina será clave, así que mantén tu enfoque en lo que realmente importa. Las decisiones que tomes hoy pueden tener un gran impacto en tu futuro, por lo que es importante que pienses con cuidado antes de actuar. No te distraigas con lo superficial; sigue tu camino con determinación.",
        acuario: "Las ideas innovadoras fluirán hoy. Aprovecha para ser creativo y pensar fuera de lo común. Tu mente estará llena de inspiración y nuevas perspectivas, así que no dudes en compartir tus ideas con los demás. Es un buen día para trabajar en proyectos que desafíen lo convencional y que te permitan explorar nuevas formas de hacer las cosas.",
        piscis: "La intuición estará a flor de piel. Confía en tus instintos, especialmente en temas relacionados con relaciones personales. Tu capacidad para percibir lo que no se dice será más fuerte que nunca, así que hazle caso a tus corazonadas. Es un buen momento para conectar con los demás a un nivel más profundo y para resolver conflictos emocionales que puedas estar llevando."
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