module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
<<<<<<< HEAD
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
=======
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
>>>>>>> 4761eb66a04474a455a513cbf50a2200b0a6520d
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
