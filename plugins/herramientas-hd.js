import FormData from "form-data";
import Jimp from "jimp";
import { sticker } from '../lib/sticker.js';

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Verifica si hay un mensaje citado o usa el mensaje actual
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";

        // Verifica que haya un tipo MIME y que sea compatible con imagen
        if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
        if (!/image\/(jpe?g|png)/.test(mime)) {
            throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;
        }

        // Obtener la imagen para crear el sticker (imagen28 debe estar definida o proporcionada por ti)
        let imagen28 = await someFunctionToGetImage28(); // Asegúrate de definir o proporcionar la imagen 28

        // Crear el sticker
        let stiker = await sticker(imagen28, false, global.packname, global.author);
        // Enviar el sticker
        await m.reply(conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false));

        // Descargar la imagen para mejorar la calidad (no la imagen para sticker)
        let img = await q.download?.();
        if (!img) throw "No se pudo descargar la imagen";

        // Llamar la función remini para mejorar la calidad de la imagen descargada
        let pr = await remini(img, "enhance");

        // Enviar la imagen mejorada
        conn.sendMessage(m.chat, { image: pr }, { quoted: m });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        throw "╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\n𝙁𝘼𝙇𝙇𝙊, 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍";
    }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["remini", "hd", "enhance"];
export default handler;

async function remini(imageData, operation) {
    return new Promise(async (resolve, reject) => {
        const availableOperations = ["enhance", "recolor", "dehaze"];
        if (availableOperations.includes(operation)) {
            operation = operation;
        } else {
            operation = availableOperations[0];
        }

        const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
        const formData = new FormData();
        formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
        formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });

        formData.submit({
            url: baseUrl,
            host: "inferenceengine.vyro.ai",
            path: "/" + operation,
            protocol: "https:",
            headers: {
                "User-Agent": "okhttp/4.9.3",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip"
            }
        }, function (err, res) {
            if (err) reject(err);
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                resolve(Buffer.concat(chunks));
            });
            res.on("error", function (err) {
                reject(err);
            });
        });
    });
}
