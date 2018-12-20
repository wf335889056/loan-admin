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
    { id: 12, title: '运营商', checked: true },
    { id: 17, title: '通讯录', checked: true },
    { id: 13, title: '京东数据', checked: true },
    { id: 14, title: '淘宝数据', checked: true },
    { id: 16, title: '支付宝数据', checked: true },
    { id: 2, title: '信贷反欺诈核查', checked: false },
    // { id: 1, title: '手机风险评分', checked: false },
    { id: 3, title: '贷前综合风险报告', checked: false },
    { id: 4, title: '多头负债', checked: false },
    { id: 5, title: '多头借贷', checked: false },
    { id: 6, title: '公安负面信息验证', checked: false },
    { id: 7, title: '失信被执行人详情查询', checked: false },
    { id: 8, title: '借*宝借条+米*借条+无*借条+今*到', checked: false }, 
    // { id: 9, title: '身份证实名认证', checked: false }, === 实名认证
    // { id: 10, title: '银行四要素实名验证', checked: false }, == 银行卡认证
    // { id: 11, title: '三网手机二要素验证', checked: false },
    // { id: 15, title: '借*宝借条+米*借条+无*借条+今*借到', checked: false },
    // { id: 18, title: '人脸识别', checked: false },
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

export function repayments() {
  return [
    // { value: 1, label: '等本等息 (按月还款)' },
    // { value: 2, label: '等本等息 (按周还款)' },
    // { value: 3, label: '等本等息 (自定义周期)' },
    { value: 4, label: '先息后本 (按月还款)' },
    { value: 5, label: '先息后本 (按周还款)' },
    { value: 6, label: '先息后本 (自定义周期)' },
    { value: 7, label: '等额本息 (按月还款)' },
    { value: 8, label: '等额本息 (按周还款)' },
    { value: 9, label: '等额本息 (自定义周期)' },
    // { value: 10, label: '等额本金 (按月还款)' },
    // { value: 11, label: '等额本金 (按周还款)' },
    // { value: 12, label: '等额本金 (自定义周期)' },
    // { value: 13, label: '利随本金 (到期还款)' },
    // { value: 14, label: '等额本金 (固定还款日)' },
    // { value: 15, label: '等额本息 (固定还款日)' },
    // { value: 16, label: '先息后本 (固定还款日)' },
    // { value: 17, label: '等本等息 (固定还款日)' }
  ]
}

export function producOrderAllStatus() {
  return [
    { id: 0, text: '全部' },
    { id: 1, text: '资料填写中' },
    { id: 2, text: '审核中' },
    { id: 3, text: '还款中' },
    { id: 4, text: '待签署合同' },
    { id: 5, text: '放款中' },
    { id: 6, text: '未通过' },
    { id: 7, text: '放弃申请' },
    { id: 8, text: '还款完成' },
    { id: 9, text: '还款有逾期' },
    { id: 10, text: '订单生成' },
    { id: 11, text: '订单取消' },
    { id: 12, text: '等待审核' },
    { id: 13, text: '审核被拒' },
    { id: 14, text: '审核通过' },
    { id: 15, text: '拉黑' },
    { id: 16, text: '催收中' },
    { id: 19, text: '催收完成' },
    { id: 20, text: '放弃催收' },
    { id: 21, text: '待App用户确认放款金额' }
  ]
}

export const menusList = [
  { name: '概览', path: '/', icon: 'ios-globe' },
  { name: '申请', path: '/apply', icon: 'ios-person-add-outline' },
  { name: '审核', path: '/audit', icon: 'ios-document-outline', childer: [
    { name: '审核管理', path: '/audit/index' },
    { name: '待签署合同', path: '/audit/other' }
  ] },
  { name: '放款管理', path: '/loan', icon: 'logo-yen', childer: [
    { name: '放款订单', path: '/loan/order' },
    { name: '账单列表', path: '/loan/list' },
    { name: '展期记录', path: '/loan/record' }
  ] },
  { name: '逾期管理', path: '/overdue', icon: 'ios-time-outline' },
  { name: '催收管理', path: '/collection', icon: 'ios-alarm-outline' },
  { name: '客户管理', path: '/custom', icon: 'ios-person-outline', childer: [
    { name: '客户列表', path: '/custom/index' },
    { name: '潜客池', path: '/custom/other' }
  ] },
  { name: '设置管理', path: '/setting', icon: 'ios-settings-outline', childer: [
    { name: '账户管理', path: '/setting/account' },
    { name: '机审标准', path: '/setting/standard' },
    { name: '产品管理', path: '/setting/product' },
    { name: '渠道管理', path: '/setting/channel' },
    { name: '财务管理', path: '/setting/finance' },
    { name: '合同管理', path: '/setting/contract' },
    { name: '公司信息', path: '/setting/company' },
    { name: '查询计费', path: '/setting/price' }
  ] },
  { name: '运营数据', path: '/operartion', icon: 'ios-paper-outline' }
]