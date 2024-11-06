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
      aries: "Hoy es un buen día para tomar decisiones importantes. Tu energía estará en su punto máximo.",
      tauro: "Las cosas avanzarán lentamente, pero con paciencia llegarás a tu destino. Evita tomar riesgos.",
      geminis: "La comunicación será clave hoy. Aprovecha para resolver problemas pendientes con amigos y familiares.",
      cancer: "La armonía emocional estará presente. Relájate y disfruta de lo que te rodea.",
      leo: "La confianza en ti mismo estará por las nubes. Es un buen momento para destacar en tu trabajo o proyectos.",
      virgo: "Hoy tu mente estará especialmente aguda. Aprovecha para organizarte y dejar todo en orden.",
      libra: "El equilibrio será importante hoy. Tómate un tiempo para ti mismo y reflexiona sobre tus prioridades.",
      escorpio: "Intensa energía en tu vida hoy. Asegúrate de canalizarla de forma positiva para no sentirte abrumado.",
      sagitario: "La aventura te llama. Es un buen momento para explorar nuevas oportunidades o tomar riesgos calculados.",
      capricornio: "Hoy es un buen día para concentrarte en tus metas a largo plazo. La disciplina será clave.",
      acuario: "Las ideas innovadoras fluirán hoy. Aprovecha para ser creativo y pensar fuera de lo común.",
      piscis: "La intuición estará a flor de piel. Confía en tus instintos, especialmente en temas relacionados con relaciones personales."
    };
  
    // Obtenemos el horóscopo para el signo dado
    const horoscopo = horoscopos[text.toLowerCase()];
  
    // Construimos el mensaje
    const mensaje = `
    *Horóscopo del día para ${text.charAt(0).toUpperCase() + text.slice(1)}* ✨
    *Descripción:* ${horoscopo}
    `.trim();
  
    // Enviamos el horóscopo
    await conn.reply(m.chat, mensaje, m);
  };
  
  handler.help = ['horoscopo'];
  handler.tags = ['fun'];
  handler.command = /^horoscopo$/i;
  
  export default handler;
  
