import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fs from 'fs'; // Necesitamos 'fs' para leer archivos locales

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    // Si no se especifica una búsqueda, muestra un mensaje de error.
    if (!text) {
        throw `Por favor, ingresa el nombre de la canción o el enlace de YouTube.\nEjemplo: ${usedPrefix + command} Billie Eilish - Bellyache`;
    }

    // Buscar el video en YouTube
    let yt_play;
    let videoUrl = '';  // Definir la variable videoUrl al principio

    try {
        yt_play = await search(args.join(" "));
        videoUrl = yt_play[0].url;  // Asignar el URL del video encontrado
    } catch (e) {
        console.error(e);
        throw 'Error al buscar el video.';
    }

    // Título, duración y URL del video encontrado
    let infocancion = `*🎵 Canción: ${yt_play[0].title} 🎵*\n` +
        `*⏱ Duración: ${secondString(yt_play[0].duration.seconds)}*\n` +
        `*🔗 Enlace: ${yt_play[0].url}*`;

    // Ruta de la imagen
    const imagePath = './media/menus/img6.jpg';  // Asegúrate de que la ruta de la imagen sea correcta

    // Verificar si el archivo de la imagen existe
    if (!fs.existsSync(imagePath)) {
        throw 'La imagen no se encuentra en la carpeta especificada.';
    }

    // Leer la imagen y enviarla junto con la información de la canción
    const imageBuffer = fs.readFileSync(imagePath);  // Leemos la imagen

    // Enviar la imagen con la información de la canción
    await conn.sendFile(m.chat, imageBuffer, 'imagen10', infocancion, m);

    // Comando para enviar solo audio
    if (command == 'play' || command == 'musica') {
        if (!text) return conn.reply(m.chat, `*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
        const yt_play = await search(args.join(' '));
        const ytplay2 = await yts(text);

        //await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake);
        try {
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) return m.react("❌");
            const downloadUrl = delius.data.download.url;
            const fileSize = await getFileSize(downloadUrl);
            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
            if (fileSize > LimitAud) return await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
        } catch (e1) {
            try {
                const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`)
                const audioData = await res.json()

                if (audioData.status && audioData.result?.downloadUrl) {
                    await conn.sendMessage(m.chat, { audio: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
                }
            } catch (e2) {
                try {
                    let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
                    let dp = await d2.json();
                    const audiop = await getBuffer(dp.result.media.mp3);
                    const fileSize = await getFileSize(dp.result.media.mp3);
                    await conn.sendMessage(m.chat, { audio: { url: audiop }, mimetype: 'audio/mpeg' }, { quoted: m });
                    if (fileSize > LimitAud) return await conn.sendMessage(m.chat, { document: { url: audiop }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
                } catch (e3) {
                    await m.react('❌');
                    console.log(e3);
                }}}}
};

// Configurar el comando que activará la función
handler.command = ['play'];  // Aquí puedes agregar más comandos o alias
handler.exp = 500;  // Establece la experiencia que se ganará al usar el comando

handler.limit = 1;
export default handler;

// Función de búsqueda de YouTube
async function search(query) {
    const results = await yts.search(query);
    return results.videos;  // Retorna los videos encontrados
}

// Función para convertir segundos en formato de tiempo legible
function secondString(seconds) {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`;
}

