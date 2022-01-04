import config from 'src/configs'
import css from './index.module.scss'
const iframeUrl = `https://login${config.isProd ? '' : '-test'}.bdgamelive.com/index.html`

try {
  document.domain = 'bdgamelive.com'
} catch (err) {
  console.log(err)
}

window.closeLogin = () => {}
window.loginSucCallback = () => {
  location.reload()
}

let iframe: any

export function udbLogin() {
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.src = iframeUrl
    iframe.allowFullscreen = true
    iframe.className = css.iframe
    document.body.appendChild(iframe)
    document.body.classList.add(css.lock)
  }
  window.closeLogin = () => {
    document.body.removeChild(iframe)
    document.body.classList.remove(css.lock)
    iframe = undefined
  }
}

export function udbLogout() {
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.src = iframeUrl
    iframe.allowFullscreen = true
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
  }

  setInterval(() => {
    try {
      ;(iframe.contentWindow as any).logOut()
      setTimeout(() => {
        iframe = null
      }, 500)
    } catch (e) {}
  }, 500)
}
