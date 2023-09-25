# vnojs只需两条命令即可完成配置

动态css规格，unocss的精简版，全文css搜索，创建匹配规则的css

- 重要更新，自1.1.7开始，本插件支持es模块导入

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

如果es模块系统，使用下面这个脚本

```shell
npx vnoes init
```

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

如果项目中用type:module 限制了项目模块系统，则使用下面这个脚本

```json
{
 "scripts": {
  "vno:start": "vnoes init && vnoes start -w src -e vue -t src/assets/vno.css"
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

es导入方式

```nodejs
import  vno  from "vno"
import config from "./vno.config.js" // your vno config
vno(config)
 .then(() => {
  console.log("编译完成，开始监听文件夹")
 })
 .catch(err => {
  console.error(err)
 })
```

### 获取帮助

```shell
npx vno --help
npx vno init --help
npx vno start --help
```

vnoes帮助

```shell
npx vnoes --help
npx vnoes init --help
npx vnoes start --help
```