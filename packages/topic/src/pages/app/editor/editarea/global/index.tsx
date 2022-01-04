import {Button} from 'antd'
import React from 'react'
import {observer} from 'mobx-react'
import treeStore, {FormType} from 'src/stores/page/tree'
import StyleSetting from '../../shared/StyleSetting'
import styles from './index.module.scss'

const GlobalSetting = () => {
  const treeNode = treeStore.rootNode
  const handleSave: React.MouseEventHandler<HTMLElement> = e => {
    e.stopPropagation()
    treeStore.setFormKvs(treeNode.id, FormType.Style)
    treeStore.refreshLangKvs(treeNode.id, FormType.Style)
    treeStore.updateTreeNodeById(treeNode.id, treeNode)
  }
  return (
    <div className={styles.StyleSetting}>
      <StyleSetting id={treeNode.id} />
      <Button onClick={handleSave} size={'middle'} type="primary" style={{width: '100%'}}>
        保存修改
      </Button>
    </div>
  )
}

export default observer(GlobalSetting)
