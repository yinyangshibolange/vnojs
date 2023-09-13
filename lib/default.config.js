module.exports = {
  watch: '', // 监听文件
  hot: true, // 热监听
  ext: 'html,vue', // 拓展名, 多个拓展名以,分割, 如果为空则编译全部文件
  ignores: [], // 忽略的目录，基于watch目录开始
  includes: [], // 包含的目录，基于watch目录开始
  target: 'vnocss/vno.css', // 最终css生成位置, 文件夹需要存在
  cssSplit: false, // 是否每个文件拆分成一个css，可以进一步加快加载速度，如何css不大就没必要，因为每个html导入一个css较为麻烦
  rules: {},
  // todo: ide插件
}