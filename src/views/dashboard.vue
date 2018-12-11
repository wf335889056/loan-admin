<template>
  <div>
    <Spin fix size="large" v-if="loadDrawer"></Spin>
    <template v-else>
      <div class="d1">
      <div>
        <div class="title">账户信息</div>
        <div class="content account">
          <div>
            <p class="p1">账户余额(元)</p>
            <p class="p2">{{accounts.thirdPartyBalance.toFixed(2)}}</p>
          </div>
          <div>
            <p class="p1">可用余额(元)</p>
            <p class="p2">{{accounts.thirdPartyCanuseBalance.toFixed(2)}}</p>
          </div>
          <div>
            <p class="p1">查询费余额(元)</p>
            <p class="p2">{{accounts.balance.toFixed(2)}}</p>
          </div>
          <div>
            <p class="p1">打款中余额(元)</p>
            <p class="p2">{{accounts.loanAmount.toFixed(2)}}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="title">当前数据</div>
        <div class="content data">
          <ul>
            <li v-for="(item, index) in datas" :key="index">
              <p class="p1"><span :style="{'background-color': item.color}"></span>{{item.title}}</p>
              <p class="p2">{{item.number}}单</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="title">待收和逾期</div>
        <div class="content overdue">
          <div>
            <p><span style="background-color: rgb(254, 182, 62)"></span>代收笔数</p>
            <span class="sp">笔数: {{waitMap.waitBillCount}}笔</span>
            <span class="sp">本金: {{waitMap.billMoneyCount.toFixed(2)}}元</span>
            <span class="sp">利息: {{waitMap.interestCount.toFixed(2)}}元</span>
          </div>
          <div>
            <p><span></span>逾期数据</p>
            <span class="sp">笔数: {{overdueMap.overdueBillCount}}笔</span>
            <span class="sp">本金: {{overdueMap.billMoneyCount.toFixed(2)}}元</span>
            <span class="sp">利息: {{overdueMap.interestCount.toFixed(2)}}元</span>
            <span class="sp">罚息: {{overdueMap.penaltyCount.toFixed(2)}}元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="d2">
      <div>
        <div class="title">回款数据</div>
        <div class="content returned">
          <p>笔数: <span>{{totalMoneyMap.totalBillCount}}笔</span> 
            金额: {{totalMoneyMap.totalMoney.toFixed(2)}}元</p>
          <p>本金: {{totalMoneyMap.billMoneyCount.toFixed(2)}}元, 
            利息: {{totalMoneyMap.interestCount.toFixed(2)}}元, 
            罚息: {{totalMoneyMap.penaltyCount.toFixed(2)}}元, 
            手续费: {{totalMoneyMap.serviceMoney.toFixed(2)}}元</p>
          <p>已回款{{returnedMoneyMap.returnedBillCount}}笔, 
            共计{{returnedMoneyMap.totalMoney.toFixed(2)}}元, 
            其中本金{{returnedMoneyMap.billMoneyCount.toFixed(2)}}元, 
            利息{{returnedMoneyMap.interestCount.toFixed(2)}}元, 
            罚息{{returnedMoneyMap.penaltyCount.toFixed(2)}}元, 
            手续费{{returnedMoneyMap.serviceMoney.toFixed(2)}}元</p>
          <div class="table">
            <Table :loading="loading" :columns="columns" :data="returneds"></Table>
            <Page :current="returnedsPage" size="small" :page-size="5" :total="total" show-total class="page" @on-change="handleChange" />
          </div>
        </div>
      </div>
      <div>
        <div class="title">放款数据</div>
        <div class="content loan">
          <echarts :datas="echartsDatas" />
        </div>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
  import echarts from '@/components/echarts.vue'
  import { getDashboardMsg, getDashboardList, getDashboardChart } from '@/utils/api'
  export default {
    components: { echarts },
    data() {
      return {
        loadDrawer: true,
        datas: [
          { title: '等待审核', color: 'rgb(84, 174, 248)', key: 'waitCheckCount' },
          { title: '待放款', color: 'rgb(254, 182, 62)', key: 'waitLoanCount' },
          { title: '待签署合同', color: 'rgb(122, 213, 19)', key: 'waitBargainCount' },
          { title: '填写资料', color: '#666666', key: 'writingInfoCount' },
          { title: '审核拒绝', color: '#666666', key: 'checkRefuseCount' },
          { title: '取消放款', color: '#666666', key: 'cancelLoanCount' },
          { title: '还款中', color: '#666666', key: 'repayCount' },
          { title: '还款完成', color: '#666666', key: 'repayCompleteCount' },
          { title: '已逾期', color: 'red', key: 'overdueCount' }
        ],
        columns: [
          { title: '客户', key: 'customerName', align: 'center' },
          { title: '手机号码', key: 'phone', align: 'center' },
          { title: '账单金额', key: 'totalMoney', align: 'center' },
          { title: '状态', key: 'repaymentStatus', align: 'center',
            filters: [
              { label: '未还款', value: 1 },
              { label: '已还款', value: 2 },
              { label: '逾期', value: 3 },
              { label: '还款中', value: 4 }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              return row.repaymentStatus == value
            }
          },
          { title: '本金', key: 'billMoneyCount', align: 'center' },
          { title: '利息', key: 'interestCount', align: 'center' },
          { title: '罚息', key: 'penaltyCount', align: 'center' },
          { title: '手续费', key: 'serviceMoney', align: 'center' }
        ],
        returneds: [],
        total: 0,
        loading: true,
        returnedsPage: 1,
        page: 1,
        accounts: {},
        overdueMap: {},
        waitMap: {},
        totalMoneyMap: {},
        returnedMoneyMap: {},
        echartsDatas: {}
      }
    },
    mounted() {
      this.fetchDashboardMsg()
      this.fetchDashboardList()
      this.fetchDashboardChart()
    },
    methods: {
      handleChange(val) {
        this.page = val
        this.fetchDashboardList()
      },
      fetchDashboardMsg() {
        getDashboardMsg({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
          if (res.state == 1) {
            this.accounts = res.info.data.accountInfoMap
            const nowdataMap = res.info.data.nowdataMap
            for (const i in nowdataMap) {
              for (const o of this.datas) {
                if (i == o.key) {
                  o.number = nowdataMap[i]
                }
              }
            }
            this.overdueMap = res.info.data.waitAndOverdueMap.overdueMap
            this.waitMap = res.info.data.waitAndOverdueMap.waitMap
            this.totalMoneyMap = res.info.data.returnedDataMap.totalMoneyMap
            this.returnedMoneyMap = res.info.data.returnedDataMap.returnedMoneyMap
            setTimeout(() => {
              this.loadDrawer = false
            }, 1000)
          }
        })
      },
      fetchDashboardList() {
        const params = {
          companyId: this.$store.getters.userInfo.companyId,
          limit: 20,
          page: this.page
        }
        this.loading = true
        getDashboardList(params).then(res => {
          if (res.state == 1) {
            this.returneds = res.info.data.returnedMoneyList
            this.total = res.info.data.count
            setTimeout(() => {
              this.loading = false
            }, 1500)
          }
        })
      },
      fetchDashboardChart() {
        getDashboardChart({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
          if (res.state == 1) {
            this.echartsDatas = res.info.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .d1 {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    height: 350px;
    > div {
      flex: 1;
      margin: 0 12px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      &:hover {
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        border-color: rgba(0,0,0,.2);
      }
      .content {
        height: 302px;
      }
    } 
  }
  .d2 {
    display: flex;
    justify-content: center;
    height: 500px;
    > div {
      width: 50%;
      margin: 0 12px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      &:hover {
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        border-color: rgba(0,0,0,.2);
      }
      .content {
        height: 452px;
      }
    }
  }
  .title {
    line-height: 48px;
    padding: 0 24px;
    border-bottom: 1px solid #e9e9e9;
    color: rgba(0,0,0,.85);
  }
  .content {
    padding: 24px;
    text-align: center;
    color: #333;
    &.account {
      overflow: hidden;
      > div {
        width: 50%;
        float: left;
        padding: 38px 0;
        &:nth-of-type(1), &:nth-of-type(2) {
          border-bottom: 1px solid #eeeeee;
        }
        &:nth-of-type(2n) {
          border-left: 1px solid #eeeeee;
        }
        .p1 {
          font-size: 12px;
          line-height: 20px;
        }
        .p2 {
          font-size: 26px;
          line-height: 30px;
          font-weight: bold;
          color: #000;
        }
      }
    }
    &.data {
      ul {
        overflow: hidden;
        li {
        width: 33.3333%;
        float: left;
        padding: 20px 0;
        cursor: pointer;
          .p1 {
            font-size: 12px;
            
            line-height: 20px;
            span {
              width: 10px;
              height: 10px;
              display: inline-block;
              border-radius: 50%;
              background-color: red;
              margin-right: 10px;
            }
          }
          .p2 {
            font-size: 16px;
            font-weight: bold;
            color: #000;
            line-height: 30px;
            &:hover {
              color: #2db7f5;
            }
          }
        }
      }
    }
    &.overdue {
      text-align: left;
      > div {
        line-height: 40px;
        overflow: hidden;
        p {
          span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 10px;
            background-color: red;
          }
        }
        .sp {
          width: 50%;
          float: left;
        }
      }
    }
    &.returned {
      text-align: left;
      overflow: hidden;
      > p {
        line-height: 16px;
        padding: 10px 0;
      }
      .table {
        overflow: auto;
        height: 300px;
        position: relative;
      }
    }
  }
</style>
