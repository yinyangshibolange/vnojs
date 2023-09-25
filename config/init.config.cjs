module.exports = {
 watch: '', // 监听文件
 hot: true, // 热监听
 ext: 'html,vue', // 拓展名, 多个拓展名以,分割, 如果为空则编译全部文件
 ignores: [], // 忽略的目录，基于watch目录开始
 includes: [], // 包含的目录，基于watch目录开始
 target: 'vnocss/vno.css', // 最终css生成位置, 文件夹需要存在
 cssSplit: false, // 是否每个文件拆分成一个css，可以进一步加快加载速度，如何css不大就没必要，因为每个html导入一个css较为麻烦
 rules: {
  'bg-(\\w+)': 'background: #$val[1];',
     'bg-rgb--(\\d+)-(\\d+)-(\\d+)': 'background: rgb($val[1], $val[2], $val[3]);',
     'bg-rgba-(\\d+)-(\\d+)-(\\d+)-(\\d+)': m => `background: rgba(${m[1]}, ${m[2]}, ${m[3]}, ${m[4]/10});`,
     'color-(\\w+)': 'color: #$val[1];',
     'w-(\\d+)px': 'width: $val[1]px;',
     'h-(\\d+)px': 'height: $val[1]px;',
     'w-(\\d+)per': 'width: $val[1]%;',
     'h-(\\d+)per': 'height: $val[1]%;',
     'font-(\\d+)px': 'font-size: $val[1]px;',
     'line-(\\d+)px': 'line-height: $val[1]px;',
     'ml-(\\d+)px': 'margin-left: $val[1]px;',
     'mt-(\\d+)px': 'margin-top: $val[1]px;',
     'mr-(\\d+)px': 'margin-right: $val[1]px;',
     'pd-(\\d+)px': 'padding: $val[1]px;',
     'pd-(\\d+)px-(\\d+)px': 'padding: $val[1]px $val[2]px;',
     'rd-(\\d+)px': 'border-radius: $val[1]px;',
     'dis-(.+)_important': 'display: $val[1] !important;',
     'dis-([^_]+)': 'display: $val[1];',
     'ta-(.+)': 'text-align: $val[1];',
     'pos-(.+)': 'position: $val[1];',
     'top-(\\d+)px': 'top: $val[1]px;',
     'left-(\\d+)px': 'left: $val[1]px;',
     'bottom-(\\d+)px': 'bottom: $val[1]px;',
     'right-(\\d+)px': 'right: $val[1]px;',
     'visibility-(.+)': 'visibility:$val[1];'
 },
}