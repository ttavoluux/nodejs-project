const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Verifica si existe package.json en el directorio actual
if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
  console.log("No se encuentra package.json en este directorio. Asegúrate de estar en la ruta correcta.");
  process.exit(1);
}

// Función para ejecutar comandos de forma sincrónica
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el comando: ${command}\n${stderr}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

// Ejecutar npm install y luego npm run qr
async function deploy() {
  try {
    // Ejecutar npm install
    await runCommand('npm install', 'Instalando dependencias');

    // Ejecutar npm run qr
    await runCommand('npm run qr', 'Ejecutando npm run qr');

    console.log('El despliegue se completó con éxito.');
  } catch (error) {
    console.error('Hubo un error durante el proceso de despliegue.');
    process.exit(1);
  }
}

// Ejecutar el despliegue
deploy();

