import fetch from './fetch'

/*********
@param {*} query 参数 String
@method {*} 请求方式 Object
@url {*} 请求地址 String
*********
*/

// 分享页面h5注册
export function h5Register(query) {
  return fetch({
    url: '/deskManagementController/mobileSms',
    method: 'post',
    params: query
  })
}
// 分享页面h5短信码
export function sendH5Code(query) {
  return fetch({
    url: '/deskManagementController/mobileSms',
    method: 'post',
    params: query
  })
}


/*
*
*  贷款后台管理 
*
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
// 概览 客户信息，当前数据，待收和逾期，回款数据
export function getDashboardMsg(query) {
  return fetch({
    url: '/StatisticsDataController/getOverview',
    method: 'post',
    params: query
  })
}
// 概览 回款数据列表
export function getDashboardList(query) {
  return fetch({
    url: '/StatisticsDataController/getReturnedMoneyList',
    method: 'post',
    params: query
  })
}
// 概览 获取放款图表
export function getDashboardChart(query) {
  return fetch({
    url: '/StatisticsDataController/getloanGraph',
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
// 产品管理-新增保存产品
export function addOrUpdateProductMsg(query) {
  return fetch({
    url: '/productController/saveProduct',
    method: 'post',
    params: query
  })
}
// 产品管理-查询产品列表
export function getProductList(query) {
  return fetch({
    url: '/productController/getProductList',
    method: 'post',
    params: query
  })
}
// 产品管理-查询产品详情
export function getProductMsg(query) {
  return fetch({
    url: '/productController/getProduct',
    method: 'post',
    params: query
  })
}
// 产品管理-修改开启禁用状态
export function updateProductStatus(query) {
  return fetch({
    url: '/productController/updateProductStatus',
    method: 'post',
    params: query
  })
}
// 产品管理-保存借款和展期合同
export function addProductBargain(query) {
  return fetch({
    url: '/productController/saveProductBargain',
    method: 'post',
    params: query
  })
}
// 产品管理-保存风控项目
export function saveProductCreditItem(query) {
  return fetch({
    url: '/productController/saveCreditItem',
    method: 'post',
    params: query
  })
}
// 产品管理-保存产品授权合同
export function addbargainAccredit(query) {
  return fetch({
    url: '/productController/savebargainAccredit',
    method: 'post',
    params: query
  })
}
// 客户管理 获取客户列表/详情
export function getCustomListOrMsg(query) {
  return fetch({
    url: '/ClientManagementController/clientManagementList',
    method: 'post',
    params: query
  })
}
// 客户管理 拉黑与备注
export function blackOrNoteCustom(query) {
  return fetch({
    url: '/ClientManagementController/blackAndNote',
    method: 'post',
    params: query
  })
}
// 客户管理 潜客池
export function getPotentialCustomers(query) {
  return fetch({
    url: '/ClientManagementController/customerPool',
    method: 'post',
    params: query
  })
}
// 申请 获取申请列表
export function getApplyList(query) {
  return fetch({
    url: '/ApplyController/getApplyList',
    method: 'post',
    params: query
  })
}
// 申请 获取负责人
export function getApplyPrincipal(query) {
  return fetch({
    url: '/ApplyController/getUser',
    method: 'post',
    params: query
  })
}
// 申请 保存负责人
export function saveApplyPrincipal(query) {
  return fetch({
    url: '/ApplyController/updatePrincipal',
    method: 'post',
    params: query
  })
}
// 申请 申请详情
export function getApplyMsg(query) {
  return fetch({
    url: '/ApplyController/getApplyDetail',
    method: 'post',
    params: query
  })
}
// 申请 修改订单状态
export function updateOrderStatus(query) {
  return fetch({
    url: '/ApplyController/updateOrderStatus',
    method: 'post',
    params: query
  })
}
// 审核 审核列表
export function getAuditList(query) {
  return fetch({
    url: '/CheckController/getCheckList',
    method: 'post',
    params: query
  })
}
// 审核 写备注
export function remarkAuditPeople(query) {
  return fetch({
    url: '/CheckController/updateCustomerRemark',
    method: 'post',
    params: query
  })
}
// 审核 获取审核详情
export function getAuditMsg(query) {
  return fetch({
    url: '/CheckController/getCheckDetail',
    method: 'post',
    params: query
  })
}
// 审核 拒贷
export function rejectLoanAudio(query) {
  return fetch({
    url: '/CheckController/checkRefuse',
    method: 'post',
    params: query
  })
}
// 审核 通过
export function passLoanAudio(query) {
  return fetch({
    url: '/CheckController/checkPass',
    method: 'post',
    params: query
  })
}
// 审核 点击审核通过时的弹出框展示内容
export function getAudioPassMsg(query) {
  return fetch({
    url: '/CheckController/getCheckButtomDetail',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单列表
export function getLoanOrderList(query) {
  return fetch({
    url: '/LoanController/getLoanList',
    method: 'post',
    params: query
  })
}
// 放款管理 平台外放款，确认放款详情弹出框内容
export function getLoanAlertMsg(query) {
  return fetch({
    url: '/LoanController/getOutPlatformLoan',
    method: 'post',
    params: query
  })
}
// 放款管理 订单详情页
export function getLoanOrderMsg(query) {
  return fetch({
    url: '/LoanController/getLoanDetail',
    method: 'post',
    params: query
  })
}
// 放款管理 平台内放款（第三方支付）详情页
export function getLoanMsgthirdParty(query) {
  return fetch({
    url: '/LoanController/getInPlatformLoan',
    method: 'post',
    params: query
  })
}
// 放款管理 平台内放款（第三方支付）
export function confirmPassLoanInPlatform(query) {
  return fetch({
    url: '/deskManagementController/paymentBehalf',
    method: 'post',
    params: query
  })
}
// 放款管理 取消放款
export function cancelLoan(query) {
  return fetch({
    url: '/LoanController/cancelLoan',
    method: 'post',
    params: query
  })
}
// 放款管理 平台外确认放款
export function confirmPassLoanOutPlatform(query) {
  return fetch({
    url: '/LoanController/passOutPlatformLoan',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-修改罚息
export function updatePenaltyLoanOrder(query) {
  return fetch({
    url: '/LoanController/updatePenalty',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-结清账单详情
export function getCleanBillMsg(query) {
  return fetch({
    url: '/LoanController/cleanBillDetail',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-结清账单
export function confirmCleanBillMsg(query) {
  return fetch({
    url: '/LoanController/cleanBill',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-获取展期详情
export function getExhibitionLoanMsg(query) {
  return fetch({
    url: '/LoanController/getDeferDetail',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-获取展期详情
export function confirmExhibitionLoanMsg(query) {
  return fetch({
    url: '/LoanController/passDefer',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-退还费用详情
export function getRerurnLoanOrderMsg(query) {
  return fetch({
    url: '/LoanController/sendBackMoneyDetail',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-委派催收详情页
export function getEntrustLoanOrderMsg(query) {
  return fetch({
    url: '/LoanController/collectionDetail',
    method: 'post',
    params: query
  })
}
// 放款管理 放款订单-委派催收，放弃催收
export function entrustOrCancelLoanOrderMsg(query) {
  return fetch({
    url: '/LoanController/sendCollection',
    method: 'post',
    params: query
  })
}
// 放款管理 账单列表
export function getBillLianList(query) {
  return fetch({
    url: '/LoanController/getBillList',
    method: 'post',
    params: query
  })
}
// 放款管理 展期列表
export function getExhibitionRecordList(query) {
  return fetch({
    url: '/LoanController/getDeferList',
    method: 'post',
    params: query
  })
}
// 放款管理 展期列表详情
export function getExhibitionRecordMsg(query) {
  return fetch({
    url: '/LoanController/getDeferListDetail',
    method: 'post',
    params: query
  })
}
// 逾期管理 获取列表
export function getOverdueList(query) {
  return fetch({
    url: '/ClientManagementController/overdueList',
    method: 'post',
    params: query
  })
}
// 催收管理 获取列表
export function getCollectionList(query) {
  return fetch({
    url: '/deskManagementController/collectionManage',
    method: 'post',
    params: query
  })
}
// 催收管理 添加记录
export function addCollectionRecordMsg(query) {
  return fetch({
    url: '/deskManagementController/modificationRecord',
    method: 'post',
    params: query
  })
}
// 催收管理 催收详情
export function getCollectionMsg(query) {
  return fetch({
    url: '/deskManagementController/collectionDetails',
    method: 'post',
    params: query
  })
}
// 催收管理 修改客户备注
export function updadateRemarkCollection(query) {
  return fetch({
    url: '/deskManagementController/updateUserRemark',
    method: 'post',
    params: query
  })
}
// 运营数据 获取全部申请列表
export function getOperartionList(query) {
  return fetch({
    url: '/StatisticsDataController/getAllApplyDataList',
    method: 'post',
    params: query
  })
}
// 运营数据 获取全部申请详情
export function getOperartionMsg(query) {
  return fetch({
    url: '/StatisticsDataController/getAllApplyDataDetail',
    method: 'post',
    params: query
  })
}
