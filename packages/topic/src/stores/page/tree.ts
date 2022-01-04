import {empCreateClassStore, makeAutoObservable} from 'src/stores/empmobx'
import langStore from './lang'
import {FormInstance} from 'antd'
import pageStore from 'src/stores/page/index'
import {loadModulePrototype} from 'src/engineModule/utils/componentLoader'
import {EnumActionTypes, getParentId} from 'src/pages/engine/event/engineSignalUtil'
import {findNodeById} from 'src/engineModule/utils/nodeHelper'
import editorStore from './editor'
import {sendRefreshSignal} from 'src/helpers/appSignaUtil'
import shareModuleStore from '../sharemodule'
import React from 'react'
import {observable} from 'mobx'
import {DefaultSlotItem} from './tree-const'
// 用于保存表单状态的formKey
export enum FormType {
  Props = 'props',
  Style = 'empStyle',
  Event = 'empEvent',
  Preview = 'preview',
}

class TreeStore {
  constructor() {
    makeAutoObservable(this)
  }
  get rootNode() {
    return pageStore.renderData?.data[0] as TreeNodePropsInEdit
  }

  get rootChsList() {
    return this.rootNode?.chs || []
  }
  // 当前选定
  get curParentList() {
    const parentNode = this.curTreeNode ? this.getParentNodeById(this.curTreeNode?.id) : this.rootNode
    return parentNode.chs
  }
  // 当前选定
  get curChsList() {
    if (this.curTreeNode && !this.curTreeNode?.chs) {
      this.curTreeNode.chs = []
    }
    return this.curTreeNode?.chs
  }

  curTreeNode: TreeNodePropsInEdit = this.rootNode

  setCurTreeNode(treeNode: TreeNodePropsInEdit) {
    this.curTreeNode = treeNode
  }
  resetCurTreeNode() {
    this.curTreeNode = this.rootNode
  }

  async createTreeNode(component: TreeNodePropsInEdit, parent = this.curTreeNode) {
    const treeNode = {...component}

    treeNode.id = `${!parent ? 'App' : parent.id}_${Math.floor(Math.random() * 10000)}`

    if (!component.props) {
      const props = await loadModulePrototype(treeNode.rm.rmn, treeNode.rm.rmp)
      // treeNode.props = props
    }

    return treeNode
  }

  getTopParentIsSlotNode(id: TreeNodePropsInEdit['id'], topNode?: Array<TreeNodeProps>) {
    let node = null
    topNode = topNode || pageStore.renderData.data
    topNode.some((item: TreeNodePropsInEdit | any) => {
      if (id.startsWith(item.id)) {
        if (item?.defined?.slots) {
          node = item
          return item
        }
        if (item.chs && item.chs.length) {
          node = this.getTopParentIsSlotNode(id, item.chs)
          if (node) {
            return true
          }
        }
      }
    })
    return node
  }

  getParentNodeById(id: TreeNodePropsInEdit['id']): TreeNodePropsInEdit {
    const parentId = getParentId(id)
    const parentNode = findNodeById(parentId, pageStore.renderData.data)
    return parentNode || this.rootNode
  }

  getTreeNodeDepends(treeNode: TreeNodePropsInEdit) {
    const res: string[] = []
    const get = (treeNode: TreeNodePropsInEdit, res: string[] = []) => {
      console.log(treeNode)
      res.push(treeNode.rm.rmn)
      treeNode.chs?.forEach((t: any) => t && get(t, res))
    }
    get(treeNode, res)
    return res
  }

  getParentInfo(id: TreeNodePropsInEdit['id']) {
    const parentNode = this.getParentNodeById(id)

    if (!parentNode?.chs) {
      parentNode.chs = []
    }
    const chsList = parentNode?.chs

    const index = chsList.findIndex((item: TreeNodeProps) => item.id === id)
    const node = chsList[index]
    return {index, chsList, parentNode, node}
  }

  getIndexById(id: TreeNodePropsInEdit['id']) {
    return this.getParentInfo(id).index
  }

