#!
import { getShuffledItems, ProcessExitCode } from '@whatislove.dev/shared'
import ffmpegPath from 'ffmpeg-static'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

let PROCESS_PIECE_FILE_EXT = /** @type {const} */ (`.mp4`)

let processPiecesFolderPath = path.join(import.meta.dirname, `./process-pieces`)
let processVideoAudioPath = path.join(
	import.meta.dirname,
	`../../public/sounds`,
	`process.mp3`,
)
let processVideoFilePath = path.join(
	import.meta.dirname,
	`../../public/videos`,
	`process.mp4`,
)

/** @returns {Promise<void>} */
let createProcessVideo = async () => {
	let processPiecesFiles = await readdir(processPiecesFolderPath)
	let processPiecesPaths = processPiecesFiles
		.filter((file) => file.endsWith(PROCESS_PIECE_FILE_EXT))
		.map((file) => `${processPiecesFolderPath}/${file}`)
	let shuffledProcessPiecesPaths = getShuffledItems(processPiecesPaths)

	if (!ffmpegPath) {
		process.exit(ProcessExitCode.FAILURE)
	}

	let processPiecesListPath = path.join(
		await mkdtemp(path.join(os.tmpdir(), `ffconcat-`)),
		`files.txt`,
	)
	await writeFile(
		processPiecesListPath,
		shuffledProcessPiecesPaths.map((p) => `file ${p}`).join(`\n`),
	)

	let proc = spawn(
		ffmpegPath,
		[
			`-y`,
			`-safe`,
			`0`,
			`-f`,
			`concat`,
			`-i`,
			processPiecesListPath,
			`-i`,
			processVideoAudioPath,
			`-map`,
			`0:v:0`,
			`-map`,
			`1:a:0`,
			`-c:v`,
			`copy`,
			`-c:a`,
			`aac`,
			`-af`,
			`volume=0`,
			`-shortest`,
			processVideoFilePath,
		],
		{
			stdio: `inherit`,
		},
	)
	proc.on(`close`, (code) => process.exit(code))
}

let hasProcessFile = existsSync(processVideoFilePath)

if (hasProcessFile) {
	process.exit(ProcessExitCode.SUCCESS)
}

await createProcessVideo()
