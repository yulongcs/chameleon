import React from 'react'
import {baiduEventReport} from 'src/helpers/report/baiduReport'
import {renderNode, renderSlotComponentByIdNew} from 'src/pages/engine/init'
import {runCode} from '../utils/codeHelper'
import {cacheRenderModuleMap} from '../utils/createScript'
import {transformStyle} from '../utils/styleHelper'

let langStore: any = {}
type EMPAppContainerNewProps = EmpFCProps<Record<string, any>> & {
  serializeId: boolean
  edit: boolean
  id: string
}

class EMPAppContainerNew extends React.Component<EMPAppContainerNewProps, any> {
  public mo: MutationObserver | null = null
  constructor(props: any) {
    super(props)
    this.state = {hasError: null, errorInfo: {}, error: {}}
    langStore = window.__EMP.globalStore.lang?.value || {}
  }

  static getDerivedStateFromError(error: string) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.error('[getDerivedStateFromError]', error)
    return {hasError: true, error}
  }

  componentWillUnmount() {
    this.mo?.disconnect()
  }

  componentDidMount() {
    if (!this.props.serializeId) {
      return
    }
    const node = this.props.node
    if (node?.id) {
      const empEvent = JSON.parse(JSON.stringify(langStore[node?.id]?.empEvent || {}))
      const edit = this.props.edit
      const dom = node && document.getElementById(`${node.id}`)
      if (edit === false && empEvent && empEvent.eventType && dom) {
        runCode(dom, empEvent)
      }
      if (dom && !dom?.dataset?.id) {
        dom.dataset.id = node.id
        renderNode(node)
      }
      if (dom) {
        const callback = function (mutation: any) {
          mutation.map(function (record: any) {
            const target = record.target
            switch (record.type) {
              case 'characterData':
                // 文本内容变化
                break
              case 'attributes': {
                // 属性值发生了变化
                if (target.id !== target.dataset.slot && record.attributeName === 'data-slot') {
                  const oldId = target.id
                  const newId = target.dataset.slot
                  target.id = newId
                  renderSlotComponentByIdNew(oldId, newId)
                }
                break
              }
            }
          })
        }
        this.mo?.disconnect()
        this.mo = new MutationObserver(callback)

        const option = {
          // childList: true,
          subtree: true,
          // characterData: true,
          attributes: true,
          attributeFilter: ['data-slot'],
        }
        this.mo.observe(dom, option)
      }
      baiduEventReport(['component-success', node.rm.rmn, node.rm.rmp])
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    const {node, id} = this.props
    if (node?.id && id) {
      baiduEventReport(['component-fail', node.rm.rmn, node.rm.rmp])
      cacheRenderModuleMap[id] = false
      // 错误日志上报给服务器
      console.error('[componentDidCatch]', error, errorInfo)
      this.setState({
        hasError: true,
        error,
        errorInfo,
      })
    }
  }

  render() {
    const id = this.props.node?.id || ''
    const edit = this.props.edit
    const {empStyle = {}, empSnapshotStyle = {}} = langStore[id] || {}
    const styleValue = edit ? {...empStyle} : {...empSnapshotStyle, ...empStyle}

    const style = JSON.parse(JSON.stringify(transformStyle(styleValue, window.__EMP.globalStore.device)))
    const children = this.state.hasError ? (
      <div style={{...style, overflow: 'auto'}}>
        <img src={require('../assets/404.png')} alt="" />
        <h1>{this.state.error && this.state.error.toString()}</h1>
        <br />
        <h5>{JSON.stringify(this.state.error.stack, null, 2)}</h5>
      </div>
    ) : (
      this.props.children
    )
    return (
      <>
        {this.props.serializeId ? (
          <div id={id} style={style}>
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
      </>
    )
  }
}

export default EMPAppContainerNew
