/**
 * Rollup configuration for packaging the plugin in a module that is consumable
 * by either CommonJS (e.g. Node or Browserify) or ECMAScript (e.g. Rollup).
 *
 * These modules DO NOT include their dependencies as we expect those to be
 * handled by the module system.
 */
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  input: 'src/plugin.js',
  external: [
    'global',
    'global/document',
    'global/window',
    'video.js'
  ],
  plugins: [
    json(),
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
        '@babel/plugin-transform-object-assign'
      ]
    })
  ],
  output: [
    {
      name: 'videojsScene7',
      file: 'dist/videojs-scene7.cjs.js',
      format: 'cjs',
      globals: {
        'video.js': 'videojs'
      }
    }, {
      name: 'videojsScene7',
      file: 'dist/videojs-scene7.es.js',
      format: 'es',
      globals: {
        'video.js': 'videojs'
      }
    }
  ]
};
