import {Col, Radio, RadioChangeEvent, Row} from 'antd'
import React, {useEffect} from 'react'
const DevEngineIndex = () => {
  const [value, setValue] = React.useState('')
  useEffect(() => {
    setValue(window.__EMP.globalParams.remoteEnv || '')
  }, [])

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    window.__EMP.globalFunction.setLocalEmpStore('remoteEnv', e.target.value)
    window.location.reload()
  }

  return (
    <Row>
      <Col span={5}>
        <div>环境设置</div>
      </Col>
      <Col span={8}>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={'prod'}>线上</Radio>
          <Radio value={'test'}>测试</Radio>
          <Radio value={'dev'}>开发调试</Radio>
        </Radio.Group>
      </Col>
      <Col>
        <div>
          <div>默认线上, url参数remoteEnv=test/dev/prod</div>
          <div>环境变更自动刷新</div>
        </div>
      </Col>
    </Row>
  )
}

export default DevEngineIndex
