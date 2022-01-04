import {message} from 'antd'
import loadjs from 'loadjs'
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
interface MyWindow extends Window {
  UDBSDKProxy: any
}

declare let window: MyWindow

let timer: NodeJS.Timeout
const loopCookie = (callback: () => void) => {
  timer && clearInterval(timer)
  timer = setInterval(() => {
    if (hasLogin('yyuid')) {
      timer && clearInterval(timer)
      callback && callback()
    }
  }, 1000)
}

const hasLogin = (key: string) => {
  const cookies = document.cookie.split(';')
  let value = ''
  cookies.some(cookiestr => {
    const [cKey, cValue] = cookiestr.split('=')
    if (key === (cKey && cKey.trim()) && cValue) {
      value = cValue
      return value
    }
  })
  return value
}

const loadJQuery = async (callback: () => void) => {
  loadjs('https://udbres.yy.com/lgn/x/js/jquery-1.8.3.min.js', () => {
    loadjs('https://udbres.yy.com/lgn/js/oauth/udbsdk/proxy/udbsdkproxy.min.js', () => {
      callback && callback()
    })
  })
}

const iframeId = 'loginIframe'
export const baiduLogin = () => {
  ;(window as Window).closeLogin = function () {
    window.location.reload()
  }
  ;(window as Window).loginSucCallback = async () => {
    console.log('手动登录成功')
    window.location.reload()
  }
  const url = `https://login.bdgamelive.com/index.html?baiduLogin=0`
  const iframe = document.createElement('iframe')
  iframe.id = iframeId
  iframe.src = url
  iframe.setAttribute('style', 'position: fixed;top:0;left:0;width:100%;height:100%;')
  document.body.appendChild(iframe)
}

const login = (url: string) => {
  if (location.origin.indexOf('yy') !== -1) {
    if (isDev) {
      loadJQuery(() => {
        window.UDBSDKProxy.openByFixProxy(url || window.location.href)
      })
    } else {
      message.info('请使用yy登录', 2)
      window.setTimeout(() => {
        window.location.replace(
          isProd
            ? `https://cfg.bdgamelive.com/#/login?redirect=${encodeURIComponent(window.location.href)}`
            : `https://cfg-test.bdgamelive.com/#/login?redirect=${encodeURIComponent(window.location.href)}`,
        )
      }, 2000)
    }
  } else {
    baiduLogin()
  }
  loopCookie(() => {
    url ? location.replace(url) : window.location.reload()
  })
}

const clearCookie = () => {
  document.cookie = 'yyuid=;Domain=.yy.com;path=/'
  document.cookie = 'yyuid=;Domain=.bdgamelive.com;path=/'
}
const logout = () => {
  clearCookie()
  window.location.reload()
}

export default {
  clearCookie,
  login,
  logout,
  hasLogin,
}
