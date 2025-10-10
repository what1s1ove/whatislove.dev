import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { resolve as tsResolver } from 'eslint-import-resolver-typescript'
import importPlugin from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'
import perfectionist from 'eslint-plugin-perfectionist'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

/** @typedef {import('eslint').Linter.Config} */
let Config
/** @typedef {import('eslint').ESLint.Plugin} */
let Plugin
/** @typedef {import('eslint').Linter.RulesRecord} */
let RulesRecord

/** @type {Config} */
let ignoresConfig = {
	ignores: [`apps`, `packages`],
}

/** @type {Config} */
let jsConfig = {
	languageOptions: {
		globals: globals.browser,
		parserOptions: {
			ecmaVersion: `latest`,
			sourceType: `module`,
		},
	},
	rules: {
		...js.configs.recommended.rules,
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

/** @type {Config} */
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
		'import/resolver': {
			typescript: tsResolver,
		},
	},
}

/** @type {Config} */
let sonarConfig = {
	plugins: {
		sonarjs: /** @type {Plugin} */ (/** @type {unknown} */ (sonarjs)),
	},
	rules: /** @type {RulesRecord} */ (sonarjs.configs.recommended.rules),
}

/** @type {Config} */
let unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: {
		...unicorn.configs.recommended.rules,
		'unicorn/template-indent': [
			`error`,
			{
				tags: [],
			},
		],
	},
}

/** @type {Config} */
let perfectionistConfig = {
	plugins: {
		perfectionist: /** @type {Plugin} */ (
			/** @type {unknown} */ (perfectionist)
		),
	},
	rules: /** @type {RulesRecord} */ (
		perfectionist.configs[`recommended-natural`].rules
	),
}

/** @type {Config} */
let jsdocConfig = {
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs[`recommended-typescript-flavor-error`].rules,
		'jsdoc/no-undefined-types': [`error`],
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
	},
}

/** @type {Config} */
let typescriptPlugin = {
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			project: `./tsconfig.json`,
		},
	},
	plugins: {
		'@typescript-eslint': /** @type {Plugin} */ (
			/** @type {unknown} */ (ts)
		),
	},
	rules: {
		...ts.configs[`strict-type-checked`]?.rules,
		'@typescript-eslint/no-extraneous-class': [
			`error`,
			{
				allowStaticOnly: true,
			},
		],
		'@typescript-eslint/no-misused-promises': [
			`error`,
			{
				checksVoidReturn: {
					arguments: false,
				},
			},
		],
	},
}

/** @type {Config[]} */
let overridesConfigs = [
	{
		files: [
			`commitlint.config.js`,
			`prettier.config.js`,
			`lint-staged.config.js`,
			`eslint.config.js`,
			`stylelint.config.js`,
			`knip.config.js`,
		],
		rules: {
			'import/no-default-export': [`off`],
		},
	},
]

/** @type {Config[]} */
let config = [
	ignoresConfig,
	jsConfig,
	importConfig,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	jsdocConfig,
	typescriptPlugin,
	...overridesConfigs,
]

export default config
