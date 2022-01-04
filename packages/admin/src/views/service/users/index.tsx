import React from 'react'
import {Input, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import useInputChange from 'src/hooks/useInputChange'

const Users: React.FC = () => {
  const [uid, changeUid] = useInputChange<string>('', 'trim')
  const columns: ColumnsType<any> = [
    {
      title: '平台名称',
      dataIndex: 'a',
    },
    {
      title: '项目组名称',
      dataIndex: 'a',
    },
    {
      title: '项目组管理员',
      dataIndex: 'a',
    },
    {
      title: '申请角色',
      dataIndex: 'a',
    },
    {
      title: '申请时间',
      dataIndex: 'a',
    },
    {
      title: '申请原因',
      dataIndex: 'a',
    },
    {
      title: '状态',
      dataIndex: 'a',
    },
    {
      title: '操作',
      dataIndex: 'a',
    },
  ]
  return (
    <div>
      <div>
        <Input value={uid} onChange={changeUid} />
      </div>
      <Table dataSource={[]} columns={columns} rowKey="id" />
    </div>
  )
}

export default Users
