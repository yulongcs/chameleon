/*
 * @Author: your name
 * @Date: 2021-08-10 15:11:00
 * @LastEditTime: 2021-08-16 15:15:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chameleon7\packages\topic\src\pages\app\editor\editarea\index.tsx
 */
import {Button, Menu, Modal} from 'antd'
import React, {useState} from 'react'
import {AppstoreOutlined, SettingOutlined} from '@ant-design/icons'
import ComponentTreeList from './tree'
import GlobalSetting from './global'
import style from './index.module.scss'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {observer} from 'mobx-react'
import treeStore from 'src/stores/page/tree'
import ActivityExtendSetting from './activityExtendSetting'

const PageEditArea = () => {
  const [currentKey2, setCurrentKey2] = useState('tree')

  const handleClick2 = (e: any) => {
    setCurrentKey2(e.key)
  }

  const handleReset: React.MouseEventHandler<HTMLElement> = e => {
    e.stopPropagation()
    Modal.confirm({
      content: '确认清空组件树吗？操作不可恢复。',
      onOk: () => {
        treeStore.resetRootTree()
      },
    })
  }
  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <div className={style.tree}>
          <Menu onClick={handleClick2} mode="horizontal" defaultSelectedKeys={[currentKey2]}>
            <Menu.Item key="tree" icon={<AppstoreOutlined />}>
              结构
            </Menu.Item>
            <Menu.Item key="global" icon={<SettingOutlined />}>
              样式
            </Menu.Item>
            {/* <Menu.Item key="extendConfig" icon={<SettingOutlined />}>
              其它配置
            </Menu.Item> */}
          </Menu>
          <div className={style.content}>
            {currentKey2 === 'tree' && <ComponentTreeList></ComponentTreeList>}
            {currentKey2 === 'global' && <GlobalSetting></GlobalSetting>}
            {currentKey2 === 'extendConfig' && <ActivityExtendSetting></ActivityExtendSetting>}
          </div>
          <Button size="middle" type="primary" onClick={handleReset}>
            重置页面数据
          </Button>
        </div>
      </DndProvider>
    </div>
  )
}
export default observer(PageEditArea)
