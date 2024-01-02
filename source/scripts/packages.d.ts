declare module 'eslint-plugin-simple-import-sort' {
	import { type ESLint } from 'eslint'

	const plugin: ESLint.Plugin

	export default plugin
}

declare module 'eslint-plugin-perfectionist' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended-natural', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-unicorn' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-import' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module '@typescript-eslint/eslint-plugin' {
	import { type Linter } from 'eslint'

	const configs: Record<'strict-type-checked', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-sonarjs' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

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

declare module '@11ty/eleventy-img' {
	function queueImage(
		src: string,
		opts: Record<string, unknown>,
	): Promise<
		Record<
			string,
			{
				buffer: string
			}[]
		>
	>

	export default queueImage
}
