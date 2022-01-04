import React, {useEffect, useRef, useState} from 'react'
import {transfrom} from '..'
import ErrorBoundary from '../Error'
import {loadModuleFactory} from '../utils/getComponents'
import style from './index.module.scss'
import {CloseCircleOutlined} from '@ant-design/icons'
import ComponentSetting from '../componentSetting'
interface ComponentInfo {
  info: Record<any, any>
}

const RenderComponent = (props: ComponentInfo) => {
  const [componentProps, setComponentProps] = useState<any>()
  const [renderPorps, setRenderProps] = useState<any>()
  const {info} = props
  const {container, name} = info
  const [MagnifyComponent, setMagnifyComponent] = useState<any>()
  const Component: any = React.lazy(loadModuleFactory(container, name))
  const [curprops, setCurprops] = useState<any>(null)
  useEffect(() => {
    loadModuleFactory(container, name)().then((component: any) => {
      if (component.default?.empPropTypes) {
        const {props, defined} = component.default?.empPropTypes
        const componentName = component.default?.empPropTypes.name
        const componentDescription = defined.description
        const slots = defined.slots
        const children = [slots && React.lazy(loadModuleFactory(container, slots.rmp))]

        setRenderProps(props)
        setComponentProps({props, componentName, componentDescription, children})
      } else {
        setComponentProps(null)
      }
    })
  }, [container, name])
  const closeMagnify = () => {
    setMagnifyComponent(null)
    setCurprops(null)
  }
  const changeProps = (props: any) => {
    setRenderProps(props)
    setCurprops(props)
    setMagnifyComponent(
      <ErrorBoundary>
        <React.Suspense fallback="Loading System">
          <Component {...transfrom(props)}>{componentProps.children}</Component>
        </React.Suspense>
      </ErrorBoundary>,
    )
  }
  return componentProps ? (
    <div>
      <div
        className={style.componentItem}
        onClick={() => {
          setMagnifyComponent(
            <ErrorBoundary>
              <React.Suspense fallback="Loading System">
                <Component {...transfrom(renderPorps)}>{componentProps.children}</Component>
              </React.Suspense>
            </ErrorBoundary>,
          )
          setCurprops(componentProps.props)
        }}>
        <div className={style.component}>
          <ErrorBoundary>
            <React.Suspense fallback="Loading System">
              <Component {...transfrom(renderPorps)}>{componentProps.children}</Component>
            </React.Suspense>
          </ErrorBoundary>
        </div>
        <div className={style.title}>
          <span>
            {componentProps.componentName}
            {componentProps.componentDescription ? `(${componentProps.componentDescription})` : ''}
          </span>
        </div>
      </div>
      <div className={style.magnify} style={{display: MagnifyComponent ? 'block' : 'none'}}>
        <div className={style.container} style={{display: MagnifyComponent ? 'block' : 'none'}}>
          <div className={style.header}>
            <div className={style.closeBtn} onClick={closeMagnify}>
              <CloseCircleOutlined />
            </div>
          </div>
          <div className={style.component}>{MagnifyComponent},</div>
        </div>
        <ComponentSetting curprops={curprops} changeProps={changeProps} closeMagnify={closeMagnify} />
      </div>
    </div>
  ) : (
    <div style={{display: 'none'}}></div>
  )
}
export default RenderComponent
