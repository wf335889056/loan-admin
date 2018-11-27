import fetch from './fetch'

/*********
@param {*} query 参数 String
@method {*} 请求方式 Object
@url {*} 请求地址 String
*********
*/

// 登录
export function accountLogin(query) {
  return fetch({
    url: '/AccountManagementController/login',
    method: 'post',
    params: query
  })
}
// 用户修改密码
export function updateUserPassword(query) {
  return fetch({
    url: '/AccountManagementController/updateUserPassword',
    method: 'post',
    params: query
  })
}
// 获取验证码
export function getAccountCode(query) {
  return fetch({
    url: '/AccountManagementController/SMSVerification',
    method: 'post',
    params: query
  })
}
// 获取公司信息
export function getCompanyMsg(query) {
  return fetch({
    url: '/deskManagementController/companyInfo',
    method: 'post',
    params: query
  })
}
// 修改公司信息
export function updateCompanyMsg(query) {
  return fetch({
    url: '/deskManagementController/updateCompanyInfo',
    method: 'post',
    params: query
  })
}
// 获取合同管理
export function getContractList(query) {
  return fetch({
    url: '/bargainController/getBargainList',
    method: 'post',
    params: query
  })
}
// 获取合同详情
export function getContractMsg(query) {
  return fetch({
    url: '/bargainController/getBargain',
    method: 'post',
    params: query
  })
}
// 修改合同状态
export function updateContractStatus(query) {
  return fetch({
    url: '/bargainController/updateBargainStatus',
    method: 'post',
    params: query
  })
}
// 新增和修改合同
export function updateContractMsg(query) {
  return fetch({
    url: '/bargainController/saveBargain',
    method: 'post',
    params: query
  })
}
// 获取账户列表和详情 
export function getAccountListAndMsg(query) {
  return fetch({
    url: '/AccountManagementController/userAccountList',
    method: 'post',
    params: query
  })
}
// 新增和修改账户
export function addAndUpdateAccountMsg(query) {
  return fetch({
    url: '/AccountManagementController/insertAccount',
    method: 'post',
    params: query
  })
}
// 账户修改状态
export function updateAccountStatus(query) {
  return fetch({
    url: '/AccountManagementController/updateState',
    method: 'post',
    params: query
  })
}
// 账户修改状态
export function updateAccountPassword(query) {
  return fetch({
    url: '/AccountManagementController/updatePassword',
    method: 'post',
    params: query
  })
}
// 获取账户管理银行卡
export function getAccountBankList(query) {
  return fetch({
    url: '/deskManagementController/accountManage',
    method: 'post',
    params: query
  })
}
// 删除账户管理银行卡
export function deleteAccountBank(query) {
  return fetch({
    url: '/deskManagementController/deleteBankCard',
    method: 'post',
    params: query
  })
}
// 新增账户管理银行卡
export function addAccountBankList(query) {
  return fetch({
    url: '/deskManagementController/saveBankCard',
    method: 'post',
    params: query
  })
}
// 编辑放款限额
export function updateAccountBankQuotas(query) {
  return fetch({
    url: '/deskManagementController/updateLendingQuotas',
    method: 'post',
    params: query
  })
}
// 提交充值
export function topUpMoney(query) {
  return fetch({
    url: '/deskManagementController/topUp',
    method: 'post',
    params: query
  })
}
// 财务管理 流水明细 三合一
export function getWaterSubsidiary(query) {
  return fetch({
    url: '/deskManagementController/financial',
    method: 'post',
    params: query
  })
}
// 查询计费 计费余额充值 弃用 
// export function topUpBillingBalance(query) {
//   return fetch({
//     url: '/deskManagementController/billBalancePay',
//     method: 'post',
//     params: query
//   })
// }
// 查询计费 购买套餐
export function buyPurchasePlan(query) {
  return fetch({
    url: '/deskManagementController/buyCombo',
    method: 'post',
    params: query
  })
}
// 查询计费 1入账明细，2套餐使用明细，3大数据计费，4短信计费
export function getBillingQuery(query) {
  return fetch({
    url: '/deskManagementController/billQuery',
    method: 'post',
    params: query
  })
}
// 查询渠道列表、详细信息
export function getChannelLisgOrMsg(query) {
  return fetch({
    url: '/ChannelManagementController/channelList',
    method: 'post',
    params: query
  })
}
// 新增和修改渠道信息
export function addOrUpdateChannelMsg(query) {
  return fetch({
    url: '/ChannelManagementController/insertChannel',
    method: 'post',
    params: query
  })
}
// 渠道 启用、禁用 状态
export function updateChannelStatus(query) {
  return fetch({
    url: '/ChannelManagementController/channelStatus',
    method: 'post',
    params: query
  })
}
// 修改渠道放款限额
export function updateChannelMaxLoan(query) {
  return fetch({
    url: '/ChannelManagementController/updateLoanLimit',
    method: 'post',
    params: query
  })
}