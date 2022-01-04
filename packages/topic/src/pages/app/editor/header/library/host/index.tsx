import {Form, Button, Col, Divider, Row, Input, message} from 'antd'
import {observer} from 'mobx-react'
import React, {useState} from 'react'
import pageStore from 'src/stores/page'
import editorStore from 'src/stores/page/editor'
import langStore from 'src/stores/page/lang'
const HostIndex = () => {
  const [extendTopic, setExtendTopic] = useState<any>({extendTopic: pageStore.pageContent.extendTopic || {}})

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    editorStore.updateExtendTopic(values.extendTopic)
    await editorStore.updatePageContentById()
    await langStore.save()
    message.success('更新成功，记得保存页面')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      initialValues={extendTopic}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item label="域名" name={['extendTopic', 'projectOrigin']}>
        <Input.TextArea placeholder={'https://xxx.com'}></Input.TextArea>
      </Form.Item>

      <Form.Item label="图标地址" name={['extendTopic', 'projectIcon']}>
        <Input.TextArea placeholder={'浏览器ico地址'}></Input.TextArea>
      </Form.Item>
      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType={'submit'}>
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(HostIndex)
