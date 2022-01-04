import {EnumDevice} from 'src/types/type'

export function isMobile() {
  const mobile = new RegExp(/mobile|iphone|QQ|weixin|micromessenger|yy/, 'ig')
  return mobile.test(window.navigator.userAgent)
}

export function isPc() {
  const pc = new RegExp(/pc|window|mac/, 'ig')
  return pc.test(window.navigator.userAgent)
}

export const getUserAgentDevice = () => {
  return (isMobile() && EnumDevice.mobile) || (isPc() && EnumDevice.pc) || EnumDevice.other
}

export const getCurrentDevice = () => {
  if (isPc()) {
    return EnumDevice.pc
  }
  if (isMobile()) {
    return EnumDevice.mobile
  }
  return EnumDevice.empty
}
