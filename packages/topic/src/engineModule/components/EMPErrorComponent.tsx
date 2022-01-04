import React from 'react'
import {EnumPageEnv, EnumPlatformEnv} from 'src/types/type'
const EMPErrorComponent = (props: EmpFCProps<any>) => {
  const prodTips = () => {
    return (
      <div
        onClick={() => {
          window.location.reload()
        }}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        组件加载失败，点击刷新
      </div>
    )
  }
  const testTips = () => {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={require('../assets/404.png')} alt="" />
        {props.node?.rm && (
          <div
            onClick={() => {
              window.location.reload()
            }}>
            组件加载失败，点击刷新
            <p>模块名：{props.node?.rm?.rmn}</p>
            <p>组件名：{props.node?.rm?.rmp}</p>
          </div>
        )}
      </div>
    )
  }
  return <div>{props.env === EnumPageEnv.prod ? prodTips() : testTips()}</div>
}
export default EMPErrorComponent
