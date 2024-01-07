declare module 'eslint-plugin-react' {
	import { type Linter } from 'eslint'

	const configs: Record<'jsx-runtime', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}
