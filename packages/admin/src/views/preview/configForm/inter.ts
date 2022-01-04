/*
 * @Description:
 * @Author: hejilun
 * @Date: 2021-01-05 14:07:54
 * @LastEditors: hejilun
 * @LastEditTime: 2021-03-12 18:05:33
 */
import {InputProps, GroupProps, TextAreaProps} from 'antd/lib/input'
import {RadioGroupProps, RadioChangeEvent} from 'antd/lib/radio/interface'
import {FormProps, Rule, FormItemProps as FormItemProp} from 'antd/lib/form'
import {FormInstance} from 'antd/lib/form'
import {DatePickerProps} from 'antd/lib/date-picker'
import {TimePickerProps} from 'antd/lib/time-picker'
import {SliderSingleProps, SliderRangeProps} from 'antd/lib/slider'
import {InputNumberProps} from 'antd/lib/input-number'
import {SelectProps} from 'rc-select/lib/'
import React from 'react'
import {FormType} from 'src/stores/page/tree'

export type SelectFormData = {
  value: React.ReactText
  label: React.ReactNode
  disabled?: boolean
}
export type RadioFormData = {
  value: React.ReactText
  label: React.ReactNode
  disabled?: boolean
}
export type selectMultipleProps = {
  mode?: string
  defaultValue?: any
  value?: any
}

export type FormItemOptionsType =
  | RadioGroupProps
  | InputProps
  | GroupProps
  | TextAreaProps
  | selectMultipleProps
  | DatePickerProps
  | TimePickerProps
  | SliderSingleProps
  | SliderRangeProps
  | InputNumberProps
  | SelectProps
  | undefined
export type FormItemProps = EmpFC['empPropTypes'] & {
  // type: string
  // label: string
  name?: string

  rules?: Rule[]
  render?: JSX.Element | any
  children?: JSX.Element | React.ReactNode | any
  placeholder?: string
  col?: number
  options?: FormItemOptionsType
  formItemOptions?: FormItemProp
  data?: SelectFormData[] | RadioFormData[] | string | number | undefined
  onChange?: ((e: RadioChangeEvent | React.MouseEvent) => void) | undefined
  onSelect?: ((e: RadioChangeEvent | React.MouseEvent) => void) | undefined
  onClick?: ((e: React.MouseEvent) => void) | undefined
}

export interface EmpConfigFormProps extends Partial<FormProps> {
  // formRef?: React.RefObject<FormInstance>
  options?: FormProps
  items?: FormItemProps[]
  formType: FormType | string
  children?: React.ReactChild
  node?: TreeNodeProps
  canUseConfig?: boolean
  setItems?: any
}
