import React, {useCallback, useState} from 'react'
import {Drawer, Button} from 'antd'
import {useEffect} from 'react'
import {getAdvanceFormValue} from '..'
import ErrorBoundary from '../../Error'
import {getChildNodeCommonProps} from 'src/engineModule/engine/render'
import langStore from 'src/stores/page/lang'

const AdvancedConfig = ({item, node}: {item: EmpEditPropTypes; node: TreeNodeProps}) => {
  const [visible, setVisible] = useState(false)
  const [Component, setComponent] = useState<any>(null)

  const onClose = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    if (item.extendConfig) {
      const component: any = React.lazy(() => {
        return new Promise(async resolve => {
          const factory = await window[node.rm.rmn].get(item.extendConfig?.url)
          const Module = factory()
          resolve(Module)
        })
      })
      setComponent(component)
    } else {
      setComponent(null)
    }
  }, [item.extendConfig, node])

  const rewriteSection = useCallback(
    (section: Record<string, any>, globalData?: Record<string, any>) => {
      section && getAdvanceFormValue().updateForm(section || {})
      globalData && langStore.updateLangKvsWithObject(globalData)
    },
    [node?.id],
  )
  const {empStyle, empEvent, ...extendSectionConfig}: any = getAdvanceFormValue().getEditingValue() || {}
  const propValue = (extendSectionConfig || {})[item.name]

  return (
    <>
      {item.extendConfig && (
        <div>
          <Button
            size="small"
            type="dashed"
            onClick={() => {
              setVisible(true)
            }}>
            {item.extendConfig?.name || '其它配置'}
          </Button>
          <Drawer
            title={item.extendConfig?.name || '其它配置'}
            placement={'left'}
            closable={false}
            onClose={onClose}
            visible={visible}
            width={`${item.extendConfig?.width || '60vw'}`}>
            <ErrorBoundary>
              {Component && (
                <React.Suspense fallback={'加载中...'} key={propValue}>
                  <Component
                    {...getChildNodeCommonProps(item as any, null)}
                    propItem={item}
                    section={extendSectionConfig || {}}
                    propKey={item.name}
                    propValue={propValue}
                    callback={rewriteSection}
                    onClose={onClose}
                  />
                </React.Suspense>
              )}
            </ErrorBoundary>
          </Drawer>
        </div>
      )}
    </>
  )
}

export default AdvancedConfig

// const add = async () => {
//     const result = await http.post(
//       'https://cfg-test.bdgamelive.com/admin/sys/commoncfg/instance/save?cfgId=6189e42a91979b3c757bbf1c&cfgName=voteConfig',
//       {
//         approving: {
//           activityId: '4',
//           voteName: '测试名称',
//           voteTime: ['2021-11-08 00:00:00', '2021-11-19 00:00:00'],
//           limitType: '1',
//           limitNum: 10,
//           id: '',
//         },
//         def: '6189e42a91979b3c757bbf1c',
//         version: null,
//       },
//     )
//   }

//   const list = async () => {
//     const result = await http.post('https://cfg-test.bdgamelive.com/admin/sys/commoncfg/instance/list/voteConfig', {
//       search: {},
//       params: {category: '4', page: 0, size: 25},
//     })
//   }

//   const deleteA = async () => {
//     const result = await http.getWithCredentials(
//       'https://cfg-test.bdgamelive.com/admin/sys/commoncfg/instance/delete/6189e42a91979b3c757bbf1c/618a202f91979b3c757bbf66',
//       {
//         approving: {
//           activityId: '4',
//           voteName: '测试名称',
//           voteTime: ['2021-11-08 00:00:00', '2021-11-19 00:00:00'],
//           limitType: '1',
//           limitNum: 10,
//           id: '',
//         },
//         def: '6189e42a91979b3c757bbf1c',
//         version: null,
//       },
//     )
//   }
