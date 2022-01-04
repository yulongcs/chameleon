import {baiduEventReport, initBaiduReport} from 'src/helpers/report/baiduReport'
import {queryParamsByKey} from 'src/helpers/urlUtil'
import pageStore from 'src/stores/page'
import {EnumPageEnv} from 'src/types/type'

export const setTitle = (title: string) => {
  document.title = title || ''
}

export const openVConsole = (() => {
  let hasCreate = false
  return () => {
    if (hasCreate) {
      return
    }
    hasCreate = true
    const vc = Boolean(queryParamsByKey('vc'))
    if (vc && !window.VConsole) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/vconsole/dist/vconsole.min.js'
      script.onload = () => {
        new window.VConsole()
      }
      document.body.appendChild(script)
    }
    const eruda = Boolean(queryParamsByKey('eruda'))
    if (eruda) {
      const script = document.createElement('script')
      script.src = '//cdn.jsdelivr.net/npm/eruda'
      script.onload = function () {
        window.eruda.init()
      }
      document.body.appendChild(script)
    }
  }
})()

export const initPageReadyEvent = () => {
  const {edit, contentEnv} = pageStore
  openVConsole()
  setTimeout(() => {
    if (!edit && contentEnv === EnumPageEnv.prod && contentEnv === EnumPageEnv.prod) {
      initBaiduReport()
      const [contentTime, loadTime, type] = window._reportTimeList || []
      type && contentTime && loadTime && baiduEventReport([type, pageStore.id, '', loadTime - contentTime])
    }
  }, 0)
}
