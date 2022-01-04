import {findNodeById} from 'src/engineModule/utils/nodeHelper'
import {setSelectBoxsStyle} from 'src/engineModule/utils/tipsStyleHelper'
import pageStore from 'src/stores/page'
import langStore from 'src/stores/page/lang'
import treeStore from 'src/stores/page/tree'
import {debounce} from '../timerUtil'
import {windowMemoryInstance} from '../watchClickEvent'
import {getFrameObject} from './render'
let id = ''

let iframeDocument: any = null
const seachAllDom = () => {
  return iframeDocument?.body?.querySelectorAll('[id*=App]') || []
}

const debounceFunction = debounce(() => {
  iframeDocument && setSelectBoxsStyle(id, iframeDocument)
  const node = findNodeById(id, JSON.parse(JSON.stringify(treeStore.rootChsList)))
  node && treeStore.setCurTreeNode(node)
  windowMemoryInstance.callback?.()
}, 10)

const addDomEventListener = () => {
  const domList = [].concat(...(seachAllDom() || []))
  domList?.map((item: HTMLElement) => {
    const dom = iframeDocument?.getElementById(item.id)
    if (!dom.hasSetClick) {
      dom.hasSetClick = true
      dom.addEventListener(
        'click',
        (ev: any) => {
          ev.preventDefault()
          id = ev.currentTarget.id
          debounceFunction()
        },
        true,
      )
    }
  })
}

const initDomClickListener = () => {
  const frameObject = getFrameObject()
  iframeDocument = frameObject.contentDocument
  addDomEventListener()
  const mo = new MutationObserver(addDomEventListener)
  iframeDocument?.body &&
    mo.observe(iframeDocument?.body, {
      childList: true,
      subtree: true,
      // characterData: true,
      // attributes: true,
      // attributeFilter: ['data-slot'],
    })
}

/**
 * 监听localstore数据变化
 */
export const addStoreEventListener = () => {
  window.addEventListener('storage', (ev: StorageEvent) => {
    if (ev.key?.startsWith('__EMP_globalStore')) {
      const globalStore = JSON.parse(sessionStorage.getItem('__EMP_globalStore') || '{}')
      const {id, content, pageContent, lang, device, env, edit} = globalStore
      Promise.all([
        pageStore.setContent(id, pageContent, content, env, device, edit),
        langStore.initLangKvsAndId(lang.sectionId, lang.value),
      ])
    }
  })
}

export const initEditListener = () => {
  initDomClickListener()
}
