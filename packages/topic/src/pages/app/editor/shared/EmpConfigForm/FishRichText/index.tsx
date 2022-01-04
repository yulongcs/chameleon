import React, {useRef} from 'react'
// import {RichEditor} from 'ppfish'
import {useState} from 'react'
import {Modal} from 'antd'
import {transformHtmlPxPt2Rem} from 'src/engineModule/utils/styleHelper'
import {IFrameForPreview} from '../../..'
import pageStore from 'src/stores/page'
import {EnumDevice} from 'src/types/type'

const FishRichText = (props: any) => {
  const fontSizeRef = useRef(8)
  console.log('props', props)
  const {id, value, onChange} = props
  const editorRef = useRef()
  const [visible, setVisible] = useState(false)
  const [toolbar] = useState([
    ['link', 'bold', 'italic', 'underline'],
    ['color', 'background'],
    [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    ['size'],
    [{list: 'ordered'}, {list: 'bullet'}],
    ['emoji'],
    ['image'],
    ['video'],
    ['strike'],
    ['blockquote'],
    ['code-block'],
    [{script: 'sub'}, {script: 'super'}],
    [{indent: '-1'}, {indent: '+1'}],
    [{direction: 'rtl'}],
    ['clean', 'formatPainter'],
  ])

  const unit = window.frames[IFrameForPreview].document.children[0].style.fontSize
  // ;(doc.contentDocument as any).children[0].style.fontSize = unit
  fontSizeRef.current = parseFloat(unit)

  const transformValue = transformHtmlPxPt2Rem(value || '', pageStore.device, fontSizeRef.current)
  const getWidth = () => {
    if (!pageStore.renderData.designSize) {
      return 1000
    }
    switch (pageStore.device) {
      case EnumDevice.pc: {
        return pageStore.renderData.designSize.width + 80
      }
      case EnumDevice.mobile: {
        return (pageStore.renderData.designSize.width || 750) * 0.8
      }
      case EnumDevice.other: {
        return 200
      }
      default: {
        return 1000
      }
    }
  }
  return (
    <div>
      <div
        onClick={() => {
          setVisible(true)
        }}>
        点击编辑
      </div>
      <Modal
        title="编辑"
        visible={visible}
        mask={true}
        width={getWidth()}
        style={{height: '80vh'}}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}>
        {/* <RichEditor
          style={{height: '60vh'}}
          toolbar={toolbar}
          ref={editorRef}
          value={transformValue}
          onChange={(content: string, delta: string, source: string, editor: any) => {
            const res = transformHtmlPxPt2Rem(content || '', fontSizeRef.current)
            onChange(res)
          }}
        /> */}
      </Modal>
    </div>
  )
}

export default FishRichText
