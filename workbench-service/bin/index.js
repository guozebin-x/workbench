#!/usr/bin/env node
require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', '[rad init myProjectName]，创建新项目 myProjectName。')
  .command('web', '[rad web]，在项目根目录下，启动图形化 app 搭建界面。')
  .command('doc', '[rad doc]，在浏览器中打开 RAD 文档。')
  .parse(process.argv)

// 私服地址：
// https://mnpm.yunshanmeicai.com/package/@mc/rad-cli