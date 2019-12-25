const path = require("path");
const {
  writeFile,
  getFileResponse
} = require("../libs/util");

module.exports = function (router) {
  router.get('/test', (ctx) => {
    ctx.response.body = global.workingRoot || '****'
  })
  /**
   * 获取文件内容。
   */
  router.post('/get-file-content', (ctx, next) => {
    let body = ctx.request.body
    ctx.response.body = getFileResponse(path.resolve(global.workingRoot + '/src', '.' + body.filePath));
  })
  /**
   * 保存文件内容。
   */
  router.post('/save-file-content', async (ctx, next) => {
    let body = ctx.request.body
    let writeResult = await writeFile(
      path.resolve(global.workingRoot + '/src', '.' + body.filePath),
      body.code
    )
    ctx.response.body = writeResult
  })
}
