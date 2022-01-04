import React, {FC} from 'react'
import moment from 'moment'
import {TimePicker, DatePicker} from 'antd'
import {ANTD_POPOVER_Z_INDEX} from './antdConst'

const {RangePicker} = DatePicker

interface FormPickerProps extends Record<string, any> {
  type?: 'date' | 'time' | 'range'
  value?: any
}

const PickerMap = {
  date: DatePicker,
  time: TimePicker,
  range: RangePicker,
}

const formatStringValue = (value: any) => {
  // 清除时间置为null
  if (typeof value === 'string') return value ? moment(value) : null
  return value
}

const FormPicker: FC<FormPickerProps> = ({type = 'date', value, ...restProps}) => {
  const formatVal = Array.isArray(value) ? value.map(formatStringValue) : formatStringValue(value)

  const Picker = PickerMap[type]
  return (
    <Picker
      // getPopupContainer={triggerNode => triggerNode.parentElement as HTMLElement}
      popupStyle={{
        zIndex: ANTD_POPOVER_Z_INDEX + 1,
      }}
      {...restProps}
      value={formatVal}
    />
  )
}

export default FormPicker
