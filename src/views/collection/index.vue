<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.customerName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.collectionUserName" clearable placeholder="催收人员姓名" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.select" clearable placeholder="催收状态">
                <Option :value="0">全部</Option>
                <Option :value="16">催收中</Option>
                <Option :value="19">催收完成</Option>
                <Option :value="20">放弃催收</Option>
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
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="客户详情" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <Spin fix size="large" v-if="loadDrawer"></Spin>
      <div class="detail" v-else>
        <p class="title"><Tag color="warning">基础信息</Tag></p>
        <div class="content">
          <p class="info-p">客户信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">客户名称</span>
              <span class="sp2">{{customeInfo.customerName}}</span>
            </li>
            <li>
              <span class="sp1">客户手机号</span>
              <span class="sp2">{{customeInfo.customerPhone}}</span>
            </li>
            <li>
              <span class="sp1">客户身份证号码</span>
              <span class="sp2">{{customeInfo.userIdcard}}</span>
            </li>
            <li>
              <span class="sp1">客户地址</span>
              <span class="sp2">{{customeInfo.customerCompanyAddress}}</span>
            </li>
            <li>
              <span class="sp1">婚姻状况</span>
              <span class="sp2">{{customeInfo.customerMarriageStatus}}</span>
            </li>
            <li>
              <span class="sp1">产品名称</span>
              <span class="sp2">{{customeInfo.productName}}</span>
            </li>
            <li style="width: 100%;">
              <span class="sp1">客户备注</span>
              <span class="sp2">{{customeInfo.userRemark}}</span>
            </li>
          </ul>
          <p class="info-p">催收信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">催收状态</span>
              <span class="sp2">{{collectionInfo.collectionStatus}}</span>
            </li>
            <li>
              <span class="sp1">催收人员</span>
              <span class="sp2">{{collectionInfo.collectionUserName}}</span>
            </li>
            <li>
              <span class="sp1">委派催收时间</span>
              <span class="sp2">{{collectionInfo.createTime}}</span>
            </li>
            <li>
              <span class="sp1">催收备注</span>
              <span class="sp2">{{collectionInfo.collectionContent}}</span>
            </li>
          </ul>
          <p class="title"><Tag color="warning">账单信息</Tag></p>
          <div class="content">
            <Table :columns="columns1" :data="billList"></Table>
          </div>
          <p class="title"><Tag color="warning">催收记录</Tag></p>
          <div class="content">
            <Table :columns="columns2" :data="collectionRecordList"></Table>
          </div>
        </div>
      </div>
      <div class="footer">
        <Button size="default" type="success" class="btn" @click="handleRemark">客户备注</Button>
        <Button size="default" type="success" class="btn" @click="handleUpdate">添加催收记录</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { getCollectionList, addCollectionRecordMsg, getCollectionMsg, updadateRemarkCollection } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        customerName: '',
        collectionUserName: '',
        collectionStatus: 0
      },
      list: [],
      loading: true,
      loadDrawer: false,
      page: 1,
      total: 0,
      columns: [
        { title: '交易编号', key: 'orderCode', align: 'center' },
        { title: '客户姓名', key: 'customerName', align: 'center' },
        { title: '催收状态', key: 'collectionStatus', align: 'center' },
        { title: '最新催收记录', key: 'collectionContent', align: 'center' },
        { title: '上次访问时间', key: 'loginTime', align: 'center' },
        { title: '委派催收时间', key: 'createTime', align: 'center' },
        { title: '催收人员', key: 'collectionUserName', align: 'center' }
      ],
      columns1: [
        { title: '待还金额', key: 'repaymentMoney', align: 'center' },
        { title: '罚息', key: 'penalty', align: 'center' },
        { title: '还款状态', key: 'repaymentStatus', align: 'center' },
        { title: '期数', key: 'id', align: 'center' },
        { title: '应还款日期', key: 'backMoneyTime', align: 'center' }
      ],
      columns2: [
        { title: '记录内容', key: 'collectionContent', align: 'center' },
        { title: '记录人员', key: 'collectionUserName', align: 'center' },
        { title: '记录时间', key: 'saveTime', align: 'center' }
      ],
      drawerShow: false,
      checkId: null,
      value: '',
      remarkValue: '',
      id: '',
      collectionInfo: {},
      customeInfo: {},
      billList: [],
      collectionRecordList: []
    }
  },
  mounted() {
    this.fetchCollectionList()
  },
  methods: {
    handleClick(row) {
      this.id = row.collectionId
      this.drawerShow = true
      this.fetchCollectionMsg()
    },
    handleSubmit() {
      this.fetchCollectionList()
    },
    handleChange(val) {
      this.page = val
      this.fetchCollectionList()
    },
    handleRemark() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.remarkValue,
              autofocus: true,
              placeholder: '输入客户备注',
              size: 'default',
              type: 'textarea'
            },
            on: {
              input: (val) => {
                this.remarkValue = val
              }
            }
          })
        },
        onOk: () => {
          const params = {
            userRemark: this.remarkValue,
            customerId: this.id
          }
          updadateRemarkCollection(params).then(res => {
            if (res.state == 1) {
              this.remarkValue = ''
              his.fetchCollectionMsg()
            }
          })
        }
      })
    },
    handleUpdate() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '添加催收记录',
              size: 'default',
              type: 'textarea'
            },
            on: {
              input: (val) => {
                this.value = val
              }
            }
          })
        },
        onOk: () => {
          const params = {
            collectionId: this.id,
            collectionContent: this.value,
            userId: this.$store.getters.userInfo.userId
          }
          addCollectionRecordMsg(params).then(res  => {
            if (res.state == 1) {
              this.value = ''
              this.fetchCollectionMsg()
            }
          })
        }
      })
    },
    fetchCollectionMsg() {
      this.loadDrawer = true
      getCollectionMsg({ collectionId: this.id }).then(res => {
        if (res.state == 1) {
          this.customeInfo = res.info.userInfo
          this.collectionInfo = res.info.essentialInformation
          this.billList = res.info.bill
          this.collectionRecordList = res.info.collectionRecord
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    fetchCollectionList() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.limit = 20
      params.page = this.page
      this.loading = true
      getCollectionList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.collectionLogs
          this.total = res.info.count
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
