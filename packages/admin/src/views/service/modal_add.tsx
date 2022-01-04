import React, {useMemo} from 'react'
import {Modal, Form, Input, Button, DatePicker} from 'antd'
import useBool from 'src/hooks/useBool'
import moment from 'moment'
import {TopicPage, addTopicPage, updateTopicPage, mergePageContentAndSectionData, getPageInfo} from 'src/api/admin.api'
import {createProjectDefaultSectionKvs} from 'src/api/lang.api'
import {useRef} from 'react'
import {baiduEventReport} from 'src/utils/report/baiduReport'
import {saveActivities} from '../reportFrom/api/api'
const {RangePicker} = DatePicker

export interface Props {
  projectId: string
  projectName: string
  onClose(): void
  onSuccess?(): void
  topic?: TopicPage
}

const layout = {
  labelCol: {span: 3},
  wrapperCol: {span: 21},
}
const tailLayout = {
  wrapperCol: {offset: 3, span: 21},
}

const ModalAdd: React.FC<Props> = props => {
  const [isUpdating, updatingHandle] = useBool(false)
  const isAdd = useMemo(() => !props.topic, [props.topic])
  const isProcessing = useRef<boolean>(false)

  const initialValues = useMemo<any>(() => {
    const value: any = {}
    if (props.topic) {
      const {content} = props.topic
      const {pageName, onlineTime, offlineTime} = content
      value.pageName = pageName
      if (onlineTime && offlineTime) {
        value.activityTime = [moment(onlineTime), moment(offlineTime)]
      }
    }
    return value
  }, [props.topic])

  const onFinished = async (values: any) => {
    if (isProcessing.current) {
      return
    }
    isProcessing.current = true
    const {pageName, activityTime} = values
    const {projectId, projectName} = props

    let onlineTime: any
    let offlineTime: any
    if (activityTime) {
      onlineTime = activityTime[0].valueOf()
      offlineTime = activityTime[1].valueOf()
    }
    if (isAdd) {
      // TODO 添加主题页
      const content: PageDataProps & any = {
        onlineTime,
        offlineTime,
        pageName,
        pageInfo: {
          pageId: '',
          pageCategory: '',
          pageName,
          projectId,
          projectName,
        },
      }
      const result = await addTopicPage({projectId, content})
      if (result.pageId) {
        const isCreate = await saveActivities({projectId, pageId: result.pageId})
        if (isCreate) {
          //多语言,返回多语言列表
          const sectionResult = await createProjectDefaultSectionKvs(projectId, result.pageId)
          mergePageContentAndSectionData(result.content, sectionResult)
          await updateTopicPage(result.pageId, result)
        }
      }
      baiduEventReport([`createpage`, `-`, `-`])
      baiduEventReport([
        `createpage-${projectId}-${projectName}`,
        `${projectId}-${projectName}`,
        `${result.pageId}-${pageName}`,
      ])
      props.onClose?.()
      props.onSuccess?.()
    } else {
      const {pageId} = props.topic as TopicPage
      //不直接从props拿，而是查询最新内容
      const pageInfo: any = await getPageInfo(`${pageId}?t=${Date.now()}`)
      const {content} = pageInfo
      if (content) {
        content.pageInfo.pageName = pageName
        //兼容旧版本
        if (!content.pc?.test?.sectionId) {
          const sectionResult = await createProjectDefaultSectionKvs(projectId, pageId)
          mergePageContentAndSectionData(content, sectionResult)
        }
        const params = {
          content: {
            ...content,
            pageName,
            onlineTime,
            offlineTime,
          },
        }
        console.log(params, pageId)
        await updateTopicPage(pageId, params)
        props.onClose?.()
        props.onSuccess?.()
      }
    }
    isProcessing.current = false
  }
  return (
    <Modal
      visible={true}
      title={isAdd ? '添加专题' : '修改专题'}
      width={'800px'}
      footer={null}
      onCancel={props.onClose}>
      <Form {...layout} initialValues={initialValues} onFinish={onFinished}>
        <Form.Item label={'页面名称'} name={'pageName'} rules={[{required: true, message: '请输入页面名称'}]}>
          <Input placeholder={'请输入页面名称'} maxLength={20} />
        </Form.Item>
        <Form.Item label={'活动时间'} name={'activityTime'}>
          <RangePicker />
        </Form.Item>
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

export default ModalAdd
