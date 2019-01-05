<template>
  <div class="wrapper">
    <Row>
      <Button class="pageBack" type="info" size="large" icon="md-arrow-back" @click="() => $router.go(-1)">返回</Button>
      <p class="p1">统计</p>
      <p class="p2">单个渠道用户全部申请数据</p>
      <p class="p1">网页刷新一次或者进入一次，将会出最新点数据。另外点击该渠道进入渠道详情时，显示每天该渠道的数据。</p>
    </Row>
    <Divider />
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
  </div>
</template>

<script>
import { getOperartionMsg } from '@/utils/api'
export default {
  data() {
    return {
      list: [],
      loading: true,
      page: 1,
      total: 0,
      columns: [
        { title: '渠道名称', key: 'channelName', align: 'center' },
        { title: '日期', key: 'apDate', align: 'center' },
        { title: '注册用户数', key: 'registerNum', align: 'center' },
        { title: '申请数', key: 'applyNum', align: 'center' },
        { title: '提交审核数', key: 'applyCommitNum', align: 'center' },
        { title: '审核通过数', key: 'checkPassNum', align: 'center' },
        { title: '放款数', key: 'loanNum', align: 'center' },
        { title: '放款订单金额', key: 'loanMoney', align: 'center' }
      ]
    }
  },
  beforeMount() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.fetchOperartionMsg()
  },
  methods: {
    handleChange(val) {
      // console.log(val)
      this.page = val
      this.fetchOperartionMsg()
    },
    fetchOperartionMsg() {
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        channelId: this.id,
        limit: 20,
        page: this.page
      }
      this.loading = true
      getOperartionMsg(params).then(res => {
        this.list = res.info.data.statisticsDataList
        this.total = res.info.data.count
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .p1 {
    margin: 10px 0;
    color: #000;
  }
  .p2 {
    font-size: 30px;
    color: #000;
  }
  .drawer {
    .conversion {
      margin-top: 30px;
      padding: 20px 40px;
      background-color: #fff;
    }
  }
</style>