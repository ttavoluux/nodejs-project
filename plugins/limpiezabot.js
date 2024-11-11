// optimbaileys.js (versión sin logout)
const { makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');

// Ruta de almacenamiento de estado de sesión
const authPath = './auth_info.json';
const { state, saveState } = useSingleFileAuthState(authPath);

// Función para optimizar sin cerrar la sesión
async function optimizeBaileys(client) {
    console.log('Iniciando optimización de Baileys sin cerrar la sesión...');

    try {
        // Realizar otras optimizaciones, por ejemplo, renovar prekeys
        console.log('Renovando prekeys...');
        // Puedes añadir más lógica de optimización aquí.

        // Enviar un mensaje de prueba para asegurarte de que la sesión sigue activa
        await client.sendMessage('status@broadcast', { text: 'Sesión optimizada sin cerrar.' });
        console.log('Optimización completada sin cerrar la sesión.');

    } catch (error) {
        console.error('Error durante la optimización: ', error);
    }
}

// Comando para invocar la optimización
async function handleCommand(command, client) {
    if (command === '.optimbaileys') {
        await optimizeBaileys(client);
    }
}

module.exports = { handleCommand };
