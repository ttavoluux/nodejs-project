


import fetch from 'node-fetch';
import yts from 'yt-search';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';

// Configuramos el path de ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath.path);

const LimitAud = 725 * 1024 * 1024; // 700MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    // Comando de música
    if (['play', 'musica'].includes(command)) {
        if (!text) return conn.reply(m.chat, `*Ingresa el nombre de la canción* .play name`);
        const yt_play = await search(args.join(' '));
        const texto1 = generateSongText(yt_play[0]);

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null);
        try {
            await downloadAndSendAudio(yt_play[0].url, yt_play[0].title, m, conn);
        } catch (e) {
            await m.react('❌');
            console.error(e);
        }
    }
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = ['play', 'musica'];
handler.register = true;

export default handler;

// Funciones de utilidad

async function search(query) {
    const result = await yts.search({ query, hl: 'es', gl: 'ES' });
    return result.videos;
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

// Maneja la descarga de audio y lo convierte a Opus
async function downloadAndSendAudio(url, title, m, conn) {
    try {
        const audioStream = yts.stream(url, {
            quality: 'highestaudio',
            filter: 'audioonly',
        });

        // Convertir el stream de audio a Opus con ffmpeg
        const opusBuffer = await convertToOpus(audioStream);

        // Verifica si el tamaño del archivo es adecuado y envíalo
        const fileSize = opusBuffer.length;
        if (fileSize > LimitAud) {
            await conn.sendMessage(m.chat, {
                document: { url: opusBuffer },
                mimetype: 'audio/ogg',
                fileName: `${title}.opus`
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, {
                audio: opusBuffer,
                mimetype: 'audio/ogg',
                fileName: `${title}.opus`
            }, { quoted: m });
        }
    } catch (error) {
        console.error("Error al descargar el audio:", error);
        throw new Error("Error al descargar el audio.");
    }
}

// Convierte un stream de audio a Opus usando ffmpeg
async function convertToOpus(audioStream) {
    return new Promise((resolve, reject) => {
        const outputBuffer = [];

        // Usa ffmpeg para convertir el audio a Opus
        ffmpeg()
            .input(audioStream)
            .audioCodec('libopus') // Codec de audio Opus
            .format('ogg')  // Formato de salida OGG con Opus
            .on('data', (chunk) => outputBuffer.push(chunk))
            .on('end', () => resolve(Buffer.concat(outputBuffer)))
            .on('error', reject)
            .run();
    });
}
