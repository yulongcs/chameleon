import React from 'react'
import {EmpPropTypes} from 'src/types/emptype'
export interface TextProps {
  text: string
}

const Text: EmpFC<TextProps> = (props: EmpFCProps<TextProps>) => {
  const {text} = props
  return <p>{text}</p>
}

Text.empPropTypes = {
  name: '文本',
  defined: {
    description: '文本',
    styleEditable: true,
  },
  props: {
    text: {
      type: EmpPropTypes.Input,
      label: '文案',
      options: {},
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, odit ea! Dignissimos consequatur error consectetur assumenda. Iusto aliquid, molestiae iure, minima reiciendis rem, eum consequuntur aspernatur omnis maxime distinctio recusandae.',
    },
  },
}
export default Text
