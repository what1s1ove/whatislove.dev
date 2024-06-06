declare module '@11ty/eleventy' {
	class UserConfig {
		dir: {
			input: string
		}

		ignores: Set<string>

		addPassthroughCopy(
			fileOrDir: string,
			copyOptions?: Record<string, unknown>,
		): void

		addTemplateFormats(templateFormats: string): void

		addExtension(
			fileExtension: string,
			options: Record<string, unknown>,
		): void

		addTransform(
			name: string,
			transform: (
				content: string,
				path: string,
			) => unknown | Promise<unknown>,
		): void

		addCollection(
			name: string,
			addCollectionCb: (collectionsApi: {
				getFilteredByGlob: (path: string | string[]) => unknown[]
			}) => unknown[],
		): void

		addFilter(name: string, newFilterCb: (value: unknown) => unknown): void

		setLibrary(name: string, newLibraryApi: unknown): void

		addPlugin(
			newPluginCb: (value: unknown) => unknown,
			pluginOptions?: Record<string, unknown>,
		): void

		addNunjucksAsyncShortcode(
			name: string,
			addNunjucksAsyncShortcodeCb: (
				path: string,
			) => Promise<unknown> | unknown,
		): void
	}

	export { UserConfig }
}

declare module '@11ty/eleventy-plugin-rss' {
	function plugin(options: unknown): void

	export default plugin
}

declare module '@11ty/eleventy-img' {
	function eleventyImageTransformPlugin(options: unknown): void

	export default {
		eleventyImageTransformPlugin,
	}
}

declare module 'eleventy-plugin-og-image' {
	function plugin(options: unknown): void

	export default plugin
}
