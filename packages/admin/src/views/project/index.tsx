import React, {useCallback, useEffect, useMemo, useState} from 'react'
import useInputChange from 'src/hooks/useInputChange'
import {ColumnsType} from 'antd/es/table'
import {Button, Input, Table} from 'antd'
import {PlusOutlined, SearchOutlined, SettingOutlined, StarOutlined, DeleteOutlined} from '@ant-design/icons'
import useArray from 'src/hooks/useArray'
import {getProject, ProjectInfo} from 'src/api/admin.api'
import {formatDate} from 'src/utils/format/format-datetime'
import debounce from 'src/utils/debounce'
import {confirm} from 'src/utils'
import ButtonGroup from 'antd/es/button/button-group'
import useBool from 'src/hooks/useBool'
import ModalUpload from './add'
import userStore from 'src/stores/user'
import projectStore from 'src/stores/project'

const ProjectList: React.FC = () => {
  const [searchKey, changeSearchKey] = useInputChange<string>('', 'trim')
  const [isCollect, collectHandle] = useBool(false)
  const [visibleModalUpload, modalUploadHandle] = useBool(false)
  const [updateProject, setUpdateProject] = useState<ProjectInfo | null>(null)
  const debounceChange = useCallback<any>(
    debounce(function (event) {
      changeSearchKey(event)
    }, 400),
    [],
  )
  const [allData, dataHandle] = useArray<ProjectInfo>([])
  const showData = useMemo(() => {
    if (!searchKey) {
      return allData
    }
    const key = searchKey.toLowerCase()
    return allData.filter(({name, alias, creator}) => {
      return (
        (name && name.toLowerCase().includes(key)) ||
        (alias && alias.toLowerCase().includes(key)) ||
        (creator && creator.toLowerCase().includes(key))
      )
    })
  }, [allData, searchKey])

  const onDelete = async (project: ProjectInfo) => {
    await confirm(`确认要删除${project.name}吗？`)
    console.log('delete', project)
  }
  const onUpdate = (project?: ProjectInfo) => {
    setUpdateProject(project || null)
    modalUploadHandle.show()
  }

  const columns: ColumnsType<ProjectInfo> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '别名',
      dataIndex: 'alias',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => formatDate(text),
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      width: 240,
      render: (_, project) => (
        <div className="table-handle-flex">
          {projectStore.hasProjectAuth(project) && (
            <Button icon={<SettingOutlined />} onClick={() => onUpdate(project)}>
              设置
            </Button>
          )}
          <Button icon={<StarOutlined />}>收藏</Button>
          {/* <Button icon={<DeleteOutlined />} danger={true} onClick={() => onDelete(project)}>
            删除
          </Button> */}
        </div>
      ),
    },
  ]
  const query = () => {
    getProject(0, 1000, '7').then(res => {
      dataHandle.set(res.list)
    })
  }
  useEffect(() => {
    query()
  }, [])
  return (
    <div>
      <div className="module-header">
        <div className="module-header-main">
          <div className="form-item">
            <Input
              onChange={debounceChange}
              placeholder={'输入名称/别名/创建者查找'}
              allowClear={true}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="form-item">
            <ButtonGroup>
              <Button type={!isCollect ? 'primary' : 'default'} onClick={collectHandle.hide}>
                我的项目
              </Button>
              <Button type={isCollect ? 'primary' : 'default'} onClick={collectHandle.show}>
                我的收藏
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="module-header-aside">
          {userStore.isAdmin() && (
            <Button type={'primary'} icon={<PlusOutlined />} onClick={() => onUpdate()}>
              添加项目
            </Button>
          )}
        </div>
      </div>
      <Table dataSource={showData} columns={columns} rowKey="id" />

      {visibleModalUpload && <ModalUpload onClose={modalUploadHandle.hide} project={updateProject} onSuccess={query} />}
    </div>
  )
}

export default ProjectList
