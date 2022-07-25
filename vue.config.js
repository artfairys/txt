const path = require('path')

module.exports = {
	    devServer : {
	        hot:true,//自动保存
	        open : true,//自动启动
	        port : 9000,//默认端口号
	        host : "0.0.0.0"
	    },
	publicPath: './', //打包后的位置(如果不设置这个静态资源会报404)
	outputDir: 'dist', //打包后的目录名称
	assetsDir: 'static', //静态资源目录名称
	// dev: {
	//     env: require('./dev.env'),
	//     port: 8080,
	//     autoOpenBrowser: true,
	//     assetsSubDirectory: 'static',
	//     assetsPublicPath: '/',
	//     proxyTable: {
	//          '/api': {
	//               target: 'https://api.yimian.xyz/mail',
	//               changeOrigin: true,
	//               pathRewrite: {
	//                 '^/api': '/' 
	//               }
	//             }
	//     },
	//   }
}
