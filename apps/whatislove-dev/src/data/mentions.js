import { retryCall } from '@whatislove.dev/shared'
import { parseHTML } from 'linkedom'

import { default as environment } from './environment.js'

let MENTION_PARAGRAPH_COUNT = /** @type {const} */ (2)
let MENTION_LAST_PARAGRAPH_IDX = /** @type {const} */ (-1)

/**
 * @typedef {{
 * 	author: {
 * 		name: string
 * 		avatarUrl: string | undefined
 * 	}
 * 	content: string
 * 	date: Date
 * 	fromType: string | undefined
 * 	url: string
 * }}
 */
let Mention

/**
 * @typedef {{
 * 	likesCount: number
 * 	repostsCount: number
 * 	mentions: Mention[]
 * }}
 */
let PageMention

/** @typedef {Record<string, PageMention>} */
let PagesMentions

/**
 * @template {unknown} T
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<T>}
 */
let load = (url, options) => {
	return fetch(url, options).then((response) => {
		return /** @type {() => Promise<T>} */ (response.json)()
	})
}

/**
 * @param {string} html
 * @param {string} commentUrl
 * @returns {string}
 */
let prepareMentionContent = (html, commentUrl) => {
	let window = parseHTML(`
		<!DOCTYPE html>
		<html>
			<body>
				${html.replaceAll(/\sclass="[^"]*"/g, ``)}
			</body>
		</html>
	`)

	let paragraphNodes = [...window.document.querySelectorAll(`p`)]
	let mentionParagraphNodes = paragraphNodes.slice(0, MENTION_PARAGRAPH_COUNT)

	if (paragraphNodes.length > MENTION_PARAGRAPH_COUNT) {
		let lastComment = /** @type {HTMLParagraphElement} */ (
			mentionParagraphNodes.at(MENTION_LAST_PARAGRAPH_IDX)
		)

		lastComment.innerHTML = `
			${lastComment.innerHTML} … <a href="${commentUrl}">see more</a>
		`
	}

	window.document.body.innerHTML = ``
	window.document.body.append(...mentionParagraphNodes)

	return window.document.body.innerHTML
}

/** API: Dev.to */

/**
 * @typedef {{
 * 	canonical_url: string
 * 	id: number
 * 	positive_reactions_count: number
 * }}
 */
let ArticleDevto

/**
 * @typedef {{
 * 	body_html: string
 * 	children: CommentDevto[]
 * 	created_at: string
 * 	id_code: string
 * 	user: {
 * 		profile_image_90: string
 * 		username: string
 * 	}
 * }}
 */
let CommentDevto

/**
 * @template {unknown} T
 * @param {string} path
 * @returns {Promise<T>}
 */
let callDevtoApi = (path) => {
	return load(`https://dev.to/api${path}`, {
		headers: {
			'api-key': environment.API.DEVTO_API_KEY,
		},
	})
}

/**
 * @param {CommentDevto[]} comments
 * @returns {CommentDevto[]}
 */
let getAllDevtoComments = (comments) => {
	return comments.flatMap((comment) => [
		comment,
		...(comment.children.length > 0
			? getAllDevtoComments(comment.children)
			: []),
	])
}

/** @returns {Promise<PagesMentions>} */
let getDevtoPageMention = async () => {
	let articles = await /** @type {Promise<ArticleDevto[]>} */ (
		callDevtoApi(`/articles/me`)
	)
	let pageMentions = /** @type {PagesMentions} */ ({})

	for (let article of articles) {
		let comments = await /** @type {Promise<CommentDevto[]>} */ (
			callDevtoApi(`/comments?a_id=${article.id.toString()}`)
		)

		let allComments = getAllDevtoComments(comments)

		let articleUrl = new URL(article.canonical_url)

		pageMentions[articleUrl.pathname] = {
			likesCount: article.positive_reactions_count,
			mentions: allComments.map((comment) => {
				let url = `https://dev.to/${comment.user.username}/comment/${comment.id_code}`

				return {
					author: {
						avatarUrl: comment.user.profile_image_90,
						name: `@${comment.user.username}`,
					},
					content: prepareMentionContent(comment.body_html, url),
					date: new Date(comment.created_at),
					fromType: `devto`,
					url,
				}
			}),
			repostsCount: 0,
		}
	}

	return pageMentions
}

