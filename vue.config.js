const path = require('path')

module.exports = {
  chainWebpack: config => {
    // 别名配置
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('~', path.resolve('packages'))
      .set('~d', path.resolve('docsText'))
    // lib目录是组件库最终打包好存放的地方，不需要eslint检查
    // docs是存放md文档的地方，也不需要eslint检查
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .exclude.add(path.resolve('docs'))
      .end()
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
        require('path').resolve(__dirname, './webpack/markdown-loader.js')
      )
      .end()
  }

}
