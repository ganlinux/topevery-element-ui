const path = require('path')
const port = process.env.port || process.env.npm_config_port || 8066 // dev port

module.exports = {

  publicPath: './',
  outputDir: 'docs',
  assetsDir: 'static',
  productionSourceMap: false,

  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
    // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 别名配置
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('~packages', path.resolve('packages'))
      .set('~pu', path.resolve('packages/uitls'))
    // lib目录是组件库最终打包好存放的地方，不需要eslint检查
    // docs是存放md文档的地方，也不需要eslint检查
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .exclude.add(path.resolve('docs'))
      .end()
      // .exclude.add(path.resolve('packages'))
      // .end()
    // 处理 markdown 文件
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use('markdown-loader')
      .loader(
        require('path').resolve(__dirname, './webpack/index.js')
      )
      .end()
  }

}
