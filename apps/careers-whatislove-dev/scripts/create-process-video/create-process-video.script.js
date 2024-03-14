import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import { ProcessExitCode, getShuffledItems } from '@whatislove.dev/shared'
import ffmpeg from 'fluent-ffmpeg'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { exit } from 'node:process'

let VIDEOS_FOLDER_PATH = /** @type {const} */ (`./public/videos`)
let PROCESS_PIECE_FILE_EXT = /** @type {const} */ (`.mp4`)

let processPiecePath = join(VIDEOS_FOLDER_PATH, `process-pieces`)
let processFilePath = join(VIDEOS_FOLDER_PATH, `process.mp4`)

ffmpeg.setFfmpegPath(ffmpegInstaller.path)
ffmpeg.setFfprobePath(ffprobeInstaller.path)

/** @returns {Promise<void>} */
let createProcessVideo = async () => {
	let processPiecesFiles = await readdir(processPiecePath)
	let processPiecesPaths = processPiecesFiles
		.filter((file) => file.endsWith(PROCESS_PIECE_FILE_EXT))
		.map((file) => `${processPiecePath}/${file}`)
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
