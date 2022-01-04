import React, {useState} from 'react'
import {Select} from 'antd'
import {posterUser, getYYUser, PosterUser} from 'src/api/yy.api'

export interface Props {
  onChange?(args: any): void
}

let timeout: number
function fetch(value: string, callback: (data: PosterUser[]) => void) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = -1
  }

  function fake() {
    posterUser(value).then(res => {
      callback(res || [])
    })
  }

  timeout = window.setTimeout(fake, 300)
}

const SearchUser: React.FC<Props> = props => {
  const [value, setValue] = useState<string>()
  const [users, setUsers] = useState<PosterUser[]>([])
  const handleSearch = (value: string) => {
    if (value) {
      fetch(value, data => setUsers(data))
    } else {
      setUsers([])
    }
  }
  const handleChange = (value: string) => {
    if (value) {
      getYYUser('dw_' + value).then(res => {
        if (res.result === 1) {
          props.onChange?.(res.info)
          setValue(undefined)
        }
      })
    }
    console.log(value)
  }
  return (
    <Select
      value={value}
      showSearch={true}
      allowClear={true}
      onChange={handleChange}
      onSearch={handleSearch}
      placeholder="输入拼音搜索">
      {users.map(user => (
        <Select.Option
          key={user.username}
          value={user.username}>{`${user.first_name}(dw_${user.username})`}</Select.Option>
      ))}
    </Select>
  )
}

export default SearchUser
