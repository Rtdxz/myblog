'use strict'
module.exports = {
  devServer: {
    host: '0.0.0.0', // 允许外部ip访问
    port: 9080, // 端口
    https: false, // 启用https
    proxy: {
      '/api': {
        target: 'https://music.163.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
