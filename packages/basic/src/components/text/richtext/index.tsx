import React from 'react'
import {EmpPropTypes} from 'src/types/emptype'
import style from './index.module.scss'
export interface RichTextProps {
  text: string
}

const RichText: EmpFC<RichTextProps> = (props: EmpFCProps<RichTextProps>) => {
  const {text} = props
  return (
    <>
      <div
        className={`${style.qlEditor} ql-editor`}
        dangerouslySetInnerHTML={{
          __html: text,
        }}></div>
    </>
  )
}

RichText.empPropTypes = {
  name: '富文本',
  defined: {
    description: '富文本编辑器',
  },
  props: {
    text: {
      type: EmpPropTypes.RichText,
      label: '富文本',
      options: {},
      value: '开始编辑你的富文本',
    },
  },
}
export default RichText
