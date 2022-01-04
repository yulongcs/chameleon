import React, {lazy, Suspense, useEffect, useState} from 'react'
import LoadingComp from 'src/routers/loading'
import {useLocation} from 'react-router-dom'
import userStore from 'src/stores/user'
import {initBaiduReport} from 'src/utils/report/baiduReport'
import config from 'src/configs'

const Home = lazy(() => import('src/views/home'))
const Login = lazy(() => import('src/views/login'))
const Main = lazy(() => import('src/views/main'))

const App = () => {
  const location = useLocation()
  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    config.isProd && initBaiduReport()
    userStore.checkLogin()
    setLogin(userStore.isLogin)
  }, [])

  return <Suspense fallback={<LoadingComp />}>{isLogin ? <Main /> : <Login />}</Suspense>
}

export default App
