import React, {Suspense} from 'react'
import langStore from 'src/stores/page/lang'
import {loadLazyComponent} from '../utils/componentLoader'
import {getCommonProps} from '../utils/propsHelper'
import {renderMethod} from '../utils/renderLoader'

export const getChildNodeCommonProps = (node: TreeNodeProps, mockData: any) => {
  const lang = langStore.langKvs[node.id] || {}
  return JSON.parse(
    JSON.stringify({
      node,
      ...lang,
      ...getCommonProps(),
      empLangKvs: langStore.langKvs || {},
      mockData,
    }),
  )
}

/**
 * 预览组件使用
 * @param rm
 * @param id
 * @returns
 */
export const dynamicPreviewComponent = async (rm: TreeNodeRemoteModule, id: string) => {
  // TODO 需要更改
  const moduleComponent = loadLazyComponent(rm)
  const prootypeObject = (await moduleComponent()).default.empPropTypes
  const Component = React.lazy(moduleComponent)
  const props = prootypeObject?.props || {}
  const tmpProps: any = {}
  Object.keys(props).map((key: string) => {
    tmpProps[key] = props[key].value
  })
  renderMethod(
    <Suspense fallback={''}>
      <Component {...tmpProps} {...getCommonProps()}></Component>
    </Suspense>,
    document.getElementById(id),
  )
  return prootypeObject
}
