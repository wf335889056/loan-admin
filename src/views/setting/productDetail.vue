<template>
  <div>
    <Row style="position: relative;">
      <p class="p">产品详情</p>
    </Row>
    <Divider />
    <Collapse v-model="collapse" accordion>
      <Panel name="1">产品基本信息
        <div slot="content">
          <div style="width: 80%;margin: 0 auto;">
            <newProductOne :form="formProduct" :services="procedureJson" :interests="repayTypeJson" :images="productImages" />
          </div>
          <p style="text-align: center;margin: 20px 0;"><Button type="primary" size="default" icon="md-checkbox-outline" @click="handleSubmitA">保存</Button></p>
        </div>
      </Panel>
      <Panel name="2">客户风控资料
        <div slot="content">
          <newProductTwo :checkedList="listProduct" @update="updateList" />
          <p style="text-align: center;margin: 20px 0;"><Button type="primary" size="default" icon="md-checkbox-outline" @click="handleSubmitB">保存</Button></p>
        </div>
      </Panel>
      <Panel name="3">合作渠道
        <div slot="content">
          <Table :columns="columns1" :data="list1"></Table>
        </div>
      </Panel>
      <Panel name="4">选择授权合同
        <div slot="content">
          <div v-for="item in contract1Ids" style="width: 80%;margin: 20px auto;">
            <Select v-model="item.bargainId" size="large" placeholder="选择授权合同" style="width: 90%;">
              <Option v-for="it in contract1" :value="it.bargainId" :key="it.bargainId" :label="it.bargainName"></Option>
            </Select>
            <Button type="error" shape="circle" icon="ios-trash-outline" @click.stop.prevent="handleDelete(contract1Ids, index)"></Button>
          </div>
          <p style="text-align: center;margin: 20px 0;">
            <Button type="primary" size="default" icon="md-add-circle" @click="handleAdd">新增</Button>
            <Button type="primary" size="default" icon="md-checkbox-outline" @click="handleSubmitD">保存</Button>
          </p>
        </div>
      </Panel>
      <Panel name="5">选择借款和展期合同
        <div slot="content">
          <div style="width: 80%;margin: 20px auto;">
            借款合同:
            <Select v-model="contract2Id" size="large" placeholder="选择借款合同">
              <Option v-for="item in contract2" :value="item.bargainId" :key="item.bargainId" :label="item.bargainName"></Option>
            </Select>
          </div>
          <div style="width: 80%;margin: 20px auto;">
            展期合同: 
            <Select v-model="contract3Id" size="large" placeholder="选择展期合同">
              <Option v-for="item in contract3" :value="item.bargainId" :key="item.bargainId" :label="item.bargainName"></Option>
            </Select>
          </div>
          <p style="text-align: center;margin: 20px 0;">
            <Button type="primary" size="default" icon="md-checkbox-outline" @click="handleSubmitC">保存</Button>
          </p>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import newProductOne from '@/components/newProduct1.vue'
