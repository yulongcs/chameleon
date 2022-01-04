const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {ModuleFederationPlugin} = webpack.container
const {TuneDtsPlugin} = require('@efox/emp-tune-dts-plugin')
const {ProjectConfig} = require('./empconfig/project-config.js')
const mf = require('./empconfig/mf')

const {resolveApp} = require('@efox/emp-cli/helpers/paths')
const {EmpPluginShareModule, getUnpkgVersion} = require('@efox/emp-sharemf-exposes-plugin')
const {getContent, writeFile} = require('./src/plugins/EmpPluginCombineDeclare/index.js')
const package = require(resolveApp('package.json'))

const httpsPort = process.env.SERVER_PORT
/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
module.exports = {
  webpack({webpackEnv, empEnv, webpackChain, config}) {
    console.log('env:', empEnv, 'webpackEnv:', webpackEnv, 'build_version:', package.version)
    const isDev = empEnv === 'dev'
    const origin = ProjectConfig[empEnv]
    const tmpUrl = new URL(origin)
    const host = tmpUrl.hostname
    const port = httpsPort || 8888

    webpackChain.entry('engine').add('src/index').end()
    webpackChain.entry('app').add('src/app').end()

    webpackChain.devServer.host(host)
    webpackChain.devServer.port(port)

    httpsPort &&
      webpackChain.devServer.https({
        key: fs.readFileSync('cert/cert.key'),
        cert: fs.readFileSync('cert/cert.crt'),
      })

    const base64Value = Buffer.from(
      JSON.stringify({
        HTTP_API: 'https://multi-lang.yy.com',
        HTTP_API_TEST: 'https://multi-lang-test.yy.com',
        EMP_ENV: empEnv,
      }),
    ).toString('base64')

    const EmpDefaultValue = {
      commonValue: `window.atob('${Buffer.from(
        `window.__EMP_DEFAULT_VALUE = JSON.parse(window.atob('${base64Value}'))`,
      ).toString('base64')}')`,
    }

    // 配置 engine.html
    webpackChain.plugin('html').use(HtmlWebpackPlugin, [
      {
        title: 'EMP低代码',
        template: 'public/index.html',
        ...EmpDefaultValue,
        files: {},
        publicPath: empEnv === 'dev' ? `auto` : `${ProjectConfig.context}`,
        filename: `index.html`,
        // chunks: ['engine'],
        excludeChunks: ['index', 'app', 'chameleonapp'],
        inject: false,
        minify: !isDev
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      },
    ])

    // 配置 editor.html
    webpackChain.plugin('html-editor').use(HtmlWebpackPlugin, [
      {
        title: 'EMP低代码',
        template: 'template/editor.html',
        publicPath: empEnv === 'dev' ? `auto` : `${ProjectConfig.context}`,
        ...EmpDefaultValue,
        files: {},
        filename: `editor/index.html`,
        // chunks: ['app'],
        excludeChunks: ['index', 'engine', 'chameleonapp'],
        minify: !isDev
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      },
    ])

    webpackChain.plugin('exposemodule').use(EmpPluginShareModule, [ProjectConfig])

    webpackChain
      .plugin('IgnorePlugin')
      .use(new webpack.IgnorePlugin({resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/}))

    webpackChain.plugin('chameleon').use(ModuleFederationPlugin, [
      {
        filename: 'chameleonapp.js',
        // 唯一ID，用于标记当前服务
        name: 'chameleonapp',
        // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
        exposes: {
          './types/type': './src/types/type.ts',
        },
        shared: {
          // ...package.dependencies,
          react: {
            // eager: true,
            singleton: true,
            requiredVersion: package.dependencies.react,
          },
          'react-dom': {
            // eager: true,
            singleton: true,
            requiredVersion: package.dependencies['react-dom'],
          },
        },
      },
    ])

    // 生成index.d.ts到public
    createName = 'index.d.ts'
    createPath = resolveApp('dist')
    webpackChain
      .plugin('tunedts')
      .use(TuneDtsPlugin)
      .tap(args => {
        args[0] = {
          ...args[0],
          ...{
            output: path.join(createPath, createName),
            path: createPath,
            name: createName,
            operation: fileData => {
              writeFile()
              fileData = fileData + '\n' + getContent()
              return fileData
            },
          },
        }
        return args
      })
    return {
      output: {},
    }
  },
  moduleFederation({empEnv}) {
    return mf(empEnv)
  },
}
