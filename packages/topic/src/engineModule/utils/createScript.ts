export const cacheRenderModuleMap: Record<string, boolean> = (() => {
  return {}
})()

export const getCacheModuleMap = (key: string) => {
  return getScriptModules(key).ready
}

export const clearCacheModuleMap = () => {
  Object.keys(cacheRenderModuleMap).map(item => {
    delete cacheRenderModuleMap[item]
  })
}

const getScriptModules = (name: string) => {
  return window.__EMP?.globalModules?.[name] || {}
}
