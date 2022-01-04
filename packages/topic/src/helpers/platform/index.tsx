import config from 'src/configs'
import {EnumPlatformEnv} from 'src/types/type'
import {initBaiduReport} from '../report/baiduReport'

export const initPlatformEvent = () => {
  if (config.env === EnumPlatformEnv.prod) {
    initBaiduReport()
  }
}
