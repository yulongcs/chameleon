import {configType} from './dev'

type ExtraType = {
  env: string
}
const env = process.env.EMP_ENV || 'prod'

const config: configType & ExtraType = require(`./${process.env.EMP_ENV || 'prod'}`).default

config.env = env
export default config
