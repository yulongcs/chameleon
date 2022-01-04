import React, {useState} from 'react'
import {useEffect} from 'react'
import {EmpPropTypes} from 'src/types/emptype'
import style from './index.module.scss'

interface Props {
  slotsLength: number
}

const ScrollTab: EmpFC = (props: EmpFCProps<Props>) => {
  const {node, empLangKvs} = props
  const [curId, setCurId] = useState('')
  useEffect(() => {
    node?.chs?.[0]?.id && setCurId(node?.chs?.[0]?.id)
  }, [node?.chs])
  return (
    <div>
      <div className={style.tabbox}>
        {node?.chs?.map((item: TreeNodeProps & any, index: number) => {
          return (
            <div
              key={index}
              className={`${curId === item.id ? style.tabbox_active : style.tabbox_default}`}
              onClick={() => {
                setCurId(item.id)
              }}>
              {empLangKvs?.[item.id]?.text || '导航名称'}
            </div>
          )
        })}
      </div>
      <div data-slot={curId}></div>
    </div>
  )
}

export const ScrollTabSubTab = {rmn: 'chameleon_share_emp', rmp: './tab/scrollTabMobile/tab'}

ScrollTab.empPropTypes = {
  name: '单行导航',
  defined: {
    slots: ScrollTabSubTab,
  },
  props: {
    slotsLength: {
      type: EmpPropTypes.InputNumber,
      label: '导航数量',
      value: 2,
      description: '导航数量',
    },
  },
}

export default ScrollTab
