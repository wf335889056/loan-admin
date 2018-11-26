export function enTransitionCn(value) {
  switch(value) {
    case 'low':
    return '偏低'
    case 'middle': 
    return '中等'
    case 'high':
    return '偏高'
    case 'medium':
    return '中等'
    default: 
    return '良好'
  }
}

export function thirdPartyVerification() {
  return [
    { id: 12, title: '运营商', checked: false },
    { id: 17, title: '通讯录', checked: false },
    { id: 1, title: '手机风险评分', checked: false },
    { id: 2, title: '信贷反欺诈核查', checked: false },
    { id: 3, title: '贷前综合风险报告', checked: false },
    { id: 4, title: '多头负债', checked: false },
    { id: 5, title: '多头借贷', checked: false },
    { id: 6, title: '公安负面信息验证', checked: false },
    { id: 7, title: '失信被执行人详情查询', checked: false },
    { id: 8, title: '网贷逾期名单', checked: false }, 
    { id: 9, title: '身份证实名认证', checked: false },
    { id: 10, title: '银行四要素实名验证', checked: false },
    { id: 11, title: '三网手机二要素验证', checked: false },
    { id: 13, title: '京东数据', checked: false },
    { id: 14, title: '淘宝数据', checked: false },
    { id: 15, title: '借*宝借条+米*借条+无*借条+今*借到', checked: false },
    { id: 16, title: '支付宝授权', checked: false }
  ]
}

export function appDevice() {
  var u = navigator.userAgent, 
      app = navigator.appVersion
  return {//移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          wx: u.match(/MicroMessenger/i) == "MicroMessenger" // 微信浏览器
  }
}

export function format(data){
  var date = new Date (data * 1000)
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()
  //console.log(Y+M+D+h+m)
  return Y+M+D+h+m;
}