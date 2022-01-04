import {lazy} from 'react'

export default [
  {
    path: '/:id',
    exact: true,
    component: lazy(() => import('src/pages/engine/index')),
  },
  {
    path: '*',
    exact: true,
    component: lazy(() => import('src/pages/introduction/introduction')),
  },
]
