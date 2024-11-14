import {sticker} from "../lib/sticker";

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

const imagePath = randomImagePath;  // Asegúrate de que la ruta de la imagen sea correcta


// Leer la imagen y enviarla junto con la información de la canción
const imageBuffer = fs.readFileSync(imagePath);  // Leemos la imagen

let stiker = await sticker(imageBuffer);
await conn.sendFile(m.chat, stiker, 'sticker.webp', null, m, false)