import {createBrowserHistory} from 'history'
import {RouteProps} from 'react-router-dom'
import config from 'src/configs'

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

const routerConfig: Troutes[] = []

export default routerConfig
