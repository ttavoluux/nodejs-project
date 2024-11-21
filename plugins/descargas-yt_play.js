import fetch from 'node-fetch';
import yts from 'yt-search';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {

    if (command == 'play' || command == 'musica') {
        if (!text) return conn.reply(m.chat, `*Ingresa el nombre de la canción* .play name`);

        const yt_play = await search(args.join(' '));
        const texto1 = `*🎵 Canción: ${yt_play[0].title} 🎵*\n` +
            `*⏱ Duración: ${secondString(yt_play[0].duration.seconds)}*\n` +
            `*🔗 Enlace: ${yt_play[0].url}*`.trim();

        await conn.sendFile(m.chat, imagen7, 'error.jpg', texto1, m, null);

        try {
            // Intentar obtener el audio con diferentes APIs
            const downloadUrl = await getAudioDownloadUrl(yt_play[0].url);
            if (!downloadUrl) return m.react("❌");

            const fileSize = await getFileSize(downloadUrl);

            if (fileSize > LimitAud) {
                await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
            }
        } catch (e) {
            await m.react("❌");
            console.error("Error al intentar obtener el audio:", e);
        }
    }
};

// Función que maneja múltiples APIs para obtener el enlace de descarga del audio
const getAudioDownloadUrl = async (url) => {
    try {
        let downloadUrl = null;

        // Intentar la primera API
        let res = await fetchWithHeaders(`https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`);
        let data = await res.json();
        if (data.status && data.data?.download?.url) {
            downloadUrl = data.data.download.url;
        }

        if (!downloadUrl) {
            // Si falló la primera API, intentar otra
            res = await fetchWithHeaders(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(url)}`);
            data = await res.json();
            if (data.status && data.result?.downloadUrl) {
                downloadUrl = data.result.downloadUrl;
            }
        }

        if (!downloadUrl) {
            // Intentar una tercera API
            res = await fetchWithHeaders(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`);
            data = await res.json();
            if (data.result?.media?.mp3) {
                downloadUrl = data.result.media.mp3;
            }
        }

        return downloadUrl;
    } catch (e) {
        console.error("Error al obtener el enlace de descarga:", e);
        return null;
    }
};

// Función personalizada de fetch con cabecera (User-Agent) que intenta evitar el bloqueo 403
const fetchWithHeaders = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36', // User-Agent de navegador
            'Accept': 'application/json', // Especificar que queremos respuestas en formato JSON
            'Accept-Language': 'es-ES,es;q=0.9', // Solicitar respuestas en español
            'Connection': 'keep-alive', // Mantener la conexión abierta si es necesario
            'Upgrade-Insecure-Requests': '1' // Permitir solicitudes no seguras
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        throw error;
    }
};

// Función de búsqueda de videos
async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

// Función para convertir los segundos en un formato de tiempo legible
function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

// Función para obtener el tamaño del archivo
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

handler.help = ['play', 'musica'];
handler.tags = ['downloader'];
handler.command = ['play', 'musica'];
handler.register = true;
export default handler;


