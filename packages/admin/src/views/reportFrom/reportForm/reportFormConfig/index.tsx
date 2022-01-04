import ExclamationCircleOutlined from '@ant-design/icons/lib/icons/ExclamationCircleOutlined'
import {Tabs, List, Typography, Divider, Button, Modal, message} from 'antd'
import React, {useCallback, useEffect, useState} from 'react'
import {addProject, deleteProject, getAllprojectList} from '../../api/api'
interface Config {
  allProject: any
  handleProjectChange: any
}
const ReportFormConfig = (props: Config) => {
  const {allProject, handleProjectChange} = props
  const {TabPane} = Tabs
  const [projectData, setProjectData] = useState<any[]>()
  const [initProjects, setInitProjects] = useState<any[]>()
  useEffect(() => {
    if (allProject) {
      setProjectData(Object.values(allProject))
    }
  }, [allProject])
  const setAddPrpjects = (data: any) => {
    // const {projectMap} = mockData
    if (projectData) {
      const {list} = data
      const addProjects: any = []
      list.map((project: any) => {
        const hasProject = projectData?.some((curProject: any) => {
          if (curProject.projectId === project.id) {
            return true
          }
        })
        if (!hasProject) {
          addProjects.push(project)
        }
      })
      setInitProjects(Object.values(addProjects))
    }
  }
  useEffect(() => {
    getAllprojectList().then((data: any) => {
      setAddPrpjects(data)
    })
  }, [projectData])
  const handleOk = async (item: any) => {
    const result = await deleteProject(item.projectId)
    if (result) {
      message.success('删除成功')
      handleProjectChange()
    } else {
      message.error('删除失败')
    }
  }
  const confirm = (isAdd: boolean, item?: any) => {
    if (isAdd) {
      getAllprojectList().then((data: any) => {
        setAddPrpjects(data)
      })
      Modal.info({
        title: '可添加项目',
        content: (
          <List
            pagination={{
              onChange: page => {
                console.log(page)
              },
              pageSize: 6,
            }}
            bordered
            dataSource={initProjects}
            renderItem={item => {
              return (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      size="small"
                      key="deleteProject"
                      onClick={(a: any) => {
                        addProject(item).then((data: any) => {
                          if (data) {
                            message.success('添加成功')
                            handleProjectChange()
                          } else {
                            message.error('添加失败')
                          }
                        })
                        a.currentTarget.disabled = true
                      }}>
                      添加
                    </Button>,
                  ]}>
                  {item.alias}
                </List.Item>
              )
            }}
          />
        ),
        okText: '确认',
        width: 800,
      })
    } else {
      Modal.confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认删除该项目，该操作不可逆！！！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          handleOk(item)
        },
      })
    }
  }

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="项目管理" key="1">
          <List
            header={
              <>
                <h3 style={{fontWeight: 'bold'}}>项目管理</h3>
                <Button
                  type="primary"
                  style={{left: '648px', position: 'absolute', top: '15px'}}
                  onClick={() => {
                    confirm(true)
                  }}>
                  添加项目
                </Button>
              </>
            }
            bordered
            dataSource={projectData}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    key="deleteProject"
                    onClick={() => {
                      confirm(false, item)
                    }}>
                    删除
                  </Button>,
                ]}>
                {item.projectName}
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </>
  )
}
export default ReportFormConfig
