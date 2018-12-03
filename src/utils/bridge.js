function isIos() {
  return new RegExp(/iPhone/ig).test(navigator.userAgent)
}

function setupWebViewJavascriptBridge(callback) {
  // ios
  if (isIos()) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    // eslint-disable-next-line
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  } else {
  // Android
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() { callback(window.WebViewJavascriptBridge) }, false)
    }
  }
}

setupWebViewJavascriptBridge(function(bridge) {
  // 接收android端直接发送的消息
  bridge.init(function(message, responseCallback) {
    // alert('JS got a message', message)
    var data = { 'Javascript Responds': 'Start Open HTML5' }
    // alert('JS responding with', data)
    responseCallback(data)
  })
  // 注册方法，从android中调用
  bridge.registerHandler('functionInJS', function(data, responseCallback) {
    // 回调
    responseCallback('android端调用成功')
  })
})

export default {
  callhandler(name, data, callback) {
    if (isIos()) {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('jsJumpNative  ', data, callback)
      })
    } else {
      window.WebViewJavascriptBridge.callHandler(name, data, callback)
    }
  },
  registerhandler(name, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      bridge.registerHandler(name, function(data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}
