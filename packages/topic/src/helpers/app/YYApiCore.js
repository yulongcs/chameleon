if (typeof navigator !== 'undefined' && navigator.userAgent.match(/(iPad|iPhone|iPod).*?YY/g)) {
  if (
    (window.opener == null && window.YYApiCore == null) ||
    (window.opener != null && window.opener.YYApiCore == null)
  ) {
    // load YYApiCore
    var i = document.createElement('iframe')
    i.style.display = 'none'
    i.src = 'yyapi://load'
    document.body.appendChild(i)
  } else if (window.opener != null && window.YYApiCore == null && window.opener.YYApiCore != null) {
    window.YYApiCore = window.opener.YYApiCore
  }
} else if (typeof window !== 'undefined' && navigator.userAgent.indexOf('Android') !== -1) {
  window.YYApiCore = {
    __GLOBAL_FUNC_INDEX__: 0,
    invokeClientMethod: function (module, name, parameters, callback) {
      var r
      try {
        var cbName = ''
        if (callback) {
          if (typeof callback === 'function') {
            cbName = window.YYApiCore.createGlobalFuncForCallback(callback)
          } else {
            cbName = callback
          }
        }
        r = window.AndroidJSInterfaceV2.invoke(module, name, JSON.stringify(parameters || {}), cbName)
        if (r && r.indexOf('{') > -1) r = JSON.parse(r)
      } catch (e) {
        if (console) {
          console.warn('not found andrioid method:', module, name, e)
          return callback && callback()
        }
      }
      return r
    },
    createGlobalFuncForCallback: function (callback) {
      if (callback) {
        var name = '__GLOBAL_CALLBACK__' + window.YYApiCore.__GLOBAL_FUNC_INDEX__++
        window[name] = function () {
          var args = arguments
          var func = typeof callback === 'function' ? callback : window[callback]
          // we need to use setimeout here to avoid ui thread being frezzen
          setTimeout(function () {
            func.apply(null, args)
          }, 0)
        }
        return name
      }
      return null
    },
    invokeWebMethod: function (callback, returnValue) {
      window.YYApiCore.invokeCallbackWithArgs(callback, [returnValue])
    },

    invokeCallbackWithArgs: function (callback, args) {
      if (callback) {
        var func = null
        var tmp
        if (typeof callback === 'function') {
          func = callback
        } else if ((tmp = window[callback]) && typeof tmp === 'function') {
          func = tmp
        }
        if (func) {
          setTimeout(function () {
            func.apply(null, args)
          }, 0)
        }
      }
    },
  }
}
export default (typeof window !== 'undefined' && window.YYApiCore) || {
  invokeClientMethod(...args) {
    try {
      args && args[3] && args[3]('')
      return false
    } catch (e) {
      return false
    }
  },
}
