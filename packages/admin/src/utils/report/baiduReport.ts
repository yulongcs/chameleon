;(win => {
  win._hmt = win._hmt || []
})(window)

export const initBaiduReport = ((doc: any, win: any) => {
  return () => {
    ;(function () {
      const hm = doc.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?e1f3eb18ff696122865b8f4a709b17ef'
      const s: any = doc.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
      hm.onload = () => {
        console.log('done')
      }
    })()
  }
})(document, window)

export const baiduEventReport = (win => {
  return (params: Array<string> = []) => {
    return (win._hmt || []).push(['_trackEvent'].concat(params))
  }
})(window)
