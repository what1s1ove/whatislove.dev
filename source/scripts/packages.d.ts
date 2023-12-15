declare module 'eslint-plugin-simple-import-sort' {
	import { type ESLint, type Linter } from 'eslint'

	const plugin: ESLint.Plugin

	export default plugin
}

declare module 'eslint-plugin-perfectionist' {
	import { type ESLint, type Linter } from 'eslint'

	const configs: Record<'recommended-natural', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-unicorn' {
	import { type ESLint, type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-import' {
	import { type ESLint, type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-jsdoc' {
	import { type ESLint, type Linter } from 'eslint'

	const configs: Record<
		'recommended-typescript-flavor-error',
		Required<Linter.FlatConfig>
	>

	export default {
		configs,
	}
}

declare module '@eslint/js' {
	import { type ESLint, type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module '@typescript-eslint/eslint-plugin' {
	import { type ESLint, type Linter } from 'eslint'

	const configs: Record<'strict-type-checked', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}

declare module 'eslint-plugin-sonarjs' {
	import { type ESLint, type Rule, type Linter } from 'eslint'

	const configs: Record<'recommended', Required<Linter.FlatConfig>>

	export default {
		configs,
	}
}
