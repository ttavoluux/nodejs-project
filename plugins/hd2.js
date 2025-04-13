import Jimp from 'jimp';

const handler = async (m, {conn, usedPrefix, command}) => {
    let processingMessage;
    const statusMessages = [
        "🔍 Analizando calidad de imagen...",
        "🧹 Eliminando ruido digital...",
        "📏 Aumentando resolución (2x)...",
        "✨ Mejorando nitidez...",
        "🎨 Ajustando balance de colores...",
        "🛠️ Aplicando toques finales...",
        "✨Imagen Enviada correctamente 🖤"
    ];

    try {
        // Validación de la imagen
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (!mime) throw `*[❗] Responda a una imagen con ${usedPrefix + command}*`;
        if (!/image\/(jpe?g|png)/.test(mime)) throw `*[❗] Formato no soportado. Use JPG/PNG*`;

        processingMessage = await m.reply("*🚀 Iniciando mejora profesional de imagen...*");
        const img = await q.download?.();
        if (!img) throw "*[❗] Error al descargar imagen*";

        // Función para mostrar progreso
        const updateProgress = async (index) => {
            await conn.relayMessage(m.chat, {
                protocolMessage: {
                    key: processingMessage.key,
                    type: 14,
                    editedMessage: {
                        conversation: `*🔄 Progreso HD2:*\n${statusMessages.slice(0, index + 1).map(msg => `• ${msg}`).join('\n')}`
                    }
                }
            }, {});
        };

        // Procesamiento con actualizaciones de estado
        await updateProgress(0);
        let image = await Jimp.read(img);

        // 1. Reducción de ruido
        await updateProgress(1);
        image = await reduceNoise(image.clone());

        // 2. Aumento de resolución
        await updateProgress(2);
        image.resize(image.bitmap.width * 2, image.bitmap.height * 2, Jimp.RESIZE_BICUBIC);

        // 3. Mejora de nitidez
        await updateProgress(3);
        image.convolute([
            [ 0, -0.5,  0],
            [-0.5, 3, -0.5],
            [ 0, -0.5,  0]
        ]);

        // 4. Ajuste de colores
        await updateProgress(4);
        image.contrast(0.1);
        image.normalize();

        // 5. Toques finales
        await updateProgress(5);
        image.quality(95);

        // Resultado final
        await updateProgress(6);
        const enhancedImg = await image.getBufferAsync(Jimp.MIME_JPEG);

        await conn.sendMessage(m.chat, {
            image: enhancedImg,
            caption: `*✅ Imagen mejorada HD 2.0*

> 🌸Recuerda usar correctamente *ArletteBot Commutity Edition* ✨`
        }, {quoted: m});

    } catch (e) {
        console.error('Error en hd2:', e);
        if (processingMessage) {
            await conn.relayMessage(m.chat, {
                protocolMessage: {
                    key: processingMessage.key,
                    type: 14,
                    editedMessage: {
                        conversation: `*❌ Error en HD2*\n${e.message}`
                    }
                }
            }, {});
        }
    } finally {
        setTimeout(async () => {
            if (processingMessage) {
                try {
                    await processingMessage.delete();
                } catch (e) {}
            }
        }, 30000);
    }
};

// Función avanzada de reducción de ruido
async function reduceNoise(image) {
    // Aplicamos un desenfoque gaussiano controlado
    image.gaussian(1);

    // Kernel especial para preservar bordes mientras reduce ruido
    image.convolute([
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9]
    ]);

    // Ajuste fino para recuperar detalles
    image.convolute([
        [ 0, -0.2,  0],
        [-0.2, 1.8, -0.2],
        [ 0, -0.2,  0]
    ]);

    return image;
}

handler.help = ['hd2 [al responder imagen]'];
handler.tags = ['tools', 'image'];
handler.command = ['hd2', 'hq', 'highquality'];
export default handler;