  async addTreeNodeToParent(treeNode: TreeNodePropsInEdit) {
    const {chsList, parentNode, index} = this.getParentInfo(treeNode.id)
    // const result = this.getTopParentIsSlotNode(treeNode.id)
    if (treeNode.defined?.slots) {
      ;(await this.initSlotsTreeNode(treeNode)) as TreeNodePropsInEdit
    }
    if (index > -1) {
      chsList.splice(index, 0, treeNode)
    } else {
      chsList.push(treeNode)
    }
    editorStore.addTreeNodeRemotes(treeNode)
    sendRefreshSignal({
      // id: result ? parentNode.id : treeNode.id,
      id: treeNode.id,
      action: EnumActionTypes.Add,
    })
    this.resetCurTreeNode()
  }

  async updateTreeNodeById(id: TreeNodePropsInEdit['id'], treeNode?: TreeNodePropsInEdit) {
    const {index, chsList, parentNode, node} = this.getParentInfo(id)
    if (treeNode?.defined?.slots) {
      await this.initSlotsTreeNode(treeNode as TreeNodePropsInEdit)
    }
    treeNode = treeNode && JSON.parse(JSON.stringify(treeNode))
    if (index > -1 && treeNode) {
      chsList[index] = treeNode
    }
    console.log('----------updateTreeNode------------', id, parentNode, index, treeNode, chsList)
    sendRefreshSignal({
      id,
      action: EnumActionTypes.Update,
    })
    this.resetCurTreeNode()
  }

  async initSlotsTreeNode(treeNode: TreeNodePropsInEdit) {
    const slotsLength = this.formKvsMap[FormType.Props][treeNode.id]?.slotsLength || 0
    // console.log(slotsLength, treeNode.chs?.length, treeNode)
    // 如果数量不变的话，不做更新操作
    if (treeNode.chs?.length == slotsLength) return
    !treeNode.chs && (treeNode.chs = [])
    if (slotsLength > treeNode.chs?.length) {
      for (let index = 0; index < slotsLength; index++) {
        if (!treeNode.chs[index]) {
          treeNode.chs[index] = JSON.parse(
            JSON.stringify(
              await this.createTreeNode(
                (await shareModuleStore.getTreeNodePropsByRemote(
                  treeNode.defined?.slots || DefaultSlotItem,
                )) as TreeNodePropsInEdit,
                treeNode,
              ),
            ),
          )
          // await this.getComponentByTreeNode(treeNode.chs[index])
        }
      }
    } else {
      treeNode.chs = treeNode.chs.slice(0, slotsLength)
    }
    return treeNode
  }

  deleteTreeNodeById(id: TreeNodePropsInEdit['id']) {
    const {chsList, index, parentNode} = this.getParentInfo(id)
    // 预处理，先删除页面依赖empModules
    // pageStore.removeTreeNodeRemotes(this.getTreeNodeDepends(chsList[index]))
    // 删除节点
    if (index > -1 && chsList) {
      chsList.splice(index, 1)
    }
    // 删除kvs
    langStore.deleteKvsById(id)
    this.setCurTreeNode(parentNode)
    this.resetCurTreeNode()
    sendRefreshSignal({id, action: EnumActionTypes.Delete})
  }

  moveTreeNode(srcId: TreeNodePropsInEdit['id'], targetIndex: number, refreshDom?: boolean) {
    const {index: srcIndex, chsList, parentNode} = this.getParentInfo(srcId)
    if (!chsList) return

    const srcNode = chsList[srcIndex]
    chsList.splice(srcIndex, 1)
    chsList.splice(targetIndex, 0, srcNode)
    // if (!refreshDom) return
    if (parentNode.defined?.slots) {
      sendRefreshSignal({
        id: parentNode.id,
        action: EnumActionTypes.Update,
      })
    } else {
      sendRefreshSignal({
        id: srcId,
        data: targetIndex,
        // data: parentNode.id,
        action: EnumActionTypes.Move,
      })
    }
    this.resetCurTreeNode()
  }

