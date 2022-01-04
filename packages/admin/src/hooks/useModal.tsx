import React from 'react'
import {Modal} from 'antd'
import Spin from 'antd/es/spin'
// 结合了antd，写法非hooks
let count = 0
let open = false
let modal: any = null
const openLoading = () => {
  if (count === 1 && !modal && !open) {
    open = true
    modal = Modal.success({
      mask: true,
      maskClosable: false,
      content: <Spin>加载中...</Spin>,
      okText: '',
      onOk: () => {},
    })
  }
  if (count <= 0 && modal) {
    modal?.destroy()
    modal = null
    open = false
  }
}
export const showLoading = () => {
  count++
  openLoading()
}

export const hideLoading = () => {
  count--
  openLoading()
}
