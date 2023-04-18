const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer:{
    //跨域配置
    proxy:{
      "/api":{
        target:"http://192.168.96.211:8080",
        changeOrigin:true,
        pathRewrite:{
          "^/api":""
        },
        withCredentials: true
      }
    }
  }
})
