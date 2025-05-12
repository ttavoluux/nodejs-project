import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const LimitAud = 725 * 1024 * 1024 // 700MB
const LimitVid = 425 * 1024 * 1024 // 425MB

/**
 * Descarga un video o audio de YouTube usando yt-dlp
 * @param {string} link - Enlace del video de YouTube
 * @param {string} formato - Formato de descarga ('mp3' o 'mp4')
 * @param {string} folder - Carpeta de destino personalizada (opcional)
 */
async function descargarVideoYouTube(link, formato, folder = null) {
    // Validar el formato
    if (formato !== 'mp3' && formato !== 'mp4') {
        throw new Error('Formato no válido. Usa "mp4" o "mp3".')
    }

    // Definir el directorio de destino
    const dirBase = folder || (formato === 'mp3' ? 'musica' : 'videos')
    const outputDir = path.join(process.cwd(), dirBase)

    // Crear el directorio si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // Configurar los argumentos para yt-dlp
    const formatArg = formato === 'mp3' ? 'bestaudio' : 'best'
    const outputPath = path.join(outputDir, '%(title)s.%(ext)s')

    return new Promise((resolve, reject) => {
        const ytdlp = spawn('yt-dlp', [
            '--cookies',
            'cookies.txt',
            '-f',
            formatArg,
            '-o',
            outputPath,
            link
        ])

        let output = ''
        let errorOutput = ''
        let filePath = ''

        ytdlp.stdout.on('data', (data) => {
            const strData = data.toString()
            output += strData

            // Extraer la ruta del archivo del output
            const match = strData.match(/\[download\] Destination: (.+)/)
            if (match) {
                filePath = match[1]
            }
        })

        ytdlp.stderr.on('data', (data) => {
            errorOutput += data.toString()
        })

        ytdlp.on('close', (code) => {
            if (code === 0) {
                // Buscar el archivo descargado si no se capturó del output
                if (!filePath) {
                    const files = fs.readdirSync(outputDir)
                    const latestFile = files.reduce((prev, curr) => {
                        const prevStat = fs.statSync(path.join(outputDir, prev))
                        const currStat = fs.statSync(path.join(outputDir, curr))
                        return prevStat.mtimeMs > currStat.mtimeMs ? prev : curr
                    })
                    filePath = path.join(outputDir, latestFile)
                }

                resolve({
                    success: true,
                    message: `Descarga completada en la carpeta: ${dirBase}`,
                    path: outputDir,
                    filePath: filePath,
                    fileName: path.basename(filePath)
                })
            } else {
                reject(new Error(`Error al descargar: ${errorOutput || `Código ${code}`}`))
            }
        })
    })
}

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
    if (!text) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`, m)

    try {
        const yt_play = await search(args.join(' '))
        const ytplay2 = await yts(text)
        const texto1 = `*🎶 ${yt_play[0].title} 🎶*\n*-* ${yt_play[0].author.name}\n🔗 *Enlace:* ${yt_play[0].url}`.trim()
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null)

        if (command == 'play' || command == 'audio') {
            // Descargar como MP3
            try {
                const result = await descargarVideoYouTube(yt_play[0].url, 'mp3')

                // Enviar el audio con el formato específico
                const audioPath = result.filePath
                const audioUrl = `${audioPath}`

                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    fileName: `error.mp3`,
                    mimetype: 'audio/mp4',
                    contextInfo: {
                        externalAdReply: {
                            title: yt_play[0].title,
                            body: yt_play[0].author.name,
                            thumbnailUrl: yt_play[0].thumbnail,
                            sourceUrl: yt_play[0].url
                        }
                    }
                }, { quoted: m })

                // Eliminar el archivo después de enviarlo (opcional)
                fs.unlinkSync(audioPath)

            } catch (e) {
                await conn.reply(m.chat, `❌ Error al descargar/enviar el audio: ${e.message}`, m)
            }
        }

        if (command == 'play2' || command == 'video') {
            // Descargar como MP4
            try {
                const result = await descargarVideoYouTube(yt_play[0].url, 'mp4')
                // Verificar el tamaño del video antes de enviar
                const stats = fs.statSync(result.filePath)
                if (stats.size > LimitVid) {
                    fs.unlinkSync(result.filePath)
                    return await conn.reply(m.chat, `❌ El video es demasiado grande (${(stats.size / (1024 * 1024)).toFixed(2)} MB). El límite es ${LimitVid / (1024 * 1024)} MB.`, m)
                }
                // Enviar el video al chat
                await conn.sendFile(m.chat, result.filePath, `${yt_play[0].title}.mp4`, '', m)
                // Eliminar el archivo después de enviarlo (opcional)
                fs.unlinkSync(result.filePath)
            } catch (e) {
                await conn.reply(m.chat, `❌ Error al descargar/enviar el video: ${e.message}`, m)
            }
        }
    } catch (error) {
        conn.reply(m.chat, `❌ Ocurrió un error: ${error.message}`, m)
    }
}

handler.command = /^(play[2-4]?|audio|video|playdoc2?)$/i
// handler.limit = 2
//handler.register = true
export default handler

async function search(query, options = {}) {
    const search = await yts.search({query, hl: 'es', gl: 'ES', ...options})
    return search.videos
}