const {ProjectConfig} = require('./empconfig/project-config.js')
const mf = require('./empconfig/mf')
const fs = require('fs')
const {EmpPluginShareModule, getUnpkgVersion} = require('@efox/emp-sharemf-exposes-plugin')
const {resolveApp} = require('@efox/emp-cli/helpers/paths')
const package = require(resolveApp('package.json'))

const httpsPort = process.env.SERVER_PORT
// const unpkgUrl = empEnv => {
//   const {test, prod, xyVersion} = getUnpkgVersion(process.env.NEXT_VERSION || package.version)
//   return empEnv !== 'dev'
//     ? `https://unpkg.yy.com/${package.name}@${empEnv === 'test' ? test : prod}/dist/`
//     : `${ProjectConfig.context}`
// }
let destOrigin = ''
/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
module.exports = {
  webpack({webpackEnv, empEnv, config, webpackChain}) {
    const isDev = empEnv === 'dev'
    const origin = ProjectConfig[empEnv]
    const tmpUrl = new URL(origin)
    const host = tmpUrl.hostname
    const port = httpsPort || tmpUrl.port || 8899
    destOrigin = `//${host}:${port}/`

    webpackChain.devServer.host(host)
    webpackChain.devServer.port(port)

    httpsPort &&
      webpackChain.devServer.https({
        key: fs.readFileSync('cert/cert.key'),
        cert: fs.readFileSync('cert/cert.crt'),
      })

    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        ...{
          title: '基础组件',
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
      }
      return args
    })
    webpackChain.plugin('exposemodule').use(EmpPluginShareModule, [ProjectConfig])
    return {
      output: {
        // publicPath: empEnv === 'dev' ? destOrigin : `${unpkgUrl(empEnv)}`,
      },
    }
  },
  moduleGenerator({empEnv}) {
    return {
      asset: {
        // publicPath: empEnv === 'dev' ? destOrigin : `${unpkgUrl(empEnv)}`,
      },
    }
  },
  moduleFederation({empEnv}) {
    return mf(empEnv)
  },
}
