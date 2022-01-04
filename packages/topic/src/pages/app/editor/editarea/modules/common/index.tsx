import {Menu} from 'antd'
import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import pageStore from 'src/stores/page'
import {getMergeModuleConfigs} from 'src/stores/sharemodule/moduleconfigs'
import ProjectModule from '../project'
import style from './index.module.scss'
const CommonComponentTree = () => {
  const [moduleConfigList, setModuleConfigs] = useState<any>([])
  const [currentName, setCurrentName] = useState('')

  useEffect(() => {
    const {list}: any = getMergeModuleConfigs(pageStore.renderData?.empModules || [])
    setModuleConfigs(list)
    setCurrentName(list?.[0]?.rmn || '')
  }, [])

  const handleClick = (e: any) => {
    setCurrentName(e.key)
  }

  return (
    <div className={style.box}>
      <Menu onClick={handleClick} mode="horizontal" selectedKeys={[currentName]} style={{zoom: 0.9}}>
        {moduleConfigList.map((item: any, index: number) => {
          if (item.rmn !== 'chameleon_share_emp') {
            return <Menu.Item key={`${item.rmn}`}>{item.title}</Menu.Item>
          }
        })}
      </Menu>
      <ProjectModule name={currentName}></ProjectModule>
    </div>
  )
}

export default observer(CommonComponentTree)
