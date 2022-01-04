import ReactDOM from 'react-dom'
import {findNodeById} from 'src/engineModule/utils/nodeHelper'
import pageStore from 'src/stores/page'
import langStore from 'src/stores/page/lang'
import {EnumActionTypes, getParentId} from '../pages/engine/event/engineSignalUtil'
import {getFrameObject} from './edit/render'

const updateIframeStore = () => {
  let {globalStore} = getFrameObject().contentWindow.__EMP
  globalStore = {
    ...globalStore,
    lang: {
      ...globalStore.lang,
      value: {...langStore.langKvs},
    },
    renderData: {...pageStore.renderData},
    pageContent: {...pageStore.pageContent},
  }
  getFrameObject().contentWindow.__EMP.globalStore = globalStore
}

/**
 * @param data: 插入的数组位置，将会在当前位置前插入新节点。insertBefore(dom, data)
 * @param action: ActionTypes
 * @param id: 'App'单个
 */
export const sendRefreshSignal = (props: {data?: any; action: EnumActionTypes; id: string}) => {
  updateIframeStore()
  const {id, action, data} = props
  console.log('sendRefreshSignal', JSON.stringify(props, null, 2))
  const parentId: string = getParentId(id)
  const parentNode: TreeNodeProps | any = findNodeById(parentId, pageStore.renderData.data)
  const node: TreeNodeProps | any = findNodeById(id, pageStore.renderData.data)
  const frameObject = getFrameObject()
  const iframeDocument = frameObject.contentDocument
  switch (action) {
    case EnumActionTypes.Delete: {
      const dom = iframeDocument.getElementById(id)
      if (!dom) {
        console.log('dom节点不存在', id)
        return
      }
      if (dom) {
        const result = ReactDOM.unmountComponentAtNode(dom)
        if (!result) {
          frameObject.contentWindow.__EMP_EDIT.renderNode(parentNode)
        }
      }
      break
    }
    case EnumActionTypes.UpdateWithMockData: {
      frameObject.contentWindow.__EMP_EDIT.renderNode(node, data)
      break
    }
    case EnumActionTypes.Update: {
      if (node.defined?.slotsTab) {
        frameObject.contentWindow.__EMP_EDIT.renderNode(parentNode)
      } else {
        frameObject.contentWindow.__EMP_EDIT.renderNode(node)
      }
      break
    }
    case EnumActionTypes.Add: {
      frameObject.contentWindow.__EMP_EDIT.renderNode(parentNode)
      break
    }
    case EnumActionTypes.Move: {
      const index = data
      if (index !== -1) {
        const dom = iframeDocument.getElementById(id)
        const parentDom = iframeDocument.getElementById(parentId)
        if (parentDom && dom) {
          parentDom.insertBefore(dom, parentDom.children[index])
        }
      }
      break
    }
    case EnumActionTypes.ClearEmpModules: {
      frameObject.contentDocument.getElementById('emp-root').innerHTML = '<div id="App"></div>'
      break
    }
  }
}
