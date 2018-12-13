<template>
  <div> 
    <Row style="position: relative;">
      <Button class="pageBack" type="info" size="large" icon="md-arrow-back" @click="() => $router.go(-1)">返回</Button>
      <p class="p">渠道详情</p>
      <!-- <div class="btn-box">
        <Button type="primary" size="large" @click="handleStart">启动</Button>
        <Button type="primary" size="large" @click="handleForbidden">禁用</Button>
      </div> -->
    </Row>
    <Divider />
    <Collapse v-model="collapse" accordion>
      <Panel name="1">渠道基本信息
        <div slot="content">
          <newChannel :form="formChannel" :admins="channelAdminList" :products="channelProduct" :contacts="channelContacts" />
          <p style="text-align: center;margin: 20px 0;"><Button type="primary" size="default" icon="md-checkbox-outline" @click="handleSubmitA">保存</Button></p>
        </div>
      </Panel>
      <Panel name="2">业务二维码
        <div slot="content">
          <div class="channel-box">
            <div class="d3">
              <div class="qr-image"><img :src="formChannel.qrCode" alt="qrCode"></div>
              <p>【{{formChannel.channelNameShort}}】</p>
              <p>扫描申请贷款</p>
            </div>
            <div class="d4">
              <div style="margin-top: 100px;margin-bottom: 20px;">
                <Button type="success" size="default" @click="handleDown" icon="ios-cloud-upload-outline">下载二维码</Button>
              </div>
              <p>1.下载后修改文件后缀名为：.jpg</p>
              <p>2.请将此二维码发送至【{{formChannel.channelNameShort}}】,作为贷款业务申请入口</p>
              <p>3.客户扫描此二维码时,会被标记为【{{formChannel.channelNameShort}}】的客户</p>
            </div>
          </div>
        </div>
      </Panel>
      <Panel name="3">客户端渠道简称
        <div slot="content">
          <div class="channel-box">
            <div class="d1">{{formChannel.channelNameShort}}</div>
            <div class="d2">
              <p>1.让客户在手机App内的借款页面输入该渠道简称进行搜索</p>
              <p>2.搜索后点击相应的贷款产品即可申请</p>
            </div>
          </div>
        </div>
      </Panel>
      <Panel name="4">放款限额
        <div slot="content">
          <div class="check-box">
            <Checkbox v-model="form.depositMoneyStatus" >保证金（未还款本金最大值）
              <span style="margin-left: 50px;"><InputNumber :min="0" :disabled="form.depositMoneyStatus == false" v-model="form.depositMoney"></InputNumber>元</span>
            </Checkbox>
          </div>
          <div class="check-box">
            <Checkbox v-model="form.notRepayWarnMoneyStatus">未还款本金提醒金额</Checkbox>
            <span style="margin-left: 50px;"><InputNumber :min="0" :disabled="form.notRepayWarnMoneyStatus == false" v-model="form.notRepayWarnMoney"></InputNumber>元</span>
          </div>
          <div class="check-box">
            <Checkbox v-model="form.dayOrderNumStatus">每日放款订单数</Checkbox>
            <span style="margin-left: 50px;"><InputNumber :min="0" :disabled="form.dayOrderNumStatus == false" v-model="form.dayOrderNum"></InputNumber>单</span>
          </div>
          <p style="text-align: center;margin: 20px 0;"><Button type="primary" size="default" icon="md-checkbox-outline" @click="handleSubmitB">保存</Button></p>
        </div>
      </Panel>
      <Panel name="5">推广链接
        <div slot="content">
          <p>{{formChannel.channelUrl}}</p>
        </div>
      </Panel>
      <Panel name="6">合作产品
        <div slot="content">
         <Table :columns="columns1" :data="list1"></Table>
        </div>
      </Panel>
      <Panel name="7">修改记录
        <div slot="content">
          <Table :columns="columns2" :data="list2"></Table>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import newChannel from '@/components/newChannel.vue'
