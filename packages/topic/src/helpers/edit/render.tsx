let iframeObject: any = null

export const getFrameObject = () => {
  iframeObject = document.getElementsByTagName('iframe')?.[0]
  return iframeObject
}

export const getIframeDocument = () => {
  return getFrameObject()?.contentDocument
}
