import React from 'react'
import ErrorBoundary from '../Error'
import style from './index.module.scss'
interface PreviewProps {
  id: string
  node: TreeNodePropsInEdit
  items: any
  initialValues: any
}
const Index = (props: PreviewProps) => {
  const {node, items} = props
  const {rmn, rmp} = node?.rm
  function loadComponent(scope: string, module: string) {
    //通过name和expose定位具体组件
    return async () => {
      const factory = await window[scope].get(module)
      const Module = factory()
      return Module
    }
  }
  const Component = React.lazy(loadComponent(rmn, rmp))
  const transfrom = (items: any) => {
    const result: Record<string, any> = {}
    items.map((item: any) => {
      result[item.name] = item.value
    })

    return result
  }
  return (
    //通过该方法渲染
    <ErrorBoundary>
      <div className={style.container}>
        <React.Suspense fallback={<div>加载中</div>}>
          <Component {...transfrom(items)} />
        </React.Suspense>
      </div>
    </ErrorBoundary>
  )
}
export default Index
