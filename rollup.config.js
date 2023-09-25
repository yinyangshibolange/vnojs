import terser from '@rollup/plugin-terser';
export default [
 {
  input: 'lib/vno.js',
  output: [
   {
    file: 'dist/index.mjs',
    format: 'es'
   },
   {
    file: 'dist/index.cjs',
    format: 'cjs'
   },
  ],
  plugins: [terser()]
 }, {
  input: 'lib/bin.js',
  output: [
   {
    file: 'bin/vno.cjs',
    format: 'cjs'
   },
   {
    file: 'bin/vno.mjs',
    format: 'es'
   },
  ],
  plugins: [terser()]
 }
]

