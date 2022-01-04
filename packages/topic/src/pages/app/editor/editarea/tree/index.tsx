import {Empty} from 'antd'
import {observer} from 'mobx-react'
import React from 'react'
import {useDrop} from 'react-dnd'
import {DndItem, DndItemTypes} from '../../shared/EditItem/DndItem'
import {EditItem} from '../../shared/EditItem'
import style from './index.module.scss'
import treeStore from 'src/stores/page/tree'
import {useEffect} from 'react'

const TreeList = observer(({parent}: {parent: TreeNodeProps}) => {
  const [, dropRef] = useDrop(() => ({accept: DndItemTypes.TREE_NODE}))
  const handleClick = (item: TreeNodeProps) => {
    if (item.id !== treeStore.curTreeNode.id) {
      treeStore.setCurTreeNode(item as TreeNodePropsInEdit)
    }
  }
  const handleContainerClick = () => {
    treeStore.resetCurTreeNode()
  }
  const list = parent.chs
  const zIndex = parent.id.match(/_/g)?.length || 0
  return list && list.length > 0 ? (
    <div
      ref={dropRef}
      onClick={handleContainerClick}
      style={{
        minHeight: '100%',
      }}>
      {list.map((item: TreeNodeProps) => {
        return (
          <div
            key={item.id}
            style={{
              paddingLeft: zIndex * 10,
            }}>
            <DndItem
              key={item.id}
              id={item.id}
              moveToById={treeStore.moveTreeNode.bind(treeStore)}
              findById={treeStore.getIndexById.bind(treeStore)}>
              <EditItem
                showId={zIndex === 0}
                onClick={() => handleClick(item)}
                treeNode={item as TreeNodePropsInEdit}></EditItem>
            </DndItem>
            <TreeList parent={item}></TreeList>
          </div>
        )
      })}
    </div>
  ) : parent.id === 'App' ? (
    <Empty description={'暂无组件'} />
  ) : (
    <></>
  )
})

export const ComponentTreeList = () => {
  const root = treeStore.rootNode

  useEffect(() => {
    treeStore.resetCurTreeNode()
  }, [root])

  return (
    <div className={style.container}>
      <TreeList parent={root}></TreeList>
    </div>
  )
}
export default observer(ComponentTreeList)
