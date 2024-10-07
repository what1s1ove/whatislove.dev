declare module 'eslint-plugin-lit-a11y' {
	import { type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.Config>>

	export default {
		configs,
	}
}
