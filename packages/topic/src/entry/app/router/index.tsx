import {lazy} from 'react'

export default [
  {
    path: '/home',
    exact: false,
    component: lazy(() => import('src/pages/app')),
    routes: [
      {
        path: '/home',
        exact: true,
        component: lazy(() => import('src/pages/app/home')),
      },
    ],
  },
  {
    path: '/editor',
    exact: false,
    component: lazy(() => import('src/pages/app')),
    routes: [
      {
        path: '*',
        exact: true,
        component: lazy(() => import('src/pages/app/editor/index')),
        routes: [],
      },
    ],
  },
  {
    path: '/preview',
    exact: false, // 如果为false， 则都经过该路由。 为true为命中处理
    component: lazy(() => import('src/pages/app')),
    routes: [
      {
        path: '*',
        exact: true,
        component: lazy(() => import('src/pages/app/preview')),
        routes: [],
      },
    ],
  },
  {
    path: '/',
    exact: false, // 如果为false， 则都经过该路由。 为true为命中处理
    component: lazy(() => import('src/pages/app')),
    routes: [
      {
        path: '*',
        exact: true,
        component: lazy(() => import('src/pages/app/editor/index')),
        routes: [],
      },
    ],
  },
]
