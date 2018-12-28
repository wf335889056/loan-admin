<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.customerName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.deferStatus" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="1">待确认</Option>
                <Option :value="2">已完成</Option>
                <Option :value="3">已取消</Option>
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
    <Drawer title="展期详情" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <Spin fix size="large" v-if="loadDrawer"></Spin>
      <div class="detail" style="bottom: 0;" v-else>
        <p class="title"><Tag color="warning">基础信息</Tag></p>
        <div class="content">
          <p class="info-p">展期信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">手续费</span>
              <span class="sp2">{{deferInfo.deferServiceMoney}}</span>
            </li>
            <li>
              <span class="sp1">发起时间</span>
              <span class="sp2">{{deferInfo.createTime}}</span>
            </li>
            <li>
              <span class="sp1">利息</span>
              <span class="sp2">{{deferInfo.interest}}</span>
            </li>
            <li>
              <span class="sp1">罚息</span>
              <span class="sp2">{{deferInfo.penalty}}</span>
            </li>
            <li>
              <span class="sp1">展期状态</span>
              <span class="sp2">{{deferInfo.deferStatus == 1? '待确认' : deferInfo.deferStatus == 2? '已完成' : '已取消'}}</span>
            </li>
            <li>
              <span class="sp1">发起方</span>
              <span class="sp2">{{deferInfo.initiator}}</span>
            </li>
            <li>
              <span class="sp1">总费用</span>
              <span class="sp2">{{deferInfo.totalMoney}}</span>
            </li>
            <li>
              <span class="sp1">天数</span>
              <span class="sp2">{{deferInfo.days}}</span>
            </li>
            <li>
              <span class="sp1">利率/日(%)</span>
              <span class="sp2">{{deferInfo.dayRate}}</span>
            </li>
            
          </ul>
          <p class="info-p">客户信息</p>
          <ul class="info-ul" v-if="Object.keys(customInfo).length > 0">
            <li>
              <span class="sp1">客户姓名</span>
              <span class="sp2">{{customInfo.customerName}}</span>
            </li>
            <li>
              <span class="sp1">客户手机号码</span>
              <span class="sp2">{{customInfo.customerPhone}}</span>
            </li>
            <li>
              <span class="sp1">客户身份证号码</span>
              <span class="sp2">{{customInfo.customerIdcard}}</span>
            </li>
          </ul>
          <p class="info-p">原账单信息</p>
          <ul class="info-ul" v-if="Object.keys(billInfo).length > 0">
            <li>
              <span class="sp1">放款订单编号</span>
              <span class="sp2">{{billInfo.orderCode}}</span>
            </li>
            <li>
              <span class="sp1">贷款金额</span>
              <span class="sp2">{{billInfo.loanAmount}}</span>
            </li>
            <li>
              <span class="sp1">总费用</span>
              <span class="sp2">{{billInfo.TotalBillMoney}}</span>
            </li>
            <li>
              <span class="sp1">利息</span>
              <span class="sp2">{{billInfo.interest}}</span>
            </li>
            <li>
              <span class="sp1">分期期数</span>
              <span class="sp2">{{billInfo.byStagesNum}}</span>
            </li>
            <li>
              <span class="sp1">罚息</span>
              <span class="sp2">{{billInfo.penalty}}</span>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { getExhibitionRecordList, getExhibitionRecordMsg } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        customerName: '',
        deferStatus: 0
      },
      list: [],
      total: 0,
      loading: true,
      loadDrawer: true,
      page: 1,
      columns: [
        { title: '客户名称', key: 'customerName', align: 'center' },
        { title: '发起时间', key: 'createTime', align: 'center' },
        { title: '总费用', key: 'totalMoney', align: 'center' },
        { title: '天数', key: 'days', align: 'center' },
        { title: '日利率(&)', key: 'dayRate', align: 'center' },
        { title: '状态', key: 'deferStatus', align: 'center',
        render: (h, params) => {
          return h('div', params.row.deferStatus == 1? '待确认' : params.row.deferStatus == 2? '已完成' : '已取消')
        } },
        { title: '发起方', key: 'name', align: 'center' }
      ],
      drawerShow: false,
      deferId: '',
      customId: '',
      customInfo: {},
      deferInfo: {},
      billInfo: {}
    }
  },
  mounted() {
    this.fetchExhibitionRecordList()
  },
  computed: {
    isDisabled() {
      if (this.selection.length > 0) return false
      return true
    }
  },
  methods: {
    handleSelectChange(selection) {
      this.selection = selection
    },
    handleClick(row) {
      this.deferId = row.deferId
      this.customId = row.customerId
      this.drawerShow = true
      this.fetchExhibitionRecordMsg()
    },
    handleSubmit() {
      this.fetchExhibitionRecordList()
    },
    handleChange(val) {
      this.page = val
      this.fetchExhibitionRecordList()
    },
    fetchExhibitionRecordMsg() {
      const params = {
        deferId: this.deferId,
        customerId: this.customId
      }
      this.loadDrawer = true
      getExhibitionRecordMsg(params).then(res => {
        if (res.state == 1) {
          if (res.info.data.customerInfo !== null) {
            this.customInfo = res.info.data.customerInfo
          }
          if (res.info.data.rawBill !== null) {
            this.billInfo = res.info.data.rawBill
          }
          this.deferInfo = res.info.data.deferContentInfo
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    fetchExhibitionRecordList() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.limit = 20
      params.page = this.page
      this.loading = true
      getExhibitionRecordList(params).then(res =>{
        if (res.state == 1) {
          this.list = res.info.data.deferList
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
