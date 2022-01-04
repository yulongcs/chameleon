export const loadModuleFactory = (container: any, componentName: string) => {
  return async () => {
    const factory = await container.get(componentName)
    const Module = factory()
    return Module
  }
}
