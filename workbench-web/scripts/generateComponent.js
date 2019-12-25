const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { componentTemplate } = require('./template')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        successLog('生成成功')
        resolve(true)
      }
    })
  })
}
log('请输入要生成的组件名，默认生成在src/components目录下，如要生成在views目录下请输入’目录名/组件名‘，如home/components/header')
let componentName = ''
process.stdin.on('data', async chunk => {
  let inputName = String(chunk).trim().toString()
  /**
   * 组件目录路径
   */
  if (inputName.includes('/')) {
    let inputArr = inputName.split('/')
    let componentName = inputArr.splice(inputArr.length - 1, 1)
    let Directory = inputArr.join('/')
    var componentDirectory = resolve('../src/views', Directory)
    var componentVueName = resolve(componentDirectory, componentName + '.vue')
  } else {
    var componentDirectory = resolve('../src/components', inputName)
    var componentVueName = resolve(componentDirectory, 'index.vue')
  }


  /**
   * vue组件路径
   */

  const hasComponentDirectory = fs.existsSync(componentDirectory)
  if (hasComponentDirectory && !inputName.includes('/')) {
    errorLog(`${componentDirectory}`)
    errorLog(`${inputName}组件目录已存在，请重新输入`)
    return
  } else {
    log(`正在生成 component 目录 ${componentDirectory}`)
    await dotExistDirectoryCreate(componentDirectory)
    // fs.mkdirSync(componentDirectory);
  }
  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
    } else {
      componentName = inputName
    }
    log(`正在生成 vue 文件 ${componentVueName}`)
    await generateFile(componentVueName, componentTemplate(componentName))
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
