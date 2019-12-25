const fs = require('fs')
const low = require('lowdb')
const http = require('http');
const shell = require('shelljs');
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
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

//采用http模块向服务器发起一次get请求   
const httpRequest = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('请求失败\n' +
          `状态码: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
          `期望的是 application/json 但接收到的是 ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // 消费响应数据来释放内存。
        res.resume();
        return;
      }
      let data = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data)
      });
    })
  })
}



/**
 * 获取指定目录下的文件.
 */
function getFilesByDir(dir, filter) {
  var cmpDirs = fs.readdirSync(dir);
  let files = []
  cmpDirs.forEach(function (item, index) {
    var fileInfo = fs.statSync(dir + "/" + item)
    if (filter(fileInfo)) {
      files.push(item)
    }
  })
  return files
}

/**
 * 获取文件扩展名.
 */
function getFileExt(filePath) {
  return filePath.substring(filePath.lastIndexOf("."), filePath.length)
}

/**
 * 获取文件内容响应流.
 */
function getFileResponse(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.createReadStream(filePath);
  }
}

/**
 * 获取JSON文件内容Object.
 */
function getJsonFileObject(filePath) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } else {
    return {}
  }
}

/**
 * 链接 json 文件数据库.
 */
function connectJsonDB(dbPath) {
  const adapter = new FileSync(dbPath)
  return low(adapter)
}

/**
 * 预处理资源路径.
 * 资源的路径格式支持 String, Array.
 */
function resolveAssetsPaths(paths, prefix) {
  prefix = prefix || ''
  if (paths) {
    if (typeof paths == 'string') {
      paths = [paths]
    }
    return paths.map(path => {
      return path.indexOf('http') !== 0 ? prefix + path : path
    })
  }
  return []
}

/**
 * 序列化 json 对象.
 */
function serializeJson(json) {
  return JSON.stringify(json)
}

/**
 * 单文件同步拷贝.
 */
function copyFile(srcFile, destFile) {
  shell.cp('-f', srcFile, destFile);
}

/**
 * 写文件.
 */
function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content,
      {
        encoding: 'utf8',
        mode: 0o777,
        flag: 'w'
      },
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    )
  })
}

/**
 * 检测文件或者文件夹存在
 */
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * 若文件夹不存在，则创建它.
 */
function makesureDirExists(path) {
  if (!fsExistsSync(path)) {
    fs.mkdirSync(path);
  }
}

//横线转驼峰
function camelCase(string) {
  return string.replace(/-([a-z])/g, (all, letter) => {
    return letter.toUpperCase();
  });
}

//下划线转驼峰
function underlineCase(string) {
  return string.replace(/_([a-z])/g, (all, letter) => {
    return letter.toUpperCase();
  });
}

function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  return new Promise((resolve, reject) => {
    let fileList = []
    fs.readdir(filePath, (err, files) => {
      files.forEach((filename, index) => {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (err, stats) {
          if (err) {
            reject('获取文件stats失败');
          } else {
            var content = fs.readFileSync(filedir, 'utf-8');
            filename = filename.split('.')[0]
            let api = {
              name: filename,
              content
            }
            fileList.push(api)
            if (files.length == fileList.length) resolve(fileList)
          }
        })

      })
    })
  })
}



module.exports = {
  dotExistDirectoryCreate,
  camelCase,
  underlineCase,
  getFilesByDir,
  getFileExt,
  getJsonFileObject,
  getFileResponse,
  connectJsonDB,
  resolveAssetsPaths,
  serializeJson,
  copyFile,
  writeFile,
  fsExistsSync,
  makesureDirExists,
  httpRequest,
  fileDisplay
}
