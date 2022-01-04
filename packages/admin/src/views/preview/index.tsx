import {Select} from 'antd'
import React, {useEffect, useState} from 'react'
import style from './index.module.scss'
import {EmpModuleConfigs} from './sharemodule/moduleconfigs'
import {loadShareModule} from './utils/createContainer'
import {createScriptElement} from './utils/createScript'
import RenderComponent from './renderComponent'
export const transfrom = (props: any) => {
  if (props) {
    const result: Record<string, any> = {}
    Object.keys(props).map((item: any) => {
      result[item] = props[item].value
    })
    return result
  }
}
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
const Preview = () => {
  const [projectList, setProjectList] = useState<any>()
  const [selectedProject, setSelectedProject] = useState<any>()
  const [componentItems, setComponentItems] = useState<any>()
  const [selectedComponent, setSelectedComponent] = useState<any>()
  const [container, setContainer] = useState<any>()
  const [componentInfo, setComponentInfo] = useState<any[]>([])
  //初始化
  useEffect(() => {
    //将配置保存到本地
    const projects = JSON.parse(localStorage.getItem(`projectComponentlocalStorage`) || 'null')
    if (projects) {
      //有缓存直接读缓存
      //拿到每一项配置的value
      const projectList: any = Object.values(projects)
      //初始化默认选择第一个项目
      setSelectedProject(projectList.length ? projectList[0].rmn : '')
      setProjectList(projectList)
    } else {
      //无缓存，先存再取
      localStorage.setItem(`projectComponentlocalStorage`, JSON.stringify(EmpModuleConfigs || {}))
      const projects = JSON.parse(localStorage.getItem(`projectComponentlocalStorage`) || 'null')
      const projectList: any = Object.values(projects)
      setSelectedProject(projectList.length ? projectList[0].rmn : '')
      setProjectList(projectList)
    }
  }, [])
  //获取项目列表
  useEffect(() => {
    if (projectList && projectList.length) {
      let url: string
      projectList.some((item: any) => {
        if (item.rmn === selectedProject) {
          url = item.unpkgUrlMap[isProd ? 'prod' : 'test']
          createScriptElement(url, async () => {
            loadShareModule(selectedProject).then((result: any) => {
              result().then((container: any) => {
                if (container) {
                  const componentsMap: any = []
                  const componentsKeys: any = Object.keys(container.projectConfig?.componentGroups)
                  componentsKeys.map((item: any) => {
                    //key: 属性名 ,value: 属性title,用于selected
                    componentsMap.push({key: item, value: container.projectConfig?.componentGroups[item].title})
                  })
                  setComponentItems(componentsMap)
                  setSelectedComponent(componentsMap[0].key)
                  setContainer(container)
                }
              })
            })
          })
          return true
        }
      })
    }
  }, [projectList, selectedProject])
  //获取被待渲染的组件
  useEffect(() => {
    //拿到容器和具体哪一个项目组件群
    if (container && selectedComponent) {
      //componentGroups: 全部组件名
      const componentGroups = Object.keys(container.moduleMap)
      const str = `./(${selectedComponent}*)/`
      const reg = new RegExp(str)
      //curComponents: 当前项目下的某个组件群的组件名
      const curComponents: any = []
      //正则筛选该项目下的组件
      componentGroups.map((item: string) => {
        if (reg.test(item)) {
          curComponents.push(item)
        }
      })
      //数组有长度说明需要渲染
      if (curComponents.length) {
        const componentsRenderInfo: any = []
        curComponents.map((name: any) => {
          componentsRenderInfo.push({container, name})
          if (componentsRenderInfo.length === curComponents.length) {
            setComponentInfo(componentsRenderInfo)
          }
        })
      }
    }
  }, [container, selectedComponent])
  const projectListChange = (value: any) => {
    setSelectedProject(value)
  }
  const componentChange = (value: any) => {
    setSelectedComponent(value)
  }
  return (
    <div>
      <div className="module-header">
        <div className="module-header-main">
          <div className="form-item">
            <span>项目选择：</span>
            <Select
              placeholder={'请选择项目'}
              onChange={value => {
                projectListChange(value)
              }}
              value={selectedProject}>
              {projectList &&
                projectList.map((item: any, index: number) => (
                  <Select.Option key={index} value={item.rmn}>
                    {item.title}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="form-item">
            <span>组件选择：</span>
            <Select
              placeholder={'请选择组件'}
              onChange={value => {
                componentChange(value)
              }}
              value={selectedComponent}>
              {componentItems &&
                componentItems.map((item: any, index: number) => (
                  <Select.Option key={index} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
      </div>
      <div className={`${style.componentsContainer}`}>
        {componentInfo.map((renderInfo: any, index: number) => {
          return <RenderComponent key={index} info={{container: renderInfo.container, name: renderInfo.name}} />
        })}
      </div>
    </div>
  )
}
export default Preview
