import React, {useRef, useEffect, MouseEvent} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Editor as tinymce} from 'tinymce'
import {Button, Spin} from 'antd'
import {useState} from 'react'
import {DraggableModal} from '../../../shared/DraggableModal'
import config from 'src/configs'
import {ERROR_FALLBACK_BASE64} from '../../Upload'
import {DEFAULT_REM_UNIT, transformHtmlPxPt2Rem} from 'src/engineModule/utils/styleHelper'
import {EnumDevice} from 'src/types/type'
import pageStore from 'src/stores/page'
import {IFrameForPreview} from '../../..'
import styles from './index.module.scss'

type RichTextType = {
  id: string
  onChange(str: string): void
  value: string
  defaultValue: string
}

const RichText = (props: RichTextType) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/tinymce582/js/tinymce/tinymce.min.js'
    document.body.appendChild(script)
  }, [])
  const {id, onChange, value, defaultValue} = props
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const editorRef = useRef<tinymce>()
  const fontSizeRef = useRef(DEFAULT_REM_UNIT)
  const getTextContent = () => {
    return transformHtmlPxPt2Rem(editorRef.current?.getContent() || '', pageStore.device, fontSizeRef.current)
  }
  const handleChange = (ev: any) => {
    ev.stopPropagation()
    ev.preventDefault()
    setText(getTextContent())
  }

  const handleInit = async (ev: any, editor: any) => {
    ev.stopPropagation()
    ev.preventDefault()
    setLoading(false)
    // 设置富文本的fontSize
    const unit = window.frames[IFrameForPreview].document.children[0].style.fontSize
    fontSizeRef.current = parseFloat(unit)
    setTimeout(() => {
      editor.iframeElement.contentDocument.children[0].style.fontSize = `${fontSizeRef.current}px`
    }, 200)
  }
  const handleShowModal = (ev: React.MouseEvent<any, any>) => {
    ev.stopPropagation()
    ev.preventDefault()
    setShowModal(true)
  }

  const handleOk = (ev: React.MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()
    const res = getTextContent()
    setText(res)
    onChange(res)
    setShowModal(false)
  }
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
        return pageStore.renderData.designSize.width * 2
      }
      default: {
        return 1000
      }
    }
  }
  return (
    <>
      <Button type="link" onClick={handleShowModal}>
        编辑富文本(预览)
      </Button>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}></div> */}
      <style>{`
          .tox-notification.tox-notification--in.tox-notification--warning {
              display: none;
            }
          `}</style>
      <DraggableModal
        title={'编辑富文本'}
        visible={showModal}
        mask={true}
        onCancel={(ev: any) => {
          ev.stopPropagation()
          ev.preventDefault()
          setShowModal(false)
        }}
        onOk={handleOk}
        width={getWidth()}>
        <Spin spinning={loading} tip={'正在加载富文本组件...'}></Spin>
        <Editor
          tinymceScriptSrc={
            'https://unpkg.yy.com/@webbase/chameleonapp@1.0.11/dist/tinymce582/js/tinymce/tinymce.min.js'
          }
          key={id}
          initialValue={transformHtmlPxPt2Rem(value || defaultValue || '', pageStore.device, fontSizeRef.current)}
          onInit={handleInit}
          onChange={handleChange}
          init={{
            body_class: 'body_class',
            // content_css: ,
            content_style: 'img {max-width: 100%;}',
            height: 600,
            language: 'zh_CN',
            plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu preview paste save ',
            toolbar1: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor',
            toolbar2:
              'alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo',
            toolbar3: 'save link unlink image code | removeformat preview',
            toolbar_mode: 'scrolling',
            // 8px=0.5rem 10px=xxrem
            fontsize_formats: [8, 10, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]
              .map(item => {
                if (pageStore.device === EnumDevice.pc) {
                  return item + 'px'
                } else {
                  // console.error('fontSizeRef.currentfontSizeRef.current', fontSizeRef.current, item)
                  // return `${item}px=${(item / fontSizeRef.current).toFixed(2)}rem`
                  return item + 'px'
                }
              })
              .join(' '),
            setup: editor => {
              editorRef.current = editor
            },
            file_picker_callback: (callback, value, meta) => {
              console.log('callback, value, meta', callback, value, meta)
            },
            // language_url: 'https://cdn.jsdelivr.net/gh/wt-sml/wutong_cdn/js/tinymce-lang-zh@5.2.2.js',
            // upload插件
            images_upload_handler: (blobInfo, success, fail) => {
              const formData = new FormData()
              const file = blobInfo.blob()
              formData.append('file', file, blobInfo.name())
              window
                .fetch(`${config.fileHost}/admin/upload/uploadFile`, {
                  method: 'POST',
                  credentials: 'include',
                  body: formData,
                })
                .then(res => {
                  return res.json()
                })
                .then(res => {
                  if (res.code === 0) {
                    success(res.data.downloadUrl)
                  } else {
                    fail(ERROR_FALLBACK_BASE64)
                  }
                })
                .catch(e => {
                  fail(ERROR_FALLBACK_BASE64)
                })
            },
            paste_data_images: true,
            image_dimensions: false,
            // 保存插件
            save_onsavecallback: (a: any, b: any, c: any) => {
              console.log('abc', a, b, c)
            },
            paste_preprocess: (_plugin: any, args: any) => {
              console.log('args.', args.content)
              // args.content = transformHtmlPxPt2Rem(args.content, fontSizeRef.current)
              // if (args.content.startsWith('<img ')) {
              //   args.content = args.content.replace('<img', '<img width="100%"')
              // }
            },
            // 取消过滤器，保留word文档样式
            // TODO: 这个选项做成组件的props
            paste_enable_default_filters: false,
            // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </DraggableModal>
    </>
  )
}

export default RichText
