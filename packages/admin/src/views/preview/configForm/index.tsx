import React, {useEffect, useRef} from 'react'
import {Form, Input, Radio, Select, Collapse, DatePicker, InputNumber, Switch, Slider, Empty, Checkbox} from 'antd'
import ColorPicker from './ColorPicker'
import FormPicker from './FormPicker'
import UploadImg from '../Upload'
const {RangePicker} = DatePicker
import {EmpConfigFormProps} from './inter'
import style from './index.module.scss'
// import RichText from './RichText'
// import StyleEdit from './StyleEdit'
import {ANTD_POPOVER_Z_INDEX} from './antdConst'
import {useState} from 'react'
import {useCallback} from 'react'
import {generateRestFormMap} from './utils'
import ErrorBoundary from '../Error'
const {Panel} = Collapse
const advancedConfigValue: any = {
  //通过useEffect修改函数体
  updateForm: (values: Record<string, any>) => {},
  formRef: null,
  tmpFormValue: {},
  getEditingValue: () => {
    return advancedConfigValue.tmpFormValue
    // return {...(advancedConfigValue.formRef?.getFieldsValue('props') || {})}
  },
}
const confirgForm: any = {
  FormValue: {},
}
export const getForm = () => {
  return confirgForm
}
export const getAdvanceFormValue = () => {
  return advancedConfigValue
}
const valuePropNameMap: Record<string, string> = {
  Switch: 'checked',
}
const transformType = (type: string) => {
  type = Object.prototype.toString.call(type).slice(8, -1) === 'Array' ? type[0] : type
  return type.replace(/^\S/, (s: string) => s.toUpperCase())
}

export const FromItem = ({item, initialValue, id, canUseConfig, setItems}: RenderProps) => {
  const {name, label, rules, type, options: opts, data, onChange, onSelect, formItemOptions, Comp = null, index} = item
  let html: any
  const options = {...opts, placeholder: item.description}
  const onEventChange = (value: any) => {
    setItems(value)
  }
  switch (transformType(type)) {
    case 'I18nDynamicText':
      html = <Input allowClear {...options} />
      break
    case 'InputText':
      html = <Input allowClear {...options} />
      break
    case 'Input':
      html = <Input allowClear {...options} />
      break
    case 'InputTextArea':
      html = <Input.TextArea allowClear {...options} />
      break
    case 'InputNumber':
      html = <InputNumber {...options} />
      break
    case 'Slider':
      html = <Slider {...options} />
      break
    case 'Radio':
      html = (
        <Radio {...options} onChange={onChange}>
          {data}
        </Radio>
      )
      break
    case 'RadioGroup':
      html = <Radio.Group {...options} onChange={onChange}></Radio.Group>
      break
    case 'Select':
      html = (
        <Select
          allowClear
          {...options}
          onChange={
            item.aliasName === 'eventType'
              ? (value: any) => {
                  onEventChange(value)
                }
              : onChange
          }
          onSelect={onSelect}
          dropdownStyle={{
            zIndex: ANTD_POPOVER_Z_INDEX + 1,
          }}></Select>
      )
      break
    case 'Switch':
      html = <Switch {...options} onChange={onChange} defaultChecked={initialValue}></Switch>
      break
    case 'Upload':
      html = <UploadImg {...options} />
      break
    case 'TimePicker':
      html = <FormPicker {...options} onChange={onChange} type="time" />
      break
    case 'DatePicker':
      html = <FormPicker {...options} onChange={onChange} />
      break
    case 'RangePicker':
      html = <RangePicker {...options} onChange={onChange} type="range" />
      break
    case 'ColorPicker':
      html = <ColorPicker {...options} onChange={onChange} />
      break
    case 'RichText':
      //   html = <RichText {...options} onChange={onChange} />
      break
    case 'StyleEdit':
      //   html = <StyleEdit {...options} onChange={onChange} id={id} name={name} />
      break

    case 'Checkbox':
      html = <Checkbox.Group {...options} onChange={onChange} />
      break
    case 'Custom':
      html = typeof Comp === 'function' ? <Comp {...options} /> : Comp
      break
  }
  const typeTest = (type: any) => {
    let tmpType = type
    if (Object.prototype.toString.call(type).slice(8, -1) === 'Array') {
      tmpType = type[0]
    }
    if (tmpType === 'Input' || tmpType === 'InputTextArea') {
      return true
    }
    return false
  }
  return (
    // <div className={style.itemContainer}>
    <div className={`${typeTest(item?.type) ? style.textArea : ''}`}>
      <Form.Item
        initialValue={item.value}
        labelAlign={'left'}
        key={`${name}`}
        label={<strong>{label}</strong>}
        name={name}
        labelCol={{span: typeTest(item?.type) ? 10 : 8}}
        rules={rules}
        tooltip={item.description === name ? false : `${item.description || item.label} - ${name}`}
        valuePropName={valuePropNameMap[type] ?? 'value'}
        {...formItemOptions}>
        {html}
      </Form.Item>
      {/* {canUseConfig && (
        // <>
        //   <AdvancedConfig item={item} node={tmpCurrentNode} />
        // </>
      )} */}
    </div>
  )
}
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 18},
}

type RenderProps = {
  canUseConfig?: boolean
  item: any
  id?: string
  initialValue?: any
  onCallback?: (length: number) => void
  setItems?: any
}

