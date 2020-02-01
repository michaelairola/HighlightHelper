import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { uglify } from 'rollup-plugin-uglify';

const config = {
	input: 'src/widget.js',
	output: [
		{ file: 'dist/widget.js', format: 'iife' },
	],
	plugins: [
		minifyHTML(),
		resolve(),
		babel({ presets: [ "@babel/preset-env" ] }),
		uglify()
	]
};

export default config;