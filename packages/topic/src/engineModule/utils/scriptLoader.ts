import {EmpModuleConfigs} from 'src/stores/sharemodule/moduleconfigs'
const createScriptElement = window.__EMP.globalFunction.createScriptElement

export const loadScript = (sharenames: Array<string | TreeNodeRemoteModule>, callback: () => void) => {
  //sharenames为某个具体项目的配置数组
  const remoteEnv = window.__EMP.globalFunction.getRemoteEnv()
  JSON.parse(JSON.stringify(sharenames || [])).forEach(async (shareItem: TreeNodeRemoteModule) => {
    let tmpItem: any = shareItem
    if (Object.prototype.toString.call(shareItem).slice(8, -1) === 'String') {
      tmpItem = EmpModuleConfigs()[String(shareItem)] || {}
    }
    if (tmpItem.rmn === 'chameleon_share_emp') {
      tmpItem.unpkgUrlMap = {
        prod: 'https://unpkg.yy.com/@webbase/chameleonapp@1.0.24/dist/chameleon_share_emp.js',
        test: 'https://unpkg.yy.com/@webbase/chameleonapp@1.0.24/dist/chameleon_share_emp.js',
        dev: 'https://unpkg.yy.com/@webbase/chameleonapp@1.0.24/dist/chameleon_share_emp.js',
      }
    }
    tmpItem.rmn && createScriptElement(tmpItem?.rmn, tmpItem?.unpkgUrlMap?.[remoteEnv], callback)
  })
}
