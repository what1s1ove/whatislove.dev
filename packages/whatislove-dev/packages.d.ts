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

		addTransform(name: string, transform: Function): void
	}

	export { UserConfig }
}
