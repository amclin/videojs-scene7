/**
 * Rollup configuration for packaging the plugin in a test bundle.
 *
 * This includes all dependencies for both the plugin and its tests.
 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: ['test/**/*.test.js'],
  output: {
    name: 'videojsScene7Tests',
    file: 'test/dist/bundle.js',
    format: 'iife',
    globals: {
      'qunit': 'QUnit',
      'qunitjs': 'QUnit',
      'sinon': 'sinon',
      'video.js': 'videojs'
    }
  },
  external: [
    'qunit',
    'qunitjs',
    'sinon',
    'video.js'
  ],
  plugins: [
    multiEntry({
      exports: false
    }),
    resolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    json(),
    commonjs({
      sourceMap: false
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          loose: true,
          modules: false
        }]
      ],
      plugins: [
        'transform-object-assign'
      ]
    })
  ]
};
