import '@efox/emp-single-mobx6'
// try {
//   console.warn('window.top.__empSameMobx', window.top.__empSameMobx)
//   if (window.top.__empSameMobx) {
//     ;(window as any).__mobxGlobals = (window.top as any).__mobxGlobals || require('mobx')
//     console.warn('single mobx: mobxglobals共享成功')
//   } else {
//     ;(window as any).__mobxGlobals = require('mobx')
//     console.warn('single mobx: mobxglobals非共享')
//   }
// } catch (e) {
//   ;(window as any).__mobxGlobals = require('mobx')
//   console.warn('single mobx: catch mobxglobals非共享')
// }
