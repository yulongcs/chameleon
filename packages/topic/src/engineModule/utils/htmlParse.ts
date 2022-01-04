export const htmlFromString = (domStr: string, type: DOMParserSupportedType = 'application/xml') => {
  return new DOMParser().parseFromString(domStr, type)
}

export const removeDom = () => {
  try {
    const cloneDom: any = document.querySelector('.cloneDom')
    cloneDom && document.body.removeChild(cloneDom)
  } catch (e) {}
}
