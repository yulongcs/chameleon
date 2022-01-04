import React from 'react'
import {observer} from 'mobx-react'
import css from './index.module.scss'
import userStore from 'src/stores/user'
import {Button, Avatar} from 'antd'
import combineLogin from 'src/utils/combineLogin'
import {useHistory} from 'react-router-dom'
const HeaderBar: React.FC = () => {
  const userInfo = userStore.userInfo
  const history = useHistory()
  const onLogout = () => {
    userStore.logout()
    history.push('/')
  }
  const onLogin = () => {
    combineLogin.login()
  }
  return (
    <div className={css.page}>
      <div className={css.left}></div>
      <div className={css.right}>
        {userInfo ? (
          <>
            <Avatar src={userInfo?.hdlogo} alt={userInfo?.nick} size={36} />
            <div className={css.nickname}>{userInfo?.nick}</div>
            <Button size={'small'} danger={true} onClick={onLogout}>
              退出
            </Button>
          </>
        ) : (
          <Button size={'small'} danger={true} onClick={onLogin}>
            登录
          </Button>
        )}
      </div>
    </div>
  )
}

export default observer(HeaderBar)
