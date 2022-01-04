import React from 'react'
import langStore from 'src/stores/page/lang'
import {transformStyle} from '../utils/styleHelper'

const EmpBaseContainer = (node: TreeNodeProps, children: any) => {
  const lang = langStore.langKvs || {}
  const style = transformStyle(lang?.[node.id]?.empStyle || {})
  return (
    <div id={node?.id} style={style} key={Date.now().toString()}>
      {children}
    </div>
  )
}

export default EmpBaseContainer
