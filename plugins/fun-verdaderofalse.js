let currentQuestion = null; // Variable para almacenar la pregunta actual
let gameActive = false; // Para saber si el juego está activo
let gameTimer = null; // Para almacenar el temporizador del juego
let winner = null; // Para almacenar al ganador (si hay uno)
let selectedCategory = null; // Almacena la categoría seleccionada por el jugador

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Preguntas organizadas por categorías
    const preguntas = {
        matematicas: [
            {
                pregunta: "El resultado de 5 + 3 es 8.",
                respuestaCorrecta: "verdadero"
            },
            {
                pregunta: "El número Pi es aproximadamente 3.4.",
                respuestaCorrecta: "falso"
            },
            {
                pregunta: "El área de un círculo es igual a pi multiplicado por el radio al cuadrado.",
                respuestaCorrecta: "verdadero"
            },
            {
                pregunta: "La raíz cuadrada de 16 es 4.",
                respuestaCorrecta: "verdadero"
            }
        ],
        quimica: [
            {
                pregunta: "El agua tiene la fórmula H2O.",
                respuestaCorrecta: "verdadero"
            },
            {
                pregunta: "El oxígeno es un gas noble.",
                respuestaCorrecta: "falso"
            },
            {
                pregunta: "El oro es un metal que no se oxida fácilmente.",
                respuestaCorrecta: "verdadero"
            },
            {
                pregunta: "Los átomos de hidrógeno tienen 2 protones.",
                respuestaCorrecta: "falso"
            }
        ],
        anime: [
            {
                pregunta: "Naruto Uzumaki es el protagonista del anime 'Naruto'.",
                respuestaCorrecta: "verdadero"
            },
            {
                pregunta: "En el anime 'Dragon Ball Z', Goku tiene una hermana llamada Raditz.",
                respuestaCorrecta: "falso"
            },
            {
                pregunta: "El personaje de Luffy es el protagonista de 'One Piece'.",
                respuestaCorrecta: "verdadero"
            },
            {
                pregunta: "En 'Attack on Titan', los titanes son seres humanos.",
                respuestaCorrecta: "falso"
            }
        ]
    };

    // Iniciar la trivia con el comando .verdaderofalso
    if (command === 'verdaderofalso') {
        if (gameActive) {
            return conn.reply(m.chat, '¡Ya hay una trivia en curso! Espera a que termine.', m);
        }

        // Crear botones para seleccionar la categoría
        const buttonMessage = {
            text: "¡Elige una categoría para comenzar el juego!",
            footer: "Selecciona una categoría para comenzar:",
            buttons: [
                { buttonId: `${usedPrefix}categoria matematicas`, buttonText: { displayText: "Matemáticas" }, type: 1 },
                { buttonId: `${usedPrefix}categoria quimica`, buttonText: { displayText: "Química" }, type: 1 },
                { buttonId: `${usedPrefix}categoria anime`, buttonText: { displayText: "Anime" }, type: 1 }
            ],
            headerType: 1
        };
        return conn.reply(m.chat, buttonMessage, m);
    }

    // Selección de categoría
    if (command.startsWith('categoria')) {
        if (gameActive) {
            return conn.reply(m.chat, '¡Ya hay una trivia en curso! Espera a que termine.', m);
        }

        const categoria = command.split(' ')[1];
        if (!preguntas[categoria]) {
            return conn.reply(m.chat, 'Categoría no válida. Elige entre: matematicas, quimica, anime.', m);
        }

        selectedCategory = categoria; // Guardamos la categoría seleccionada
        const preguntaAleatoria = preguntas[categoria][Math.floor(Math.random() * preguntas[categoria].length)];
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

        // Verificar que el texto sea una respuesta válida
        if (!text || (text.toLowerCase() !== "verdadero" && text.toLowerCase() !== "falso")) {
            return conn.reply(m.chat, `Por favor, responde con "verdadero" o "falso". Ejemplo: ${usedPrefix}resp verdadero`, m);
        }

        if (winner) {
            return conn.reply(m.chat, `¡El juego ya ha terminado! ${winner} ha ganado el diamante. 🎉`, m);
        }

        const respuestaUsuario = text.trim().toLowerCase();
        const respuestaCorrecta = currentQuestion.respuestaCorrecta.toLowerCase();

        // Verificamos si la respuesta del usuario es válida (verdadero o falso)
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
    }
};

handler.command = ['verdaderofalso', 'resp', 'categoria']; // Comandos para iniciar la trivia y para responder
handler.help = ['verdaderofalso', 'resp', 'categoria']; // Ayuda para todos los comandos
handler.tags = ['juegos']; // Etiqueta de juegos

export default handler;
