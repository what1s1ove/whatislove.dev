declare module 'eslint-plugin-perfectionist' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended-natural', Required<Linter.FlatConfig>>

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
