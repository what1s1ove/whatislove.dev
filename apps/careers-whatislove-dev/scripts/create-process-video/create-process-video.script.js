#!
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import { ProcessExitCode, getShuffledItems } from '@whatislove.dev/shared'
import ffmpeg from 'fluent-ffmpeg'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

let PROCESS_PIECE_FILE_EXT = /** @type {const} */ (`.mp4`)

let processPiecesPath = path.join(import.meta.dirname, `./process-pieces`)
let processFilePath = path.join(
	import.meta.dirname,
	`../../public/videos`,
	`process.mp4`,
)

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
	process.exit(ProcessExitCode.SUCCESS)
}

await createProcessVideo()
