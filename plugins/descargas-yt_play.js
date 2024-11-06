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

    let additionalText = '';
    if (command === 'play') {
        additionalText = '𝘼𝙐𝘿𝙄𝙊 🔊';
    } else if (command === 'play2') {
        additionalText = '𝙑𝙄𝘿𝙀𝙊 🎥';
    }

    let captionvid = `*Descargando . . . .*

  ${mid.smsYT1}
  ${yt_play[0].title}

  ${mid.smsYT5}
  » ${secondString(yt_play[0].duration.seconds)}

  ${mid.smsYT4}
  » ${yt_play[0].url}`;

    if (command === 'play') {
        try {
            const q = '128kbps';
            const v = yt_play[0].url;
            const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
            const dl_url = yt.audio[q].download();
            const ttl = yt.title;
            const size = yt.audio[q].fileSizeH;
            await conn.sendMessage(m.chat, {
                audio: { url: dl_url },
                fileName: `${ttl}.mp3`,
                mimetype: 'audio/mpeg'
            }, { quoted: m });
        } catch (error) {
            console.error('Error en la descarga de audio:', error);
            try {
                const dataRE = await fetch(`https://api.akuari.my.id/downloader/youtube?link=${yt_play[0].url}`);
                const dataRET = await dataRE.json();
                await conn.sendMessage(m.chat, {
                    audio: { url: dataRET.mp3[1].url },
                    fileName: `${yt_play[0].title}.mp3`,
                    mimetype: 'audio/mpeg'
                }, { quoted: m });
            } catch (error) {
                console.error('Error en el API de Akuari:', error);
            }
        }
    } else if (command === 'play2') {
        try {
            const q = '360p';
            const v = yt_play[0].url;
            const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
            const dl_url = yt.video[q].download();
            const ttl = yt.title;
            await conn.sendMessage(m.chat, {
                video: { url: dl_url },
                fileName: `${ttl}.mp4`,
                mimetype: 'video/mp4',
                caption: `╭━❰ ${wm} ❱━⬣\n┃ 💜 ${mid.smsYT1}\n┃ ${ttl}\n╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
                thumbnail: await fetch(yt.thumbnail)
            }, { quoted: m });
        } catch (error) {
            console.error('Error al descargar el video:', error);
            try {
                const mediaa = await ytMp4(yt_play[0].url);
                await conn.sendMessage(m.chat, {
                    video: { url: mediaa.result },
                    fileName: `${mediaa.title}.mp4`,
                    caption: `_${wm}_`,
                    thumbnail: mediaa.thumb,
                    mimetype: 'video/mp4'
                }, { quoted: m });
            } catch (error) {
                console.error('Error en el API de LolHuman para video:', error);
            }
        }
    }
};

handler.command = ['play', 'play2'];
handler.exp = 500;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    let arr = number.toString().split(".");
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join(".") : arr[0];
}

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

function bytesToSize(bytes) {
    return new Promise((resolve, reject) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return resolve('n/a');
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
    });
}

async function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async (getUrl) => {
            let result = [];
            for (let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.mimeType === 'audio/webm; codecs="opus"') {
                    let { contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = { audio: item.url, size: bytes };
                }
            }
            let resultFix = result.filter((x) => x.audio != undefined && x.size != undefined);
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({ title, result: tinyUrl, result2: resultFix, thumb });
        }).catch(reject);
    });
}

async function ytMp4(url) {
    return new Promise(async (resolve, reject) => {
        ytdl.getInfo(url).then(async (getUrl) => {
            let result = [];
            for (let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container === 'mp4' && item.hasVideo && item.hasAudio) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = { video: item.url, quality: qualityLabel, size: bytes };
                }
            }
            let resultFix = result.filter(
                (x) => x.video != undefined && x.size != undefined && x.quality != undefined
            );
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({ title, result: tinyUrl, rersult2: resultFix[0].video, thumb });
        }).catch(reject);
    });
}