import newProductTwo from '@/components/newProduct2.vue'
import { addProductBargain, getProductMsg, saveProductCreditItem, addOrUpdateProductMsg, getContractList, addbargainAccredit } from '@/utils/api'
export default {
  components: { newProductOne, newProductTwo },
  data() {
    return {
      collapse: '1',
      listProduct: [],
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
      list1: [],
      columns1: [
        { title: '渠道编号', key: 'channelId', align: 'center' },
        { title: '渠道名称', key: 'channelName', align: 'center' },
        { title: '状态', key: 'channelStatus', align: 'center',
        render: (h, params) => {
          return h('div', params.row.channelStatus == 1? '开启' : '禁用')
        } },
        { title: '业务类型', key: 'channelBusinessType', align: 'center' }
      ],
      repayTypeJson: [],
      procedureJson: [],
      productImages: [],
      contract1: [],
      contract2: [],
      contract3: [],
      contract1Ids: [],
      contract2Id: '',
      contract3Id: ''
    }
  },
  beforeMount() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.fetchProductMsg()
    this.fetchContractList()
  },
  methods: {
    updateList(data) {
      this.listProduct = data
    },
    handleDelete(list, index) {
      list.splice(index, 1)
    },
    handleAdd() {
      this.contract1Ids.push({
        bargainId: ''
      })
    },
    handleSubmitA() {
      const params = this.formProduct
      params.productId = ''
      params.userId = this.$store.getters.userInfo.userId
      params.companyId = this.$store.getters.userInfo.companyId
      params.procedureJson = this.procedureJson.length > 0? JSON.stringify(this.procedureJson) : ''
      const repayTypeJson = this.repayTypeJson
      for (let i = 0; i < repayTypeJson.length; i++) {
        if (repayTypeJson[i].supportCycle && repayTypeJson[i].supportCycle.length > 0) {
          // console.log(repayTypeJson[i].supportCycle)
          repayTypeJson[i].supportCycle = repayTypeJson[i].supportCycle.join(',')
        } else {
          repayTypeJson[i].supportCycle = ''
        }
      }
      params.repayTypeJson = encodeURI(JSON.stringify(repayTypeJson)) || ''
      params.pictureUrl = this.productImages[0].url || ''
      params.productId = this.id
      console.log(params)
      addOrUpdateProductMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchProductMsg()
        }
      })
    },
    handleSubmitB() {
      const ids = []
      for (const o of this.listProduct) {
        ids.push(o.id)
      }
      const params = {
        productId: this.id,
        creditItemType: ids.join(',')
      }
      saveProductCreditItem(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchProductMsg()
        }
      })
    },
    handleSubmitC() {
      const params = {
        productId: this.id,
        bargainDeferId: this.contract3Id,
        bargainBorrowId: this.contract2Id
      }
      addProductBargain(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchProductMsg()
        }
      })
    },
    handleSubmitD() {
      const params = {
        productId: this.id,
        bargainIdJson: JSON.stringify(this.contract1Ids)
      }
      addbargainAccredit(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.contract1Ids.splice(0, this.contract1Ids.length)
          this.fetchProductMsg()
        }
      })
    },
    fetchContractList() {
      getContractList({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          const contacts = res.info.data
          // 授权合同
          this.contract1 = contacts.filter(it => it.bargainType == 1)
          // 借款合同
          this.contract2 = contacts.filter(it => it.bargainType == 2)
          // 展期合同
          this.contract3 = contacts.filter(it => it.bargainType == 3)
        }
      })
    },
    fetchProductMsg() {
      getProductMsg({ productId: this.id }).then(res => {
        if (res.state == 1) {
          for (const i in this.formProduct) {
            if (i == 'aheadReypayDeditStatus' || i == 'defaultDayStatus' || i == 'defaultMonthStatus') {
              this.formProduct[i] = res.info.data[i] == 1? true : false
            } else {
              this.formProduct[i] = res.info.data[i]
            }
          }
          this.listProduct = res.info.data.creditItemType && res.info.data.creditItemType != ''? res.info.data.creditItemType.split(',') : []
          this.list1 = res.info.data.channelList != null? res.info.data.channelList : []
          this.contract2Id = res.info.data.bargainBorrowMap != null? res.info.data.bargainBorrowMap.bargainBorrowId : ''
          this.contract3Id = res.info.data.bargainDefMap != null? res.info.data.bargainDefMap.bargainDeferId : ''
          for (const o of res.info.data.bargainAccreditlList) {
            this.contract1Ids.push({
              bargainId: o.bargainId
            })
          }
          this.productImages.push({ url: res.info.data.productImages })
          this.repayTypeJson = res.info.data.repayTypeJson
          this.procedureJson = res.info.data.procedureJson
          for (let i = 0; i < this.repayTypeJson.length; i++) {
            for (const o in this.repayTypeJson[i]) {
              if (o == 'supportCycle' && this.repayTypeJson[i][o]) {
                this.repayTypeJson[i].supportCycle = this.repayTypeJson[i][o].split(',')
              }
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .p {
    font-size: 30px;
    color: #508cee;
    margin: 10px 0;
  }
  .btn-box {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -18px;
  }
</style>
