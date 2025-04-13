import Jimp from "jimp";

let img1 = null;
let img2 = null;

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Comando i1 para la primera imagen
        if (command === 'i1') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
            if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;

            // Descargar la primera imagen
            img1 = await (m.quoted ? m.quoted.download() : m.download());
            m.reply("*✨ Primera imagen recibida. Ahora envía la segunda imagen con el comando .i2*");
        }

        // Comando i2 para la segunda imagen
        else if (command === 'i2') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
            if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;

            // Descargar la segunda imagen
            img2 = await (m.quoted ? m.quoted.download() : m.download());

            // Verificar si ya se recibió la primera imagen
            if (!img1) throw "*❌ No has enviado una primera imagen. Usa el comando .i1 para enviar la primera imagen*";

            // Usar Jimp para combinar las imágenes verticalmente
            const image1 = await Jimp.read(img1);
            const image2 = await Jimp.read(img2);

            // La altura total es la suma de las alturas de ambas imágenes
            const width = Math.min(image1.bitmap.width, image2.bitmap.width);  // El ancho será el más grande de las dos
            const height = image1.bitmap.height + image2.bitmap.height;  // La altura total es la suma de las alturas

            // Crear una nueva imagen con el tamaño adecuado
            const combined = new Jimp(width, height);
            // Recortar y ajustar la primera imagen al ancho más pequeño
            if (image1.bitmap.width > width) {
                const cropWidth = image1.bitmap.width - width; // Calcular la diferencia
                image1.crop(cropWidth / 2, 0, width, image1.bitmap.height); // Recortar el exceso desde los lados
            }

            // Recortar y ajustar la segunda imagen al ancho más pequeño
            if (image2.bitmap.width > width) {
                const cropWidth = image2.bitmap.width - width; // Calcular la diferencia
                image2.crop(cropWidth / 2, 0, width, image2.bitmap.height); // Recortar el exceso desde los lados
            }

            // Poner la primera imagen en la parte superior
            combined.composite(image1, 0, 0);

            // Poner la segunda imagen debajo de la primera
            combined.composite(image2, 0, image1.bitmap.height);

            // Convertir la imagen combinada a buffer y enviarla
            const buffer = await combined.getBufferAsync(Jimp.MIME_JPEG);
            await conn.sendMessage(m.chat, { image: buffer, caption: "✨ Aquí tienes tus imágenes unidas 💖🌸." }, { quoted: m });

            // Limpiar las imágenes para que no se acumulen
            img1 = null;
            img2 = null;
        }
    } catch (error) {
        m.reply(`╰⊱⚠️⊱ *ERROR* ⊱⚠️⊱╮\n\n${error}`);
    }
};

handler.help = ["i1", "i2"];
handler.tags = ["image"];
handler.command = /^(i1|i2)$/i;

export default handler;
