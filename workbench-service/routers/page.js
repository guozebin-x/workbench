const fs = require('fs')
const path = require('path')
const shell = require('shelljs');
const {
  connectJsonDB,
  writeFile,
  makesureDirExists,
  fsExistsSync,
  getFileResponse
} = require('../libs/util')

const appConfig = require("../config/app.config.js");

module.exports = function (router) {

	/**
	 * 创建页面.
	 */
  router.post('/page/create', async (ctx, next) => {
    let body = ctx.request.body
    let pageName = body.name
    // 保存到项目目录
    let pageSrcDir = global.workingRoot + `/src/pages/${pageName}/`
    makesureDirExists(pageSrcDir)
    

    // 注入路由信息。
    const routerPath = global.workingRoot + '/src/config/router.js'
    let routerCode = fs.readFileSync(routerPath, 'utf-8')
    let routerPathRegex = RegExp(`path:\\s+'\\/${pageName}'`);
    let writeResult = false
    if (!routerPathRegex.test(routerCode)) {
      let routerJsonRegex = /(const\s+myRoutes\s+\=\s+\[[\s\S]+)\]/m;
      let newRouterCode = `{
  path: '/${pageName}',
  component: HeaderLeftMainLayout,
  children: [
    {
      path: '',
      component: () => import('../pages/${pageName}')
    }
  ]
}`
      routerCode = routerCode.replace(
        routerJsonRegex,
        '$1, ' + newRouterCode + ']'
      )
      writeResult = await writeFile(
        routerPath,
        routerCode
      )
    }

    ctx.response.body = [writeIndexJSResult, writeIndexVueResult, writeResult, writeMenuResult]
  })
}
