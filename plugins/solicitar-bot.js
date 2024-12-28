let solicitarBotHandler = async (m, { conn }) => {
    try {
        const formulario = `
📝 **Formulario para Solicitar el Bot:**

Si deseas obtener el bot, por favor, responde a las siguientes preguntas para procesar tu solicitud:

1. **Nombre completo**:
   (Escribe tu nombre completo)

2. **Número de WhatsApp (incluye el código de país)**:
   (Escribe tu número completo)

3. **Nombre del grupo donde deseas usar el bot**:
   (Indica el nombre del grupo en el cual usarás el bot)

4. **¿Cuántos miembros tiene el grupo?**:
   (Escribe el número de miembros activos en el grupo. *Recuerda que deben ser al menos 5*)

5. **¿Por qué quieres usar el bot en tu grupo?**:
   (Indica brevemente el propósito de usar el bot)

6. **¿Tienes alguna sugerencia o solicitud especial para el bot?**:
   (Si tienes alguna sugerencia o necesitas funciones específicas, escríbelo aquí)

Recuerda que para adquirir el bot, tu grupo debe tener al menos 5 integrantes activos y cumplir con otros requisitos.

Una vez que envíes tus respuestas, te contactaremos para continuar con el proceso. 😊
        `;

        // Enviar el formulario como un mensaje de texto
        await conn.reply(m.chat, formulario, m);
    } catch (e) {
        console.log('Error:', e);
    }
}

solicitarBotHandler.command = /^(solicitarbot)$/i; // Este es el comando para solicitar el bot

export { solicitarBotHandler };
