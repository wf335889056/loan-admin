<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" :disabled="isDisabled" style="margin-bottom: 30px;margin-right: 20px;" @click="handleBatch">批量分配  </Button>
    </Row>
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.customerName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.productName" clearable placeholder="产品名称" />
            </FormItem>
            <FormItem>
            <Select v-model="formInline.orderStatus" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="3">还款中</Option>
                <Option :value="8">还款完成</Option>
                <Option :value="10">订单生成</Option>
                <Option :value="11">订单取消</Option>
                <!-- <Option :value="16">催收中</Option> -->
              </Select>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Button type="success" size="default" @click="handleSubmit">搜索</Button>
          </FormItem>
        </Col>
        </Form>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick" @on-selection-change="handleSelectChange"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="放款审核" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <Spin fix size="large" v-if="loadDrawer"></Spin>
      <div class="detail" v-else>
        <p class="title"><Tag color="warning">订单信息</Tag></p>
        <div class="content">
          <p class="info-p">订单状态</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">应放款金额</span>
              <span class="sp2">{{orderStatusInfo.shouldLoanMoney}}</span>
            </li>
            <li>
              <span class="sp1">利率/期(%)</span>
              <span class="sp2">{{orderStatusInfo.creditRate}}</span>
            </li>
            <li>
              <span class="sp1">手续费</span>
              <span class="sp2">{{orderStatusInfo.procedureMoney}}</span>
            </li>
            <li>
              <span class="sp1">订单状态</span>
              <span class="sp2">{{allStatus.filter(it => it.id == orderStatusInfo.orderStatus)[0].text}}</span>
              <!-- <span class="sp2">{{orderStatusInfo.orderStatus}}</span>   -->
            </li>
            <li>
              <span class="sp1">订单编号</span>
              <span class="sp2">{{orderStatusInfo.orderCode}}</span>
            </li>
            <li>
              <span class="sp1">负责人</span>
              <span class="sp2">{{orderStatusInfo.userName}}</span>
            </li>
            <li>
              <span class="sp1">审核时间</span>
              <span class="sp2">{{orderStatusInfo.orderCheckTime}}</span>
            </li>
            <li>
              <span class="sp1">手续费支付方式</span>
              <span class="sp2">{{orderStatusInfo.productProcedurePayType == 1? '按期支付' : orderStatusInfo.productProcedurePayType == 2? '贷前扣除' : '贷后支付'}}</span>
            </li>
            <li>
              <span class="sp1">申请金额</span>
              <span class="sp2">{{orderStatusInfo.loanAmount}}</span>
            </li>
          </ul>
        </div>
        <p class="title"><Tag color="warning">基础信息</Tag></p>
        <div class="content">
          <p class="info-p">客户信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">客户姓名</span>
              <span class="sp2">{{customInfo.customerName}}</span>
            </li>
            <li>
              <span class="sp1">客户手机号</span>
              <span class="sp2">{{customInfo.customerPhone}}</span>
            </li>
            <li>
              <span class="sp1">银行</span>
              <span class="sp2">{{customInfo.bankName}}</span>
            </li>
            <li>
              <span class="sp1">银行卡号</span>
              <span class="sp2">{{customInfo.bankCard}}</span>
            </li>
            <li>
              <span class="sp1">贷款金额</span>
              <span class="sp2">{{customInfo.loanAmount}}</span>
            </li>
            <li>
              <span class="sp1">还款方式</span>
              <span class="sp2">{{repayments.filter(it => it.value == customInfo.productRepaymentType)[0].label}}</span>
              <!-- <span class="sp2">{{customInfo.productRepaymentType}}</span>   -->
            </li>
          </ul>
          <p class="info-p">打款信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">打款人</span>
              <span class="sp2">{{loanInfo.remitPeople}}</span>
            </li>
            <li>
              <span class="sp1">打款银行</span>
              <span class="sp2">{{loanInfo.remitBank}}</span>
            </li>
            <li>
              <span class="sp1">打款账户</span>
              <span class="sp2">{{loanInfo.remitAccount}}</span>
            </li>
            <li>
              <span class="sp1">本次放款金额</span>
              <span class="sp2">{{loanInfo.nowRemitMoney}}</span>
            </li>
            <li>
              <span class="sp1">流水号</span>
              <span class="sp2">{{loanInfo.remitSerial}}</span>
            </li>
            <li>
              <span class="sp1">打款时间</span>
              <span class="sp2">{{loanInfo.remitTime}}</span>
            </li>
          </ul>
          <p class="info-p">产品信息</p>
          <ul class="info-ul">
            <li style="width: 100%;">
              <span class="sp1">产品名</span>
              <span class="sp2">{{productInfo.productName}}</span>
            </li>
            <li style="width: 100%;">
              <span class="sp1">用途</span>
              <span class="sp2">{{productInfo.productPayFor}}</span>
            </li>
            <li style="width: 100%;">
              <span class="sp1">产品还款方式</span>
              <span class="sp2">{{repayments.filter(it => it.value == productInfo.productRepaymentType)[0].label}}</span>
              <!-- <span class="sp2">{{productInfo.productRepaymentType}}</span> -->
            </li>
            <li style="width: 100%;">
              <span class="sp1">提前还款</span>
              <span class="sp2">{{productInfo.aheadRepay}}</span>
            </li>
            <li style="width: 100%;">
              <span class="sp1">罚息</span>
              <span class="sp2">{{productInfo.defaultType}}</span>
            </li>
          </ul>
          <p class="info-p">渠道信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">渠道名称</span>
              <span class="sp2">{{channelInfo.channelName}}</span>
            </li>
            <li>
              <span class="sp1">渠道结算账期</span>
              <span class="sp2">{{channelInfo.closePayment}}</span>
            </li>
            <template v-for="it in channelInfo.channelAdminList">
              <li >
                <span class="sp1">渠道管理员姓名</span>
                <span class="sp2">{{it.name}}</span>
              </li>
              <li >
                <span class="sp1">渠道管理员手机号</span>
                <span class="sp2">{{it.phone}}</span>
              </li>
            </template>
            <template v-for="it in channelInfo.linkManList">
              <li >
                <span class="sp1">渠道联系人姓名</span>
                <span class="sp2">{{it.name}}</span>
              </li>
              <li >
                <span class="sp1">渠道联系人手机号</span>
                <span class="sp2">{{it.phone}}</span>
              </li>
            </template>
          </ul>
        </div>
        <p class="title"><Tag color="warning">还款计划</Tag></p>
        <div class="content">
          <p class="info-p">账单明细</p>
          <Table :columns="columns1" :data="billList"></Table>
        </div>
        <!-- <p class="title"><Tag color="warning">风控信息</Tag></p>
        <tabView :options="controls" /> -->
        <authorizationAndUpdate :authorizations="creditList" :updates="editLogList" />
      </div>
      <div class="footer">
        <!-- <Button size="default" type="success" class="btn" @click="handleReturn">退还费用</Button> -->
        <Button v-if="orderStatusInfo.orderStatus == 3" size="default" type="warning" class="btn" @click="handleEntrust">委托催收</Button>
        <Button v-if="orderStatusInfo.orderStatus == 16" size="default" type="warning" class="btn" @click="handleEntrustCancel">放弃催收</Button>
        <!-- <Button size="default" type="warning" class="btn" @click="handleEdit">修改银行卡</Button> -->
        <!-- <Button size="default" type="success" class="btn" @click="handleUpdate">客户备注</Button> -->
        <Button v-if="orderStatusInfo.orderStatus == 10" size="default" type="error" class="btn" @click="handleCance">取消放款</Button>
        <Button v-if="orderStatusInfo.orderStatus == 10" size="default" type="success" class="btn" @click="modalShow = true">确认放款</Button>
      </div>
    </Drawer>
    <Modal v-model="modalShow" title="确认放款">
      <Tabs type="card" v-model="tabIndex">
        <TabPane name="1" label="代发放款(第三方支付)">
          <ul class="info-ul">
            <li>
              <span class="sp1">放款渠道</span>
              <span clasa="sp2">富友</span>
            </li>
            <li>
              <span class="sp1">收款人</span>
              <span clasa="sp2">{{customInfo.customerName}}</span>
            </li>
            <li>
              <span class="sp1">可使用金额(元)</span>
              <span clasa="sp2">{{replaceOptions.balance}}</span>
            </li>
            <li>
              <span class="sp1">应放款金额(元)</span>
              <span clasa="sp2">{{replaceOptions.shouldRemitMoney}}</span>
            </li>
            <li>
              <span class="sp1">已放款金额(元)</span>
              <span clasa="sp2">{{replaceOptions.hadRemitMoney}}</span>
            </li>
            <li>
              <span class="sp1">手续费(元)</span>
              <span clasa="sp2">{{replaceOptions.serviceMoney}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">本次放款金额(元)</span>
              <span clasa="sp2"><Input v-model="platformInLoanMoney" placeholder="输入金额"></Input></span>
            </li>
          </ul>
        </TabPane>
        <TabPane name="2" label="平台外放款">
          <p class="line-msg">暂未开通</p> 
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button v-if="tabIndex == 1" type="primary" size="default" long @click="handleLoanSubmit">确认</Button>
      </div>
    </Modal>
    <Modal v-model="modalFormShow" :title="modalTitle">
      <!-- 修改罚息 -->
      <template v-if="modalType == 1">
        <ul class="info-ul">
          <li>
            <span class="sp1">当前罚息</span>
            <span class="sp2">{{oldPenalty}}</span>  
          </li>
          <li>
            <span class="sp1">修改后罚息</span>
            <span class="sp2">
              <Input v-model="penalty" placeholder="输入罚息"></Input>  
            </span>  
          </li>
        </ul>
        <p style="text-align: left; font-size: 16px;color: red;margin-top: 10px">*注意：修改罚息提交后，该账单的罚息第二天起将不再更新，请谨慎更改！</p>
      </template>
      <!-- 展期 -->
      <template v-if="modalType == 2">
        <ul class="info-ul">
          <li>
            <span class="sp1">利息</span>
            <span class="sp2">{{formExhibition.interest}}</span>  
          </li>
          <li>
            <span class="sp1">罚息</span>
            <span class="sp2">{{formExhibition.penalty}}</span>  
          </li>
          <li style="width: 100%;">
            <span class="sp1">展期手续费(元)</span>
            <span class="sp2">
              <Input v-model="formExhibition.deferServiceMoney"></Input>  
            </span>  
          </li>
          <li style="width: 100%;">
            <span class="sp1">本期展期总费用(利息+罚息+展期手续费)</span>
            <span class="sp2">{{totalMoneyExhibition}}</span>  
          </li>
          <li style="width: 100%;">
            <span class="sp1">展期期间期利率(%)</span>
            <span class="sp2">
              <Input v-model="formExhibition.dayRate" ></Input>  
            </span>  
          </li>
          <li style="width: 100%;">
            <span class="sp1">展期时间(天)</span>
            <span class="sp2">
              <Input v-model="formExhibition.days"></Input>  
            </span>  
          </li>
        </ul>
      </template>
      <!-- 结清 -->
      <template v-if="modalType == 3">
        <ul class="info-ul">
          <li>
            <span class="sp1">未还金额(元)</span>
            <span class="sp2">{{formCleanBill.repaymentMoneyCleanBill}}</span>  
          </li>
          <li>
            <span class="sp1">本次还款金额(元)</span>
            <span class="sp2">
              <Input v-model="formCleanBill.nowRepayMoney" placeholder="输入罚息"></Input>  
            </span>  
          </li>
        </ul>
        <div style="margin-top: 10px">
          <Input type="textarea" v-model="formCleanBill.remark" placeholder="输入备注信息"></Input>
        </div>
      </template>
      <!-- 退还费用 -->
      <!-- <template v-if="modalType == 4">
        <ul class="info-ul">
          <li style="width: 100%">
            <span class="sp1">客户银行卡</span>
            <span class="sp2">{{formReturn.bankCard}}</span>  
          </li>
          <li style="width: 100%">
            <span class="sp1">放款渠道</span>
            <span class="sp2">富友</span>  
          </li>
          <li style="width: 100%">
            <span class="sp1">费用名称</span>
            <span class="sp2">
              <Input v-model="formReturn.nowRepayMoney"></Input>  
            </span>  
          </li>
          <li style="width: 100%">
            <span class="sp1">费用金额(元)</span>
            <span class="sp2">
              <Input v-model="formReturn.nowRepayMoney"></Input>  
            </span>  
          </li>
          <li>
            <span class="sp1">可使用金额(元)</span>
            <span class="sp2">{{formReturn.balance}}</span>  
          </li>
          <li>
            <span class="sp1">手续费(元)</span>
            <span class="sp2">{{formReturn.serviceMoney}}</span>  
          </li>
        </ul>
        <div style="margin-top: 10px">
          <Input type="textarea" v-model="formReturn.remark" placeholder="输入备注信息"></Input>
        </div>
      </template> -->
      <!-- 委托催收 -->
      <template v-if="modalType == 5">
        <ul class="info-ul">
          <li style="width: 100%">
            <span class="sp1">催收人员</span>
            <span class="sp2">
              <Select v-modal="formEntrust.collectionUserId">
                <Option v-for="item in entrustsPeople" :value="item.collectionUserId" 
                :key="item.collectionUserId" :label="item.collectionUserName"></Option>
              </Select>
            </span>  
          </li>
        </ul>
        <div style="margin-top: 10px">
          <Input type="textarea" v-model="formEntrust.collectionContent" placeholder="输入备注信息"></Input>
        </div>
      </template>
      <div slot="footer">
        <Button type="primary" size="default" long @click="handleUpdateSubmit">确认提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLoanOrderList, getLoanOrderMsg, getLoanMsgthirdParty, cancelLoan, 
saveApplyPrincipal, getApplyPrincipal, updatePenaltyLoanOrder, remarkAuditPeople,
getCleanBillMsg, confirmCleanBillMsg, getExhibitionLoanMsg, confirmExhibitionLoanMsg, 
getRerurnLoanOrderMsg, getEntrustLoanOrderMsg, entrustOrCancelLoanOrderMsg, confirmPassLoanInPlatform } from '@/utils/api'
import { producOrderAllStatus, repayments } from '@/utils'
import tabView from '@/components/tabView16'
import authorizationAndUpdate from '@/components/authorizationAndUpdate'
export default {
  components: { authorizationAndUpdate },
  data() {
    return {
      formInline: {
        productName: '',
        customerName: '',
        channelName: '',
        orderStatus: 0
      },
      list: [],
      loading: true,
      loadDrawer: true,
      page: 1,
      allStatus: producOrderAllStatus(),
      repayments: repayments(),
      drawerShow: false,
      selection: [],
      options: [],
      id: '',
      total: 0,
      modalType: 1,
      modalTitle: '',
      modalShow: false,
      modalFormShow: false,
      modalSubmitShow: false,
      tabIndex: '1',
      replaceOptions: {},
      platformOptions: {},
      platformInLoanMoney: '',
      creditList: [],
      editLogList: [],
      customInfo: {},
      channelInfo: {},
      orderStatusInfo: {},
      loanInfo: {},
      productInfo: {},
      controls: [],
      billList: [],
      oldPenalty: 0,
      penalty: '',
      billId: '',
      value: '',
      batchs: [],
      formCleanBill: {
        nowRepayMoney: '',
        repaymentMoneyCleanBill: 0,
        remark: ''
      },
      formExhibition: {
        interest: 0,
        penalty: 0,
        deferServiceMoney: 0,
        dayRate: '',
        days: ''
      },
      formReturn: {
        balance: 0,
        bankCard: '',
        serviceMoney: 0
      },
      formEntrust: {
        creditItemType: '',
        collectionContent: '',
        collectionUserId: ''
      },
      entrustsPeople: [],
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '客户姓名', key: 'customerName', align: 'center' },
        { title: '申请次数', key: 'applyCount', align: 'center' },
        { title: '申请金额', key: 'loanAmount', align: 'center' },
        { title: '当前状态', key: 'orderStatus', align: 'center',
        render: (h, params) => {
          return h('div', this.allStatus.filter(it => it.id == params.row.orderStatus)[0].text)
        } },
        { title: '下单时间', key: 'orderTime', align: 'center' },
        { title: '渠道', key: 'channelName', align: 'center' },
        { title: '业务经理', key: 'name', align: 'center' },
        { title: '负责人', key: 'userName', align: 'center' },
        { title: '资方名称', key: 'capitalTitle', align: 'center' }
      ],
      columns1: [
        { title: '账单本金', key: 'billMoney', align: 'center' },
        { title: '罚息', key: 'penalty', align: 'center',
        render: (h, params) => {
          return h('div', [
            h('span', params.row.penalty),
            h('Icon', {
              props: {
                size: 'small',
                type: 'md-create'
              },
              style: {
                marginLeft: '5px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.billId = params.row.billId
                  this.oldPenalty = params.row.penalty
                  this.modalTitle = '修改罚息金额'
                  this.modalType = 1
                  this.modalFormShow = true
                }
              }
            })
          ])
        } },
        { title: '还款状态', key: 'repaymentStatus', align: 'center',
        render: (h, params) => {
          return h('div', params.row.repaymentStatus == 1? '未还款' : params.row.repaymentStatus == 2? '还款完成' : params.row.repaymentStatus == 3? '逾期' : '还款中')
        } },
        { title: '账单日期', key: 'billDate', align: 'center' },
        { title: '期数', key: 'id', align: 'center' },
        { title: '待还金额', key: 'repaymentMoney', align: 'center' },
        { title: '还款时间', key: 'backMoneyTime', align: 'center' },
        { title: '操作', key: 'action', align: 'center', width: 120,
          render: (h, params) => {
            const exhibition = h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                  this.billId = params.row.billId
                  getExhibitionLoanMsg({ billId: this.billId }).then(res => {
                    if (res.state == 1) {
                      this.formExhibition.interest = res.info.data.interest
                      this.formExhibition.penalty = res.info.data.penalty
                      this.modalTitle = '账单展期'
                      this.modalType = 2
                      this.modalFormShow = true
                    }
                  })
                }
              }
            }, '展期')
            const interest = h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#2db7f5'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                  this.billId = params.row.billId
                  getCleanBillMsg({ billId: this.billId }).then(res => {
                    if (res.state == 1) {
                      this.formCleanBill.repaymentMoneyCleanBill = res.info.data.repaymentMoney || 0
                      this.modalTitle = '结清账单'
                      this.modalType = 3
                      this.modalFormShow = true
                    }
                  })
                }
              }
            }, '结清')
            return h('div', params.row.repaymentStatus == 1? [exhibition, interest] : '')
          }
        }
      ]
    }
  },
  mounted() {
    this.fetchLoanOrderList()
    this.fetchApplyPrincipal()
  },
  computed: {
    isDisabled() {
      if (this.selection.length > 0) return false
      return true
    },
    totalMoneyExhibition() {
      return Number(this.formExhibition.interest) + Number(this.formExhibition.penalty) + Number(this.formExhibition.deferServiceMoney)
    }
  },
  methods: {
    handleReturn() {
      const params = {
        customerId: this.id,
        companyId: this.$store.getters.userInfo.companyId
      }
  
      getRerurnLoanOrderMsg(params).then(res => {
        if (res.state == 1) {
          for (const i in this.formReturn) {
            if (res.info.data[i]) {
              this.formReturn[i] = res.info.data[i]
            }
          }
          this.modalType = 4
          this.modalTitle = '退还费用'
          this.modalFormShow = true
        }
      })
    },
    handleEntrustCancel() {
      const params = this.formEntrust
      params.customerId = this.id
      params.collectionStatus = 19
      params.userId = this.$store.getters.userInfo.userId
      entrustOrCancelLoanOrderMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('放弃委托成功')
          this.fetchLoanMsg()
        }
      })
    },
    handleEntrust() {
      const params = {
        customerId: this.id,
        companyId: this.$store.getters.userInfo.companyId
      }
      getEntrustLoanOrderMsg(params).then(res => {
        if (res.state == 1) {
          this.entrustsPeople = res.info.data.userList
          this.formExhibition.creditItemType = res.info.data.riskControlInfo.creditItemType
          this.modalType = 5
          this.modalTitle = '委托催收'
          this.modalFormShow = true
        }
      })
    },
    handleUpdateSubmit() {
      if (this.modalType == 1) {
        const params = {
          billId: this.billId,
          penalty: this.penalty
        }
        updatePenaltyLoanOrder(params).then(res => {
          if (res.state == 1) {
            this.$Message.success('修改成功')
            this.penalty = ''
            this.fetchLoanMsg()
          }
        })
      } else if (this.modalType == 2) {
        const params = this.formExhibition
        params.totalMoney = this.totalMoneyExhibition
        params.billId = this.billId
        params.customerId = this.id
        confirmExhibitionLoanMsg(params).then(res => {
          if (res.state == 1) {
            this.$Message.success('展期成功')
            for (const i in this.formExhibition) {
              this.formExhibition[i] = ''
            }
            this.fetchLoanMsg()
          }
        })
      } else if (this.modalType == 3) {
        const params = this.formCleanBill
        params.billId = this.billId
        params.userId = this.$store.getters.userInfo.userId
        params.customerId = this.id
        confirmCleanBillMsg(params).then(res => {
          if (res.state == 1) {
            this.$Message.success('结清成功')
            for (const i in this.formCleanBill) {
              this.formCleanBill[i] = ''
            }
            this.fetchLoanMsg()
          }
        })
      } else if (this.modalType == 4) {
        return
      } else if (this.modalType == 5) {
        const params = this.formEntrust
        params.customerId = this.id
        params.collectionStatus = 16
        params.userId = this.$store.getters.userInfo.userId
        entrustOrCancelLoanOrderMsg(params).then(res => {
          if (res.state == 1) {
            this.$Message.success('委托成功')
            for (const i in this.formEntrust) {
              this.formEntrust[i] = ''
            }
            this.fetchLoanMsg()
          }
        })
      }
    },
    handleSelectChange(selection) {
      this.selection = selection
    },
    handleBatch() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Select', {
            props: {
              value: this.batchs,
              autofocus: true,
              size: 'default',
              placeholder: '更换负责人',
              clearable: true,
              multiple: true
            },
            on: {
              input: (val) => {
                this.batchs = val
              }
            }
          }, this.options.map(item => {
            return h('Option', {
              props: {
                value: item.userId,
                label: item.userName,
                key: item.userId
              }
            })
          }))
        },
        onOk: () => {
          this.editApplyPrincipal()
        }
      })
    },
    editApplyPrincipal() {
      const ids = []
      for (const o of this.selection) {
        ids.push(o.customerId)
      }
      const params = {
        customerIdString: ids.join(','),
        userIdString: this.batchs.join(',')
      }
      saveApplyPrincipal(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('更换成功')
          this.fetchLoanOrderList()
          this.batchs.splice(0, this.batchs.length)
        }
      })
    },
    handleUpdate() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '输入客户备注',
              size: 'default',
              type: 'textarea'
            },
            on: {
              input: (val) => {
                this.value = val
              }
            }
          })
        },
        onOk: () => {
          const params = {
            customerRemark: this.value,
            customerId: this.id
          }
          remarkAuditPeople(params).then(res => {
            if (res.state == 1) {
              this.$Message.success('备注成功')
              this.fetchLoanMsg()
              this.value = ''
            }
          })
        }
      })
    },
    handleLoanSubmit() {
      // console.log(this.tabIndex)
      // console.log(this.replaceOptions.serviceMoney)
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        customerId: this.id,
        transactionAmount: this.platformInLoanMoney,
        serviceCharge: this.replaceOptions.serviceMoney
      }
      confirmPassLoanInPlatform(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('放款成功')
          this.modalShow = false
          this.fetchLoanMsg()
          this.fetchLoanOrderList()
        }
      })
    },
    handleCance() {
      const params = {
        customerId: this.id,
        userId: this.$store.getters.userInfo.userId
      }
      cancelLoan(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('取消成功')
          this.fetchLoanMsg()
          this.fetchLoanOrderList()
        }
      })
    },
    handleClick(row) {
      this.id = row.customerId
      this.drawerShow = true
      this.fetchLoanMsgthirdParty()
      this.fetchLoanMsg()
      // this.fetchLoanAlertMsg()
    },
    handleSubmit() {
      this.fetchLoanOrderList()
    },
    handleChange(val) {
      this.page = val
      this.fetchLoanOrderList()
    },
    fetchLoanMsgthirdParty() {
      const params = {
        customerId: this.id,
        companyId: this.$store.getters.userInfo.companyId
      }
      getLoanMsgthirdParty(params).then(res => {
        if (res.state == 1) {
          this.replaceOptions = res.info.data
        }
      })
    },
    fetchLoanAlertMsg() {
      getLoanAlertMsg({ customerId: this.id }).then(res => {
        if (res.state == 1) {
          this.platformOptions = res.info.data
        }
      })
    },
    fetchLoanMsg() {
      this.loadDrawer = true
      getLoanOrderMsg({ customerId: this.id }).then(res => {
        if (res.state == 1) {
          this.modalFormShow = false
          this.editLogList = res.info.data.editLogList
          this.creditList = res.info.data.creditList
          this.customInfo = res.info.data.customerInfo
          this.loanInfo = res.info.data.remitInfo !== null? res.info.data.remitInfo : {}
          this.productInfo = res.info.data.productInfo
          this.channelInfo = res.info.data.channelInfo
          this.orderStatusInfo = res.info.data.orderStatusInfo !== null? res.info.data.orderStatusInfo : {}
          this.billList = res.info.data.detailBillList
          this.controls = res.info.data.riskControlInfo.creditItemType.split(',')
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    fetchApplyPrincipal() {
      getApplyPrincipal({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.options = res.info.data
        }
      })
    },
    fetchLoanOrderList() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.limit = 20
      params.page = this.page
      params.userId = this.$store.getters.userInfo.userId
      this.loading = true
      getLoanOrderList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.data.checkList
          this.total = res.info.data.count
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
