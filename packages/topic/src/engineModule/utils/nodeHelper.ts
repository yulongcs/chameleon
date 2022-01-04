/**
 * 查找子节点
 * @param id
 * @param data
 * @returns
 */
export const findSlotNodeById = (id: string, data: Array<TreeNodeProps>) => {
  let node = null
  data.some((item: TreeNodeProps) => {
    const parentId = id.substr(0, id.lastIndexOf('_'))
    if (item.id === parentId) {
      item.chs?.some((slot: TreeNodeProps) => {
        if (slot.id === id) {
          node = slot
          return true
        }
      })
      return true
    }
    if (id.startsWith(item.id) && item.chs) {
      node = findSlotNodeById(id, [...item.chs])
      return true
    }
  })
  return node
}

/**
 * 查到chs节点
 * @param id
 * @param data
 * @returns
 */
export const findNodeById = (id: string, data: Array<TreeNodeProps>) => {
  let node = null
  data.some((item: TreeNodeProps) => {
    if (item.id === id) {
      node = item
      return true
    }
    if (id.startsWith(item.id) && item.chs) {
      node = findNodeById(id, [...item.chs])
      return true
    }
  })
  return node
}

/**
 * 查到chs节点
 * @param id
 * @param data
 * @returns
 */
export const findParentNodeIsSlot = (id: string, data: Array<TreeNodeProps>, parentIsSlot?: boolean) => {
  let curNode: any
  let curSlot = parentIsSlot || false
  data.some((item: TreeNodeProps) => {
    curSlot = Boolean((item as TreeNodePropsInEdit)?.defined?.slots) || curSlot
    if (item.id === id) {
      curNode = item
      return true
    }
    if (id.startsWith(item.id) && item.chs) {
      const {node, slot} = findParentNodeIsSlot(id, [...item.chs], curSlot)
      curNode = node
      curSlot = slot
      return true
    }
  })
  return {node: curNode, slot: curSlot}
}
