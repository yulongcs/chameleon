import React, {useEffect} from 'react'
import {Button} from 'antd'
import {useHistory} from 'react-router-dom'
import combineLogin from 'src/utils/combineLogin'

const style: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
}

const Login: React.FC = () => {
  const history = useHistory()
  const onLogin = () => {
    combineLogin.login('/project/list')
    // userStore.setUserInfo({
    //   uid: 50047211,
    //   nick: '变色龙',
    //   hdlogo: 'https://downhdlogo.yy.com/hdlogo/640640/640/640/04/0050047211/u50047211zlI5JOsK2.jpg',
    //   passport: 'dw_chameleon',
    // })
    // history.push('/project/list')
  }
  useEffect(() => {
    combineLogin.login('/project/list')
  }, [])
  return (
    <div style={style}>
      <Button type={'primary'} onClick={onLogin}>
        点击登录
      </Button>
    </div>
  )
}

export default Login
