import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Input, Table, Button, Select, Popconfirm, message, Space, Drawer} from 'antd'
import {ColumnsType} from 'antd/es/table'
import useArray from 'src/hooks/useArray'
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import useBool from 'src/hooks/useBool'
import ModalAdd from 'src/views/service/modal_add'
import usePagination from 'src/hooks/usePagination'
import {
  ProjectInfo,
  getProject,
  getTopicPage,
  TopicPage,
  GetTopicPageParams,
  addTopicPage,
  mergePageContentAndSectionData,
  updateTopicPage,
  deleteTopicPage,
} from 'src/api/admin.api'
import {useHistory} from 'react-router-dom'
import formatDatetime, {formatDate} from 'src/utils/format/format-datetime'
import debounce from 'src/utils/debounce'
import projectStore from 'src/stores/project'
import config from 'src/configs'
import {useRef} from 'react'
import {sendTestDataToProd} from 'src/api/testtoprod.api'
import {deletePage, saveActivities} from '../reportFrom/api/api'
import {createProjectDefaultSectionKvs} from 'src/api/lang.api'
import userStore from 'src/stores/user'
const whiteList = ['dw_linlijian']
const ServiceList: React.FC = () => {
  const history = useHistory()
  const search = new URLSearchParams(history.location.search)
  const productionPageIdRef = useRef<Input>(null)
  const searchProjectId = search.get('projectId')
  const [allProject, allProjectHandle] = useArray<ProjectInfo>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [queryPageName, setQueryPageName] = useState<string>('')
  const [data, dataHandle] = useArray<any>([])
  const [visibleModalAdd, modalAddHandle] = useBool(false)
  const [updateTopic, setUpdateTopic] = useState<any>(null)
  const [pageParams, updateParams, pageTotal, setPageTotal, paginationConf] = usePagination()

  const hasBtnAdminAuth = () => {
    return selectedProjectInfo && projectStore.hasProjectAuth(selectedProjectInfo)
  }
  const selectedProjectName = useMemo(() => {
    return allProject.find(item => item.id === selectedProjectId)?.name || ''
  }, [selectedProjectId, allProject])

  const selectedProjectInfo = useMemo(() => {
    return allProject.find(item => item.id === selectedProjectId)
  }, [selectedProjectId, allProject])

  const onConfigPage = (pageInfo: TopicPage) => {
    window.open(config.topicBaseUrl + `/topic/editor?pageId=${pageInfo.pageId}`, '_blank')
    // window.open(config.topicBaseUrl + `/topic/editor/#/editor/${pageInfo.pageId}`, '_blank')
  }

  const onceRefreshDataToProdcutionEnvironment = () => {
    // 60dbd5b7d4f3691061620391
    return (
      <>
        <div>此操作会将当前【预览数据】覆盖到线上【预览数据】。</div>
        <br />
        <div>您确认嘛？</div>
        <Input type="text" placeholder="请输入线上的活动页ID" ref={productionPageIdRef} />
      </>
    )
  }

  const onOnceRefreshDataToProdcutionEnvironmentAction = (curSelectItem: TopicPage) => {
    if (!productionPageIdRef.current?.input.value) {
      message.warning('不输入个值，真心同步不了~')
    }
    if (productionPageIdRef.current?.input.value) {
      sendTestDataToProd(curSelectItem.projectId, curSelectItem.pageId, productionPageIdRef.current.input.value)
      productionPageIdRef.current.input.value = ''
    }
  }

  const {pageSize, pageNo} = pageParams
  const columns: ColumnsType<TopicPage> = [
    {
      title: '活动序号',
      width: 90,
      dataIndex: 'index',
    },
    {
      title: '页面ID',
      width: 220,
      dataIndex: 'pageId',
    },
    {
      title: '页面名称',
      dataIndex: 'content',
      render: (_, record) => record.content?.pageName,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (val: number) => formatDate(val),
    },
    {
      title: '最后修改人',
      dataIndex: 'lastEditor',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (val: number) => formatDatetime(val),
    },
    {
      title: '活动时间',
      render: (_, record) => (
        <span>
          {record.content.onlineTime &&
            `${formatDate(record.content.onlineTime)} ~ ${formatDate(record.content.offlineTime as number)}`}
        </span>
      ),
    },
    {
      title: '操作',
      width: 300,
      fixed: 'right',
      render: (_, record) => (
        <div className="table-handle-flex">
          <Button size={'small'} onClick={() => onConfigPage(record)}>
            配置页面
          </Button>
          {whiteList.map((admin: string, index: number) => {
            if (admin === userStore?.userInfo?.passport) {
              return (
                <Button size={'small'} onClick={() => onDeletePage(record)} key={index}>
                  删除活动页
                </Button>
              )
            }
          })}
          <Button size={'small'} onClick={() => onCopyPage(record)}>
            复制活动页
          </Button>
          <Button size={'small'} icon={<EditOutlined />} onClick={() => onUpdate(record)}>
            编辑
          </Button>
          {config.isProd ? (
            <></>
          ) : (
            <Popconfirm
              placement="topLeft"
              title={onceRefreshDataToProdcutionEnvironment()}
              onConfirm={() => {
                onOnceRefreshDataToProdcutionEnvironmentAction(record)
              }}
              okText="多次思考后确认同步"
              cancelText="关闭">
              <Button size={'small'}>一键同步线上</Button>
            </Popconfirm>
          )}
          {/* <Button icon={<DeleteOutlined />}>删除</Button> */}
        </div>
      ),
    },
  ]

  const onUpdate = (topic: TopicPage) => {
    setUpdateTopic(topic)
    modalAddHandle.show()
  }

  const onSearch = () => {
    console.log('重新加载')
    onChangeProject(selectedProjectId)
  }

  const onChangePageName = useCallback(
    debounce((event: React.SyntheticEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value.trim()
      setQueryPageName(value)
      updateParams({pageNo: 1})
    }, 500),
    [],
  )

  const onChangeProject = (value: string) => {
    history.replace(`${history.location.pathname}?projectId=${value}`)
    updateParams({pageNo: 1})
    setSelectedProjectId(value)
  }
  const onCopyPage = async (value: any) => {
    const {content, projectId} = value
    const result = await addTopicPage({projectId, content})
    if (result.pageId) {
      //多语言,返回多语言列表
      const sectionResult = await createProjectDefaultSectionKvs(projectId, result.pageId)
      mergePageContentAndSectionData(result.content, sectionResult)
      const updateTopicResult: any = await updateTopicPage(result.pageId, result)
      if (updateTopicResult.pageId) {
        const isSaveSuccess = await saveActivities({projectId, pageId: result.pageId})
        if (isSaveSuccess) {
          message.success('活动页已成功复制')
          onChangeProject(selectedProjectId)
        } else {
          //上报报表失败，删除新建活动页
          await deleteTopicPage(result.pageId)
          message.error('复制失败,请重试')
        }
      } else {
        //多语言保存失败，删除新建活动页
        await deleteTopicPage(result.pageId)
        message.error('复制失败,请重试')
      }
    } else {
      //创建新活动页失败
      message.error('复制失败,请重试')
    }
  }
  const onDeletePage = async (value: any) => {
    await deleteTopicPage(value.pageId)
    await deletePage(value.projectId, value.pageId)
    onChangeProject(selectedProjectId)
  }
  useEffect(() => {
    getProject(0, 1000, '7').then(res => {
      // TODO 过滤显示的 project
      const arr = res.list
      allProjectHandle.set(arr)
      if (arr.length) {
        const defaultProject = arr.find(item => item.id === searchProjectId) || arr[0]
        setSelectedProjectId(defaultProject.id)
      }
      if (!JSON.parse(localStorage.getItem(`allProjects`) || 'null')) {
        localStorage.setItem('allProjects', JSON.stringify(res.list))
      }
    })
  }, [])

  useEffect(() => {
    if (selectedProjectId) {
      const params: GetTopicPageParams = {
        page: pageParams.pageNo - 1,
        size: pageParams.pageSize,
        projectId: selectedProjectId,
      }
      if (queryPageName) {
        params.queryJson = JSON.stringify({'content.pageName': queryPageName, pageId: queryPageName})
      }
      getTopicPage(params).then(res => {
        let index = pageSize * (pageNo - 1) + 1
        res.list.map(item => {
          item.index = index++
        })
        dataHandle.set(res.list)
        setPageTotal(res.total)
      })
    }
  }, [pageParams, selectedProjectId, queryPageName])
  return (
    <div>
      <div className="module-header">
        <div className="module-header-main">
          <div className="form-item">
            <span>项目名称：</span>
            <Select value={selectedProjectId} onChange={onChangeProject} placeholder={'请选择项目名称'}>
              {allProject.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.alias}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="form-item-large">
            <span>页面名称：</span>
            <Input onChange={onChangePageName} placeholder={'输入页面名称/ID搜索'} allowClear={true} />
          </div>
        </div>
        <div className="module-header-aside">
          {hasBtnAdminAuth() && (
            <Button
              type={'primary'}
              icon={<PlusOutlined />}
              onClick={() => {
                setUpdateTopic(null)
                modalAddHandle.show()
              }}>
              创建活动页
            </Button>
          )}
        </div>
      </div>
      <Table dataSource={data} columns={columns} pagination={paginationConf} rowKey={'pageId'} scroll={{x: 1440}} />
      {visibleModalAdd && (
        <ModalAdd
          projectId={selectedProjectId}
          projectName={selectedProjectName}
          topic={updateTopic}
          onClose={modalAddHandle.hide}
          onSuccess={onSearch}
        />
      )}
    </div>
  )
}

export default ServiceList
