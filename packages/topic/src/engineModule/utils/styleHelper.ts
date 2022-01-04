import {EnumDevice} from 'src/types/type'

export const DEFAULT_REM_UNIT = 16
export const transformStyleKey = [
  'width',
  'height',
  'left',
  'top',
  'fontSize',
  'margin',
  'padding',
  'borderWidth',
  'borderRadius',
]

export const px2rem = (str: string, baseFontSize = DEFAULT_REM_UNIT) => {
  // 只有纯数字才转
  return isNaN(Number(str)) ? str : (parseInt(str) / baseFontSize).toFixed(2) + 'rem'
}

export const px2MobileRem = (str: string, baseFontSize = DEFAULT_REM_UNIT) => {
  // 只有纯数字才转
  return (parseInt(str) / baseFontSize).toFixed(2) + 'rem'
}

export const transformCSSValue = (str: string, device: EnumDevice, unit = DEFAULT_REM_UNIT) => {
  // const reg = /(\d)+(px)/gi
  const reg = /(-?\d+)\S*/gi
  const arr = String(str).match(reg) || []
  if (arr.length === 0) return str
  for (let i = 0, len = arr.length; i < len; i++) {
    if ([EnumDevice.mobile, EnumDevice.other].includes(device)) {
      // arr[i] = arr[i].replace(arr[i], px2rem(arr[i], 8)).replace('px', '')
      arr[i] = arr[i].endsWith('rem') || arr[i].endsWith('%') ? arr[i] : `${px2MobileRem(arr[i], unit)}`
    } else {
      if (!isNaN(Number(arr[i]))) {
        arr[i] = arr[i] + 'px'
      }
    }
  }
  return arr.join(' ')
}

export const transformRichTextCSSValue = (str: string, device: EnumDevice, unit = DEFAULT_REM_UNIT) => {
  // const reg = /(\d)+(px)/gi
  const reg = /(-?\d+)\S*/gi
  const arr = String(str).match(reg) || []
  if (arr.length === 0) return str
  for (let i = 0, len = arr.length; i < len; i++) {
    if ([EnumDevice.mobile, EnumDevice.other].includes(device)) {
      // arr[i] = arr[i].replace(arr[i], px2rem(arr[i], 8)).replace('px', '')
      arr[i] = arr[i].endsWith('rem') || arr[i].endsWith('%') ? arr[i] : `${px2MobileRem(arr[i], unit)};`
    } else {
      if (!isNaN(Number(arr[i]))) {
        arr[i] = arr[i] + 'px;'
      }
    }
  }
  return arr.join(' ')
}

export const transformStyle = (style: any, device: EnumDevice) => {
  style = JSON.parse(JSON.stringify(style))
  const computedStyle = {...style} as Record<string, string>
  // 处理borderRadius
  if (style.borderRadius && typeof style.borderRadius === 'object') {
    const obj = style.borderRadius as Record<string, any>
    for (const key in obj) {
      obj[key] = obj[key] || obj.center || 0
    }
    computedStyle.borderRadius = `${obj.top_left || 0} ${obj.top_right || 0} ${obj.bottom_left || 0} ${
      obj.bottom_right || 0
    }`
  }
  if (style.backgroundImage) {
    !style.backgroundImage.includes('url(') && (computedStyle.backgroundImage = `url(${style.backgroundImage})`)
    computedStyle.backgroundSize = style.height ? `100% ${style.height};` : `100% 100%;`
  }
  // TODO PC需要加px单位
  for (const key in computedStyle) {
    if (transformStyleKey.includes(key)) {
      computedStyle[key] = transformCSSValue(computedStyle[key], device)
    }
  }

  return computedStyle
}

export const transformHtmlPx2Rem = (html: string, device: EnumDevice, unit = DEFAULT_REM_UNIT) => {
  if (!html) return ''
  if (![EnumDevice.mobile, EnumDevice.other].includes(device)) return html
  const reg = /((\d)+\.|\d)+(px;)/gi
  return html.replaceAll(reg, (res: string) => {
    return transformRichTextCSSValue(res, device, unit)
  })
}

export const transformHtmlPxPt2Rem = (html: string, device: EnumDevice, unit = DEFAULT_REM_UNIT) => {
  if (!html) return ''
  if (![EnumDevice.mobile, EnumDevice.other].includes(device)) return html
  let reg = /((\d)+\.|\d)+(px;)/gi
  let result = html.replaceAll(reg, (res: string) => {
    return transformRichTextCSSValue(res, device, unit)
  })
  reg = /((\d)+\.|\d)+(pt;)/gi
  result = result.replaceAll(reg, (res: string) => {
    return transformRichTextCSSValue(res, device, unit)
  })
  return result
}

export const transformStyleToString = (style: any) => {
  const retString = Object.keys(style).reduce((value: string, key: string) => {
    const splitKey = key.replace(/([A-Z])/g, function (a: string, b: string) {
      return `-${b.toLowerCase()}`
    })
    return value + `${splitKey}: ${(style as any)[key]};`
  }, '')
  return retString
}
