import config from 'src/configs'
import pageStore from 'src/stores/page'
import {EnumDevice, EnumPlatformEnv} from 'src/types/type'

export function queryParamsByKey(key: string): any {
  return new URLSearchParams(window.location.search || window.location.hash.replace(/(.)+\?/, '?')).get(key)
}

type Params = {
  env?: EnumPlatformEnv
  edit?: boolean
  device?: EnumDevice
}

export const getIframeUrl = (id: string, {env, edit, device}: Params) => {
  const inputParamsStr = sessionStorage.getItem(id) || ''
  const editStr = [
    edit ? 'edit=' + edit : '',
    device ? 'device=' + device : '',
    env ? 'env=' + (env === 'dev' ? 'test' : env) : '',
    `remoteEnv=${window.__EMP?.globalParams.remoteEnv}`,
  ]
    .filter(item => item)
    .join('&')

  const search = editStr && inputParamsStr ? `${editStr}&${inputParamsStr}` : editStr || inputParamsStr
  const url = `${window.location.origin}/${id}${search ? `?${search}` : ''}`
  // if (config.env === EnumPlatformEnv.dev) {
  //   return `https://${window.location.host}:4444/${id}${search ? `?${search}` : ''}`
  // }
  return url
}

export const getIframeUrlProd = (id: string, {env, edit, device}: Params) => {
  const inputParamsStr = sessionStorage.getItem(id) || ''
  const editStr = [
    edit ? 'edit=' + edit : '',
    device ? 'device=' + device : '',
    env ? 'env=' + (env === 'dev' ? 'test' : env) : '',
  ]
    .filter(item => item)
    .join('&')

  const projectOrigin = (pageStore.pageContent?.extendTopic || window.__extendTopic || {}).projectOrigin
  const search = editStr && inputParamsStr ? `${editStr}&${inputParamsStr}` : editStr || inputParamsStr
  const url = `${projectOrigin || window.location.origin}/${id}${search ? `?${search}` : ''}`
  return url
}

export function getInjectProjectId() {
  const result = window.location.hash.match(/#\/(.*)/)
  const [id] = (result && result.length >= 1 && result[1].split('?')) || []
  return (id && id.split('/').pop()) || ''
}
