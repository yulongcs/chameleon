import React, {useRef, useEffect} from 'react'
import {Modal, Button, Spin} from 'antd'
import {useState} from 'react'
import {DraggableModal} from '../../../shared/DraggableModal'
import StyleSetting from '../../StyleSetting'
import treeStore from 'src/stores/page/tree'
type StyleEditType = {
  onChange(str: string): void
  value: string
  defaultValue: string
  langKey: string
  name: string
  id: TreeNodeProps['id']
}
export const StyleEdit = (props: StyleEditType) => {
  const {onChange, value, name, defaultValue, id} = props
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal(true)
  }
  const handleOk = () => {
    treeStore.setFormKvs(id, name)
    treeStore.refreshLangKvs(id, name)
    treeStore.updateTreeNodeById(id)
    setShowModal(false)
  }
  console.log(name)
  return (
    <>
      <Button type="link" onClick={handleShowModal}>
        编辑样式
      </Button>
      <DraggableModal
        title={'样式编辑（可拖动面板）'}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleOk}
        bodyStyle={{
          height: '50vh',
          overflowY: 'auto',
        }}>
        <StyleSetting formType={name} id={id} />
      </DraggableModal>
    </>
  )
}

export default StyleEdit
