import {observer} from 'mobx-react'
import {Tabs} from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react'
import style from './index.module.scss'
import EmpConfigForm from '../EmpConfigForm'
import StyleSetting from '../StyleSetting'
import {getInitialValuesByTreeNode, getItemsFromProps} from '../utils'
import langStore from 'src/stores/page/lang'
import {FormType} from 'src/stores/page/tree'
import GlobalEvent from 'src/pages/app/editor/editarea/globalevent'
import {shareModuleStore} from 'src/stores'
import {PanelType} from 'src/stores/sharemodule'
import ComponentPreview from 'src/pages/app/editor/shared/ComponentPreview/index'
export const EditPanel = observer((props: {node: TreeNodePropsInEdit}) => {
  const {node} = props

  const [items, setItems] = useState<any>([])
  const [defined, setDefined] = useState<any>({})
  useEffect(() => {
    getItemsFromProps(node).then(({props, defined}: any) => {
      setItems(props)
      defined && setDefined(defined)
    })
  }, [])
  const initialValues = langStore.langKvs[node.id] || getInitialValuesByTreeNode(items)
  const handleTabsChange = (activeKey: string) => {
    // 同步当前定位的tab，用于确认按钮更新对应tab下的表单
    shareModuleStore.setPanelOpts(PanelType.EDIT_PANEL, {
      activeTab: activeKey,
    })
  }
  return (
    <div className={style.content}>
      <header className={style.header}>
        <SettingOutlined size={40} /> 组件设置 <span>组件id:{node?.id}</span>
      </header>
      <section className={style.section}>
        <Tabs defaultActiveKey={'props'} onChange={handleTabsChange}>
          <Tabs.TabPane forceRender tab={'组件参数'} key={FormType.Props}>
            {items.length ? (
              <EmpConfigForm
                formType={FormType.Props}
                id={node.id}
                items={items}
                initialValues={initialValues}
                node={node}
                canUseConfig={true}
              />
            ) : (
              defined?.configUrl
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={'样式设置'} key={FormType.Style}>
            <StyleSetting id={node.id} formType={FormType.Style} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'事件设置'} key={FormType.Event}>
            <GlobalEvent id={node.id} formType={FormType.Event} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'组件预览'} key={FormType.Preview}>
            <ComponentPreview id={node.id} node={node} items={items} initialValues={initialValues} />
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  )
})
export default EditPanel
