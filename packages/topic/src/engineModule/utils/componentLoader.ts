import {getCacheModuleMap} from './createScript'
import {loadScript} from './scriptLoader'

/**
 *
 * @param moduleName 项目模块名
 * @param componentName 组件名
 * @returns {} 组件protoType对象
 */
export const loadModulePrototype = async (moduleName: string, componentName: string) => {
  return new Promise<any>(async resolve => {
    try {
      loadScript([moduleName], async () => {
        const container: shareModuleObject | undefined = await loadShareModule(moduleName)
        const module: any = container && (await loadModuleFactory(container, componentName))
        if (module) {
          const retValue = {
            ...(module.default.empPropTypes || {}),
          }
          resolve(retValue)
        } else {
          resolve({})
        }
      })
    } catch (e) {
      resolve({})
    }
  })
}

export const loadModuleFactory = async (container: shareModuleObject, componentName: string) => {
  try {
    const factory = await container.get(componentName)
    const Module = factory()
    return Module
  } catch (e) {
    console.error('loadModuleFactory exception : ', componentName, e)
    return null
  }
}

export const loadShareModule = async (projectName: string) => {
  await __webpack_init_sharing__('default')
  const container: shareModuleObject | undefined = (window as any)[projectName]
  if (!container) {
    console.error('加载组件模块失败', projectName)
    return
  }
  //缓存处理
  if ((container as any).hasInit) {
    return container
  }
  try {
    await container.init(__webpack_share_scopes__.default)
    ;(container as any).hasInit = true
  } catch (e) {
    console.error('__webpack_share_scopes__ exception', e)
  }
  return container
}

export const loadScriptElement = (rm: TreeNodeRemoteModule) => {
  return new Promise(resolve => {
    loadScript([rm], async () => {
      resolve(true)
    })
  })
}

/**
 *
 * @param moduleName 模块名
 * @param componentName 组件名
 * @returns
 */
export const loadLazyComponent = (rm: TreeNodeRemoteModule) => {
  const {rmp: componentName} = rm
  return async () => {
    if (!getCacheModuleMap(rm.rmn)) {
      await loadScriptElement({...rm})
    }
    const container: shareModuleObject | undefined = await loadShareModule(rm.rmn)
    return container
      ? (await loadModuleFactory(container, componentName)) || import('../components/EMPErrorComponent')
      : import('../components/EMPErrorComponent')
  }
}
