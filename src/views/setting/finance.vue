<template>
  <div>
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="drawerShow = true">账户管理</Button>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="topUpModal = true">充值</Button>
      <!-- <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="futForwardModal = true">提出</Button> -->
    </Row>
    <p class="p1"><span>富友账户余额：<i>{{accountMoney.toFixed(2)}}</i> 元</span> <span>可用余额：<i>{{availableMoney.toFixed(2)}}</i> 元</span></p>
    <Row>
    </Row>
    <Divider />
    <Tabs value="name1">
      <TabPane label="流水明细" name="name1">
        <Table :loading="loading" :columns="columns" :data="list1"></Table>
      </TabPane>
      <TabPane label="入账明细" name="name2">
        <Table :columns="columns" :data="list2"></Table>
      </TabPane>
      <TabPane label="支出明细" name="name3">
        <Table :columns="columns" :data="list3"></Table>
      </TabPane>
    </Tabs>
    <Modal v-model="topUpModal" title="给账户余额充钱">
      <Form :model="form1" :label-width="100" label-position="left">
        <FormItem label="账户类型:">富友</FormItem>
        <FormItem label="账户余额:"><span style="color: #009900;">{{accountMoney.toFixed(2)}}</span>元</FormItem>
        <FormItem label="充值金额:">
          <InputNumber :min="1" v-model="form1.amt" size="default"></InputNumber>元
        </FormItem>
        <FormItem label="选择账户:">
          <Select v-model="form1.accountId" size="default">
            <Option v-for="(item, index) in banks" :value="item.id" :key="index" :label="item.text"></Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="default" long @click="topUpOk">提交</Button>
      </div>
    </Modal>
    <Modal v-model="futForwardModal" title="提款到银行卡">
      <Form :model="form2" :label-width="100" label-position="left">
        <FormItem label="账户类型:">
          <Input value="富有" :readonly="true" size="default" style="width: 80px;"></Input>
        </FormItem>
        <FormItem label="账户余额:">
          <span style="color: #009900;">{{accountMoney.toFixed(2)}}</span>元
        </FormItem>
        <FormItem label="可提现:">
          <span style="color: #009900;">{{accountMoney.toFixed(2)}}</span>元
        </FormItem>
        <FormItem label="提款额:">
          <InputNumber :min="0" v-model="form2.input" size="default"></InputNumber>元
        </FormItem>
        <FormItem label="选择账户:">
          <Select v-model="form2.input" size="default">
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="default" long @click="futForwarOk">确定</Button>
      </div>
    </Modal>
    <Modal v-model="accountModal" title="新增账户">
      <Form :model="form3" :label-width="120" label-position="left">
        <FormItem label="账户备注:">
          <Input v-model="form3.accountName" size="default"></Input>
        </FormItem>
        <FormItem label="开户银行:">
          <Select v-model="form3.bankType" size="default">
            <Option v-for="(item, index) in options" :value="item.id" :key="index" :label="item.bankName"></Option>
          </Select>
        </FormItem>
        <FormItem label="银行卡号:">
          <Input v-model="form3.bankCardNum" size="default"></Input>
        </FormItem>
        <FormItem label="身份证号码:">
          <Input v-model="form3.idCard" size="default"></Input>
        </FormItem>
        <FormItem label="银行预留手机号码:">
          <Input v-model="form3.bankPhone" size="default"></Input>
        </FormItem>
        <FormItem label="开户名:">
          <Input v-model="form3.bankAccountName" size="default"></Input>
        </FormItem>
        <FormItem label="账户类型:">
          <Select v-model="form3.accountType" size="default">
            <Option :value="1">个人账户</Option>
            <Option :value="2">对公账户</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="default" long @click="addAccountOk">确定</Button>
      </div>
    </Modal>
    <Drawer title="账户管理" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <div class="detail">
        <div class="content">
          <p v-if="type == 1">放款限额: {{moneyText}} <span class="span" @click="type = 2">编辑</span></p>
          <p v-if="type == 2">
            <span>放款限额: <InputNumber :min="0" v-model="money" size="default" style="width: 200px;"></InputNumber>元</span>
            <span>限额周期: 
              <RadioGroup v-model="limitCycle" size="default" >
                <Radio :label="1">日</Radio>
                <Radio :label="2">周</Radio>
                <Radio :label="3">月</Radio>
              </RadioGroup>
            </span>
            <span class="span" @click="handleSubmit">保存</span><span class="span" @click="type = 1">取消</span>
          </p>
        </div>
        <div class="content">
          <Table :columns="columns1" :data="listData"></Table>
        </div>
      </div>
      <div class="footer">
        <Button size="default" type="primary" class="btn" @click="handleAdd">新增</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Axios from 'axios'
