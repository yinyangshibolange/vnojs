const path = require("path")
const vno = require("../lib/vno")
const logger = require("../lib/logger")
const testConfig = require("./testConfig")

if(testConfig) {
 logger.success("test:配置加载成功，开始运行vnojs！")
 vno(testConfig)
} else {
 logger.error("test:vnojs配置加载失败，请在项目根目录新建vnojs.config.json，并写入配置")
}