const FormItemComponentArray = (renderProps: RenderProps) => {
  const {id, item, initialValue, onCallback} = renderProps
  const {label, name, type} = item
  //文本数组长度，根据这个选择默认文本框数量
  const [inputValue, setInputValue] = useState(initialValue ? initialValue.length : 0)
  useEffect(() => {
    setInputValue(initialValue ? initialValue.length : 0)
  }, [initialValue])

  return (
    <ErrorBoundary>
      <div>
        <Form.Item label={label} labelAlign={'left'}>
          <>
            <Input
              style={{display: 'inline-block', width: '50px'}}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                ev.currentTarget.value = Math.min(
                  Number(String(ev.currentTarget.value).replace(/[^\p{N}]/gu, '') || 0),
                  20,
                ).toString()
                setInputValue(ev.currentTarget.value)
                onCallback && onCallback(Number(ev.currentTarget.value || 0))
              }}
              type="text"
              value={inputValue}></Input>
            <span>(输入长度)</span>
          </>
        </Form.Item>
      </div>
      <Form.List name={name} key={inputValue.length}>
        {fields =>
          fields.map((field: any, index: number) => {
            return (
              <React.Fragment key={field.key}>
                <FromItem
                  {...renderProps}
                  item={{...item, type, name: [field.name], label: `${label}_${index + 1}`, index}}
                  initialValue={Array.isArray(initialValue) ? initialValue[index] : initialValue}
                />
              </React.Fragment>
            )
          })
        }
      </Form.List>
    </ErrorBoundary>
  )
}

const FormItemComponent = (renderProps: RenderProps) => {
  return <FromItem {...renderProps} />
}

const RenderFormItem = (renderProps: RenderProps) => {
  let type = renderProps.item?.type
  const typeIsArray = Object.prototype.toString.call(type).slice(8, -1) === 'Array'
  if (typeIsArray) {
    type = type[0]
  }
  return typeIsArray ? FormItemComponentArray(renderProps) : FormItemComponent(renderProps)
}

export const ConfigForm = (props: EmpConfigFormProps) => {
  const {items, formType, children, initialValues, form, options, canUseConfig, setItems} = props
  const [_form] = Form.useForm()
  const configFormRef: any = form ? form : _form
  const canUseConfigRef = useRef(false)
  canUseConfigRef.current = canUseConfig || false
  const updateInitValues = (values: Record<string, any> = {}) => {
    configFormRef?.setFieldsValue(JSON.parse(JSON.stringify(values)))
    if (canUseConfigRef.current) {
      advancedConfigValue.formRef = configFormRef
      advancedConfigValue.tmpFormValue = values
    }
  }
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      // 先清空再赋值，避免脏值
      updateInitValues(initialValues)
    } else {
      configFormRef?.resetFields()
    }
  }, [configFormRef, initialValues])
  const onListCallback = useCallback(
    (name: string, length: number) => {
      const values = (initialValues as any)[name]
      ;(initialValues as any)[name] = values
        ? values.length >= length
          ? values.slice(0, length)
          : Object.assign(new Array(length).fill(values[0]), values)
        : []
      updateInitValues(initialValues)
    },
    [initialValues],
  )

  useEffect(() => {
    confirgForm.FormValue = configFormRef
    if (canUseConfigRef.current) {
      advancedConfigValue.updateForm = (values: Record<string, any>) => {
        updateInitValues({
          ...advancedConfigValue.tmpFormValue,
          ...advancedConfigValue.formRef.getFieldsValue('props'),
          ...values,
        })
      }
    }
  }, [])
  const empty = <Empty className={style.empty} description={'没有可编辑的组件参数'} />
  const groupList = generateRestFormMap(items)
  const defaultGroup = groupList.find(item => item.name === 'defaultGroupList')
  const hasItems = items && items.length > 0
  const groupListFilter = groupList.filter(item => item.name !== 'defaultGroupList')
  const getGroupItem = (
    {
      group,
    }: {
      group?: {
        name?: string
        items?: any[]
      }
    },
    panel = true,
  ) => {
    const hasItems = group?.items && group?.items.length > 0
    if (!hasItems) return null
    const getItems = () => (
      <>
        {hasItems &&
          group?.items?.map((item, index) => {
            return (
              <RenderFormItem
                canUseConfig={canUseConfigRef.current}
                item={{...item, aliasName: item.name, index}}
                setItems={setItems}
                initialValue={props?.initialValues?.[item.name ?? '']}
                onCallback={(length: number) => {
                  onListCallback(item.name, length)
                }}
                key={`${item?.name}_${index}`}
              />
            )
          })}
        {!hasItems && <>{children ? children : empty}</>}
      </>
    )
    return panel ? (
      <Panel
        style={{
          width: '100%',
          borderBottom: 'none',
        }}
        key={group?.name || ''}
        header={group?.name}>
        {getItems()}
      </Panel>
    ) : (
      <>{getItems()}</>
    )
  }
  return (
    <ErrorBoundary>
      <Form name={formType} form={configFormRef} {...layout} {...props.options}>
        <Collapse accordion ghost={false} bordered={false} className={style.Collapse}>
          {groupListFilter.map(item => getGroupItem({group: item}, true))}
        </Collapse>
        {getGroupItem(
          {
            group: defaultGroup,
          },
          false,
        )}
        {!hasItems && <>{children ? children : empty}</>}
      </Form>
    </ErrorBoundary>
  )
}
export default ConfigForm
