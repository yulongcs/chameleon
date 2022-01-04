import React, {Suspense} from 'react'
// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`

import {Route, Switch} from 'react-router-dom'

// prop to the component it renders.
export type RouteProps = {
  component?: any
  path: string
  exact?: boolean
  strict?: boolean
  routes?: Array<RouteProps>
}

export const SubRoute = (route: RouteProps) => {
  route.routes?.map(item => {
    const hasInclude = item.path.startsWith(`${route.path}/`)
    item.path = hasInclude ? `${item.path}` : `${route.path}${item.path}`
  })
  return (
    route.component && (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={props => <route.component {...props} routes={route.routes} />}></Route>
    )
  )
}

export const RouteWithSubRoutes = ({routes}: {routes: Array<RouteProps>}) => {
  return (
    <Suspense fallback={''}>
      <Switch>
        {routes?.map((route: any) => {
          return <SubRoute key={route.path} {...route}></SubRoute>
        })}
      </Switch>
    </Suspense>
  )
}
