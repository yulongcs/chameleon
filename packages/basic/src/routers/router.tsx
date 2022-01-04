import React, {FC, Suspense, SuspenseProps, Fragment} from 'react'
import {
  Route,
  BrowserRouter,
  Switch,
  useHistory,
  matchPath,
  useRouteMatch,
  useLocation,
  Redirect,
} from 'react-router-dom'
import LoadingComp from 'src/routers/loading'
import Page404 from 'src/routers/page404'
import routerConfig, {Troutes} from 'src/routers/config'

interface RouterCompProps {
  fallback?: SuspenseProps['fallback']
  routes?: Array<Troutes> | any
  moduleInfos?: any
}

const SwitchRouter = ({routes}: {routes?: Array<Troutes>}) => {
  return (
    <Switch>
      {routes && routes.length > 0 && routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  )
}

const RouteWithSubRoutes = (route: Troutes) => {
  return (
    (route.component && (
      <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
    )) || <SwitchRouter routes={route.routes} />
  )
}

const RoutersComp = () => routerConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)

const RouterComp = (props: RouterCompProps) => {
  return (
    <Suspense fallback={<LoadingComp />}>
      <Switch>
        {RoutersComp()}
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default RouterComp

export const Outlet: React.FC = () => {
  const routeMatchPath = useRouteMatch().path
  const pathname = useLocation().pathname
  const routes: Troutes[] = []
  routerConfig.forEach(item => {
    if (routeMatchPath === '/') {
      if (item.component) {
        routes.push(item)
        return
      }
      if (item.routes && item.routes.length > 0) {
        item.routes.forEach(child => {
          if (child.component) {
            routes.push(child)
          }
        })
      }
    } else {
      const match = matchPath(routeMatchPath, item)
      if (!match) {
        return
      }
      if (item.routes && item.routes.length > 0) {
        item.routes.forEach(child => {
          if (child.component) {
            routes.push(child)
          }
        })
      }
    }
  })
  return (
    <Suspense fallback={<LoadingComp />}>
      <Switch>
        {routes
          .filter(route => route.redirect && matchPath(pathname, route))
          .map(route => (
            <Redirect key={route.path} to={route.redirect as string} />
          ))}
        {routes.map((route, index) => (
          <Route path={route.path} key={route.path} render={props => <route.component {...props} route={route} />} />
        ))}
      </Switch>
    </Suspense>
  )
}
