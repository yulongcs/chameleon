/**
 * 函数防抖
 * @param fn
 * @param wait
 * @param scope
 */
export function debounce(fn: (args?: any) => any, wait: number, scope?: any) {
  let timer = -1
  return function () {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      if (scope) {
        // eslint-disable-next-line prefer-rest-params
        fn.call(scope, ...arguments)
      } else {
        // eslint-disable-next-line prefer-rest-params
        fn(...arguments)
      }
    }, wait)
  }
}

/**
 * 函数节流
 * @param fn
 * @param wait
 * @param scope
 */
export function throttle(fn: (args?: any) => any, wait: number, scope?: any) {
  let timer: any = null
  return function () {
    if (timer) {
      return
    }
    timer = window.setTimeout(() => {
      if (scope) {
        // eslint-disable-next-line prefer-rest-params
        fn.call(scope, ...arguments)
      } else {
        // eslint-disable-next-line prefer-rest-params
        fn(...arguments)
      }
      timer = null
    }, wait)
  }
}

export default {throttle, debounce}
