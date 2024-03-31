import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import { ProcessExitCode, getShuffledItems } from '@whatislove.dev/shared'
import ffmpeg from 'fluent-ffmpeg'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { exit } from 'node:process'
import { fileURLToPath } from 'node:url'

let PROCESS_PIECE_FILE_EXT = /** @type {const} */ (`.mp4`)

let scriptDirname = dirname(fileURLToPath(import.meta.url))
let processPiecesPath = join(scriptDirname, `./process-pieces`)
let processFilePath = join(scriptDirname, `../../public/videos`, `process.mp4`)

ffmpeg.setFfmpegPath(ffmpegInstaller.path)
ffmpeg.setFfprobePath(ffprobeInstaller.path)

/** @returns {Promise<void>} */
let createProcessVideo = async () => {
	let processPiecesFiles = await readdir(processPiecesPath)
	let processPiecesPaths = processPiecesFiles
		.filter((file) => file.endsWith(PROCESS_PIECE_FILE_EXT))
		.map((file) => `${processPiecesPath}/${file}`)
	let shuffledProcessPiecesPaths = getShuffledItems(processPiecesPaths)

	let processVideo = ffmpeg()

	for (let processPiecePath of shuffledProcessPiecesPaths) {
		processVideo.input(processPiecePath)
	}

	processVideo.mergeToFile(processFilePath, `./tmp`)
}

let hasProcessFile = existsSync(processFilePath)

if (hasProcessFile) {
	exit(ProcessExitCode.SUCCESS)
}

await createProcessVideo()