  async copyTreeNode(treeNode: TreeNodePropsInEdit) {
    const oldId = treeNode.id

    const genNewId = (id: TreeNodePropsInEdit['id']) => {
      const arr = id.split('_')
      arr.pop()
      arr.push(Math.floor(Math.random() * 10000).toString())
      const newId = arr.join('_')
      return newId
    }
    // const newTreeNode = {...treeNode, id: genNewId(treeNode.id)} as TreeNodePropsInEdit

    const copyNode = (node: TreeNodePropsInEdit, newNode = {} as TreeNodePropsInEdit) => {
      const newId = genNewId(node.id)
      newNode = JSON.parse(JSON.stringify({...node, id: newId}))
      // console.log(newNode)
      langStore.updateLangKvs(newId, {...langStore.langKvs[node.id]})
      // TODO: 导航组件复制存在问题
      if (node.chs) {
        newNode.chs = observable(
          node.chs.map(item => {
            return copyNode(item as TreeNodePropsInEdit)
          }),
        )
      }
      return newNode
    }
    const newNode = copyNode(treeNode)

    await this.addTreeNodeToParent(newNode)
  }

  formRefMap: Record<
    FormType | string,
    Record<TreeNodePropsInEdit['id'], React.RefObject<FormInstance<any>>['current']>
  > = {
    [FormType.Props]: {},
    [FormType.Style]: {},
    [FormType.Event]: {},
  }

  formKvsMap: Record<FormType | string, Record<TreeNodePropsInEdit['id'], Record<string, any>>> = {
    [FormType.Props]: {},
    [FormType.Style]: {},
    [FormType.Event]: {},
  }
  // formRefMap: Record<TreeNodePropsInEdit['id'], React.RefObject<FormInstance<any>>['current']> = {}
  // formKvsMap: Record<TreeNodePropsInEdit['id'], Record<string, any>> = {}

  setFormKvs(id: TreeNodePropsInEdit['id'], formType?: string, value?: any) {
    if (!formType) return
    if (!value) {
      value = this.formRefMap[formType][id]?.getFieldsValue(true)
    }
    // 初始化
    if (formType && !this.formKvsMap[formType]) {
      this.formKvsMap[formType] = {}
    }

    Object.keys(value || {}).map((item: string) => {
      if (value[item] === null || value[item] === undefined || (formType === FormType.Style && value[item] === '')) {
        delete value[item]
      }
    })
    if (formType) {
      if (formType === FormType.Props) {
        this.formKvsMap[formType][id] = {
          ...this.formKvsMap[formType][id],
          ...value,
        }
      } else {
        this.formKvsMap[formType][id] = {
          [formType]: {
            // 合并而不是覆盖
            ...(this.formKvsMap[formType][id] || {})[formType],
            ...value,
          },
        }
      }
    }
  }

  refreshLangKvs(id: TreeNodePropsInEdit['id'], formType?: string | string[]) {
    if (typeof formType === 'string') {
      langStore.updateLangKvs(id, {...this.formKvsMap[formType][id]})
    } else if (Array.isArray(formType)) {
      // 不传默认更新props和empStyle
      const kvs = {
        ...this.formKvsMap[FormType.Props][id],
        ...this.formKvsMap[FormType.Style][id],
        ...this.formKvsMap[FormType.Event][id],
      }
      langStore.updateLangKvs(id, kvs)
    }
  }

  resetFormKvs(type = FormType.Props, id: TreeNodePropsInEdit['id']) {
    delete this.formKvsMap[type][id]
  }

  resetRootTree() {
    const renderData = {...pageStore.renderData}
    renderData.empModules = []
    renderData.data = [
      {
        id: 'App',
        chs: [],
        rm: {
          rmn: '',
          rmp: '',
        },
      },
    ]
    pageStore.renderData = {...renderData}
    langStore.resetKvs()
    this.resetCurTreeNode()
    sendRefreshSignal({
      id: pageStore.renderData.data[0].id,
      action: EnumActionTypes.ClearEmpModules,
    })
  }
}

const treeStore = empCreateClassStore<TreeStore>(TreeStore)
export default treeStore
