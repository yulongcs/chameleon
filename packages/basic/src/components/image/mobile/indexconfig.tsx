import {Button} from 'antd'
import React from 'react'
type Props = {
  imgSrc: string
}

const Config: EmpFC<Props> = ({section, callback, propValue, propKey, ...rest}: EmpFCExtendConfig<any>) => {
  return (
    <div>
      {JSON.stringify(rest.empLangKvs)}
      <h2>通过section能拿到当前props表单数据{JSON.stringify(section)}</h2>
      <h2>propKey为当前Key: {propKey}</h2>
      <h2>propValue为当前值: {propValue}</h2>
      <Button
        onClick={() => {
          callback({
            [`${propKey}`]: 'asdasd' + Date.now(),
          })
        }}>
        通过回调同方式增量回写数据
      </Button>
    </div>
  )
}
export default Config
