const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const {
  getFileResponse,
  httpRequest,
  writeFile,
  camelCase,
  underlineCase,
  dotExistDirectoryCreate,
  fileDisplay
} = require('../libs/util');

module.exports = function (router) {
  /**
	 * 根据mock文档生成api.
	 */
  router.get('/project/interface', async (ctx, next) => {
    let query = ctx.request.query
    const url = "http://mockapi.yunshanmeicai.com/api/repository/get?id=" + query.id
    let apidata = await httpRequest(url)
    let interfacesList
    try {
      interfacesList = eval('(' + apidata + ')').data.modules
    } catch (e) {
      ctx.response.body = "id有误"
    }
    let writeList = []
    let apiDirectory = '/Users/guozebin/Desktop/src/api/'
    await dotExistDirectoryCreate(apiDirectory)
    interfacesList.forEach(i => {
      let interfacesData = i.interfaces
      let output = `export default {
  get: {
  `
      let getApi = []
      let postApi = []
      interfacesData.forEach(i => {
        let m = {};
        m.name = i.name
        m.url = i.url
        m.method = i.method
        m.method == "GET" ? getApi.push(i) : postApi.push(i)
      });

      getApi.forEach(i => {
        let name = 'get-' + i.url.split('/').splice(-1, 1)
        name = camelCase(name)
        output += `  //${i.name}
    ${name}:'${i.url}',
  `
      })
      output += `},
  post: {
  `
      postApi.forEach(i => {
        let name = 'post-' + i.url.split('/').splice(-1, 1)
        name = camelCase(name)
        name = underlineCase(name)
        output += `  //${i.name}
    ${name}: '${i.url}',
  `
      })
      output += `}
}`
      let writeResult = writeFile(
        path.resolve(global.workingRoot + '/src/api/', i.name.replace(/\//g, "") + '.js'),
        output
      )
      writeList.push(writeResult)
    })
    let resultList = await Promise.all(writeList)
    let result = {
      ret: 1,
      data: true
    }
    resultList.forEach(i => {
      if (i !== true) {
        result.data = i
      }
    })
    ctx.response.body = result
  })
  /**
   * 获取项目的菜单配置.
   */
  router.get('/project/menus', (ctx, next) => {
    const menuPath = global.workingRoot + '/src/config/menu.js'
    let menuCode = fs.readFileSync(menuPath, 'utf-8')
    let routerJsonRegex = /let\s+mainMenuConfig\s+\=\s+(\[[\s\S]+\])/m;
    ctx.response.type = 'json';
    let menuJSON = menuCode.match(routerJsonRegex)[1]
    ctx.response.body = JSON.parse(`{"menus": ${menuJSON}}`)
  })
  /**
   * 获取项目的页面信息.
   */
  router.get('/project/pages', (ctx, next) => {
    let blocksDir = global.workingRoot + '/src/pages'
    let pages = []
    fs.readdirSync(blocksDir).forEach(function (node, index) {
      let nodePath = blocksDir + "/" + node
      let nodeInfo = fs.statSync(nodePath)
      if (nodeInfo.isDirectory()) {
        pages.push({
          name: node,
          nav: node,
          router: `/${node}`
        })
      }
    })
    ctx.response.body = {
      pages: pages
    }
  })
  /**
   * 获取项目的接口信息.
   */
  router.get('/project/api', async (ctx, next) => {
    let blocksDir = global.workingRoot + '/src/api'
    let pages = []
    apiList = await fileDisplay(blocksDir)
    let result = {
      ret: 1,
      data: apiList
    }
    ctx.response.body = result
  })
  /**
   * 获取项目的 package.json 文件信息.
   */
  router.get('/project/package', (ctx, next) => {
    ctx.response.type = 'json';
    let projectPackageFile = path.resolve(global.workingRoot + `/package.json`)
    ctx.response.body = getFileResponse(projectPackageFile) || '{}'
  })
  /**
   * 获取包的最新版本。
   */
  router.post('/package/version', async (ctx, next) => {
    let body = ctx.request.body
    let packageName = body.packageName;
    var lastestVersion = shell.exec(`npm show ${packageName} version`, { silent: true }).stdout;
    ctx.response.body = JSON.stringify(lastestVersion)
  })
}
