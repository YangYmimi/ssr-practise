// vue-ssr-server-bundle.json 用于服务器端插件
// vue-ssr-client-manifest.json 用于客户端插件
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  outputDir: `./dist/${target}/`,
  configureWebpack: {
    devtool: 'source-map',
    entry: `./src/entry-${target}.js`,
    target: TARGET_NODE ? 'node' : 'web',
    output: {
      // 使用 node 方式导出模块
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    externals: TARGET_NODE ? nodeExternals({
      // 不要外置化 webpack 需要处理的依赖模块。
      // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
      // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
      whitelist: /\.css$/
    }) : undefined,
    optimization: {
      splitChunks: undefined
    },
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ]
  },
  chainWebpack: config => {
    // For cli4
    if (TARGET_NODE) {
      config.optimization.delete('splitChunks')
    }

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        })
      })
  }
}