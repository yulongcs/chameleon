class SampleBusClass {
  listener: Record<string, Array<(value: any) => void>> = {}
  addEventListener(key: string, callback: (value: any) => void) {
    this.listener[key] = this.listener[key] || []
    const result = this.listener[key].some((cb: (value: any) => void) => {
      if (cb === callback) {
        return true
      }
    })
    if (!result) {
      this.listener[key].push(callback)
    }
  }
  dispatchEvent(key: string, value: any) {
    const list = this.listener[key] || []
    list.forEach((callback: (value: any) => void) => {
      setTimeout(() => {
        callback && callback(value)
      }, 0)
    })
  }
}

const SampleBus = (window.top as any).SampleBus || new SampleBusClass()
;(window.top as any).SampleBus = SampleBus

export {SampleBus}
