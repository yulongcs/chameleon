const DefaultDesignSizeId = '__DefaultDesignSizeId'
export const setDesignSizeBoundary = (doc: Document, designSize: DesizeSizeType) => {
  let dom = doc.getElementById(DefaultDesignSizeId)
  if (!dom) {
    dom = document.createElement('div')
    dom.id = DefaultDesignSizeId
    dom.style.cssText = `position: absolute;top: 0;left: 0;width: 200px;height:200px;border:1px solid red;`
    doc.body.appendChild(dom)
  }
}
