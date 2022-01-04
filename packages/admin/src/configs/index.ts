const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
const devConfig: DevConfig = require(`./${isProd ? 'prod' : 'dev'}`).default
// const devConfig: DevConfig = require(`./${isProd ? 'dev' : 'prod'}`).default

export interface DevConfig {
  publicHost: string
  mlApiBaseUrl: string
  topicBaseUrl: string
  loginIframeSrc: string
  fileHost: string
}

export interface Config extends DevConfig {
  isDev: boolean
  isProd: boolean
  routerBasename: string
}

const config: Config = {
  ...devConfig,
  isDev,
  isProd,
  routerBasename: isDev ? '/admin/' : '/admin/',
}

export default config
