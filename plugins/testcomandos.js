import FormData from "form-data";
import Jimp from "jimp";
import { sticker } from "../lib/sticker"; // Asumiendo que la función 'sticker' ya está implementada
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix, command, args}) => {
    try {
        // Obtenemos el mensaje citado o el mensaje original
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";

        // Validación de si el MIME es una imagen válida
        if (!mime) {
            throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
        }

        // Aseguramos que el archivo sea una imagen JPEG o PNG
        if (!/image\/(jpe?g|png)/.test(mime)) {
            throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;
        }

        // Lista de imágenes predefinidas
        const imagesArray = [];
        for (let i = 1; i <= 5; i++) {
            imagesArray.push(`./media/imagesloading/resp${i}.jpg`);
        }

        // Función para obtener una ruta aleatoria
        function getRandomImagePath(array) {
            const randomIndex = Math.floor(Math.random() * array.length); // Selecciona un índice aleatorio
            return array[randomIndex]; // Retorna la ruta de la imagen seleccionada
        }

        // Obtener una ruta aleatoria
        const randomImagePath = getRandomImagePath(imagesArray);

        // Crear el sticker desde la imagen seleccionada
        let stiker = await sticker(randomImagePath, randomImagePath, global.packname, global.author);
        await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false);

        // Descargar la imagen citada
        let img = await q.download?.();

        // Mejorar la imagen con la función 'remini'
        let pr = await remini(img, "enhance");
        conn.sendMessage(m.chat, { image: pr }, { quoted: m });

    } catch (error) {
        // Manejo de errores con mensajes claros
        console.error(error);
        throw "╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\n𝙁𝘼𝙇𝙇𝙊, 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍";
    }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["hddd"];
export default handler;

// Función de mejora de imagen usando una API externa (ejemplo con Vyro AI)
async function remini(imageData, operation) {
    return new Promise(async (resolve, reject) => {
        const availableOperations = ["enhance", "recolor", "dehaze"];
        if (!availableOperations.includes(operation)) {
            operation = availableOperations[0]; // Si el tipo de operación no es válido, usaremos 'enhance'
        }

        const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;

        const formData = new FormData();
        formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
        formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });

        formData.submit(
            {
                url: baseUrl,
                host: "inferenceengine.vyro.ai",
                path: "/" + operation,
                protocol: "https:",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
                    Connection: "Keep-Alive",
                    "Accept-Encoding": "gzip",
                },
            },
            function (err, res) {
                if (err) reject(err);
                const chunks = [];
                res.on("data", (chunk) => { chunks.push(chunk); });
                res.on("end", () => { resolve(Buffer.concat(chunks)); });
                res.on("error", (err) => { reject(err); });
            }
        );
    });
}
