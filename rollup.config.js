import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        file: 'assets/js/bundle.js',
        format: 'iife',
    },
    // We can confidently disable these warnings because they are perfectly fine for our vanilla react setup
    onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.message.includes('"use client"')) {
            return;
        }
        warn(warning);
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
        resolve({
            browser: true,
            extensions: ['.js', '.jsx']
        }),
        babel({
            babelHelpers: 'bundled',
            presets: [
                ['@babel/preset-env', { modules: false }],
                ['@babel/preset-react', { runtime: 'classic' }]
            ],
            extensions: ['.js', '.jsx'],
            exclude: 'node_modules/**'
        }),
        commonjs()
    ]
};
