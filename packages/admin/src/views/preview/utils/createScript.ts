const urlCache: any = []
export const createScriptElement = (url: string, callback: any) => {
  if (!url) {
    return false
  }
  const hasUrl = urlCache.some((urlcache: any) => {
    if (urlcache === url) {
      return true
    }
  })
  if (hasUrl) {
    console.log('engine html', '标签已存在', url)
    callback && callback()
    return true
  } else {
    urlCache.push(url)
    const script = document.createElement('script')
    script.src = url
    script.crossOrigin = 'anonymous'
    script.onload = function () {
      console.log('engine html', '完成创建标签', url)
      callback && callback()
    }
    script.onerror = function () {
      console.log('engine html', '创建标签失败', url)
    }
    document.body.appendChild(script)
    return true
  }
}
