import FormData from "form-data";
import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, command}) => {
    try {
        // Verificar y obtener la imagen
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
        if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;

        m.reply("> *HD+ By ArletteBot 🖤* ... \n\n*(Mejorando imagen, prodria tardar hasta 1 min)*");
        let img = await q.download?.();

        // Procesar la imagen con la nueva API
        let pr = await enhanceImage(img);
        //conn.sendMessage(m.chat, {image: pr}, {quoted: m});
        await conn.sendMessage(m.chat, {
            image: pr,
            caption: `*> ✅ HD+ By ArletteBot 🖤*

> 🌸Recuerda usar correctamente *ArletteBot Commutity Edition* ✨`
        }, {quoted: m});
    } catch (e) {
        console.error(e);
        throw "╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\n𝙁𝘼𝙇𝙇𝙊, 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍";
    }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["remini", "hd", "enhance"];
export default handler;

async function enhanceImage(imageData) {
    const formData = new FormData();
    formData.append('image', imageData, {
        filename: 'image.jpg',
        contentType: 'image/jpeg'
    });

    try {
        const response = await fetch('https://api.vyro.ai/v2/image/enhance', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer vk-XJexcxaDN0juxE2nZrLl3UiQ3hE1ZZgHdNDnJAbWwx3qu', // Reemplaza con tu API key real
                ...formData.getHeaders()
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return await response.buffer();
    } catch (error) {
        console.error('Error in enhanceImage:', error);
        throw error;
    }
}