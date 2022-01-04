import React, {useCallback, useState} from 'react'

import {Drawer} from 'antd'
import ErrorBoundary from '../../shared/Error'
import {getChildNodeCommonProps} from 'src/engineModule/engine/render'
const ActivityExtendSetting = () => {
  const [visible, setVisible] = useState(false)
  const [Component, setComponent] = useState<any>(null)

  const onClose = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <>
      {new Array(3).fill({a: 123}).map((item: any, index: number) => {
        return (
          <div
            key={index}
            onClick={() => {
              setVisible(true)
            }}>
            {item.a}
          </div>
        )
      })}
      <Drawer
        title={'配置'}
        placement={'left'}
        closable={false}
        onClose={onClose}
        visible={visible}
        width={`${'60vw'}`}>
        <ErrorBoundary>
          {Component && (
            <React.Suspense fallback={'加载中...'}>
              <Component {...getChildNodeCommonProps({} as any, null)} />
            </React.Suspense>
          )}
        </ErrorBoundary>
      </Drawer>
    </>
  )
}

export default ActivityExtendSetting
