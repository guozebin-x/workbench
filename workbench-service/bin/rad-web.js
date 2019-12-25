#!/usr/bin/env node
const fs = require('fs');
const meow = require('meow');
const cli = meow(`
  [rad web]，在项目根目录下，启动图形化 app 搭建界面。
`);

let args = process.argv
let cmd = args[2]

if (cmd == '-h' || cmd == '-help' || cmd == '--help') {
  cli.showHelp()
} else {
  let root = process.cwd()
  // TODO: 检测端口 10000 是否被占用。
  if (fs.existsSync(root + '/src/framework/index.js')) {
    global.workingRoot = process.cwd()
    require('../index.js')
  } else {
    console.log('* 当前非 rad 项目目录，[rad web]命令只能在 rad 项目根目录下启动！')
  }
}

