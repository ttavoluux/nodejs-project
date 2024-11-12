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
        aries: "Tu día de descanso hoy,  Aries, será ligeramente distinto a lo habitual. Circunstancias personales te llevarán a tener que echar una mano a alguna persona de tu casa, de tu familia, del círculo de tus amistades o de alguien a quien ves a diario. Has pasado una semana un poco agobiante y ahora la situación no parece mejorar mucho.",
        tauro: "Si te citan para mañana perfecto, pero si te quieren ver hoy mismo, sacúdete la pereza y  di también que sí. Puedes tener alguna duda porque este asunto te ha salido a través de una persona conocida que ha facilitado tu contacto. Si tu intuición te dice que lo aceptes ¡adelante! Y agradécele a este conocido el favor que te ha hecho, porque aunque no le veas a diario te ha demostrado que es un buen amigo.",
        geminis: "Estás deseando progresar, Géminis, que haya cambios positivos en tu vida y de hecho los hay, sobre todo en los últimos días. Algunos los has sabido apreciar pero otros no tanto. Hay algo que deseas mucho a diario y que hasta ahora no se ha materializado, pero hoy puede surgirte esta oportunidad.",
        cancer: "Hoy, Cáncer, tendrás la mente muy despejada y tu “parabólica” funcionará de maravilla. Sigue los dictados de tu intuición, que te pueden llevar directa hacia el éxito por caminos de lo más insospechado. Si percibes que estás más intuitiva que a diario, aprovéchalo y revisa aquellos temas en los que tenías dudas. Si hoy te viene alguna idea nueva a la cabeza, ten por seguro que es acertada.",
        leo: "Estás en buena forma, Leo, ya superados algunos problemillas de bajón energético que te han afectado casi a diario durante la semana, vuelves a tener salud y energía a raudales. Hoy se te nota en tu cara y en tu forma de hablar y de moverte. Precisamente por esto, porque eres la viva imagen de la fortaleza, hoy podrías recibir una llamada o una visita de alguien a quien aprecias que te contará un problema que no sabe resolver. ",
        virgo: "Virgo, hoy tendrás algún ratito para dedicarlo a cosas que a diario te interesan mucho y para las que no siempre tienes tiempo. Tal vez  te decidas a leer un libro, a estudiar o a poner sobre el papel algún proyecto de los que te rondan por la cabeza desde hace tiempo.",
        libra: "Tienes tendencia últimamente a evadirte de la vida real, Libra. Estás viendo a diario todo lo que concierne a tu propia vida como si fuera una película, con personajes ficticios. Y, claro, tú misma te montas el argumento, a tu medida, pero el film acaba siendo del género drama. Hoy has de abrir los ojos y darte cuenta de que no hay para tanto, que tus problemas tienen salidas, más de una.",
        escorpio: "A llegado el día en que puedes mejorar a niveles óptimos tu relación de pareja, Escorpio. Si has pasado por una etapa demasiado rutinaria o se te hacía pesado quedar con esa persona a diario o con mucha frecuencia, hoy esta sensación va a desaparecer.",
        sagitario: "Aunque estés cansada de la falta de reconocimiento, Sagitario, no es un buen sistema bajar el ritmo o dejar de preocuparte por tu trabajo. Haz acopio de paciencia o plantéate en serio un cambio de empleo.",
        capricornio: "Hoy no es un buen día para temas relacionados con los intereses económicos, Capricornio. No pongas tu dinerito en la mochila porque te podrían robar y tampoco pruebes en juegos de azar porque vas a perder con toda seguridad.",
        acuario: "Hoy has vuelto a ser tú misma, Acuario, se te han pasado esas neuras que te agobiaban a diario y estás en tu fase zen, relajada y tranquila, mucho más que a diario. Y ahora ves que todas las cosas tienen mejor solución cuando las piensas y las resuelves con calma.",
        piscis: "Pocas veces hay ocasión de empezar de nuevo prácticamente de cero en algunos temas que te han causado problemas y preocupaciones a diario, Piscis, pero hoy tu conjunción astral te brinda esta oportunidad como el mejor regalo. Hoy se producirá una situación que te hará reconducir tu vida."
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