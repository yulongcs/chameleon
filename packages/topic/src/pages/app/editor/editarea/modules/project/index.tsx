import {List, Spin} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import shareModuleStore from 'src/stores/sharemodule'
import style from './index.module.scss'
import {EditItem} from '../../../shared/EditItem'
import groupBy from 'lodash/groupBy'
import {Menu} from 'antd'
import {getMergeModuleConfigs} from 'src/stores/sharemodule/moduleconfigs'
import pageStore from 'src/stores/page'
const getGroupConfig = () => {
  return {
    pc: {
      title: 'PC组件',
    },
    mobile: {
      title: '移动端组件',
    },
    other: {
      title: '其他组件',
    },
    common: {
      title: '通用组件',
    },
    activities: {
      title: '活动组件',
    },
  }
}
let tmpName: string

const projectComponentlocalStorage = (name: string, data?: any) => {
  if (data) {
    sessionStorage.setItem(`Emp_ProjectComponentlocalStorage_${name}`, JSON.stringify(data || {}))
  }
  return JSON.parse(sessionStorage.getItem(`Emp_ProjectComponentlocalStorage_${name}`) || 'null')
}

const ProjectModule = ({name}: {name: string}) => {
  const groupConfigRef = useRef<any>(getGroupConfig())
  const [catagoryList, setCatagoryList] = useState<any>([])
  const groupRef = useRef<any>({})
  const [currentKey, setCurrentKey] = useState('')

  const updateCurrentMap = (groupTabsMap: any) => {
    groupRef.current = groupTabsMap
    setCurrentKey(Object.keys(groupTabsMap)?.[0] || '')
  }

  useEffect(() => {
    const {map} = getMergeModuleConfigs(pageStore.renderData?.empModules || [])
    if (name !== tmpName) {
      groupRef.current = {}
      setCatagoryList([])
    }
    tmpName = name
    if (!name || !map[name]) {
      return
    }
    setCurrentKey('')
    setTimeout(() => {
      //有缓存读缓存，每个项目的组件标题列表
      projectComponentlocalStorage(name) && updateCurrentMap(projectComponentlocalStorage(name))
      shareModuleStore.loadModuleListByMfName(map[name]).then((result: any) => {
        Object.assign(groupConfigRef.current, result?.projectConfig?.componentGroups || {})
        const list = shareModuleStore.allCmpListFilterHidden[name]
        const groups = groupBy(list, item => {
          const matches = item.rm.rmp.match(/\.\/(\w*)\//)
          return matches ? matches[1] : 'other'
        })
        const groupTabsMap: any = {}
        Object.keys(groups).map(item => {
          groupTabsMap[item] = {
            ...groupConfigRef.current[item],
            value: item,
            list: groups[item],
            title: (groupConfigRef.current && groupConfigRef.current[item]?.title) || item,
          }
        })
        projectComponentlocalStorage(name, groupTabsMap)
        if (name === tmpName) {
          updateCurrentMap(groupTabsMap)
        }
      })
    }, 0)
  }, [name])

  const handleClick = (e: any) => {
    setCurrentKey(e.key)
  }

  useEffect(() => {
    if (currentKey) {
      setCatagoryList(groupRef.current[currentKey]?.list)
    }
  }, [currentKey])

  return (
    <div className={style.wrap}>
      <List className={style.container}>
        {catagoryList && catagoryList.length > 0 ? (
          catagoryList?.map((item: any, index: number) => {
            return <EditItem key={`${item.name}_${index}`} treeNode={item}></EditItem>
          })
        ) : (
          <Spin />
        )}
      </List>
      <Menu onClick={handleClick} mode="vertical" defaultOpenKeys={[currentKey]} selectedKeys={[currentKey]}>
        {Object.values(groupRef.current).map((item: any) => (
          <Menu.Item key={item.value}>{item.title}</Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default ProjectModule
