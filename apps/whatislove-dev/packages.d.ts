declare module '@11ty/eleventy' {
	class UserConfig {
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

		addPlugin(newPluginCb: (value: unknown) => unknown): void
	}

	export { UserConfig }
}
