<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增产品  </Button>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="新增产品" v-model="drawerShow" width="80" class="drawer" :mask-closable="false">
      <template v-if="step == 1">
        <div class="detail">
          <div class="form">
            <Divider>第一步</Divider>
            <p class="title"><Tag color="warning">设置产品基本属性</Tag></p>
            <newProductOne :form="formProduct" :services="procedureJson" :interests="repayCycleJson" :images="productImages"/>
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
import { addOrUpdateProductMsg, getProductList, updateProductStatus, saveProductCreditItem } from '@/utils/api'
export default {
  components: { newProductOne, newProductTwo },
  data() {
    return {
      step: 1,
      list: [],
      page: 1,
      loading: true,
      columns: [
        { title: '产品编号', key: 'productId', align: 'center' },
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '状态', key: 'productStatus', align: 'center',
        render: (h, params) => {
          const forbidden = h('div', {
            style: {
              color: 'red'
            }
          }, '禁用')
          return params.row.productStatus == 0? forbidden : h('div', '开启')
        } },
        { title: '渠道数', key: 'cont', align: 'center' },
        { title: '最后更新人', key: 'userName', align: 'center' },
        { title: '创建时间', key: 'createTime', align: 'center' },
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
                  this.fetchProductStatus(params.row.productId, 1)
                }
              }
            }, '启用') // 禁用状态 启用按钮
            const start = h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: 'red'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                  this.fetchProductStatus(params.row.productId, 0)
                }
              }
            }, '禁用') // 启用状态 禁用按钮
            return params.row.productStatus == 0? forbidden : start
          }
        }
      ],
      drawerShow: false,
      formProduct: {
        productName: '',
        description: '',
        productType: 1,
        procedureStatus: 0,
        procedureMax: 1,
        procedurePayType: 1,
        aheadReypayStatus: 0,
        aheadReypayInterestType: '',
        aheadReypayInterestDayRate: 0,
        aheadReypayDeditStatus: false,
        aheadReypayDeditRatio: '',
        defaultDayStatus: false,
        defaultDayType: '',
        defaultDayRate: 0,
        defaultMonthStatus: false,
        defaultMonthType: '',
        defaultMonthRate: 0,
        defaultMax: 0,
        payFor: '',
        payMoneyMax: 0,
        auditLevel: '',
        applyAllowDebtStatus: 0,
        applyAddNum: 1,
        applyLeastPeopleNum: 1,
        rateTxt: '',
        rateShowStatus: 0,
        againBigdataDays: 1
      },
      repayCycleJson: [{
        repaymentId: '',
        repaymentType: '',
        repaymentDays: 0,
        interestType: 1,
        dayInterest: 0,
        supportCycle: [],
        cycleDays: 0,
        repayDayEvryMonth: 0,
        repayLastCycleDay: '',
        yearChangeRate: '',
        repayCycle: [{
          cycleRateId: '',
          cycleNum: 0,
          cycleRateNormal: 0,
          cycleRateLeast: 0
        }]
      }],
      procedureJson: [],
      productImages: [],
      listProduct: [],
      total: 0,
      id: ''
    }
  },
  mounted() {
    this.fetchProductList()
  },
  methods: {
    updateList(data) {
      this.listProduct.splice(0, this.listProduct.length)
      for (const o of data) {
        this.listProduct.push(o.id)
      }
    },
    handleClick(row) {
      this.$router.push({ 
        path: '/setting/productDetail',
        query: { id: row.productId }
      })
    },
    handleDone() {
      const params = {
        productId: this.id,
        creditItemType: this.listProduct.join(',')
      }
      saveProductCreditItem(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.drawerShow = false
          this.fetchProductList()
        }
      })
    },
    handleNext() {
      const params = this.formProduct
      params.productId = ''
      params.userId = this.$store.getters.userInfo.userId
      params.companyId = this.$store.getters.userInfo.companyId
      params.procedureJson = this.procedureJson.length > 0? JSON.stringify(this.procedureJson) : ''
      const repayCycleJson = this.repayCycleJson
      for (let i = 0; i < repayCycleJson.length; i++) {
        if (repayCycleJson[i].supportCycle && repayCycleJson[i].supportCycle.length > 0) {
          repayCycleJson[i].supportCycle = repayCycleJson[i].supportCycle.join(',')
        } else {
          repayCycleJson[i].supportCycle = ''
        }
      }
      params.repayTypeJson = encodeURI(JSON.stringify(repayCycleJson)) || ''
      params.pictureUrl = JSON.stringify(this.productImages)
      for (const i in this.formProduct) {
        if (typeof this.formProduct[i] == 'boolean') {
          params[i] = this.formProduct[i] == true? 1 : 0
        }
      }
      addOrUpdateProductMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.step = 2
          this.id = res.info.data.productId
          this.fetchProductList()
          this.formProduct = {
            productName: '',
            description: '',
            productType: 1,
            procedureStatus: 0,
            procedureMax: 1,
            aheadReypayStatus: 0,
            aheadReypayInterestType: '',
            aheadReypayInterestDayRate: 0,
            aheadReypayDeditStatus: false,
            aheadReypayDeditRatio: '',
            defaultDayStatus: false,
            defaultDayType: '',
            defaultDayRate: 0,
            defaultMonthStatus: false,
            defaultMonthType: '',
            defaultMonthRate: 0,
            defaultMax: 0,
            payFor: '',
            payMoneyMax: 0,
            auditLevel: '',
            applyAllowDebtStatus: 0,
            applyAddNum: 1,
            applyLeastPeopleNum: 1,
            rateTxt: '',
            rateShowStatus: 0,
            againBigdataDays: 1
          }
          this.productImages = []
          this.procedureJson = []
          this.repayCycleJson = {
            repaymentId: '',
            repaymentType: '',
            repaymentDays: 0,
            interestType: 1,
            dayInterest: 0,
            supportCycle: [],
            cycleDays: 0,
            repayDayEvryMonth: 0,
            repayLastCycleDay: '',
            yearChangeRate: '',
            repayCycle: [{
              cycleRateId: '',
              cycleNum: 0,
              cycleRateNormal: 0,
              cycleRateLeast: 0
            }]
          }
        }
      })
    },
    handleAdd() {
      this.step = 1
      this.drawerShow = true
    },
    handleChange(val) {
      this.page = val
      this.fetchProductList()
    },
    fetchProductStatus(id, val) {
      updateProductStatus({ productId: id, productStatus: val }).then(res => {
        if (res.state == 1) {
          this.$Message.success('更改成功')
          this.fetchProductList()
        }
      })
    },
    fetchProductList() {
      this.loading = true
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        limit: 20,
        page: this.page
      }
      getProductList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.data.productList
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