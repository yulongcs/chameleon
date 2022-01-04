import './index.scss'
import {initCssFunc} from 'src/engineModule/utils/flexibleHelper'
import {createAppDom, initEMPComponent, initEMPModles} from './init'

const NewIndex = () => {}
NewIndex.prototype.ready = () => {
  initCssFunc(window.__EMP.globalStore.device, window.__EMP.globalStore.renderData.designSize, {
    edit: window.__EMP.globalStore.edit,
    openScale: window.__EMP.globalStore.renderData.openScale,
  })
  const appChildren = window.__EMP.globalStore.renderData.data
  Promise.all([initEMPComponent(), initEMPModles(), createAppDom(appChildren, 'emp-root')])
}

/**
 * 初始化完成状态
 */
NewIndex.prototype.init = () => {
  window.__EMP.readyFunction = NewIndex.prototype.ready
  window.__EMP.ready && window.__EMP.readyFunction()
  setTimeout(() => {
    // 提供压测使用
    if (window.__EMP.globalParams.env === 'prod1' && !window.__EMP.globalParams.edit) {
      try {
        window.__EMP_SERVER_TEST_URLS.map((item: string) => {
          fetch(item.replace('https://multi-lang.yy.com/', 'https://multi-lang-edge.yy.com/')).catch(() => {})
        })
      } catch (e) {}
    }
  }, 5000)
}

export default NewIndex
