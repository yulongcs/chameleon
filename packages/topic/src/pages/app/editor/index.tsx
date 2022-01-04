import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import style from './index.module.scss'
import {Spin} from 'antd'
import {Content} from 'antd/lib/layout/layout'
import pageStore from 'src/stores/page'
import {observer} from 'mobx-react'
import EditHeader from './header'
import PageEditArea from './editarea'
import {getIframeUrl} from 'src/helpers/urlUtil'
import {EnumDevice, EnumPlatformEnv} from 'src/types/type'
import userStore from 'src/stores/user'
import {initPlatformEvent} from 'src/helpers/platform'
import {DefaultDesizeSize} from 'src/engineModule/utils/flexibleHelper'
import {setSelectBoxsStyle} from 'src/engineModule/utils/tipsStyleHelper'
import treeStore from 'src/stores/page/tree'
import PreviewMockSelector from './previewmock'
import {clearFrameMobx} from 'src/stores/empmobx'
import CommonComponentTree from 'src/pages/app/editor/editarea/modules/common/index'
import {addStoreEventListener, initEditListener} from 'src/helpers/edit/dom'
export const IFrameForPreview = 'IFrameForPreview'
const getUrl = () => {
  if (!pageStore.id) {
    return ''
  }
  return getIframeUrl(pageStore.id, {env: EnumPlatformEnv.dev, edit: true, device: pageStore.device})
}

const PageEditor = () => {
  const params = useParams<{id: string}>()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [iframeSrc, setIframeSrc] = useState('')
  const [scalcHeight, setScalcHeight] = useState(100)
  const [scaleDesizeHeight, setScaleDesizeHeight] = useState(100)

  useEffect(() => {
    pageStore.setPageId(new URLSearchParams(window.location.search).get('pageId') || params.id || '')
  }, [])

  useEffect(() => {
    iframeRef.current?.contentDocument &&
      setSelectBoxsStyle(treeStore.curTreeNode.id, iframeRef.current?.contentDocument)
  }, [treeStore.curTreeNode])

  useEffect(() => {
    if (pageStore.pageContent?.pageInfo?.projectId) {
      userStore.getUserAuth(pageStore.pageContent?.pageInfo?.projectId)
    }
  }, [pageStore.pageContent.pageInfo])

  const onChangeIframeSize = (isAdd: boolean) => {
    if (!iframeRef.current) {
      return
    }
    let size = Number((iframeRef.current.contentDocument?.documentElement as any).style.zoom || 1)
    if (isAdd) {
      size = (size && size + 0.2) || 1
    } else {
      size = (size && size - 0.2) || 1
    }
    ;(iframeRef.current.contentDocument?.documentElement as any).style.zoom = size
  }

  const deviceStyle = () => {
    switch (pageStore.device) {
      case EnumDevice.mobile: {
        return style.mobile
      }
      case EnumDevice.pc: {
        return style.pc
      }
      case EnumDevice.other: {
        return style.other
      }
    }
  }

  const onReloadIframe = () => {
    clearFrameMobx()
    setIframeSrc(getUrl())
  }

  useEffect(() => {
    // 增加store数据监听
    addStoreEventListener()
    setIframeSrc(getUrl())
    initPlatformEvent()
  }, [])

  useEffect(() => {
    if (pageStore.device === EnumDevice.other) {
      pageStore.renderData.designSize = pageStore.renderData.designSize || DefaultDesizeSize(EnumDevice.other)
      const dom = document.getElementById('linebox')
      if (dom) {
        const scalc = 375 / (pageStore.renderData.designSize.width || 375)
        setScalcHeight(scalc * 100)
        pageStore.renderData.designSize.height && setScaleDesizeHeight(scalc * pageStore.renderData.designSize.height)
      }
    }
  }, [pageStore.device, pageStore.renderData.designSize])

  const onloadSuccess = () => {
    setLoading(false)
    initEditListener()
  }
  return (
    <div className={style.container}>
      <PageEditArea />
      <div style={{flex: 1, overflowX: 'auto'}}>
        <EditHeader onChangeIframeSize={onChangeIframeSize} onReloadIframe={onReloadIframe} />
        <Spin tip="Loading..." spinning={loading}>
          <div className={style.main_area}>
            <Content className={style.content}>
              <PreviewMockSelector></PreviewMockSelector>
              {pageStore.device && pageStore.device !== EnumDevice.pc && (
                <div className={style.linebox} id="linebox">
                  <div className={style.line100} style={{marginTop: `${scalcHeight}px`}}>
                    100px
                  </div>
                  <div className={style.line100} style={{marginTop: `${scalcHeight}px`}}>
                    200px
                  </div>
                  <div className={style.line100} style={{marginTop: `${scalcHeight}px`}}>
                    300px
                  </div>
                  <div className={style.line100} style={{marginTop: `${scalcHeight}px`}}>
                    400px
                  </div>
                  {pageStore.renderData.designSize?.height && (
                    <div className={style.lineForDesize} style={{marginTop: `${scaleDesizeHeight}px`}}>
                      设计稿高：{pageStore.renderData.designSize?.height}px
                    </div>
                  )}
                </div>
              )}
              {iframeSrc && (
                <iframe
                  onLoad={onloadSuccess}
                  name={IFrameForPreview}
                  ref={iframeRef}
                  src={iframeSrc}
                  frameBorder="0"
                  className={`${style.iframe} ${deviceStyle()}`}
                  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
              )}
            </Content>
            <CommonComponentTree></CommonComponentTree>
          </div>
        </Spin>
      </div>
    </div>
  )
}
export default observer(PageEditor)
