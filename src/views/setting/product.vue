<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增产品  </Button>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="新增产品" v-model="drawerShow" width="80" class="drawer">
      <template v-if="step == 1">
        <div class="detail">
          <div class="form">
            <Divider>第一步</Divider>
            <p class="title"><Tag color="warning">设置产品基本属性</Tag></p>
            <newProductOne :form="formProduct" :services="procedureJson" :interests="repayTypeJson" :images="productImages"/>
          </div>
        </div>
        <div class="footer">
          <Button size="default" type="primary" class="btn" @click="handleNext">保存并配置下一步</Button>
        </div>
      </template>
      <template v-else>
        <div class="detail">
          <div class="form">
            <Divider>第二步</Divider>
            <p class="title"><Tag color="warning">设置客户风控资料</Tag></p>
            <newProductTwo :checkedList="listProduct" @update="updateList" />
          </div>
        </div>
        <div class="footer">
          <Button size="default" type="primary" class="btn" @click="handleDone">完成</Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script>
import newProductOne from '@/components/newProduct1.vue'
import newProductTwo from '@/components/newProduct2.vue'
import { addOrUpdateProductMsg } from '@/utils/api'
export default {
  components: { newProductOne, newProductTwo },
  data() {
    return {
      step: 1,
      list: [{name: 12313}],
      loading: true,
      page: 1,
      columns: [
        { title: '产品编号', key: 'name', align: 'center' },
        { title: '产品名称', key: 'name', align: 'center' },
        { title: '状态', key: 'name', align: 'center' },
        { title: '渠道数', key: 'name', align: 'center' },
        { title: '最后更新人', key: 'name', align: 'center' },
        { title: '创建时间', key: 'name', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            const forbidden = h('Button', {
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
                }
              }
            }, '禁用')
            const start = h('Button', {
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
                }
              }
            }, '启用')
            return params.status == 1? start : forbidden
          }
        }
      ],
      drawerShow: true,
      formProduct: {
        productName: '',
        description: '',
        productType: 1,
        procedureStatus: 0,
        procedureMax: 1,
        aheadReypayStatus: 0,
        aheadReypayInterestType: '',
        aheadReypayInterestDayRate: '',
        aheadReypayDeditStatus: 0,
        aheadReypayDeditRatio: '',
        defaultDayStatus: 0,
        defaultDayType: '',
        defaultDayRate: '',
        defaultMonthStatus: 0,
        defaultMonthType: '',
        defaultMonthRate: '',
        defaultMax: 0,
        payFor: '',
        payMoneyMax: '',
        auditLevel: '',
        applyAllowDebtStatus: 0,
        applyAddNum: 1,
        applyLeastPeopleNum: 1,
        rateTxt: '',
        rateShowStatus: 0,
        againBigdataDays: 1
      },
      repayTypeJson: [],
      procedureJson: [],
      productImages: [],
      listProduct: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    updateList(data) {
      this.listProduct = data
    },
    handleClick(row) {
      this.$router.push({ path: '/setting/productDetail' })
    },
    handleDone() {
      this.drawerShow = false
    },
    handleNext() {
      const params = this.formProduct
      params.productId = ''
      params.userId = this.$store.getters.userInfo.userId
      params.companyId = this.$store.getters.userInfo.companyId
      this.step = 2
    },
    handleAdd() {
      this.step = 1
      this.drawerShow = true
    },
    handleSubmit() {
    },
    handleChange(val) {
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>