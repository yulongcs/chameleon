import React from 'react'
import {Modal, ModalFuncProps} from 'antd'
import {EditPanel} from './EditPanel'
import style from './utils.module.scss'
import {shareModuleStore} from 'src/stores'
import treeStore from 'src/stores/page/tree'
import {loadModulePrototype} from 'src/engineModule/utils/componentLoader'
export const getInitialValuesByTreeNode = (propList: Array<EmpPropTypesPropConfig & {name: string}>) => {
  const kvs = {} as Record<string, any>
  propList.map((item: EmpPropTypesPropConfig & {name: string}) => {
    kvs[item.name] = item.value || item.defaultValue
  })
  return kvs
}

export const getItemsFromProps = async (node: TreeNodePropsInEdit) => {
  const items = []
  const empPropTypes = await loadModulePrototype(node.rm.rmn, node.rm.rmp)
  for (const [key, value] of Object.entries({...node.props, ...(empPropTypes.props as Record<string, any>)} || {})) {
    items.push({
      name: key,
      ...value,
    })
  }
  return {
    props: items.filter(item => item.type),
    defined: empPropTypes.defined || {},
  }
}

export const getItemsFromMockData = async (node: TreeNodePropsInEdit) => {
  if (node.rm.rmp === './EMPAppContainer') {
    return []
  }
  const empPropTypes = await loadModulePrototype(node.rm.rmn, node.rm.rmp)
  return empPropTypes?.mockDatas
}

export const showEditModalByTreeNode = async (node: TreeNodePropsInEdit, modalProps?: ModalFuncProps) => {
  let treeNode = {...node}
  if (!treeNode.id) {
    // 从组件库选择
    treeNode = await treeStore.createTreeNode(node)
  }
  const modal = Modal.confirm({
    content: <EditPanel node={treeNode} />,
    visible: true,
    icon: null,
    className: style.modal,
    ...modalProps,
    onOk: () => {
      modalProps?.onOk && modalProps.onOk(treeNode)
    },
  })
  return modal
}
export const showEditModalByRemote = async (rm: TreeNodePropsInEdit['rm'], modalProps?: ModalFuncProps) => {
  const node = (await shareModuleStore.getTreeNodePropsByRemote(rm)) as TreeNodePropsInEdit
  return node && showEditModalByTreeNode(node, modalProps)
}
