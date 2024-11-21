const checkPreKeys = async (m, conn) => {
    try {
        // Obtiene todos los contactos del bot
        const contacts = Object.keys(conn.contacts);

        // Verifica cada contacto sin enviar mensajes
        for (let userJid of contacts) {
            try {
                // Intenta acceder al contacto para verificar la pre-key sin enviar un mensaje
                const contact = conn.contacts[userJid];

                // Si el contacto existe y está disponible, se considera que la pre-key está funcionando
                if (contact) {
                    console.log(`Pre-key válida para ${userJid}`);
                } else {
                    // Si no existe o está inactiva, eliminamos la pre-key
                    console.log(`Error con la pre-key de ${userJid}: Contacto no disponible`);
                    await conn.removeContact(userJid); // Elimina la pre-key corrupta
                    console.log(`Pre-key de ${userJid} eliminada.`);
                }
            } catch (error) {
                // Si ocurre algún error, la pre-key está corrupta
                console.log(`Error al verificar la pre-key de ${userJid}: ${error.message}`);
                await conn.removeContact(userJid); // Elimina la pre-key corrupta
                console.log(`Pre-key de ${userJid} eliminada.`);
            }
        }

        // Solo enviamos un mensaje de confirmación al administrador o quien ejecute el comando
        //await conn.sendMessage(m.chat, { text: "Verificación de las pre-keys completada." }, { quoted: m });
        console.log("Verificación de todas las pre-keys completada.");
    } catch (error) {
        console.error("Error al verificar las pre-keys:", error);
    }
};

// Integración con el comando checkprekeys
handler.command = ['checkprekeys'];
handler.help = ['checkprekeys'];
handler.tags = ['admin'];
handler.register = true;

handler.command = async (m, { conn }) => {
    // Llamamos a la función que verifica las pre-keys de todos los usuarios
    await checkPreKeys(m, conn);
};
