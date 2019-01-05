<template>
  <div class="wrapper">
      <Row>
        <p class="p1">统计</p>
        <p class="p2">所有渠道用户全部申请数据</p>
        <p class="p1">网页刷新一次或者进入一次，将会出最新点数据。另外点击该渠道进入渠道详情时，显示每天该渠道的数据。</p>
      </Row>
      <Divider />
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="渠道" />
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
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
      <!-- <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" /> -->
    </div>
  </div>
</template>

<script>
import { getOperartionList } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        channelName: ''
      },
      list: [],
      loading: true,
      page: 1,
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
  mounted() {
    this.fetchOperartionList()
  },
  methods: {
    handleSubmit() {
      this.fetchOperartionList()
    },
    handleChange(val) {
      this.page = val
    },
    handleClick(row) {
      this.$router.push({
        path: '/operartion/detail',
        query: { id: row.channelId }
      })
    },
    fetchOperartionList() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.userId = this.$store.getters.userInfo.userId
      this.loading = true
      getOperartionList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.data
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