/** API: Webmentions */

/**
 * @typedef {{
 * 	'wm-target': string
 * 	'wm-property': 'like-of' | 'repost-of' | 'in-reply-to'
 * 	'author'?: {
 * 		photo: string
 * 		name: string
 * 	}
 * 	'content': {
 * 		html: string
 * 	}
 * 	'published': string
 * 	'url': string
 * }}
 */
let WebMentionItem

/**
 * @typedef {{
 * 	children: WebMentionItem[]
 * }}
 */
let WebMentions

let webMentionSourceHostToFromType = /** @type {const} */ ({
	'mastodon.social': `mastodon`,
})

/**
 * @template {unknown} T
 * @param {string} path
 * @returns {Promise<T>}
 */
let callWebMentionApi = (path) => {
	return load(
		`https://webmention.io/api${path}?token=${environment.API.WEBMENTION_API_KEY}`,
	)
}

/** @returns {Promise<PagesMentions>} */
let getWebMentionsPageMention = async () => {
	let webMentions = await /** @type {Promise<WebMentions>} */ (
		callWebMentionApi(`/mentions.jf2`)
	)
	let pageMentions = /** @type {PagesMentions} */ ({})

	for (let webMention of webMentions.children) {
		let targetUrl = new URL(webMention[`wm-target`])

		if (pageMentions[targetUrl.pathname] === undefined) {
			pageMentions[targetUrl.pathname] = {
				likesCount: 0,
				mentions: [],
				repostsCount: 0,
			}
		}

		let currentPageMentions = /** @type {PageMention} */ (
			pageMentions[targetUrl.pathname]
		)

		if (webMention[`wm-property`] === `like-of`) {
			currentPageMentions.likesCount++
		}

		if (webMention[`wm-property`] === `repost-of`) {
			currentPageMentions.repostsCount++
		}

		if (webMention[`wm-property`] === `in-reply-to`) {
			let host = new URL(webMention.url).host
			let fromType =
				webMentionSourceHostToFromType[
					/** @type {keyof webMentionSourceHostToFromType} */ (host)
				]

			currentPageMentions.mentions.push({
				author: {
					avatarUrl: webMention.author?.photo ?? undefined,
					name: webMention.author?.name ?? host,
				},
				content: prepareMentionContent(
					webMention.content.html,
					webMention.url,
				),
				date: new Date(webMention.published),
				fromType,
				url: webMention.url,
			})
		}
	}

	return pageMentions
}

/** @returns {Promise<PagesMentions>} */
let loader = async () => {
	let mentionLoaders = [getDevtoPageMention, getWebMentionsPageMention]
	let allPagesMentions = /** @type {PagesMentions} */ ({})

	for (let mentionLoader of mentionLoaders) {
		let fetchedPageMentions = await retryCall({
			callback: mentionLoader,
			retriesCount: 3,
		})

		for (let [pageUrl, pageMentions] of Object.entries(
			fetchedPageMentions,
		)) {
			if (allPagesMentions[pageUrl] === undefined) {
				allPagesMentions[pageUrl] = {
					likesCount: 0,
					mentions: [],
					repostsCount: 0,
				}
			}

			let currentPageMentions = /** @type {PageMention} */ (
				allPagesMentions[pageUrl]
			)

			currentPageMentions.likesCount += pageMentions.likesCount
			currentPageMentions.repostsCount += pageMentions.repostsCount
			currentPageMentions.mentions.push(...pageMentions.mentions)
		}
	}

	return allPagesMentions
}

export default environment.APP.FLAGS.IS_PRODUCTION ? loader : {}
