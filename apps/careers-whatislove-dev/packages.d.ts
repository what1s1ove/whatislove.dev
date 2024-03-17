declare module 'eslint-plugin-lit' {
	import { type Linter } from 'eslint'

	const configs: Record<'all', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-wc' {
	import { type Linter } from 'eslint'

	const configs: Record<'best-practice', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}
