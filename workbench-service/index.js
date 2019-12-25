const chalk = require('chalk');
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const opener = require("opener");
const staticAssets = require("koa-static");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const { getFilesByDir } = require("./libs/util");
const appConfig = require("./config/app.config.js");

// TODO:
// 临时支持单独启动。
if (!global.workingRoot) {
  global.workingRoot = '/Users/guozebin/Desktop/vue-h5-common'
}

const app = new Koa();
const router = new Router({
  prefix: "/api"
});

// 动态注册路由
let routerFiles = getFilesByDir(
  path.resolve(__dirname, "./routers"),
  fileInfo => !fileInfo.isDirectory()
);
routerFiles.forEach(routerFileName => {
  require("./routers/" + routerFileName)(router);
});

app
  .use(cors())
  .use(bodyParser())
  .use(staticAssets(__dirname + "/static/"))
  .use(router.routes())
  .use(router.allowedMethods());

let port = 0;
if (process.env.NODE_ENV == 'development') {
  port = 3001

} else {
  port = appConfig["port"]
}
app.listen(port);
console.log(chalk.green('rad-cli server started.'))
console.log(chalk.yellow('http://localhost:' + port))
// opener('http://localhost:' + port)