import { getAccountBankList, deleteAccountBank, addAccountBankList, updateAccountBankQuotas, topUpMoney, getWaterSubsidiary } from '@/utils/api'
export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      listData: [{name: 1}],
      loading: true,
      columns: [
        { title: '行为', key: 'financeBehaviorName', align: 'center' },
        { title: '交易流水号', key: 'financeInfoId', align: 'center' },
        { title: '发生金额', key: 'financeMoney', align: 'center' },
        { title: '操作人', key: 'userName', align: 'center' },
        { title: '出款账户', key: 'financeOutAccountName', align: 'center' },
        { title: '入款账户', key: 'financeInAccountName', align: 'center' },
        { title: '账户类型', key: 'accountType', align: 'center' },
        { title: '操作时间', key: 'createTime', align: 'center' }
      ],
      columns1: [
        { title: '账户备注', key: 'accountName', align: 'center' },
        { title: '开户银行', key: 'bankType', align: 'center' },
        { title: '银行卡号', key: 'bankCardNum', align: 'center' },
        { title: '身份证号码', key: 'idCard', align: 'center' },
        { title: '银行预留手机号', key: 'bankPhone', align: 'center' },
        { title: '开户名', key: 'bankAccountName', align: 'center' },
        { title: '账户类型', key: 'accountType', align: 'center' },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#2db7f5'
              },
              on: {
                click: () => {
                  this.handleDelete(params.row.accountId)
                }
              }
            }, '删除')
          }
        }
      ],
      drawerShow: false,
      topUpModal: false,
      futForwardModal: false,
      accountModal: false,
      form1: {
        amt: 1,
        accountId: ''
      },
      form2: {
      },
      form3: {
        accountName: '',
        bankType: 1,
        bankCardNum: '',
        idCard: '',
        bankPhone: '',
        bankAccountName: '',
        accountType: 1
      },
      type: 1,
      money: 0,
      moneyText: '',
      limitCycle: '',
      options: [
        { id: 1, bankName: '中国工商银行', code: '0801020000' },
        { id: 2, bankName: '中国建设银行', code: '0801050000' },
        { id: 3, bankName: '中国民生银行', code: '0803050000' },
        { id: 4, bankName: '华夏银行', code: '0803040000' },
        { id: 5, bankName: '招商银行', code: '0803080000' },
        { id: 6, bankName: '中国银行', code: '0801040000' },
        { id: 7, bankName: '交通银行', code: '0803010000' },
        { id: 8, bankName: '上海浦东发展银行', code: '0803100000' },
        { id: 9, bankName: '兴业银行', code: '0803090000' },
        { id: 10, bankName: '中信银行', code: '0803020000' },
        { id: 11, bankName: '平安银行', code: '0804100000' },
        { id: 12, bankName: '上海银行', code: '080401001C' }
      ],
      banks: [],
      availableMoney: 0,
      accountMoney: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    this.fetchWaterSubsidiary()
    this.fetchAccountBankList()
  },
  methods: {
    topUpOk() {
      if (this.form1.accountId == '') {
        this.$Message.error('请选择支付账户')
        return
      }
      const params = this.form1
      params.companyId = this.$store.getters.userInfo.companyId
      params.userId = this.$store.getters.userInfo.userId
      params.bankAccountName = this.banks.filter(it => it.id == this.form1.accountId)[0].bankAccountName
      params.bankCode = this.banks.filter(it => it.id == this.form1.accountId)[0].code
      params.pageNotifyUrl = window.location.href
      // console.log(params)
      topUpMoney(params).then(res => {
        if (res.state == 1) {
          console.log(res)
          this.topUpFuYou(res.info)
        }
      })
    },
    futForwarOk() {
    },
    addAccountOk() {
      for (const o in this.form3) {
        if (this.form3[o] == '') {
          this.$Message.error('请填入完整信息')
          return
        }
      }
      const params = this.form3
      params.bankCode = this.options.filter(it => it.id == this.form3.bankType)[0].code
      params.companyId = this.$store.getters.userInfo.companyId
      addAccountBankList(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          for (const i in this.form3) {
            if (i == 'bankType' || i == 'accountType') {
              this.form[i] = 1
            } else {
              this.form3[i] = ''
            }
          }
          this.fetchAccountBankList()
        }
      })
    },
    handleAdd() {
      this.accountModal = true
    },
    handleSubmit() {
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        moneyMax: this.money,
        limitCycle: this.limitCycle
      }
      updateAccountBankQuotas(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchAccountBankList()
          this.type = 1
        }
      })
    },
    handleDelete(id) {
      deleteAccountBank({ accountId: id }).then(res => {
        if (res.state == 1) {
          this.$Message.success('删除成功')
          this.fetchAccountBankList()
        }
      })
    },
    async fetchWaterSubsidiary() {
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        limit: 9999,
        page: 1
      }
      for (let i = 0; i < 3; i++) {
        params.type = i
        await getWaterSubsidiary(params).then(res => {
          if (res.state == 1) {
            if (i == 0) {
              this.list1 = res.info.financeInfos
            } else if (i == 1) {
              this.list2 = res.info.financeInfos
            } else if (i == 2) {
              this.list3 = res.info.financeInfos
            }
            this.availableMoney = res.info.caamt
            this.accountMoney = res.info.ctamt
          }
        })
      }
    },
    fetchAccountBankList() {
      this.banks.splice(0, this.banks.length)
      getAccountBankList({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.listData = res.info.bankCardList
          this.moneyText = res.info.moneyMax
          for (const o of this.listData) {
            this.banks.push({
              id: o.accountId,
              text: o.accountName + '+' + o.bankType + '+' + o.bankCardNum + '+' + o.bankAccountName,
              code: this.options.filter(it => it.bankName == o.bankType)[0].code,
              bankAccountName: o.bankAccountName
            })
          }
        }
      })
    },
    topUpFuYou(data) {
      let url = 'https://pay.fuiou.com/smpGate.do?'
      console.log(data)
      // const formData = new FormData()
      // formData.append('mchnt_cd', data.mchntCd) // 商户代码
      // formData.append('order_id', data.orderNumber) // 商户订单号
      // formData.append('order_amt', data.amt) // 交易金额
      // formData.append('order_pay_type', data.orderPayType) // 支付类型
      // formData.append('page_notify_url', data.pageNotifyUrl) // 页面回调地址
      // formData.append('back_notify_url', data.backNotifyUrl) // 后台回调地址
      // formData.append('iss_ins_cd', data.bankCode) // 银行代码
      // formData.append('ver', data.ver) // 版本号
      // formData.append('md5', data.md5) // md5
      const pageNotifyUrl = encodeURIComponent(data.pageNotifyUrl)
      const backNotifyUrl = encodeURIComponent(data.backNotifyUrl)
      url = url + `mchnt_cd=${data.mchntCd}&order_id=${data.orderNumber}&order_amt=${data.amt}&order_pay_type=${data.orderPayType}&iss_ins_cd=${data.bankCode}&ver=${data.ver}&md5=${data.md5}&back_notify_url=${backNotifyUrl}&page_notify_url=${pageNotifyUrl}`
      console.log(url)
      window.location.href = url
      // Axios.post(url).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
  .p1 {
    font-size: 18px;
    color: #666;
    span {
      margin-right: 30px;
      i {
        color: #009900;
        font-weight: 500;
      }
    }
  }
  .drawer {
    .detail {
      p {
        font-size: 16px;
        .span {
          margin-left: 20px;
          color: #4A90E2;
          cursor: pointer;
        }
      }
    }
  }
</style>
