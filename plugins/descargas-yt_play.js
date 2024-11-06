import fetch from "node-fetch";
import yts from "yt-search";
import ytdl from "ytdl-core";
import axios from "axios";
import { youtubedl, youtubedlv2 } from "@bochilteam/scraper";

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        throw `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`;
    }

    let yt_play;
    try {
        yt_play = await search(args.join(" "));
    } catch (e) {
        console.error(e);
        throw 'Error al buscar el video.';
    }

    let captionvid = `*Descargando . . . .*

  ${mid.smsYT1}
  ${yt_play[0].title}

  ${mid.smsYT5}
  » ${secondString(yt_play[0].duration.seconds)}

  ${mid.smsYT4}
  » ${yt_play[0].url}`;

    // Comando para enviar solo audio
    if (command === 'play') {
        try {
            const q = '128kbps';  // Definir calidad de audio
            const v = yt_play[0].url;
            const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v)); // Intentar usar `youtubedl` o `youtubedlv2`
            const dl_url = yt.audio[q].download(); // Obtener la URL de descarga del audio
            const ttl = yt.title; // Título del video
            const size = yt.audio[q].fileSizeH; // Tamaño del archivo

            // Enviar el archivo de audio al chat
            await conn.sendMessage(m.chat, {
                audio: { url: dl_url },
                fileName: `${ttl}.mp3`,
                mimetype: 'audio/mpeg'
            }, { quoted: m });

        } catch (error) {
            console.error('Error en la descarga de audio:', error);

            // Si no se puede descargar desde `youtubedl`, intentar usar otro servicio
            try {
                const dataRE = await fetch(`https://api.akuari.my.id/downloader/youtube?link=${yt_play[0].url}`);
                const dataRET = await dataRE.json();

                if (dataRET.mp3 && dataRET.mp3[1] && dataRET.mp3[1].url) {
                    // Si el servicio de Akuari retorna un enlace de audio válido
                    await conn.sendMessage(m.chat, {
                        audio: { url: dataRET.mp3[1].url },
                        fileName: `${yt_play[0].title}.mp3`,
                        mimetype: 'audio/mpeg'
                    }, { quoted: m });
                } else {
                    throw 'No se encontró audio disponible en Akuari.';
                }
            } catch (error) {
                console.error('Error al obtener el enlace desde Akuari:', error);

                // Intentar una tercera opción usando LolHuman
                try {
                    let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=YOUR_API_KEY&query=${yt_play[0].title}`);
                    let lolh = await lolhuman.json();

                    if (lolh.result && lolh.result.link) {
                        await conn.sendMessage(m.chat, {
                            audio: { url: lolh.result.link },
                            fileName: `${yt_play[0].title}.mp3`,
                            mimetype: 'audio/mpeg'
                        }, { quoted: m });
                    } else {
                        throw 'No se pudo obtener el audio de LolHuman.';
                    }
                } catch (error) {
                    console.error('Error al obtener el enlace desde LolHuman:', error);
                    throw 'Error al obtener el audio, intente nuevamente más tarde.';
                }
            }
        }
    }
};

handler.command = ['play']; // El comando que activará este script
handler.exp = 500;  // La experiencia que se ganará al usar este comando

export default handler;

// Función de búsqueda de YouTube
async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

// Función para convertir bytes a tamaño legible
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

// Función para convertir segundos en formato de tiempo
function secondString(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " día, " : " días, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

