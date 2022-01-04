import React, {useMemo, useRef} from 'react'
import {Button, Form, Input, Modal, Tag, message} from 'antd'
import {ProjectInfo, Authorizer, updateProject, addProject} from 'src/api/admin.api'
import SearchUser from 'src/components/search_user'
import userStore from 'src/stores/user'
import useBool from 'src/hooks/useBool'

export interface Props {
  onClose(): void
  project: ProjectInfo | null
  onSuccess?(): void
}

const layout = {
  labelCol: {span: 3},
  wrapperCol: {span: 21},
}
const tailLayout = {
  wrapperCol: {offset: 3, span: 21},
}

const ModalUpload: React.FC<Props> = props => {
  const [isUpdating, updatingHandle] = useBool(false)
  const isAdd = useMemo<boolean>(() => props.project === null, [props.project])
  const isProcessing = useRef<boolean>(false)
  const onFinish = (values: any) => {
    if (isProcessing.current) {
      return
    }
    isProcessing.current = true
    const {name, alias, desc, authorizers4Show, projectOrigin, projectIcon, projType} = values
    console.error('value', values)
    const authorizers =
      authorizers4Show.length > 0 ? `;${authorizers4Show.map((item: Authorizer) => item.uid).join(';')};` : ';'
    const languages = props.project?.languages || ['zh']
    const lastEditor = userStore.userInfo?.nick as string
    if (props.project) {
      const id = props.project.id
      // 编辑
      updatingHandle.show()
      updateProject(id, {
        alias,
        desc,
        authorizers,
        authorizers4Show,
        languages,
        projType: String(projType),
        lastEditor,
        name,
        extendTopic: {
          projectOrigin,
          projectIcon,
        },
      })
        .then(() => {
          message.success('编辑成功')
          props.onClose?.()
          props.onSuccess?.()
        })
        .finally(() => {
          updatingHandle.hide()
        })
    } else {
      updatingHandle.hide()
      addProject({
        name,
        alias,
        desc,
        authorizers,
        authorizers4Show,
        languages,
        projType: '7',
        extendTopic: {
          projectOrigin,
          projectIcon,
          v: 7,
        },
      })
        .then(() => {
          message.success('添加成功')
          props.onClose?.()
          props.onSuccess?.()
        })
        .finally(() => {
          updatingHandle.hide()
        })
      console.log('addProject', values)
    }
    isProcessing.current = false
  }
  const title = useMemo(() => (props.project ? '编辑项目' : '添加项目'), [props.project])
  const initialValues = useMemo(() => {
    const project = props.project
    if (!project) {
      return {}
    }
    const {name, alias, creator, extendTopic, desc, lastEditor, authorizers4Show} = project
    const {projectOrigin, projectIcon} = extendTopic || {}
    return {
      projectOrigin,
      projectIcon,
      name,
      alias,
      creator,
      desc,
      lastEditor,
      authorizers4Show,
    }
  }, [props.project])
  return (
    <Modal visible={true} footer={null} width={'800px'} title={title} onCancel={props.onClose}>
      <Form initialValues={initialValues} {...layout} onFinish={onFinish}>
        <Form.Item label="名称" name="name" rules={[{required: true, message: '请输入项目名称'}]}>
          <Input placeholder="请输入平台名称" maxLength={10} disabled={!isAdd} />
        </Form.Item>
        <Form.Item label="别名" name="alias" rules={[{required: true, message: '请输入项目别名'}]}>
          <Input placeholder="请输入项目组名称" maxLength={10} />
        </Form.Item>
        <Form.Item label="项目域名" name="projectOrigin" rules={[{message: '请输入项目项目域名'}]}>
          <Input placeholder="请输入项目域名 https://cweb.yy.com" />
        </Form.Item>
        {!isAdd && (
          <Form.Item label="项目类别" name="projType" rules={[{message: '请输入项目类别'}]}>
            <Input placeholder="请输入项目类别 1 2 3" />
          </Form.Item>
        )}
        <Form.Item label="项目图标" name="projectIcon" rules={[{message: '请输入项目图标地址'}]}>
          <Input placeholder="请输入项目图标地址 https://webtest.yystatic.com/project/yycom_index/pc/images/default_avatar-2ae2561b.png" />
        </Form.Item>
        {!isAdd && (
          <Form.Item label="拥有者" name="creator">
            <Input disabled={true} />
          </Form.Item>
        )}
        <Form.Item label="管理人员" name="authorizers4Show" rules={[{required: true, message: '请完善管理人员'}]}>
          <AuthorizerInput placeholder="用户拼音查询" />
        </Form.Item>
        <Form.Item label="项目描述" name="desc">
          <Input.TextArea placeholder="请输入项目描述，最多100个字" maxLength={100} />
        </Form.Item>
        {!isAdd && (
          <Form.Item label="更新人" name="lastEditor">
            <Input disabled={true} />
          </Form.Item>
        )}
        <Form.Item {...tailLayout}>
          <Button type={'primary'} htmlType="submit" disabled={isUpdating}>
            立即{isAdd ? '添加' : '修改'}
          </Button>
          <Button className="ml-base" onClick={props.onClose}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const AuthorizerInput: React.FC<{
  value?: Authorizer[]
  onChange?: (value: Authorizer[]) => void
  placeholder?: string
}> = props => {
  const value = props.value || []
  const onDelete = (auth: Authorizer, index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    props.onChange?.(newValue)
  }
  const onAdd = (info: any) => {
    const user: Authorizer = {
      passport: info.passport,
      name: info.nick,
      uid: info.uid,
    }
    console.log(user)
    value.push(user)
    props.onChange?.([...value])
  }
  return (
    <div>
      {value.map((item, index) => (
        <Tag
          key={`${item.uid}_${index}`}
          closable={true}
          onClose={() => onDelete(item, index)}
          style={{marginBottom: '8px'}}>
          {item.name}
          {item.passport && `(dw_${item.passport})`}
        </Tag>
      ))}
      <SearchUser onChange={onAdd} />
    </div>
  )
}

export default ModalUpload
