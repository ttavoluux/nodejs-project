import fetch from 'node-fetch';

// Máximo número de intentos en caso de error 403
const MAX_RETRIES = 3;

const getAudioDownloadUrl = async (url) => {
    let attempt = 0;
    let downloadUrl = null;

    while (attempt < MAX_RETRIES && !downloadUrl) {
        try {
            // Intentar la primera API
            let res = await fetchWithHeaders(`https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`);
            let data = await res.json();
            if (data.status && data.data?.download?.url) {
                downloadUrl = data.data.download.url;
            }

            // Si no se encuentra, intentar con otra API
            if (!downloadUrl) {
                res = await fetchWithHeaders(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(url)}`);
                data = await res.json();
                if (data.status && data.result?.downloadUrl) {
                    downloadUrl = data.result.downloadUrl;
                }
            }

            // Intentar con otra API si no se encuentra en las anteriores
            if (!downloadUrl) {
                res = await fetchWithHeaders(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`);
                data = await res.json();
                if (data.result?.media?.mp3) {
                    downloadUrl = data.result.media.mp3;
                }
            }

            if (downloadUrl) {
                console.log("Audio descargado con éxito");
                return downloadUrl;
            } else {
                throw new Error('No se pudo obtener el enlace de descarga');
            }
        } catch (e) {
            console.error(`Error en el intento ${attempt + 1}: ${e.message}`);
            attempt++;

            // Si hemos intentado demasiadas veces, salimos con un mensaje de error
            if (attempt >= MAX_RETRIES) {
                console.error("Máximo número de intentos alcanzado. No se pudo obtener el audio.");
                throw e;  // Re-lanzar el error para que se maneje en el nivel superior
            }

            // Esperar unos segundos antes de reintentar
            await delay(2000); // 2 segundos de espera antes de intentar nuevamente
        }
    }
};

// Función de retardo para esperar antes de reintentar
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Función personalizada de fetch con cabeceras mejoradas
const fetchWithHeaders = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Accept': 'application/json',
            'Accept-Language': 'es-ES,es;q=0.9', // Asegura que el servidor acepte solicitudes en español
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