import { getChannelLisgOrMsg, addOrUpdateChannelMsg, updateChannelMaxLoan } from '@/utils/api'
export default {
  components: { newChannel },
  data() {
    return {
      formChannel: {
        channelId: '',
        channelName: '',
        channelNameShort: '',
        channelCompanyName: '',
        channelBusinessType: '',
        qrCode: '',
        channelUrl: ''
      },
      channelAdminList: [],
      channelProduct: [],
      channelContacts: [],
      collapse: '1',
      list1: [],
      list2: [],
      columns1: [
        { title: '产品编号', key: 'channelProductId', align: 'center' },
        { title: '状态', key: 'productStatus', align: 'center',
        render: (h, params) => {
          const forbidden = h('div', {
            style: {
              color: 'red'
            }
          }, '已禁用')
          return params.row.productStatus == 0? forbidden : h('div', '已启用')
        } },
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '推广地址', key: 'generalizeUrl', align: 'center' }
      ],
      columns2: [
        { title: '用户编号', key: 'channelLogId', align: 'center' },
        { title: '用户名', key: 'userName', align: 'center' },
        { title: '修改项', key: 'editItem', align: 'center' },
        { title: '修改详情', key: 'editContent', align: 'center' },
        { title: '修改时间', key: 'createTime', align: 'center' }
      ],
      single: false,
      form: {
        depositMoneyStatus: false,
        notRepayWarnMoneyStatus: false,
        dayOrderNumStatus: false,
        depositMoney: null,
        notRepayWarnMoney: null,
        dayOrderNum: null
      }
    }
  },
  beforeMount() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.fetchChannelLisgOrMsg()
  },
  methods: {
    handleSubmitA() {
      const params = this.formChannel
      const products = []
      for (const o of this.channelProduct) {
        products.push(o.channelProductId)
      }
      const admins = []
      for (const o of this.channelAdminList) {
        admins.push(o.userId)
      }
      params.channelAdminList = admins.join(',') || ''
      params.channelProduct = products.join(',') || ''
      params.channelLinkman = JSON.stringify(this.channelContacts) || ''
      params.companyId = this.$store.getters.userInfo.companyId
      params.userName = this.$store.getters.userInfo.userName
      addOrUpdateChannelMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchChannelLisgOrMsg()
        }
      })
    },
    handleSubmitB() {
      const params = this.form
      params.channelId = this.id
      params.depositMoneyStatus = this.form.depositMoneyStatus? 1 : 0
      params.notRepayWarnMoneyStatus = this.form.notRepayWarnMoneyStatus? 1 : 0
      params.dayOrderNumStatus = this.form.dayOrderNumStatus? 1 : 0
      updateChannelMaxLoan(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchChannelLisgOrMsg()
        }
      })
    },
    handleDown() {
      window.open(this.formChannel.qrCode)
    },
    fetchChannelLisgOrMsg() {
      const params = {
        channelId: this.id,
        companyId: this.$store.getters.userInfo.companyId,
        limit: 0,
        page: 0
      }
      getChannelLisgOrMsg(params).then(res => {
        if (res.state == 1) {
          this.list1 = res.info.channelProductList
          this.list2 = res.info.channelEditLogList
          for (const i in this.formChannel) {
            this.formChannel[i] = res.info.channelDetails[i]
          }
          for (const o of res.info.channelAdminList) {
            this.channelAdminList.push({
              userId: o.userId
            })
          }
          for (const o of this.list1) {
            this.channelProduct.push({ channelProductId: o.channelProductId })
          }
          this.channelContacts = res.info.channelLinkmanList
          this.form.depositMoney = res.info.channelDetails.depositMoney
          this.form.notRepayWarnMoney = res.info.channelDetails.notRepayWarnMoney
          this.form.dayOrderNum = res.info.channelDetails.dayOrderNum
          this.form.depositMoneyStatus = res.info.channelDetails.depositMoneyStatus == 1? true :false
          this.form.notRepayWarnMoneyStatus = res.info.channelDetails.notRepayWarnMoneyStatus == 1? true :false
          this.form.dayOrderNumStatus = res.info.channelDetails.dayOrderNumStatus == 1? true :false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .p {
    font-size: 30px;
    color: #4A90E2;
    margin: 10px 0;
  }
  .btn-box {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -18px;
  }
  .channel-box {
    display: flex;
    .d1 {
      width: 30%;
      text-align: center;
      line-height: 80px;
      height: 80px;
      font-size: 18px;
      font-weight: bold;
    }
    .d2 {
      flex: 1;
      line-height: 40px;
      font-size: 16px;
    }
    .d3 {
      width: 400px;
      .qr-image {
        padding: 10px;
        height: 400px;
        border: 1px solid #d6dde1;
        img {
          width: 380px;
          height: 380px;
        }
      }
      p {
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
    }
    .d4 {
      flex: 1;
      padding-left: 50px;
      p {
        line-height: 50px;
        font-size: 16px;
      }
    }
  }
</style>
