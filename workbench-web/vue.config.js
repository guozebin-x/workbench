let options = {
  lintOnSave: false,
  devServer: {
    open: true, // 启动后打开浏览器。
    host: 'localhost.yunshanmeicai.com',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: "http://localhost:10000",
        changeOrigin: true
      }
    }
  }
}


module.exports = options
