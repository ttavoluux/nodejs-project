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
    if (command === 'play') {
        try {
            const quality = '128kbps';  // Definir calidad de audio

            // Intentar obtener el audio con @bochilteam/scraper (youtubedl o youtubedlv2)
            const yt = await youtubedl(videoUrl).catch(async (_) => await youtubedlv2(videoUrl));

            if (yt && yt.audio && yt.audio[quality]) {
                const dl_url = await yt.audio[quality].download();  // Obtener la URL de descarga del audio
                const ttl = yt.title;  // Obtener el título del video
                const size = yt.audio[quality].fileSizeH;  // Obtener el tamaño del archivo

                // Enviar el archivo de audio al chat
                await conn.sendMessage(m.chat, {
                    audio: { url: dl_url },
                    fileName: `${ttl}.mp3`,
                    mimetype: 'audio/mpeg'
                }, { quoted: m });
            } else {
                throw 'No se encontró el audio de la calidad solicitada.';
            }

        } catch (error) {
            console.error('Error al intentar obtener el audio:', error);

            // Si no se puede obtener el audio con @bochilteam/scraper, intentar con ytdl-core
            try {
                const info = await ytdl.getInfo(videoUrl);  // Obtener la información del video

                // Filtrar solo los formatos de audio
                const formats = ytdl.filterFormats(info.formats, 'audioonly');
                const audioUrl = formats.find(format => format.itag === 140)?.url || formats[0]?.url;

                // Verificar si la URL de audio es válida
                if (!audioUrl) {
                    throw 'No se pudo encontrar un formato de audio válido.';
                }

                // Enviar el archivo de audio al chat
                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    fileName: `${info.videoDetails.title}.mp3`,
                    mimetype: 'audio/mpeg'
                }, { quoted: m });

            } catch (error) {
                console.error('Error al obtener el audio con ytdl-core:', error);
                if (error.statusCode === 410) {
                    throw 'No se pudo acceder al audio de YouTube, el enlace podría haber caducado.';
                }
                throw 'No se pudo descargar el audio, intente nuevamente más tarde.';
            }
        }
    }
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

