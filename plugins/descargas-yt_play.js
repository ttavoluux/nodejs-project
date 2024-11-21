import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import { MessageType } from '@adiwajshing/baileys';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    // Verificar si se ha ingresado un texto
    if (!text) return conn.reply(m.chat, `*Ingresa el nombre de la canción* .play name`);

    const yt_play = await search(args.join(' '));

    if (!yt_play || yt_play.length === 0) return m.reply('No se encontraron resultados para esa búsqueda.');

    const video = yt_play[0];
    const videoUrl = video.url;
    const videoTitle = video.title;
    const videoDuration = secondString(video.duration.seconds);
    const videoThumbnail = video.thumbnail;

    const textMessage = `*🎵 Canción: ${videoTitle} 🎵*\n` +
        `*⏱ Duración: ${videoDuration}*\n` +
        `*🔗 Enlace: ${videoUrl}*`;

    // Enviar detalles del video
    await conn.sendFile(m.chat, videoThumbnail, 'error.jpg', textMessage, m);

    if (command === 'play' || command === 'musica') {
        try {
            // Descargar el audio
            const audioStream = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' });
            const fileSize = await getFileSize(audioStream);

            if (fileSize > LimitAud) {
                await conn.sendMessage(m.chat, {
                    document: { url: videoUrl },
                    fileName: `${videoTitle}.mp3`,
                    caption: `🎶 Aquí está tu audio: ${videoTitle}`,
                    mimetype: 'audio/mpeg',
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    audio: { url: videoUrl },
                    mimetype: 'audio/mpeg',
                    ptt: true,
                }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await m.react('❌');
        }
    } else if (command === 'play2' || command === 'video') {
        try {
            // Descargar el video
            const videoStream = ytdl(videoUrl, { filter: 'videoonly', quality: 'highest' });
            const fileSize = await getFileSize(videoStream);

            if (fileSize > LimitVid) {
                await conn.sendMessage(m.chat, {
                    document: { url: videoUrl },
                    fileName: `${videoTitle}.mp4`,
                    caption: `🎬 Aquí está tu video: ${videoTitle}`,
                    mimetype: 'video/mp4',
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    fileName: `${videoTitle}.mp4`,
                    caption: `🎬 Aquí está tu video: ${videoTitle}`,
                    mimetype: 'video/mp4',
                    thumbnail: videoThumbnail,
                }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await m.react('❌');
        }
    }
};

// Función para realizar la búsqueda de videos en YouTube usando yts
async function search(query) {
    const searchResult = await yts(query);
    return searchResult.videos; // Devuelve la lista de videos encontrados
}

// Función para formatear el tiempo en segundos a formato legible
function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d === 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h === 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

// Función para obtener el tamaño del archivo
async function getFileSize(stream) {
    return new Promise((resolve, reject) => {
        let fileSize = 0;
        stream.on('data', chunk => {
            fileSize += chunk.length;
        });
        stream.on('end', () => resolve(fileSize));
        stream.on('error', reject);
    });
}

handler.help = ['play', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'audio', 'video'];

export default handler;


