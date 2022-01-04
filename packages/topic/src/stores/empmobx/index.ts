export {
  makeAutoObservable,
  observable,
  observe,
  onBecomeObserved,
  onBecomeUnobserved,
  empCreateClassStore,
  empCreateObjectStore,
  clearFrameMobx,
} from '@efox/emp-single-mobx6'

// const __WindowTopCache: any = ((window: any) => {
//   try {
//     console.warn('window.top.__empSameMobx', window.top.__empSameMobx)
//     if (window.top.__empSameMobx) {
//       const top: any = window.top
//       top.__mobx = top.__mobx || {}
//       console.log('single mobx: 创建共享数据')
//       return top.__mobx
//     } else {
//       console.log('single mobx: 独立创建数据')
//       window.__mobx = window.__mobx || {}
//       return window.__mobx
//     }
//   } catch (e) {
//     console.log('single mobx: catch 独立创建数据')
//     window.__mobx = window.__mobx || {}
//     return window.__mobx
//   }
// })(window)

// const FramePrefix = 'frame_'
// const getNameSpace = (name: string, inWindow: boolean) => {
//   if (inWindow) {
//     return `${name}`
//   }
//   if (window.top !== window) {
//     return `${FramePrefix}${window.name}_${name}`
//   }
//   return `${name}`
// }

// import {makeAutoObservable, observable, observe, onBecomeObserved, onBecomeUnobserved, toJS} from 'mobx'
// function empCreateClassStore<T>(Ctor: {new (...args: any[]): any}, namespace?: string): T {
//   namespace = namespace || Object.keys(Ctor.prototype).join('-').substr(0, 30)
//   // console.warn('create', namespace, __WindowTopCache[namespace])
//   namespace = getNameSpace(namespace, __WindowTopCache[namespace])
//   const clazz = __WindowTopCache[namespace] || new Ctor()
//   clazz.__name = namespace
//   __WindowTopCache[namespace] = clazz
//   return clazz
// }

// function empCreateObjectStore<T>(obj: Record<any, any> & T, namespace?: string): T & {__name: string} {
//   namespace = namespace || Object.keys(obj).join('-').substr(0, 30)
//   namespace = getNameSpace(namespace, __WindowTopCache[namespace])
//   const clazz: typeof obj & {__name: string} = __WindowTopCache[namespace] || observable(obj)
//   clazz.__name = namespace
//   if (!__WindowTopCache[namespace]) {
//     observe(clazz, (change: any) => {
//       // SampleBus.dispatchEvent(clazz.__name, change)
//       return change
//     })
//   }
//   __WindowTopCache[namespace] = clazz
//   return clazz
// }

// function clearFrameMobx() {
//   Object.keys(__WindowTopCache).map((key: string) => {
//     if (key.indexOf(FramePrefix) !== -1) {
//       delete __WindowTopCache[key]
//       console.log('single mobx: remove', key)
//     }
//   })
//   console.log('single mobx: remove', Object.keys(__WindowTopCache))
// }

// export {
//   makeAutoObservable,
//   empCreateClassStore,
//   observe,
//   onBecomeObserved,
//   onBecomeUnobserved,
//   observable,
//   empCreateObjectStore,
//   toJS,
//   clearFrameMobx,
// }
