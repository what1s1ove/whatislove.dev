// @ts-expect-error: no declaration file
import js from '@eslint/js'
// @ts-expect-error: no declaration file
import importPlugin from 'eslint-plugin-import'
// @ts-expect-error: no declaration file
import jsdoc from 'eslint-plugin-jsdoc'
// @ts-expect-error: no declaration file
import perfectionist from 'eslint-plugin-perfectionist'
// @ts-expect-error: no declaration file
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
// @ts-expect-error: no declaration file
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

/** @type {import('eslint').Linter.FlatConfig} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {import('eslint').Linter.FlatConfig} */
let globalConfig = {
	languageOptions: {
		globals: globals.browser,
		parserOptions: {
			ecmaVersion: `latest`,
			sourceType: `module`,
		},
	},
	rules: {
		...js.configs.recommended.rules,
	},
}

/** @type {import('eslint').Linter.FlatConfig} */
let importConfig = {
	plugins: {
		import: importPlugin,
	},
	rules: {
		...importPlugin.configs.recommended.rules,
		'import/exports-last': [`error`],
		'import/extensions': [`error`, `ignorePackages`],
		'import/first': [`error`],
		'import/group-exports': [`error`],
		'import/newline-after-import': [`error`],
		'import/no-default-export': [`error`],
		'import/no-duplicates': [`error`],
	},
	settings: {
		'import/parsers': {
			espree: [`.js`, `.cjs`],
		},
		'import/resolver': {
			alias: {
				extensions: [`.js`],
				map: [[`~`, `./source/scripts`]],
			},
		},
	},
}

/** @type {import('eslint').Linter.FlatConfig} */
let sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: sonarjs.configs.recommended.rules,
}

/** @type {import('eslint').Linter.FlatConfig} */
let unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: unicorn.configs.recommended.rules,
}

/** @type {import('eslint').Linter.FlatConfig} */
let perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs[`recommended-natural`].rules,
}

/** @type {import('eslint').Linter.FlatConfig} */
let jsdocConfig = {
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs[`recommended-typescript-flavor-error`].rules,
		'jsdoc/require-jsdoc': [
			`error`,
			{
				checkConstructors: false,
				checkGetters: true,
				checkSetters: true,
				contexts: [
					`ArrowFunctionExpression`,
					`ClassProperty`,
					`FunctionDeclaration`,
					`FunctionExpression`,
					`MethodDefinition`,
				],
			},
		],
		'jsdoc/require-param-description': [`off`],
		'jsdoc/require-property-description': [`off`],
		'jsdoc/require-returns-description': [`off`],
		'jsdoc/valid-types': [`off`],
	},
	settings: {
		jsdoc: {
			mode: `typescript`,
		},
	},
}

/** @type {import('eslint').Linter.FlatConfig} */
let simpleImportSortConfig = {
	plugins: {
		'simple-import-sort': simpleImportSort,
	},
	rules: {
		'simple-import-sort/exports': [`error`],
		'simple-import-sort/imports': [`error`],
	},
}

/** @type {import('eslint').Linter.FlatConfig} */
let mainRulesConfig = {
	rules: {
		'arrow-parens': [`error`, `always`],
		'comma-dangle': [`error`, `always-multiline`],
		'curly': [`error`, `all`],
		'function-paren-newline': [`error`, `consistent`],
		'implicit-arrow-linebreak': [`error`, `beside`],
		'no-confusing-arrow': [
			`error`,
			{
				allowParens: true,
			},
		],
		'no-console': [
			`error`,
			{
				allow: [`warn`, `error`, `info`],
			},
		],
		'no-multiple-empty-lines': [
			`error`,
			{
				max: 1,
			},
		],
		'no-restricted-syntax': [
			`error`,
			{
				message: `Only let can be used for the variable declaration.`,
				selector: `VariableDeclaration[kind!=let]`,
			},
			{
				message: `Switch cases without blocks are forbidden.`,
				selector: `SwitchCase > *.consequent[type!="BlockStatement"]`,
			},
			{
				message: `Export/Import all (*) is forbidden.`,
				selector: `ExportAllDeclaration,ImportAllDeclaration`,
			},
			{
				message: `Exports should be at the end of the file.`,
				selector: `ExportNamedDeclaration[declaration!=null]`,
			},
		],
		'no-unused-expressions': [
			`error`,
			{
				allowTernary: true,
			},
		],
		'object-curly-newline': [
			`error`,
			{
				consistent: true,
				multiline: true,
			},
		],
		'object-curly-spacing': [`error`, `always`],
		'quote-props': [`error`, `consistent`],
		'quotes': [`error`, `backtick`],
		'require-atomic-updates': [`error`],
		'semi': [`error`, `never`],
	},
}

/** @type {import('eslint').Linter.FlatConfig[]} */
let overridesConfigs = [
	{
		files: [
			`commitlint.config.js`,
			`prettier.config.js`,
			`lint-staged.config.js`,
			`eslint.config.js`,
			`stylelint.config.js`,
		],
		rules: {
			'import/no-default-export': [`off`],
		},
	},
	{
		files: [`stylelint.config.cjs`, `.linthtmlrc.cjs`],
		languageOptions: {
			globals: globals.node,
		},
	},
	{
		files: [`eleventy.config.cjs`],
		rules: {
			'sonarjs/cognitive-complexity': [`off`],
		},
	},
]

/** @type {import('eslint').Linter.FlatConfig[]} */
let config = [
	ignoresConfig,
	globalConfig,
	importConfig,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	jsdocConfig,
	simpleImportSortConfig,
	mainRulesConfig,
	...overridesConfigs,
]

export default config
