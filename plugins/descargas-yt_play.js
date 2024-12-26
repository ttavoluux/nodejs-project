import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const LimitAud = 725 * 1024 * 1024; // 700MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (['play', 'musica'].includes(command)) {
        if (!text) return conn.reply(m.chat, `*Ingresa el nombre de la canción* .play name`);

        // Buscar el video en YouTube
        const yt_play = await search(args.join(' '));
        if (!yt_play || yt_play.length === 0) {
            return conn.reply(m.chat, `*No se encontraron resultados para:* ${args.join(' ')}`, m);
        }

        const texto1 = generateSongText(yt_play[0]);
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null);

        try {
            // Intentar descargar y enviar el audio
            await downloadAndSendAudio(yt_play[0].url, yt_play[0].title, m, conn);
        } catch (e) {
            console.error('Error al descargar el audio:', e);
            await m.react('❌');
            await conn.reply(m.chat, `*Hubo un error al descargar el audio. Detalles:* ${e.message}`, m);
        }
    }
};

handler.help = ['play', 'musica'];
handler.tags = ['downloader'];
handler.command = ['play', 'musica'];

export default handler;

// Funciones de utilidad

async function search(query, options = {}) {
    try {
        const result = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
        return result.videos;
    } catch (e) {
        console.error("Error al buscar el video en YouTube:", e);
        throw new Error("Error al buscar el video en YouTube");
    }
}

function generateSongText(song) {
    return `*🎵 Canción: ${song.title} 🎵*\n*⏱ Duración: ${secondString(song.duration.seconds)}*\n*🔗 Enlace: ${song.url}`.trim();
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [
        d > 0 ? `${d} día(s), ` : '',
        h > 0 ? `${h} hora(s), ` : '',
        m > 0 ? `${m} minuto(s), ` : '',
        s > 0 ? `${s} segundo(s)` : ''
    ].join('');
}

async function downloadAndSendAudio(url, title, m, conn) {
    try {
        console.log("Intentando descargar el audio desde:", url);

        // Obtener el stream de audio
        const audioStream = ytdl(url, {
            quality: 'highestaudio', // Obtener la mayor calidad de audio disponible
            filter: 'audioonly',     // Solo audio
            highWaterMark: 1 << 25,  // Buffer más grande para evitar interrupciones
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.5',
                }
            }
        });

        // Verificar si el stream está funcionando
        audioStream.on('info', (info) => {
            console.log(`Información del stream de audio: ${info}`);
        });

        // Convertir el stream a un buffer
        const audioBuffer = await streamToBuffer(audioStream);
        const fileSize = audioBuffer.length;

        console.log("Tamaño del archivo de audio:", fileSize);

        // Verificar si el archivo es adecuado
        if (fileSize <= LimitAud) {
            // Enviar como archivo de audio compatible con WhatsApp
            await conn.sendMessage(m.chat, {
                audio: audioBuffer,
                mimetype: 'audio/ogg', // WhatsApp usa 'audio/ogg' para mensajes de voz
                ptt: true, // Esto lo hace un mensaje de voz (push-to-talk)
            }, { quoted: m });
        } else {
            // Enviar como documento si el archivo es demasiado grande
            await conn.sendMessage(m.chat, {
                document: { url: audioBuffer },
                mimetype: 'audio/ogg',
                fileName: `${title}.ogg`
            }, { quoted: m });
        }

    } catch (error) {
        console.error("Error al descargar el audio:", error);
        throw new Error("Error al descargar el audio: " + error.message);
    }
}

// Convierte un stream a un buffer
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (err) => {
            console.error('Error en el stream:', err);
            reject(err);
        });
    });
}





