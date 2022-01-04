import React, {useEffect} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import treeStore from 'src/stores/page/tree'

export interface DndItemProps {
  id: string
  moveToById: typeof treeStore.moveTreeNode
  findById: typeof treeStore.getIndexById
}
export enum DndItemTypes {
  // 组件库
  SRC_COMPONENT = 'src_component',
  // 树节点
  TREE_NODE = 'tree_node',
}

interface Item {
  id: string
  originalIndex: number
}

export const DndItem: React.FC<DndItemProps> = props => {
  const {id, children, moveToById, findById} = props

  const originalIndex = findById(id)
  const [{isDragging}, drag] = useDrag(
    () => ({
      type: DndItemTypes.TREE_NODE,
      item: {id, originalIndex},
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item: any, monitor: any) => {
        const {id: droppedId, originalIndex} = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveToById(droppedId, originalIndex, false)
        }
      },
    }),
    [id, originalIndex, moveToById],
  )

  const [, drop] = useDrop(
    () => ({
      accept: DndItemTypes.TREE_NODE,
      canDrop: () => false,
      hover({id: draggedId}: Item) {
        if (draggedId !== id) {
          const overIndex = findById(id)
          moveToById(draggedId, overIndex, false)
        }
      },
    }),
    [findById, moveToById],
  )

  const opacity = isDragging ? 0 : 1
  return (
    <div id={id} ref={node => drag(drop(node))} style={{opacity}}>
      {children}
    </div>
  )
}
