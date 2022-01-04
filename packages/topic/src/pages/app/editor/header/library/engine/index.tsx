import {Form, Button, Col, Divider, Row, Input, message, Drawer, Cascader} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import {observer} from 'mobx-react'
import React, {useCallback, useState, useRef, useEffect} from 'react'
import pageStore from 'src/stores/page'
import editorStore from 'src/stores/page/editor'
import langStore from 'src/stores/page/lang'
import style from './index.module.scss'
interface VersionListProps {
  tags: Record<string, string>
  versions: Array<string>
  url: string
}
const Engine = () => {
  const DefaultUrlMap = 'https://unpkg.yy.com/@webbase/chameleoneditor@1.0.7/dist/static/js/engine.4ee4c876.js'
  const [versionMap, setVersionMap] = useState<any>({})
  const requestVersion = async (callback: (result: any) => void) => {
    const result = await getNpmRegistryUrl()
    const tmpMap = getOptions(asyncLoadVersion(result, getUnpkgUrl(version)))
    callback && callback(tmpMap)
    return tmpMap
  }
  const getNpmRegistryUrl = async () => {
    return await fetch('https://unpkg.yy.com/version/@webbase/chameleoneditor', {
      credentials: 'same-origin',
    }).then(res => res.json())
  }
  const getUnpkgUrl = (item: any) => {
    try {
      const url = item.prod || item.test || DefaultUrlMap
      const version = url.match(/@(.*)@(.*)\/dist\//)?.[2] || ''
      return url.replace(version, '$V')
    } catch (e) {
      return ''
    }
  }
  useEffect(() => {
    requestVersion((result: any) => {
      setVersionMap(result)
    })
  }, [pageStore])

  const getOptions = (versionMap: any) => {
    return Object.keys(versionMap).map(item => {
      return {
        value: item,
        label: item,
        children: versionMap[item],
      }
    })
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
  const [version, setVersion] = useState<any>({})

  useEffect(() => {
    pageStore.pageContent.engineVersion && setVersion(pageStore.pageContent.engineVersion)
  }, [pageStore.pageContent.engineVersion])

  const onClose = () => {
    setVisible(false)
  }
  const onInputChange = useCallback(
    (env: string, url: string) => {
      if (version.hasOwnProperty(env)) {
        version[env] = url
      }
      setVersion(JSON.parse(JSON.stringify(version)))
    },
    [version],
  )
  const selectScopeRef = useRef<any>({})
  const [visible, setVisible] = useState(false)
  const showDrawer = (env: string) => {
    selectScopeRef.current = {
      env,
    }
    setVisible(true)
  }
  function filter(inputValue: string, path: Array<any>) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  }
  const onChange = useCallback(
    (value: any, selectedOptions: any) => {
      const url = value[1]
      const {env} = selectScopeRef.current
      version[env] = url || DefaultUrlMap
      setVersion(JSON.parse(JSON.stringify(version)))
      onClose()
    },
    [version],
  )
  const updateLocalProjectVersion = useCallback(
    async (open: boolean) => {
      version.open = open
      editorStore.updateEngineVersion(version)
      await editorStore.updatePageContentById()
      await langStore.save()
      message.success('更新成功')
    },
    [version],
  )
  return (
    <div>
      <Button
        type={'primary'}
        onClick={() => {
          updateLocalProjectVersion(true)
        }}>
        保存并开启
      </Button>
      <Button
        type={'primary'}
        onClick={() => {
          updateLocalProjectVersion(false)
        }}>
        保存并关闭
      </Button>
      <div className={style.verionbox}>
        <div className={style.optionbox}>
          <div>engineEnv=dev/test/prod，默认环境选择为平台环境</div>
          <Row align={'middle'}>
            <Col span={4}>
              <span>引擎版本</span>
            </Col>
            <Col span={20}>
              <div className={style.flexbox}>
                <span>线上地址&nbsp;</span>
                <TextArea
                  className={style.textarea}
                  value={version?.prod}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onInputChange('prod', e.currentTarget.value)
                  }}
                />
                <Button
                  onClick={() => {
                    showDrawer('prod')
                  }}>
                  编辑
                </Button>
              </div>
              <div className={style.flexbox}>
                <span>测试地址&nbsp;</span>
                <TextArea
                  className={style.textarea}
                  value={version?.test}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onInputChange('test', e.currentTarget.value)
                  }}
                />
                <Button
                  onClick={() => {
                    showDrawer('test')
                  }}>
                  编辑
                </Button>
              </div>
              <div className={style.flexbox}>
                <span>开发地址&nbsp;</span>
                <TextArea
                  className={style.textarea}
                  value={version?.dev}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onInputChange('dev', e.currentTarget.value)
                  }}
                />
                <Button
                  onClick={() => {
                    showDrawer('dev')
                  }}>
                  编辑
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Drawer title="版本号" placement="right" onClose={onClose} visible={visible} width="400">
        <div>项目：引擎版本</div>
        <div>环境：{selectScopeRef.current?.env}</div>
        <Cascader
          options={versionMap || []}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{filter}}></Cascader>
      </Drawer>
    </div>
  )
}

export default observer(Engine)
