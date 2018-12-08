<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.userName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.principal" clearable placeholder="负责人" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.state" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="9">还款有逾期</Option>
                <Option :value="16">催收中</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formInline.type" clearable placeholder="逾期时间">
                <Option :value="1">今日逾期</Option>
                <Option :value="2">昨日逾期</Option>
                <Option :value="3">逾期7天</Option>
                <Option :value="4">逾期30天以上</Option>
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
      <Table :loading="loading" :columns="columns" :data="list"></Table>
    </div>
  </div>
</template>

<script>
import { getOverdueList } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        type: 1,
        userName: '',
        principal: '',
        state: 0
      },
      list: [],
      loading: true,
      columns: [
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '客户来源', key: 'customerName', align: 'center' },
        { title: '申请金额', key: 'loanAmount', align: 'center' },
        { title: '当前状态', key: 'orderStatus', align: 'center',
        render: (h, params) => {
          return h('div', params.row.orderStatus == 9? '还款有逾期' : '催收中')
        } },
        { title: '下单时间', key: 'orderTime', align: 'center' },
        { title: '渠道', key: 'channelName', align: 'center' },
        { title: '业务经理', key: 'businessAdmin', align: 'center' },
        { title: '负责人', key: 'userName', align: 'center' },
        { title: '资方名称', key: 'capitalTitle', align: 'center' }
      ]
    }
  },
  mounted() {
    this.fetchOverdueList()
  },
  methods: {
    handleSubmit() {
      this.fetchOverdueList()
    },
    fetchOverdueList() {
      const params = this.formInline
      this.loading = true
      getOverdueList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.overdueList
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