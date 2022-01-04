import {Collapse, Form, Select} from 'antd'
import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import {EventType} from 'src/engineModule/utils/codeHelper'

import EmpConfigForm from 'src/pages/app/editor/shared/EmpConfigForm'
import langStore from 'src/stores/page/lang'
import {FormType} from 'src/stores/page/tree'
import {EmpPropTypes} from 'src/types/type'
interface PropsI {
  id: TreeNodeProps['id']
  formType?: string
}
// const items = [
//   {
//     label: '请选择事件类型',
//     name: 'eventType',
//     options: {
//       options: [
//         {
//           value: EventType.GameLink,
//           label: 'App跳转',
//         },
//         {
//           value: EventType.GameActBarLink,
//           label: 'App活动条跳转',
//         },
//         {
//           value: EventType.Link,
//           label: '链接跳转',
//         },
//         {
//           value: EventType.Code,
//           label: '云代码',
//         },
//       ],
//     },
//     type: EmpPropTypes.Select,
//     value: '',
//   },
//   {
//     label: 'App跳转',
//     name: EventType.GameLink,
//     options: {},
//     type: EmpPropTypes.Input,
//     value: '',
//   },
//   {
//     label: '链接跳转',
//     name: EventType.Link,
//     options: {},
//     type: EmpPropTypes.Input,
//     value: '',
//   },
//   {
//     label: '云代码',
//     name: EventType.Code,
//     options: {},
//     type: EmpPropTypes.InputTextArea,
//     value: '',
//   },
// ]

const GlobalEvent = (props: PropsI) => {
  const {id, formType} = props
  const [form] = Form.useForm()
  const initialValues = langStore.langKvs[id]?.[formType || FormType.Event] || {}
  const key = initialValues['eventType']
  const options = [
    {
      value: EventType.GameLink,
      label: 'App跳转',
    },
    {
      value: EventType.GameActBarLink,
      label: 'App活动条跳转',
    },
    {
      value: EventType.Link,
      label: '链接跳转',
    },
    {
      value: EventType.Code,
      label: '云代码',
    },
    {
      value: EventType.GameRoom,
      label: '直播间号',
    },
  ]
  const items = [
    {
      label: '请选择事件类型',
      name: 'eventType',
      options: {
        options: options,
      },
      type: EmpPropTypes.Select,
      value: key,
    },
  ]
  const [item, setItem] = useState<any[]>(items)
  const setItems = (value?: string) => {
    const items: any = [
      {
        label: '请选择事件类型',
        name: 'eventType',
        options: {
          options: options,
        },
        type: EmpPropTypes.Select,
        value: value,
      },
    ]
    switch (value) {
      case 'GameLink':
        items.push({
          label: 'App跳转',
          name: EventType.GameLink,
          options: {},
          type: EmpPropTypes.Input,
          value: '',
        })
        break
      case 'Link':
        items.push({
          label: '链接跳转',
          name: EventType.Link,
          options: {},
          type: EmpPropTypes.Input,
          value: '',
        })
        break
      case 'Code':
        items.push({
          label: '云代码',
          name: EventType.Code,
          options: {},
          type: EmpPropTypes.InputTextArea,
          value: '',
        })
        break
      case 'Room':
        items.push({
          label: '直播间号',
          name: EventType.GameRoom,
          options: {},
          type: EmpPropTypes.InputTextArea,
          value: '',
          description: '若有多个直播间用分号或换行分隔，且随机跳转其中一个',
        })
        break
    }
    setItem(items)
  }
  useEffect(() => {
    setItems(key)
  }, [])
  return (
    <EmpConfigForm
      setItems={setItems}
      initialValues={initialValues}
      id={id}
      items={item}
      // 默认是empStyle，可以是组件自己的style key
      formType={formType || FormType.Event}
      form={form}></EmpConfigForm>
  )
}
export default observer(GlobalEvent)
