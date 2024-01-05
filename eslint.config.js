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

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig
/** @typedef {import('eslint').Linter.ParserModule} */
let ParserModule

/** @type {FlatConfig} */
let ignoresConfig = {
	ignores: [`packages`],
}

/** @type {FlatConfig} */
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

/** @type {FlatConfig} */
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
			typescript: tsResolver,
		},
	},
}

/** @type {FlatConfig} */
let sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: sonarjs.configs.recommended.rules,
}

/** @type {FlatConfig} */
let unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: unicorn.configs.recommended.rules,
}

/** @type {FlatConfig} */
let perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs[`recommended-natural`].rules,
}

/** @type {FlatConfig} */
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
		'jsdoc/valid-types': [`off`],
	},
}

/** @type {FlatConfig} */
let typescriptPlugin = {
	languageOptions: {
		parser: /** @type {ParserModule} */ (tsParser),
		parserOptions: {
			project: `./tsconfig.json`,
		},
	},
	plugins: {
		'@typescript-eslint': ts,
	},
	rules: {
		...ts.configs[`strict-type-checked`].rules,
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

/** @type {FlatConfig[]} */
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

/** @type {FlatConfig[]} */
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
