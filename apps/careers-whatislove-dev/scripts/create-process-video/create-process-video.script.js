#!
import { getShuffledItems, ProcessExitCode } from '@whatislove.dev/shared'
import ffmpegPath from 'ffmpeg-static'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { glob, mkdtemp, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

let ProcessPath = /** @type {const} */ ({
	AUDIO: path.join(import.meta.dirname, `../../public/sounds/process.mp3`),
	PIECES_FOLDER: path.join(import.meta.dirname, `./process-pieces`),
	VIDEO: path.join(import.meta.dirname, `../../public/videos/process.mp4`),
})

/** @returns {Promise<void>} */
let createProcessVideo = async () => {
	let processPiecesPaths = await Array.fromAsync(
		glob(`${ProcessPath.PIECES_FOLDER}/*.mp4`),
	)
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
			ProcessPath.AUDIO,
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
			ProcessPath.VIDEO,
		],
		{
			stdio: `inherit`,
		},
	)
	proc.on(`close`, (code) => process.exit(code))
}

let hasProcessFile = existsSync(ProcessPath.VIDEO)

if (hasProcessFile) {
	process.exit(ProcessExitCode.SUCCESS)
}

await createProcessVideo()
