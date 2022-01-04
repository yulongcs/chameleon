import {Col, Row, Cascader, Tabs, Button, Drawer, Input, message} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, {useEffect, useState} from 'react'
import {useCallback} from 'react'
import {useRef} from 'react'
import pageStore from 'src/stores/page'
import editorStore from 'src/stores/page/editor'
import langStore from 'src/stores/page/lang'
import {
  EmpDefaultModuleConfigs,
  EmpModuleConfigs,
  getMergeModuleConfigs,
  localEmpModuleConfigs,
} from 'src/stores/sharemodule/moduleconfigs'
import style from './index.module.scss'
const DefaultUrlMap: any = {
  chameleon_share_emp: 'https://unpkg.yy.com/@webbase/chameleonapp@latest/dist/chameleon_share_emp.js',
  bdgamelive_share_emp: 'https://unpkg.bdgamelive.com/@gfe/bdtopic@1.0.20/dist/bdgamelive_share_emp.js',
}
interface EmpSharePluginProps {
  rmn: string
  packageName: string
  v: string
  unpkgUrlMap: Record<string, string>
}

const getPackageName = (item: EmpSharePluginProps) => {
  if (item.packageName) {
    return item.packageName
  }

  try {
    const url = item.unpkgUrlMap?.prod || item.unpkgUrlMap?.test || DefaultUrlMap[item.rmn]
    const packageName = url.split('@')[1]
    return `@${packageName}`
  } catch (e) {
    return ''
  }
}

