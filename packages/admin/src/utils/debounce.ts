/**
 * 函数防抖
 * @param fn
 * @param wait
 * @param scope
 */
function debounce(fn: (args?: any) => any, wait: number, scope?: any) {
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

export default debounce
