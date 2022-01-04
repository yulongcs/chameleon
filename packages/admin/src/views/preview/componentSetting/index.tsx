import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined'
import {Form, Tabs, Button, Space} from 'antd'
import React, {useEffect, useState} from 'react'
import ConfigForm, {getAdvanceFormValue, getForm} from '../configForm'
import style from './index.module.scss'
import UserDefined from '../userDefined/index'
class SettingProp {
  curprops: any
  changeProps: any
  closeMagnify: any
}
const ComponentSetting = (props: SettingProp) => {
  const {curprops, changeProps, closeMagnify} = props
  const transfromToItems = (props: any) => {
    const result: any = []
    const keys = Object.keys(props)
    keys.map((item: any) => {
      result.push({name: item, ...props[item]})
    })
    return result
  }

  const items = curprops ? transfromToItems(curprops) : []
  const transfrom = (props: any) => {
    if (props) {
      const result: Record<string, any> = {}
      Object.keys(props).map((item: any) => {
        result[item] = props[item].value
      })
      return result
    }
  }
  const onchangeForm = () => {
    const form = getForm().FormValue
    const newValue = form.getFieldsValue('true')
    const keys = Object.keys(newValue)
    keys.map((key: any) => {
      curprops[key].value = newValue[key]
    })
    changeProps(JSON.parse(JSON.stringify(curprops)))
  }
  return curprops ? (
    <div className={style.setting}>
      <header className={style.header}>
        <SettingOutlined size={40} /> 组件设置
        <span className={style.name}>{curprops?.name ? `(${curprops?.name})` : ''}</span>
      </header>
      <section className={style.section}>
        <Tabs defaultActiveKey={'props'} centered>
          <Tabs.TabPane forceRender tab={'组件参数'} key={'props'}>
            {items.length ? (
              <ConfigForm formType={'props'} items={items} initialValues={transfrom(curprops)} canUseConfig={true} />
            ) : (
              <></>
            )}
            <footer className={style.footer}>
              <Space size="middle">
                <Button type="primary" htmlType="submit" onClick={onchangeForm}>
                  确定
                </Button>

                <Button type="primary" onClick={closeMagnify}>
                  关闭
                </Button>
              </Space>
            </footer>
          </Tabs.TabPane>
          <Tabs.TabPane tab={'自定义配置'} key="add">
            <UserDefined />
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  ) : (
    <></>
  )
}
export default ComponentSetting
