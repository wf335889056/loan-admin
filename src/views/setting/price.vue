<template>
  <div class="wrapper">
    <Row>
      <!-- <Col span="12">
        <p class="title">套餐余量</p>
        <div class="buy-box" @click="handleBuy">
          <Icon type="md-add" />购买套餐
        </div>
      </col> -->
      <Col span="24">
        <p class="title">计费余额 <span>{{balance.toFixed(2)}}</span>元</p>
        <div class="buy-box" @click="handleTopUp">
          <Icon type="logo-yen" />充值
        </div>  
      </col>
    </Row>
    <Divider />
    <Tabs value="1">
      <TabPane label="入账明细" name="1">
        <div class="table">
          <Table  :columns="columns1" :data="list1"></Table>
          <Page :current="pageA" :page-size="20" :total="list1len" show-total class="page" @on-change="handleChangeA" />
        </div>
      </TabPane>
      <!-- <TabPane label="套餐使用明细" name="2">
        <div class="table">
          <Table :columns="columns2" :data="list2"></Table>
          <Page :current="pageB" :page-size="20" :total="list2len" show-total class="page" @on-change="handleChangeB" />
        </div>
      </TabPane> -->
      <TabPane label="大数据计费" name="3">
        <div class="table">
          <Table :columns="columns1" :data="list3"></Table>
          <Page :current="pageC" :page-size="20" :total="list3len" show-total class="page" @on-change="handleChangeC" />  
        </div>
      </TabPane>
      <TabPane label="短信计费" name="4">
        <div class="table">
          <Table :loading="loading" :columns="columns3" :data="list4"></Table>
          <Page :current="pageD" :page-size="20" :total="list4len" show-total class="page" @on-change="handleChangeD" />
        </div>
      </TabPane>
    </Tabs>
    <Modal v-model="modelTopUp" title="查询费充值">
      <Form :model="formInline1">
        <FormItem label="充值金额（最低1000元起充）/元:">
          <InputNumber :min="1000" :step="500" style="width: 200px;" v-model="formInline1.money" placeholder="输入充值金额"></InputNumber>
        </FormItem>
        <FormItem label="支付方式:">
          <Select v-model="formInline1.payWay" disabled placeholder="选择支付方式">
            <Option :value="1">支付宝</Option>
            <Option :value="2">微信</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="default" long @click="topUpConfirm">提交</Button>
      </div>
    </Modal>
    <Modal v-model="modeBuy" title="选择套餐">
      <Form :model="formInline2">
        <FormItem label="套餐名称:">
          <p>手机风险评分+信贷反欺诈核查+贷前综合风险报告+多头负债+多头借贷+身份证实名认证+三网手机二要素验证</p>
        </FormItem>
        <FormItem label="选择购买方案（查询人次/价格）:">
          <Select v-model="formInline2.comboScheme" placeholder="选择">
            <Option v-for="item in options" :value="item.id" :key="item.id" :label="item.value"></Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="default" long @click="buyConfirm">提交</Button>
      </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { topUpBillingBalance, buyPurchasePlan, getBillingQuery } from '@/utils/api'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list1len: 0,
      list2len: 0,
      list3len: 0,
      list4len: 0,
      columns1: [
        { title: '交易流水号', key: 'financeCode', align: 'center' },
        { title: '消费ID', key: 'accountId', align: 'center' },
        { title: '交易金额', key: 'dealMoney', align: 'center' },
        { title: '操作时间', key: 'createTime', align: 'center' },
        { title: '交易类型', key: 'dealType', align: 'center' },
        { title: '操作人', key: 'userName', align: 'center' },
        { title: '备注消息', key: 'remark', align: 'center' }
      ],
      columns2: [
        { title: '交易流水号', key: 'financeCode', align: 'center' },
        { title: '消费ID', key: 'accountId', align: 'center' },
        { title: '套餐编号', key: 'comboScheme', align: 'center' },
        { title: '套餐名称', key: 'comboBuyCount', align: 'center' },
        { title: '剩余次数', key: 'remain', align: 'center' },
        { title: '操作人', key: 'userName', align: 'center' },
        { title: '备注消息', key: 'remark', align: 'center' }
      ],
      columns3: [
        { title: '接收手机号', key: 'phone', align: 'center' },
        { title: '发送状态', key: 'sendType', align: 'center' },
        { title: '接收状态', key: 'receiveType', align: 'center' },
        { title: '类型', key: 'type', align: 'center' },
        { title: '发送内容', key: 'sendContent', align: 'center' },
        { title: '计费条数', key: 'count', align: 'center' },
        { title: '消费金额', key: 'cost', align: 'center' },
        { title: '发送时间', key: 'createTime', align: 'center' },
        { title: '备注', key: 'remark', align: 'center' }
      ],
      modelTopUp: false,
      modeBuy: false,
      formInline1: {
        money: 1000,
        payWay: 1
      },
      formInline2: {
        comboScheme: ''
      },
      balance: 0,
      options: [
        { id: 1, value: '2000次/3488.00元', money: 3488, count: 2000 },
        { id: 2, value: '5000次/8633.00元', money: 8633, count: 5000 },
        { id: 3, value: '10000次/16910.00元', money: 16910, count: 10000 },
        { id: 4, value: '50000次/80100.00元', money: 80100, count: 50000 },
        { id: 5, value: '100000次/156640.00元', money: 156640, count: 100000 },
      ],
      pageA: 1,
      pageB: 1,
      pageC: 1,
      pageD: 1
    }
  },
  mounted() {
    this.fetchBillingQueryA()
    this.fetchBillingQueryB()
    this.fetchBillingQueryC()
    this.fetchBillingQueryD()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    buyConfirm() {
      const params = this.formInline2
      params.companyId = this.userInfo.companyId
      params.userId = this.userInfo.userId
      params.comboBuyCount = this.options.filter(it => it.id == this.formInline2.comboScheme)[0].count
      params.comboPrice = this.options.filter(it => it.id == this.formInline2.comboScheme)[0].money
      buyPurchasePlan(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('购买成功')
        }
      })
    },
    topUpConfirm() {
      let url = this.$baseUrl + '/deskManagementController/billBalancePay?'
      url = url + `companyId=${this.userInfo.companyId}&userId=${this.userInfo.userId}&money=${this.formInline1.money}`
      window.location.href = url
    },
    handleBuy() {
      this.modeBuy = true
    },
    handleTopUp() {
      this.modelTopUp = true
    },
    handleChangeA(page) {
      this.pageA = page
      this.fetchBillingQueryA()
    },
    handleChangeB(page) {
      this.pageB = page
      this.fetchBillingQueryB()
    },
    handleChangeC(page) {
      this.pageC = page
      this.fetchBillingQueryC()
    },
    handleChangeD(page) {
      this.pageD = page
      this.fetchBillingQueryD()
    },
    fetchBillingQueryA() {
      const params = {
        companyId: this.userInfo.companyId,
        limit: 20,
        page: this.pageA,
        type: 1
      }
      getBillingQuery(params).then(res => {
        if (res.state == 1) {
          this.list1 = res.info.billQuerys
          this.balance = res.info.balance == ''? 0 : res.info.balance
          this.list1len = res.info.count
        }
      })
    },
    fetchBillingQueryB() {
      const params = {
        companyId: this.userInfo.companyId,
        limit: 20,
        page: this.pageB,
        type: 2
      }
      this.loading = true
      getBillingQuery(params).then(res => {
        if (res.state == 1) {
          this.list2 = res.info.billQuerys
          this.list2len = res.info.count
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    },
    fetchBillingQueryC() {
      const params = {
        companyId: this.userInfo.companyId,
        limit: 20,
        page: this.pageC,
        type: 3
      }
      getBillingQuery(params).then(res => {
        if (res.state == 1) {
          this.list3 = res.info.billQuerys
          this.list3len = res.info.count
        }
      })
    },
    fetchBillingQueryD() {
      const params = {
        companyId: this.userInfo.companyId,
        limit: 20,
        page: this.pageD,
        type: 4
      }
      getBillingQuery(params).then(res => {
        if (res.state == 1) {
          this.list4 = res.info.billQuerys
          this.list4len = res.info.count
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
 .title {
    color: #333333;
    font-size: 20px;
    font-weight: bold;
    padding-left: 10px;
    line-height: 40px;
    span {
      color: red;
      font-size: 30px;
      font-weight: bold;
      margin-left: 30px;
    }
 }
 .buy-box {
   margin: 30px 0 20px 0;
   width: 300px;
   height: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #508cee;
   cursor: pointer;
   font-size: 20px;
   border: 1px solid #d6dde1;
 }
</style>