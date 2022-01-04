import {EnumDevice} from 'src/types/type'

let deviceValue: string
export const DefaultDesizeSize: (device: string) => DesizeSizeType = (device: string) => {
  if (device === EnumDevice.other) {
    return {
      width: 200,
      height: 280,
    }
  }
  if (device === EnumDevice.mobile) {
    return {
      width: 750,
    }
  }
  if (device === EnumDevice.pc) {
    return {
      width: 1000,
    }
  }
  return {
    width: 1000,
  }
}
let tmpDesignSize: DesizeSizeType = DefaultDesizeSize(EnumDevice.pc)
const defaultFontSize = 16
let tmpEdit = false
let tmpScalc = false

const recalc = function () {
  const docEl = document.documentElement
  const clientWidth = Math.max(document.body.clientWidth, window.innerWidth, document.documentElement.clientWidth)
  const clientHeight = Math.max(document.body.clientHeight, window.innerHeight, document.documentElement.clientHeight)
  if (!clientWidth) return
  if (deviceValue === 'mobile') {
    const tmpMobileFontSize = Number(clientWidth / tmpDesignSize.width) * defaultFontSize
    docEl.style.cssText = `font-size: ${tmpMobileFontSize}px;`
    return
  }
  if (deviceValue === 'other') {
    // 新版本存在宽高
    const scalcHeight = tmpDesignSize?.height
      ? Math.floor(Number(clientHeight / tmpDesignSize?.height) * 1000) / 1000
      : 0

    const scalcWidth = Math.floor(Number(clientWidth / tmpDesignSize?.width) * 1000) / 1000
    let tmpOtherFontSize = scalcWidth
    // clientWidth * 0.75 < clientHeight 是处理活动条为横向展示，宽大于高
    if (scalcHeight && scalcHeight <= scalcWidth && clientWidth * 0.75 < clientHeight) {
      tmpOtherFontSize = scalcHeight
    }
    tmpOtherFontSize = Math.floor(tmpOtherFontSize * defaultFontSize * 100) / 100
    if (tmpEdit) {
      docEl.style.cssText = `font-size: ${tmpOtherFontSize}px;`
      return
    }
    if (tmpScalc) {
      docEl.style.cssText = `font-size: ${tmpOtherFontSize * 4}px;`
      document.body.style.cssText = `${document.body.style.cssText};-webkit-transform: scale(0.25);transform: scale(0.25);-webkit-transform-origin: top right;transform-origin: top right;`
      return
    }
    docEl.style.cssText = `font-size: ${tmpOtherFontSize}px;`
    document.body.style.overflow = 'auto'
    return
  }

  if (deviceValue === 'pc') {
    const dom = document.getElementById('emp-root')
    if (dom) {
      dom.style.cssText = `${dom.style.cssText};margin: auto; max-width: ${tmpDesignSize.width || 1000}px;`
    }
    return
  }

  resetCss()
}

export const initCssFunc = ((doc: Document, win: Window) => {
  return (
    device: string,
    designSize: DesizeSizeType | undefined,
    {edit = false, openScale = false}: {edit: boolean; openScale?: boolean},
  ) => {
    tmpDesignSize = designSize || DefaultDesizeSize(device)
    deviceValue = device
    tmpEdit = edit
    tmpScalc = openScale || false
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    recalc()
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
  }
})(document, window)

export const resetCss = (function (doc, win) {
  return () => {
    const docEl = doc.documentElement
    docEl.style.fontSize = ''
    docEl.style.overflow = ''
  }
})(document, window)
