import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, `*Ingresa el nombre de lo que buscas*`, m);
    }

    try {
        const yt_play = await search(args.join(' '));

        if (!yt_play.length) {
            return conn.reply(m.chat, `*No se encontraron resultados para: ${text}*`, m);
        }

        const video = yt_play[0];

        // Responder según el comando
        if (['play', 'musica'].includes(command)) {
            await conn.sendFile(m.chat, video.thumbnail, 'thumbnail.jpg', generateSongText(video), m);
            await downloadAndSendAudio(video.url, video.title, m, conn);
        } else if (['play2', 'video'].includes(command)) {
            await conn.sendFile(m.chat, video.thumbnail, 'thumbnail.jpg', generateVideoText(video), m);
            await downloadAndSendVideo(video.url, video.title, video.thumbnail, m, conn);
        } else if (['play3', 'play4'].includes(command)) {
            await conn.sendButton(m.chat, generateSongText(video), 'Opciones', video.thumbnail, [
                ['Audio', `${usedPrefix}ytmp3 ${video.url}`],
                ['Video', `${usedPrefix}ytmp4 ${video.url}`],
                ['Más resultados', `${usedPrefix}yts ${text}`]
            ], null, null, m);
        }

    } catch (e) {
        console.error(e);
        await m.react('❌');
        await conn.reply(m.chat, `*Hubo un error al procesar tu solicitud.*`, m);
    }
};

handler.help = ['play', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video'];
handler.register = true;

export default handler;

// Funciones de utilidad

async function search(query) {
    const result = await yts.search({ query, hl: 'es', gl: 'ES' });
    return result.videos;
}

function generateSongText(song) {
    return `🎵 *Canción*: ${song.title}\n⏱ *Duración*: ${formatDuration(song.duration.seconds)}\n🔗 *Enlace*: ${song.url}`;
}

function generateVideoText(video) {
    return `📌 *Título*: ${video.title}\n📆 *Publicado*: ${video.ago}\n⌚ *Duración*: ${formatDuration(video.duration.seconds)}\n_*Descargando el video...*_`;
}

function formatDuration(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [
        d > 0 ? `${d} día(s)` : '',
        h > 0 ? `${h} hora(s)` : '',
        m > 0 ? `${m} minuto(s)` : '',
        s > 0 ? `${s} segundo(s)` : ''
    ].join(', ') || '0 segundos';
}

async function getBuffer(url) {
    try {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        return Buffer.from(buffer);
    } catch (error) {
        console.error("Error al obtener el buffer", error);
        throw new Error("Error al obtener el buffer");
    }
}

async function getFileSize(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        const contentLength = res.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}

// Descargar y enviar audio
async function downloadAndSendAudio(url, title, m, conn) {
    try {
        const audioStream = ytdl(url, {
            quality: 'highestaudio',  // Obtener la mejor calidad de audio disponible
            filter: 'audioonly',
            highWaterMark: 1 << 25,   // Asegura buffer para alta calidad
        });

        const audioBuffer = await streamToBuffer(audioStream);
        const fileSize = audioBuffer.length;

        if (fileSize > LimitAud) {
            await conn.sendMessage(m.chat, {
                document: { url: audioBuffer },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg'
            }, { quoted: m });
        }
    } catch (error) {
        console.error("Error al descargar el audio", error);
        throw new Error("Error al descargar el audio.");
    }
}

// Convertir stream a buffer
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

// Descargar y enviar video
async function downloadAndSendVideo(url, title, thumbnail, m, conn) {
    try {
        const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
        const apiResponse = await fetch(apiUrl);
        const delius = await apiResponse.json();

        if (!delius.status) throw new Error("Error al obtener el video");

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
    } catch (error) {
        console.error("Error al descargar el video", error);
        throw new Error("Error al descargar el video.");
    }
}





