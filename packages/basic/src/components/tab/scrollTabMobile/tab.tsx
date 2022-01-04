import React from 'react'
import {EmpPropTypes} from 'src/types/emptype'

interface Props {
  text: string
}

const SingleTab: EmpFC = (props: EmpFCProps<Props>) => {
  const {text} = props
  return <div>{text}</div>
}

SingleTab.empPropTypes = {
  name: '导航名称',
  defined: {
    hidden: true,
    slotsTab: true,
  },
  props: {
    text: {
      type: EmpPropTypes.Input,
      value: '导航名称',
      label: '导航名称',
      options: {
        maxLength: 20,
      },
    },
  },
}

export default SingleTab