const getUnpkgUrl = (item: EmpSharePluginProps) => {
  try {
    const url = item.unpkgUrlMap?.prod || item.unpkgUrlMap?.test || DefaultUrlMap[item.rmn]
    const version = url.match(/@(.*)@(.*)\/dist\//)?.[2] || ''
    return url.replace(version, '$V')
  } catch (e) {
    return ''
  }
}

const getNpmRegistryUrl = async (packageName: string) => {
  return await fetch(`https://unpkg.yy.com/version/${packageName}`, {
    credentials: 'same-origin',
  }).then(res => res.json())
}

interface VersionListProps {
  tags: Record<string, string>
  versions: Array<string>
  url: string
}
const asyncLoadVersion = ({tags, versions}: VersionListProps, url: string) => {
  const tmpObj: any = {
    latest: [],
  }
  versions.map((item: string) => {
    const [bigVersion, tagVersion] = item.split('-')
    if (!tagVersion) {
      tmpObj.latest.unshift({
        value: url.replace('$V', item),
        label: item,
      })
    }
    if (tagVersion) {
      const [tag, nVersion] = tagVersion.split('.')
      if (!tmpObj[tag]) {
        tmpObj[tag] = []
      }
      tmpObj[tag].unshift({
        value: url.replace('$V', item),
        label: item,
      })
    }
  })
  return tmpObj
}

const getOptions = (versionMap: Record<string, any>) => {
  return Object.keys(versionMap).map(item => {
    return {
      value: item,
      label: item,
      children: versionMap[item],
    }
  })
}

const requestVersion = async (empModules: Array<TreeNodeRemoteModule | any>, callback: (result: any) => void) => {
  const tmpMap: any = {}
  for (let index = 0; index < empModules.length; index++) {
    const item: TreeNodeRemoteModule | any = empModules[index]
    const result = await getNpmRegistryUrl(getPackageName(item))
    tmpMap[item.rmn] = getOptions(asyncLoadVersion(result, getUnpkgUrl(item)))
  }
  callback && callback(tmpMap)
  return tmpMap
}

const ProjectVersion = () => {
  const [versionMap, setVersionMap] = useState<Record<string, any>>({})
  const [visible, setVisible] = useState(false)
  const selectScopeRef = useRef<any>({})
  const [empModules, setEmpModules] = useState<any>([])
  const showDrawer = (scope: string, env: string) => {
    selectScopeRef.current = {
      scope,
      env,
    }
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  // 获取数据源
  useEffect(() => {
    const {list} = getMergeModuleConfigs(pageStore.renderData?.empModules || [])
    requestVersion(list || [], (result: any) => {
      setVersionMap(result)
    })
    setEmpModules(list)
  }, [pageStore.renderData?.empModules])

  // 触发修改
  const onChange = useCallback(
    (value: any, selectedOptions: any) => {
      console.log(value, selectedOptions)
      const url = value[1]
      const {scope, env} = selectScopeRef.current
      empModules.some((item: TreeNodeRemoteModule & any) => {
        if (item.rmn === scope) {
          item.unpkgUrlMap[env] = url
        }
      })
      setEmpModules(JSON.parse(JSON.stringify(empModules)))
      onClose()
    },
    [empModules],
  )

  function filter(inputValue: string, path: Array<any>) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  }

  const updateStoreModules = async (localEmpModuleMap: any) => {
    const list: any = []
    pageStore.renderData?.empModules?.map((item: TreeNodeRemoteModule & any) => {
      if (typeof item === 'string') {
        item = {
          rmn: item,
        }
      }
      list.push({
        ...item,
        ...localEmpModuleMap[item?.rmn || item],
      })
    })
    editorStore.updateEmpModules(JSON.parse(JSON.stringify(list)))
    await editorStore.updatePageContentById()
    await langStore.save()
    message.success('更新成功')
  }

  const updateLocalProjectVersion = useCallback(async () => {
    message.success({
      content: '页面保存中...',
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#00000033',
        paddingTop: '40vh',
      },
    })
    const tmpMap: any = {}
    empModules.map((item: TreeNodeRemoteModule) => {
      tmpMap[item.rmn] = item
    })
    await localEmpModuleConfigs(tmpMap)
    await updateStoreModules(tmpMap)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }, [empModules])

  const onInputChange = useCallback(
    (scope: string, env: string, url: string) => {
      empModules.some((item: TreeNodeRemoteModule & any) => {
        if (item.rmn === scope) {
          item.unpkgUrlMap[env] = url
        }
      })
      setEmpModules(JSON.parse(JSON.stringify(empModules)))
    },
    [empModules],
  )

  const isPageAssets = (name: string) => {
    return pageStore.renderData?.empModules?.some(item => {
      return (item.rmn || item) === name
    })
  }
  // 版本列表
  return (
    <div>
      <Button type={'primary'} onClick={updateLocalProjectVersion}>
        保存环境并刷新页面
      </Button>
      <div className={style.verionbox}>
        {empModules?.map((item: TreeNodeRemoteModule | any, index: number) => {
          return (
            <div key={index} className={`${style.optionbox} ${isPageAssets(item.rmn) && style.isPageAsset}`}>
              <Row align={'middle'}>
                <Col span={7}>
                  {EmpModuleConfigs()[item.rmn].title}
                  <br />({item.rmn})
                </Col>
                <Col span={17}>
                  <div className={style.flexbox}>
                    <span>线上地址&nbsp;</span>
                    <TextArea
                      value={item?.unpkgUrlMap?.prod}
                      className={style.textarea}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onInputChange(item.rmn, 'prod', e.currentTarget.value)
                      }}
                    />
                    <Button
                      onClick={() => {
                        showDrawer(item.rmn, 'prod')
                      }}>
                      编辑
                    </Button>
                  </div>
                  <div className={style.flexbox}>
                    <span>测试地址&nbsp;</span>
                    <TextArea
                      value={item?.unpkgUrlMap?.test}
                      className={style.textarea}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onInputChange(item.rmn, 'test', e.currentTarget.value)
                      }}
                    />
                    <Button
                      onClick={() => {
                        showDrawer(item.rmn, 'test')
                      }}>
                      编辑
                    </Button>
                  </div>
                  <div className={style.flexbox}>
                    <span>开发地址&nbsp;</span>
                    <TextArea
                      value={item?.unpkgUrlMap?.dev}
                      className={style.textarea}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onInputChange(item.rmn, 'dev', e.currentTarget.value)
                      }}
                    />
                    <Button
                      onClick={() => {
                        showDrawer(item.rmn, 'dev')
                      }}>
                      编辑
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )
        })}
      </div>
      <Drawer title="版本号" placement="right" onClose={onClose} visible={visible} width="400">
        <div>项目：{selectScopeRef.current?.scope}</div>
        <div>环境：{selectScopeRef.current?.env}</div>
        <Cascader
          options={versionMap?.[selectScopeRef.current?.scope] || []}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{filter}}></Cascader>
      </Drawer>
    </div>
  )
}
export default ProjectVersion
