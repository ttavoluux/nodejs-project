let currentQuestion = null; // Variable para almacenar la pregunta actual
let gameActive = false; // Para saber si el juego está activo
let gameTimer = null; // Para almacenar el temporizador del juego
let winner = null; // Para almacenar al ganador (si hay uno)

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Preguntas y respuestas del juego (solo verdadero o falso)
    const preguntas = [
        {
            pregunta: "La fotosíntesis es el proceso por el cual las plantas producen su alimento utilizando luz solar.",
            respuestaCorrecta: "verdadero"
        },
        {
            pregunta: "El 14 de febrero se celebra el Día del Trabajo.",
            respuestaCorrecta: "falso"
        },
        {
            pregunta: "Gabriel García Márquez fue el autor de 'Cien años de soledad'.",
            respuestaCorrecta: "verdadero"
        },
        {
            pregunta: "Un agujero negro es una región en el espacio donde la gravedad es tan fuerte que nada puede escapar.",
            respuestaCorrecta: "verdadero"
        },
        {
            pregunta: "El Internet es solo una red de cables que conecta todos los países del mundo.",
            respuestaCorrecta: "falso"
        },
        {
            pregunta: "Pablo Picasso fue quien pintó la 'Guernica'.",
            respuestaCorrecta: "verdadero"
        },
        {
            pregunta: "El fútbol se originó en Francia.",
            respuestaCorrecta: "falso"
        },
    ];

    // Iniciar la trivia con el comando .verdaderofalso
    if (command === 'verdaderofalso') {
        if (gameActive) {
            return conn.reply(m.chat, '¡Ya hay una trivia en curso! Espera a que termine.', m);
        }

        const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
        currentQuestion = preguntaAleatoria; // Guardamos la pregunta actual
        winner = null; // Reseteamos el ganador al iniciar un nuevo juego
        gameActive = true; // Marcamos el juego como activo

        // Formateamos el mensaje para que la pregunta y opciones estén bien ordenadas
        const mensaje = `
*Pregunta:* ${preguntaAleatoria.pregunta}
*Opciones:*
1. Verdadero
2. Falso

Responde con el comando ${usedPrefix}resp [verdadero o falso]. 
Ejemplo: ${usedPrefix}resp verdadero
`;

        conn.reply(m.chat, mensaje, m);

        // Establecemos un temporizador de 30 segundos para finalizar el juego
        gameTimer = setTimeout(() => {
            if (!winner) {
                conn.reply(m.chat, `El tiempo ha expirado y nadie ha respondido correctamente. El juego ha terminado. 😞`, m);
            }
            gameActive = false; // Desactivamos el juego
            currentQuestion = null; // Limpiamos la pregunta
        }, 30000); // 30 segundos
    }

    // Responder con el comando .resp
    if (command === 'resp') {
        if (!gameActive) {
            return conn.reply(m.chat, `¡No hay una trivia activa! Usa el comando ${usedPrefix}verdaderofalso para comenzar el juego.`, m);
        }

        if (!text) {
            return conn.reply(m.chat, `Por favor, responde con "verdadero" o "falso". Ejemplo: ${usedPrefix}resp verdadero`, m);
        }

        if (winner) {
            return conn.reply(m.chat, `¡El juego ya ha terminado! ${winner} ha ganado el diamante. 🎉`, m);
        }

        const respuestaUsuario = text.trim().toLowerCase();
        const respuestaCorrecta = currentQuestion.respuestaCorrecta.toLowerCase();

        // Verificamos si la respuesta del usuario es válida (verdadero o falso)
        if (respuestaUsuario === "verdadero" || respuestaUsuario === "falso") {
            if (respuestaUsuario === respuestaCorrecta) {
                winner = m.sender; // El jugador que respondió correctamente es el ganador
                clearTimeout(gameTimer); // Detenemos el temporizador
                conn.reply(m.chat, `¡Correcto! La respuesta es ${respuestaCorrecta.charAt(0).toUpperCase() + respuestaCorrecta.slice(1)}. 🎉 ${m.pushName} ha ganado el juego y recibe un diamante. 💎`, m);
                // Otorgamos el diamante al ganador
                global.db.data.users[m.sender].limit += 1;
                gameActive = false; // Terminamos el juego
                currentQuestion = null; // Limpiamos la pregunta
            } else {
                return conn.reply(m.chat, `¡Incorrecto! La respuesta correcta era "${respuestaCorrecta}". 😞`, m);
            }
        } else {
            return conn.reply(m.chat, `Por favor, responde con "verdadero" o "falso". Ejemplo: ${usedPrefix}resp verdadero`, m);
        }
    }
};

handler.command = ['verdaderofalso', 'resp']; // Comandos para iniciar la trivia y para responder
handler.help = ['verdaderofalso', 'resp']; // Ayuda para ambos comandos
handler.tags = ['juegos']; // Etiqueta de juegos

export default handler;