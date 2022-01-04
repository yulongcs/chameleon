import React from 'react'
import {RouteWithSubRoutes} from 'src/router'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import userStore from 'src/stores/user'

const PageApp = ({routes}: {routes: Array<any>}) => {
  useEffect(() => {
    userStore.checkUid()
  }, [])
  return <RouteWithSubRoutes routes={routes} />
}
export default observer(PageApp)
