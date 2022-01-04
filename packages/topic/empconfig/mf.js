const empRemoteMd5 = require('@efox/emp-remote-md5')
const fse = require('fs-extra')
const path = require('path')
const packageInfo = require(path.resolve('./', 'package.json'))
const {ProjectConfig} = require('./project-config.js')
const localWorkspaceConfigPath = `mf-local-workspace.js` // 本地开发配置

module.exports = async env => {
  const isExists = await fse.pathExists(`${__dirname}/${localWorkspaceConfigPath}`)
  const configMap = {
    dev: isExists ? `./${localWorkspaceConfigPath}` : `./mf-development.js`,
    test: `./mf-development.js`,
    prod: `./mf-production.js`,
  }
  const config = require(configMap[env])
  // let mfConfig = await empRemoteMd5(config)
  let mfConfig = config
  mfConfig = {
    ...mfConfig,
    name: ProjectConfig.name,
    filename: `${ProjectConfig.filename}`,
    remotes: {
      ...(ProjectConfig.remotes || {}),
      ...(mfConfig.remotes || {}),
    },
    exposes: {
      ...(ProjectConfig.exposes || {}),
      ...(mfConfig.exposes || {}),
    },
    shared: {
      react: {
        // eager: true,
        // singleton: true,
        requiredVersion: packageInfo.dependencies.react,
      },
      'react-dom': {
        // eager: true,
        // singleton: true,
        requiredVersion: packageInfo.dependencies['react-dom'],
      },
      mobx: {
        // eager: true,
        // singleton: true,
        requiredVersion: packageInfo.dependencies.mobx,
      },
      'mobx-react': {
        // eager: true,
        // singleton: true,
        requiredVersion: packageInfo.dependencies['mobx-react'],
      },
      '@efox/emp-single-mobx6': {
        // singleton: true,
        requiredVersion: packageInfo.dependencies['@efox/emp-single-mobx6'],
      },
      '@babel-runtime': {},
    },
  }
  return mfConfig
}
