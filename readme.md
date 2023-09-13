# vnojs只需两条命令即可完成配置

动态css规格，unocss的精简版，全文css搜索，创建匹配规则的css

## 使用方法

### 传统方法

1. 安装vnojs

```shell
yarn add vnojs / npm install vnojs / pnpm add vnojs ...
```

2. 初始化配置文件

```shell
npx vno init
```

将在运行目录下生成一个vno.config.js配置文件

3. 按需修改配置文件

4. 编译并监听文件夹

```shell
npx vno start
```

### 使用脚本

```json
{
 "scripts": {
  "vno:start": "vno init && vno start -w src -e vue -t src/assets/vno.css"
 }
}

```


### 在程序中使用

```nodejs
const vno  = require("vno")
const config = require("vno.config.js") // your vno config
vno(config)
 .then(() => {
  console.log("编译完成，开始监听文件夹")
 })
 .catch(err => {
  console.error(err)
 })
```