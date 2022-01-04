import React from 'react'
import {EmpPropTypes} from 'src/types/emptype'
import Text, {TextProps} from 'src/components/text/texttitle'
export type TabItem = TextProps

const TabItem: EmpFC<TabItem> = props => {
  return <Text {...props}></Text>
}

TabItem.empPropTypes = {
  name: '导航标题',
  defined: {
    description: '导航标题',
    styleEditable: true,
    slotsTab: true,
  },
  props: {
    text: {
      type: EmpPropTypes.Input,
      label: '导航标题文案',
      options: {},
      value: '导航标题',
    },
  },
}
export default TabItem
