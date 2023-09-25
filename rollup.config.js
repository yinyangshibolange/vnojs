import terser from '@rollup/plugin-terser';
export default [
 {
  input: 'lib/vno.js',
  output: [
   {
    file: 'dist/vno.cjs',
    format: 'cjs'
   },
   {
    file: 'dist/vno.mjs',
    format: 'es'
   },
  ],
  plugins: [terser()]
 },  {
  input: 'lib/logger.js',
  output: [
   {
    file: 'dist/logger.cjs',
    format: 'cjs'
   }, {
    file: 'dist/logger.mjs',
    format: 'es'
   },
  ],
  plugins: [terser()]
 },
 {
  input: 'lib/default.config.js',
  output: [
   {
    file: 'dist/default.config.cjs',
    format: 'cjs'
   }, {
    file: 'dist/default.config.mjs',
    format: 'es'
   },
  ],
  plugins: [terser()]
 },
]

