import React, {useEffect, useState, useCallback} from 'react'
import {EmpPropTypes} from 'src/types/emptype'
import styles from './index.module.scss'
import {observer} from 'mobx-react'
type Props = {
  fontColor: string
  activeFontColor: string
  bgColor: string
  activeBgColor: string
  bgImage: string
  activeBgImage: string
  style: any
  style1: any
  slotsLength?: number
}
// console.log(TabNav)
const Tab: EmpFC<Props> = (props: EmpFCProps<Props>) => {
  const {fontColor, activeFontColor, activeBgColor, bgColor, bgImage, activeBgImage, style, node, style1} = props
  const [curId, setCurId] = useState('')

  const [imgData, setImgData] = useState({})
  const handleImageLoad: any = (data: any) => {
    console.log(data)
    setImgData(data)
  }

  const isActive = useCallback(
    (id: string) => {
      return id === curId
    },
    [curId],
  )
  useEffect(() => {
    node?.chs?.[0]?.id && setCurId(node?.chs?.[0]?.id)
  }, [node?.chs])

  return (
    <>
      {/* <div className={styles.Tabs}>
        <div className={styles.tablist}>
          {node?.chs?.map((item: TreeNodeProps, index: number, array: TreeNodeProps[]) =>
            item ? (
              <div active={item.id} item={{...item, value: item.id}} key={item.id}>
                <div
                  className={styles.tabitem}
                  onClick={() => {
                    setCurId(item.id)
                  }}
                  style={{
                    color: isActive(item.id) ? activeFontColor : fontColor,
                    backgroundImage: `url(${isActive(item.id) ? activeBgImage : bgImage})`,
                    backgroundColor: `${isActive(item.id) ? activeBgColor : bgColor}`,
                    backgroundSize: '100% 100%',
                    ...(imgData as any),
                    ...transformStyle(JSON.parse(JSON.stringify(style1 || {}))),
                  }}>
                  {item?.text || '导航标题'}
                </div>
              </div>
            ) : (
              <></>
            ),
          )}
        </div>
      </div> */}
      <img
        src={activeBgImage}
        style={{
          display: 'none',
        }}
      />
      <div data-slot={curId}></div>
    </>
  )
}

Tab.empPropTypes = {
  name: '导航',
  defined: {
    description: '导航组件',
    slots: {rmn: 'basic_share_emp', rmp: './tab/tab/tabItem'},
  },
  props: {
    // 仅用于平台初始化
    slotsLength: {
      type: EmpPropTypes.InputNumber,
      label: '导航数量',
      value: 1,
    },
    style: {
      type: EmpPropTypes.StyleEdit,
      value: {},
      label: '导航外层样式',
      group: '导航外层',
    },
    style1: {
      type: EmpPropTypes.StyleEdit,
      value: {},
      label: '单个导航样式',
      group: '单个导航',
    },
    fontColor: {
      type: EmpPropTypes.ColorPicker,
      label: '字体颜色',
      options: {
        type: 'hex',
      },
      value: '#fff',
      group: '单个导航',
    },
    activeFontColor: {
      type: EmpPropTypes.ColorPicker,
      label: '激活态字体色',
      options: {
        type: 'hex',
      },
      value: '#000',
      group: '单个导航',
    },
    bgColor: {
      type: EmpPropTypes.ColorPicker,
      label: '背景色',
      options: {
        type: 'hex',
      },
      value: 'transparent',
      group: '单个导航',
    },
    activeBgColor: {
      type: EmpPropTypes.ColorPicker,
      label: '激活态背景色',
      options: {
        type: 'hex',
      },
      value: 'transparent',
      group: '单个导航',
    },
    bgImage: {
      type: EmpPropTypes.Upload,
      label: '背景图',
      value: 'https://pushmiddle.bs2dl.yy.com/img/60d5829f016ad801f902ed7e',
      group: '单个导航',
    },
    activeBgImage: {
      type: EmpPropTypes.Upload,
      label: '激活态背景图',
      value: 'https://pushmiddle.bs2dl.yy.com/img/60d582a2016ad801f902ed7f',
      group: '单个导航',
    },
  },
}

export default observer(Tab)
