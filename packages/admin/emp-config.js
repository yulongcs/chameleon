const {ProjectConfig} = require('./empconfig/project-config.js')
const mf = require('./empconfig/mf')
const fs = require('fs')

/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
module.exports = {
  webpack({webpackEnv, empEnv, config, webpackChain}) {
    const origin = ProjectConfig[empEnv]
    const tmpUrl = new URL(origin)
    const host = tmpUrl.hostname
    const port = tmpUrl.port || 443

    webpackChain.devServer.host(host)
    webpackChain.devServer.port(port)

    webpackChain.devServer.https({
      key: fs.readFileSync('cert/cert.key'),
      cert: fs.readFileSync('cert/cert.crt'),
    })

    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        ...{
          title: 'EMP低代码平台',
        },
      }
      return args
    })
    return {
      output: {
        publicPath: empEnv === 'dev' ? `/` : `${ProjectConfig.context}`,
      },
    }
  },
  moduleGenerator({empEnv}) {
    const origin = ProjectConfig[empEnv]
    return {
      asset: {
        publicPath: empEnv === 'dev' ? `/` : `${ProjectConfig.context}`,
      },
    }
  },
  moduleFederation({empEnv}) {
    return mf(empEnv)
  },
}
