import { builtinModules } from 'module';

import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import esbuild from '@intrnl/rollup-plugin-esbuild';


let dev = !!process.env.ROLLUP_WATCH;


/** @type {import('rollup').RollupOptions} */
let config = {
	input: {
		core: './src/core/index.js',
		patcher: './src/patcher/index.js',
		preload: './src/preload/index.js',
	},
	output: {
		format: 'commonjs',
		dir: './dist/',
		chunkFileNames: 'chunks/[name].[hash].js',
	},

	external: [
		'electron',
		...builtinModules,
	],

	plugins: [
		alias({
			entries: [
				{ find: '@core', replacement: 'src/core', },
				{ find: '@patcher', replacement: 'src/patcher', },
				{ find: '@preload', replacement: 'src/preload', },
				{ find: '@shared', replacement: 'src/shared', },
			],
		}),
		resolve({ browser: true }),
		commonjs({ include: [/[\\/]node_modules/] }),

		json({ namedExports: true, preferConst: false }),

		esbuild({
			target: 'es2019',
			define: {
				'process.env.NODE_ENV': dev ? '"development"' : '"production"',
				'import.meta.env.MODE': dev ? '"development"' : '"production"',
			},
		}),
	],
};

export default config;
