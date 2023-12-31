#!/usr/bin/env node

const yargs = require("yargs")
const path = require("path")
const fs = require("fs")
const fs_promises = fs.promises
const vno = require("../dist/vno.cjs")
const logger = require("../dist/logger.cjs")
const defaultConfig = require("../dist/default.config.cjs")

require('yargonaut')
  .help('3D-ASCII')
  .helpStyle('green')
  .style('blue')

yargs.command({
  command: 'init',
  describe: 'init your user space',
  builder: {
    dir: {
      alias: 'dir',
      describe: 'init config file paths',
      demand: false,
      type: 'string'
    }
  },
  async handler (argv) {
    const initTarget = path.resolve(process.cwd(), argv.dir || '', 'vno.config.cjs')
    let isFileExist = false
    try {
      const stat = await fs_promises.stat(initTarget)
      if (stat.isFile()) {
        isFileExist = true
      }
    } catch (err) {}
    if (isFileExist) {
      logger.info("配置文件vno.config.js已存在，无需再次初始化")
    } else {
      logger.info("vno.config.js不存在，将创建初始配置")
      const readDefaultFile = await fs_promises.readFile(path.resolve(__dirname, "../config/init.config.cjs"))
      await fs_promises.writeFile(initTarget, readDefaultFile.toString())
    }
  }
}).command({
  command: 'start',
  describe: 'start compile and watch html or other files! | 开始编译并监听文件变化！',
  builder: {
    config: {
      alias: 'c',
      describe: 'config file path, vno.config.json default | 指定配置文件,默认是vno.config.js',
      demand: false,
      type: 'string'
    },
    watch: {
      alias: 'w',
      describe: 'watched base directory path | 监听的文件夹路径，相对于根文件夹',
      demand: false,
      type: 'string'
    },
    target: {
      alias: 't',
      describe: 'compile file target filepath | 生成的css文件存放路径',
      demand: false,
      type: 'string'
    },
    ext: {
      alias: 'e',
      describe: 'watched files ext | 要监听的文件拓展名，可用,分割',
      demand: false,
      type: 'string'
    },
    hot: {
      alias: 'h',
      describe: 'hot watch | 热更新',
      demand: false,
      type: 'string'
    }
  },
  async handler (argv) {
    const configFilePath = path.resolve(process.cwd(), argv.config || 'vno.config.cjs')
    try {
      await fs_promises.stat(configFilePath)
    } catch (err) {
      logger.error("未找到配置文件，请先配置")
      return err
    }
    const userConfig = require(configFilePath) || {}
    const config = {
      ...defaultConfig,
      ...userConfig,
    }
    if (argv.watch) {
      config.watch = argv.watch
    }
    if (argv.target) {
      config.target = argv.target
    }
    if (argv.ext) {
      config.ext = argv.ext
    }
    if (argv.hot) {
      config.hot = (argv.hot == 1)
    }
    logger.success("配置加载成功，开始运行vnojs！")
    vno(config)
  }
})
  .example('$0 init', 'init vno.config.js，初始化配置文件')
  .example('$0 start -c v.config.js', 'start vno compile use v.config.js')
  .example('$0 start', 'start vno compile use default config (vno.config.js)')
  .wrap(null)
  .argv