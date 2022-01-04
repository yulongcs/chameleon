import React from 'react'
import {Select} from 'antd'
import {SelectProps} from 'antd/es/select'
const Option = Select.Option

interface IProps {
  value?: string
  onChange?: (value: string) => void
  data: {
    label: string
    value: string | number
  }[]
  select?: SelectProps<any>
}

export const EmpSelect: React.FC<IProps> = props => {
  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return (
    <Select
      // 元素挂在到父节点
      getPopupContainer={triggerNode => triggerNode.parentElement}
      // {...props?.select}
      style={{
        width: '150px',
      }}
      allowClear
      value={props.value || ''}
      onChange={handleChange}>
      {props.data.map(e => {
        return (
          <Option key={e.value} value={e.value}>
            {e.label}
          </Option>
        )
      })}
    </Select>
  )
}

export const TextAlign: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '左对齐', value: 'left'},
    {label: '居中', value: 'center'},
    {label: '右对齐', value: 'right'},
  ]

  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}

export const OverflowY: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '超过尺寸内容滚动', value: 'auto'},
    {label: '高度随内容', value: 'visible'},
  ]
  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}

export const Display: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '块级元素', value: 'block'},
    {label: '行内块元素', value: 'inline-block'},
  ]
  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}

export const WhiteSpace: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '不换行', value: 'nowrap'},
    {label: '正常换行', value: 'pre-wrap'},
  ]
  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}

export const Overflow: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '超出不被修剪', value: 'visible'},
    {label: '超出被修剪', value: 'hidden'},
    {label: '超出显示滚动条', value: 'auto'},
  ]
  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}

export const Position: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '默认定位', value: 'relative'},
    {label: '基于父元素定位', value: 'absolute'},
    {label: '基于屏幕定位', value: 'fixed'},
  ]

  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}

export const BorderStyle: React.FC<IProps> = (props: IProps) => {
  const data = [
    {label: '无边框', value: 'none'},
    {label: '虚线', value: 'dashed'},
    {label: '实线', value: 'solid'},
    {label: '双线', value: 'double'},
  ]
  const handleChange = (e: any) => {
    props.onChange && props.onChange(e)
  }
  return <EmpSelect data={data} value={props.value || ''} onChange={handleChange} />
}
