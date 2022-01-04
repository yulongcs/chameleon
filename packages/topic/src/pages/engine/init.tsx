import React from 'react'
import EMPAppContainerNew from 'src/engineModule/components/EMPAppContainerNew'
import {findNodeById} from 'src/engineModule/utils/nodeHelper'
import {renderMethod, unmountComponentAtNode} from 'src/engineModule/utils/renderLoader'
import {transformStyle, transformStyleToString} from 'src/engineModule/utils/styleHelper'
import {getUserAgentDevice} from 'src/helpers/device'
import {queryParamsByKey} from 'src/helpers/urlUtil'
import {getMergePageModuleConfigs} from 'src/stores/sharemodule/moduleconfigs'
import {EnumDevice} from 'src/types/type'

const getEMPStore = () => {
  return window.__EMP.globalStore
}

export const renderSlotComponentByIdNew = async (oldId: string, newId: string) => {
  // TODO
  if (!newId) {
    return
  }
  const node: any = findNodeById(newId, JSON.parse(JSON.stringify(getEMPStore().renderData.data)))
  if (!node) {
    console.log('node节点未找到', newId)
    return
  }
  initDom(node.chs, newId)
  initRenderComponent(node.chs)
}

export const getCommonProps = () => {
  const mock = getEMPStore().edit ? true : queryParamsByKey('mock') ? true : false
  const device = getEMPStore().edit
    ? getEMPStore().device
    : getEMPStore().device === EnumDevice.other
    ? EnumDevice.other
    : getUserAgentDevice()
  return {
    env: getEMPStore().env,
    device,
    mock,
    edit: !!getEMPStore().edit,
  }
}

const nodeCache: Record<string, any> = (() => {
  window.__EMP_NODE_CACHE = window.__EMP_NODE_CACHE || {}
  return window.__EMP_NODE_CACHE
})()

const childrenNodeProps = (node: TreeNodeProps, mockData: any) => {
  const lang = getEMPStore()?.lang?.value?.[node.id] || {}
  return {
    ...lang,
    ...getCommonProps(),
    key: node.id,
  }
}

export const getCurrentNodeProps = (node: TreeNodeProps, mockData: any) => {
  if (nodeCache[node.id] && !getEMPStore().edit) {
    return nodeCache[node.id]
  }
  const lang = getEMPStore()?.lang?.value?.[node.id] || {}
  node.chs?.map((item: TreeNodeProps, index: number) => {
    ;(node.chs as any)[index] = {...item, ...childrenNodeProps(item, null)}
  })
  nodeCache[node.id] = {
    node,
    ...lang,
    ...getCommonProps(),
    empLangKvs: getEMPStore()?.lang?.value || {},
    mockData,
    key: node.id,
  }
  return nodeCache[node.id]
}

export const cacheComponentAdapter = function (scope: string, componentName: string, component?: string) {
  const key = (scope + '_' + componentName).replace(new RegExp('./', 'ig'), '_')
  if (component) {
    window.__EMP.globalComponentCache[key] = component
  }
  return window.__EMP.globalComponentCache[key]
}

export const awaitGetComponent: any = function (scope: string, compName: string) {
  const promise = new Promise(async function (resolve) {
    const cacheComponent = cacheComponentAdapter(scope, compName)
    if (cacheComponent) {
      return resolve(cacheComponent)
    }
    const empModule = window.__EMP.globalFunction.getScriptModules(scope)
    empModule.containerQueue.push(async function () {
      const component = (await empModule.container.get(compName))()
      cacheComponentAdapter(scope, compName, component)
      resolve(component)
    })
  })
  window.__EMP.globalFunction.onContainerQueueAction(scope)
  return promise
}

const createDivDom = (treeList: Array<TreeNodeProps>) => {
  const deepTraverseTree = (chs: Array<TreeNodeProps>) => {
    const reuslt = chs?.map((item: TreeNodeProps) => {
      const props = getCurrentNodeProps(item, null)
      return (
        <EMPAppContainerNew {...props} key={item.id} serializeId={true}>
          {/* {item.chs && deepTraverseTree(item.chs)} */}
        </EMPAppContainerNew>
      )
    })
    return reuslt
  }
  return deepTraverseTree(treeList)
}

export const createAppDom = (treeList: Array<TreeNodeProps>, parentId: string) => {
  renderMethod(createDivDom(treeList), document.getElementById(parentId))
}

