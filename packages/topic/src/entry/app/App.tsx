import React from 'react'
import './index.scss'
import {BrowserRouter as Router} from 'react-router-dom'
import router from './router/index'
import {RouteWithSubRoutes} from 'src/router'
import {ConfigProvider} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

const App = (props?: any) => {
  return (
    <ConfigProvider locale={locale}>
      <Router>
        <RouteWithSubRoutes routes={router} />
      </Router>
    </ConfigProvider>
  )
}
export default App
