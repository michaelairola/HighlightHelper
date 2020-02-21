import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { uglify } from 'rollup-plugin-uglify';

const DevMode = process.env.DEV_MODE == "true"

const config = () => {
	const input = 'src/widget.js';
	const output = [ { file: 'dist/widget.js', format: 'iife' } ];
	let plugins = [ 
		resolve(), 
		babel({ presets: [ "@babel/preset-env" ] }) 
	]
	plugins = DevMode ? plugins : [ 
		minifyHTML(),
		...plugins,
		uglify(),
	]
	return { input, output, plugins }
};

export default config;