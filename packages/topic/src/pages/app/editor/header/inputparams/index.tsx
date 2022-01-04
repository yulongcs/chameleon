import {Button, Input, Space} from 'antd'
import React, {useRef, useState} from 'react'

const StoreKey = 'InputUrlParams'

const InputParamsComponent = ({id, onRefresh}: {id?: string; onRefresh: () => void}) => {
  const [show, setShow] = useState(false)
  const hasChangeRef = useRef(false)
  const onChangeAction = (ev: React.ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem(id || StoreKey, ev.currentTarget.value)
    hasChangeRef.current = true
  }

  const onRefreshAction = () => {
    if (!hasChangeRef.current) {
      return
    }
    if (hasChangeRef.current) {
      hasChangeRef.current = false
    }
    onRefresh()
  }

  const value = sessionStorage.getItem(id || StoreKey) || ''
  return (
    <Space>
      <Input
        placeholder="链接参数：id=123&index=1"
        key={value}
        onFocus={(ev: React.FocusEvent<HTMLInputElement>) => {
          setShow(true)
        }}
        onBlur={() => {
          setShow(false)
          onRefreshAction()
        }}
        onChange={onChangeAction}
        defaultValue={value}
        style={{width: '180px'}}
      />
      {show && (
        <Button onClick={onRefreshAction} size={'small'} type="primary">
          更新
        </Button>
      )}
    </Space>
  )
}

export default InputParamsComponent
