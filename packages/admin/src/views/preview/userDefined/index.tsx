import {Button, Form, Input} from 'antd'
import React from 'react'
const UserDefined = () => {
  const onFinish = (values: any) => {
    const {rmn, title, dev, test, prod} = values
    const projects = JSON.parse(localStorage.getItem(`projectComponentlocalStorage`) || 'null')
    const newProject = {
      rmn,
      rmp: '',
      title,
      unpkgUrlMap: {
        dev,
        prod,
        test,
      },
    }
    localStorage.setItem(
      'projectComponentlocalStorage',
      JSON.stringify(Object.assign({[rmn]: newProject}, ...projects)),
    )
    location.reload()
  }
  return (
    <Form
      name="basic"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      initialValues={{remember: true}}
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item label="模块名" name="rmn">
        <Input />
      </Form.Item>
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <span style={{fontWeight: 'bold'}}>地址列表：</span>
      <Form.Item label="开发环境" name="dev">
        <Input />
      </Form.Item>
      <Form.Item label="测试环境" name="test">
        <Input />
      </Form.Item>
      <Form.Item label="线上环境" name="prod">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          保存并刷新
        </Button>
      </Form.Item>
    </Form>
  )
}
export default UserDefined
