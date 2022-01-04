import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {history} from 'src/routers/config'
import Page from './pages/index'
import {ConfigProvider} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Router history={history}>
      <Page />
    </Router>
  </ConfigProvider>,
  document.getElementById('emp-root'),
)
