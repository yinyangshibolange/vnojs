export default {
 error: msg => {
  console.log('\x1B[31m%s\x1B[0m', msg)
 },
 success: msg => {
  console.log('\x1B[32m%s\x1B[0m', msg)
 },
 primary: msg => {
  console.log('\x1B[34m%s\x1B[0m', msg)
 },
 info: msg => {
  console.log('\x1B[2m%s\x1B[0m', msg)
 },
 log: msg => {
  console.log(msg)
 },
 reg: msg => {
  const ms = msg.matchAll(/\$([^\$]*\$\#[0-9a-fA-F]{3,8})/)
  console.log(ms)
 },
 dict: dict => {
  if (typeof dict === 'object') {
   for (let key in dict) {
    console.log('\x1B[34m%s\x1B[0m', `${key}: ${typeof dict[key] === 'string' ? `'${dict[key]}'` : dict[key]}     `)
   }
  } else {
   console.log(dict)
  }
 }
}