/**
 * 刷新并创建节点
 */
export const initDom = (treeList: Array<TreeNodeProps>, parentId: string) => {
  renderMethod(createDivDom(treeList), document.getElementById(parentId))
}

/**
 * 加载所有远端组件
 */
export const initEMPComponent = () => {
  const deepTraverseTree = (treeList: Array<TreeNodeProps>) => {
    treeList?.map((item: TreeNodeProps) => {
      setTimeout(() => {
        awaitGetComponent(item.rm.rmn, item.rm.rmp)
      }, 0)
      item.chs && deepTraverseTree(item.chs)
    })
  }
  deepTraverseTree(getEMPStore().renderData?.data?.[0]?.chs || [])
}

/**
 * 初始化远端标签
 */
export const initEMPModles = () => {
  const remoteEnv = window.__EMP.globalFunction.getRemoteEnv()
  const {list} = getMergePageModuleConfigs(getEMPStore().renderData?.empModules)
  list?.map(function (item: TreeNodeRemoteModule) {
    window.__EMP.globalFunction.createScriptElement(item.rmn, item.unpkgUrlMap?.[remoteEnv], async () => {
      await __webpack_init_sharing__('default')
      // 初始化共享作用域（shared scope）用提供的已知此构建和所有远程的模块填充它
      const container = window[item.rmn] // 或从其他地方获取容器
      // 初始化容器 它可能提供共享模块
      container.init(__webpack_share_scopes__.default)
      container.hasInit = true
      window.__EMP.globalFunction.getScriptModules(item.rmn).container = container
      window.__EMP.globalFunction.onContainerQueueAction(item.rmn)
    })
  })
}

const resetStyle = (id: string) => {
  const dom = document.getElementById(id)
  if (dom) {
    const langStore = getEMPStore().lang.value
    const {empStyle = {}} = langStore[id] || {}
    const style = JSON.parse(JSON.stringify(transformStyle({...empStyle}, getEMPStore().device)))
    ;(dom as any).style.cssText = transformStyleToString(style)
  }
}

/**
 * 兼容旧组件使用children节点
 * @param childList
 * @returns
 */
const createChildrenComponent = async (childList: Array<TreeNodeProps>) => {
  const children: any = []
  for (let index = 0; index < childList.length; index++) {
    const chsItem = childList[index]
    const {id, rm, chs} = chsItem
    const props = getCurrentNodeProps(chsItem, null)
    const innerChildrenList = chs && (await createChildrenComponent(chs))
    const Component: any = React.lazy(() => {
      return awaitGetComponent(rm.rmn, rm.rmp)
    })
    children.push(
      <EMPAppContainerNew key={chsItem.id} {...props} serializeId={true}>
        <React.Suspense fallback={''}>
          <Component {...props} key={chsItem.id}>
            {innerChildrenList}
          </Component>
        </React.Suspense>
      </EMPAppContainerNew>,
    )
  }
  return children
}

export const renderNode = async (chsItem: TreeNodeProps, mockData?: any) => {
  chsItem = JSON.parse(JSON.stringify(chsItem))
  initEMPModles()
  const {id, rm, chs} = chsItem
  const dom = document.getElementById(id)
  if (!dom) {
    console.log('dom节点不存在', id)
    return
  }
  if (dom?.dataset.slot) {
    console.log('slot不处理', id)
    renderSlotComponentByIdNew('', id)
    return
  }
  const children = chs && createDivDom(chs)
  let Component: any = () => {
    return <>{children}</>
  }
  if (id !== 'App') {
    Component = React.lazy(async () => {
      return awaitGetComponent(rm.rmn, rm.rmp)
    })
  }
  const props = getCurrentNodeProps(chsItem, mockData)
  unmountComponentAtNode(dom)
  renderMethod(
    <EMPAppContainerNew serializeId={false} {...props} key={`${id}_${Date.now()}`}>
      <React.Suspense fallback={''}>
        <Component {...props}>{children}</Component>
      </React.Suspense>
    </EMPAppContainerNew>,
    dom,
    () => {
      setTimeout(() => {
        resetStyle(id)
      }, 50)
    },
  )
}

window.__EMP_EDIT = {
  renderNode,
}
export const initRenderComponent = async (treeList: any) => {
  treeList?.map(async (chsItem: TreeNodeProps) => {
    renderNode(chsItem)
  })
}
