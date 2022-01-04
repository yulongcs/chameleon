const engineSelectBoxClassName = 'engine_select_box'
let tmpSelectId = ''
export const setSelectBoxsStyle = (id: string, doc?: Document) => {
  doc = doc || document
  const dom = doc.getElementById(id)
  if (tmpSelectId && tmpSelectId !== id) {
    resetSelectBoxsStyle(tmpSelectId, doc)
  }
  if (tmpSelectId === 'App') {
    tmpSelectId = ''
    return
  }
  if (dom && tmpSelectId !== id) {
    dom.className = `${dom.className.replace(engineSelectBoxClassName, '')} ${engineSelectBoxClassName}`
    tmpSelectId = id
  }
}

const resetSelectBoxsStyle = (id: string, doc?: Document) => {
  doc = doc || document
  const dom = doc.getElementById(id)
  if (dom) {
    dom.className = dom.className?.replace(engineSelectBoxClassName, '') || ''
  }
}
