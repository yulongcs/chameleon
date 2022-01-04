export const loadShareModule = async (projectName: string) => {
  return async () => {
    await __webpack_init_sharing__('default')
    const container: any = (window as any)[projectName]
    if (!container) {
      console.error('加载组件模块失败', projectName)
      return
    }
    await container.init(__webpack_share_scopes__.default)
    return container
  }
}
