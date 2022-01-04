import {lazy} from 'react'
import {createBrowserHistory} from 'history'
import {RouteProps} from 'react-router-dom'
import {PieChartOutlined, PushpinOutlined, FormOutlined, ApiOutlined} from '@ant-design/icons'
import config from 'src/configs'
import path from 'path-browserify'

export const history = createBrowserHistory({
  basename: config.routerBasename,
})

export interface Troutes extends RouteProps {
  path: string
  component?: any
  exact?: boolean
  title?: string
  auth?: boolean
  icon?: any
  routes?: Array<Troutes>
  redirect?: string
  menuHide?: boolean
}

const routerConfig: Troutes[] = [
  {
    title: '活动管理',
    path: 'service',
    icon: PieChartOutlined,
    routes: [
      {
        title: '活动列表',
        path: 'list',
        component: lazy(() => import('src/views/service')),
      },
    ],
  },
  {
    title: '项目管理',
    path: 'project',
    icon: PushpinOutlined,
    routes: [
      {
        title: '用户列表',
        path: 'users',
        component: lazy(() => import('src/views/service/users')),
      },
      {
        title: '拥有项目列表',
        path: 'list',
        component: lazy(() => import('src/views/project')),
      },
      {
        path: 'add',
        component: lazy(() => import('src/views/project/add')),
        menuHide: true,
      },
    ],
  },
  {
    title: '数据报表',
    path: 'reportForm',
    icon: FormOutlined,
    routes: [
      {
        title: '活动报表',
        path: 'activity',
        component: lazy(() => import('src/views/reportFrom/reportForm')),
      },
    ],
  },
  {
    title: '预览',
    path: 'preview',
    icon: ApiOutlined,
    routes: [
      {
        title: '组件预览',
        path: 'componentPreview',
        component: lazy(() => import('src/views/preview')),
      },
    ],
  },
]

function recursionPath(parentPath: string, routes: Troutes[]) {
  routes.forEach(item => {
    item.path = path.resolve(parentPath, item.path)
    if (item.redirect && !item.redirect.startsWith('/')) {
      item.redirect = path.resolve(parentPath, item.redirect)
    }

    if (item.routes && item.routes.length > 0) {
      recursionPath(item.path, item.routes)
    }
  })
}

// router path 格式化
recursionPath('/', routerConfig)

export default routerConfig
