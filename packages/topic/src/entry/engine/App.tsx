import React from 'react'
// import 'src/polyfill'
import {BrowserRouter as Router} from 'react-router-dom'
import router from './router/index'
import {RouteWithSubRoutes} from 'src/router'
const EngineIndex = import('src/pages/engine/index')

const EngineApp = (props: any = {}) => {
  return (
    <Router>
      <RouteWithSubRoutes routes={router} {...props} />
    </Router>
  )
}

export default EngineApp
