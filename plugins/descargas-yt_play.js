


import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

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
            console.error(e);
            await m.react('❌');
            await conn.reply(m.chat, `*Hubo un error al descargar el audio. Intenta con otro enlace.*`, m);
        }
    }

    // Comando de video
    if (['play2', 'video'].includes(command)) {
        if (!text) return conn.reply(m.chat, `*🤔Que está buscando? 🤔*\n*Ingrese el nombre del video*\n\n*Ejemplo:*\n#play emilia 420`, m);
        const yt_play = await search(args.join(' '));
        const texto1 = generateVideoText(yt_play[0]);

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null);
        try {
            await downloadAndSendVideo(yt_play[0].url, yt_play[0].title, yt_play[0].thumbnail, m, conn);
        } catch (e) {
            console.error(e);
            await m.react('❌');
            await conn.reply(m.chat, `*Hubo un error al descargar el video. Intenta con otro enlace.*`, m);
        }
    }

    // Comando de opciones de play
    if (['play3', 'play4'].includes(command)) {
        if (!text) return conn.reply(m.chat, `*🤔Que esta buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`, m);
        const yt_play = await search(args.join(' '));
        const texto1 = generateSongText(yt_play[0]);

        await conn.sendButton(m.chat, texto1, botname, yt_play[0].thumbnail, [
            ['Audio', `${usedPrefix}ytmp3 ${yt_play[0].url}`],
            ['Video', `${usedPrefix}ytmp4 ${yt_play[0].url}`],
            ['Más resultados', `${usedPrefix}yts ${text}`],
        ], null, null, m);
    }
};

handler.help = ['play', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video'];
handler.register = true;

export default handler;

// Funciones de utilidad

async function search(query, options = {}) {
    const result = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return result.videos;
}

function generateSongText(song) {
    return `*🎵 Canción: ${song.title} 🎵*\n*⏱ Duración: ${secondString(song.duration.seconds)}*\n*🔗 Enlace: ${song.url}`.trim();
}

function generateVideoText(video) {
    return `📌 *Título*: ${video.title}\n📆 *Publicado*: ${video.ago}\n⌚ *Duración*: ${secondString(video.duration.seconds)}\n_*Descargado su video, aguarde un momento...*_`.trim();
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

async function getBuffer(url) {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return Buffer.from(buffer);
    } catch (error) {
        console.error("Error al obtener el buffer", error);
        throw new Error("Error al obtener el buffer");
    }
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}

// Maneja la descarga de audio asegurando la menor calidad posible
async function downloadAndSendAudio(url, title, m, conn) {
    try {
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

        // Convertir a buffer y obtener el tamaño
        const audioBuffer = await streamToBuffer(audioStream);
        const fileSize = audioBuffer.length;

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
        throw new Error("Error al descargar el audio.");
    }
}

// Convierte un stream a un buffer
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

// Maneja la descarga de video
async function downloadAndSendVideo(url, title, thumbnail, m, conn) {
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
    const apiResponse = await fetch(apiUrl);
    const delius = await apiResponse.json();
    if (!delius.status) throw new Error("Error al descargar el video");

    const downloadUrl = delius.data.download.url;
    const fileSize = await getFileSize(downloadUrl);

    if (fileSize > LimitVid) {
        await conn.sendMessage(m.chat, {
            document: { url: downloadUrl },
            fileName: `${title}.mp4`,
            caption: `🔰 Aquí está tu video \n🔥 Título: ${title}`
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${title}.mp4`,
            caption: `🔰 Aquí está tu video \n🔥 Título: ${title}`,
            thumbnail,
            mimetype: 'video/mp4'
        }, { quoted: m });
    }
}




