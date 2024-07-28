declare module 'eslint-plugin-import' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}
