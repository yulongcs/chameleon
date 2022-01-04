const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
const devConfig: DevConfig = require(`./${isProd ? 'prod' : 'dev'}`).default

export interface DevConfig {
  publicHost: string
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
