module.exports = {
    devServer: {
        port: 5520,  //前端端口号
        host: 'localhost',  //主机名
        https: false,
        open: true,  //启动服务时自动打开浏览器

        // proxy是代理  其内容主要是为了解决*跨域问题*
        proxy: {
            // 替换所有以'/dev-api'开始的地址
            // process.env.VUE_APP_BASE_API 相当于 '/dev-api'（在常量中已经定义完成了）

            // 匹配以'/dev-api'开头的请求
            [process.env.VUE_APP_BASE_API]: {

                // 目标服务器：'http://localhost:3000'（就是后端接口）
                target: process.env.VUE_APP_SERVICE_URL,
                changOrigin: true,  //开启代理
                pathRewrite: {
                    /* 将'/dev-api'替换为空串''
                       将'http://localhost:8001/dev-api/db.json'
                       替换为'http://localhost:8001/db.json'
                    */
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    lintOnSave: false,  //关闭代码风格检查
    productionSourceMap: false   // 不生成.map文件
}