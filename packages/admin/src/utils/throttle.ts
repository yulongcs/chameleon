/**
 * 函数节流
 * @param fun
 * @param delay
 * @param scope
 */
function throttle(fun: (args?: any) => any, delay: number, scope?: any) {
  let lastTime = 0
  return function () {
    const nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      if (scope) {
        // eslint-disable-next-line prefer-rest-params
        fun.call(scope, ...arguments)
      } else {
        // eslint-disable-next-line prefer-rest-params
        fun(...arguments)
      }
      lastTime = nowTime
    }
  }
}

export default throttle
