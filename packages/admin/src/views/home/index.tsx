import * as React from 'react'
import css from './index.module.scss'
import {Button} from 'antd'
import {useHistory} from 'react-router-dom'

const Home: React.FC = () => {
  const history = useHistory()
  const onEntry = () => {
    history.push('/service/list')
  }
  return (
    <div className={css.page}>
      <div className={css.content}>
        <h1>EMP低代码平台管理后台</h1>
        <Button className={css.btnEntry} type={'primary'} onClick={onEntry}>
          点击进入
        </Button>
      </div>
    </div>
  )
}

export default Home
