<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" :disabled="isDisabled" style="margin-bottom: 30px;margin-right: 20px;" @click="handleBatch(1)">批量分配  </Button>
    </Row>
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.productName" clearable placeholder="产品名称" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.customerName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.orderStatus" clearable placeholder="当前状态">
                <Option v-for="item in status" :value="item.id" :label="item.text" :key="item.id"></Option>
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
    <Drawer title="申请资料详情" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
       <Spin fix size="large" v-if="loadDrawer"></Spin>
        <div class="detail" v-else>
          <div class="content">
            <p class="info-p">客户信息</p>
            <ul class="info-ul">
              <li>
                <span class="sp1">申请编号</span>
                <span class="sp2">{{items.applyCode}}</span>
              </li>
              <li>
                <span class="sp1">申请状态</span>
                <span class="sp2">{{status.filter(it => it.id == items.orderStatus)[0].text}}</span>
              </li>
              <li>
                <span class="sp1">客户姓名</span>
                <span class="sp2">{{items.customerName}}</span>
              </li>
              <li>
                <span class="sp1">客户电话</span>
                <span class="sp2">{{items.customerPhone}}</span>
              </li>
              <li>
                <span class="sp1">客户身份证号</span>
                <span class="sp2">{{items.customerIdcard}}</span>
              </li>
              <li>
                <span class="sp1">客户地址</span>
                <span class="sp2">{{items.area}}</span>
              </li>
              <li>
                <span class="sp1">婚姻状况</span>
                <span class="sp2">{{items.customerMarriageStatus == 0? '未婚' : '已婚'}}</span>
              </li>
              <li>
                <span class="sp1">紧急联系人姓名</span>
                <span class="sp2">{{items.urgencyPeopleName}}</span>
              </li>
              <li>
                <span class="sp1">紧急联系人关系</span>
                <span class="sp2">{{items.urgencyPeopleType == 1? '亲戚' : items.urgencyPeopleType == 2? '配偶' : items.urgencyPeopleType == 3? '子女' : '朋友' }}</span>
              </li>
              <li>
                <span class="sp1">紧急联系人电话</span>
                <span class="sp2">{{items.urgencyPeoplePhone}}</span>
              </li>
              <li>
                <span class="sp1">客户公司名称</span>
                <span class="sp2">{{items.customerCompanyName}}</span>
              </li>
              <li>
                <span class="sp1">客户公司电话</span>
                <span class="sp2">{{items.customerCompanyPhone}}</span>
              </li>
              <li>
                <span class="sp1">客户公司地址</span>
                <span class="sp2">{{items.customerCompanyAddress}}</span>
              </li>
              <li>
                <span class="sp1">职位</span>
                <span class="sp2">{{items.customerPosition == 1? '企业主' : items.customerPosition == 2? '高级管理' : items.customerPosition == 3? '管理' : items.customerPosition == 4? '普通职员' : ''}}</span>
              </li>
              <li>
                <span class="sp1">收入(元)</span>
                <span class="sp2">{{items.customerEarning == 1? '2000-4000' : items.customerEarning == 2? '4000-6000' : items.customerEarning == 3? '5000-8000' : items.customerEarning == 4? '8000-15000' : items.customerEarning == 5 ?'15000及以上' : '' }}</span>
              </li>
            </ul>
          </div>
          <div class="content">
            <p class="info-p">身份证照片、人脸识别</p>
            <p v-if="sfzImgs.length == 0" class="line-msg">暂无上传</p>
            <div v-else class="sfz-img">
              <span v-for="item in sfzImgs">
                <img :src="item" alt="身份证">
                <div class="mask">
                  <Icon class="icon" type="ios-eye-outline" size="30" @click.native="handleView(item)"></Icon>
                </div>
              </span>
            </div>
          </div>
          <div class="content" v-if="items.orderStatus != 1" >
            <p class="info-p">申请信息</p>
            <ul class="info-ul">
              <li>
                <span class="sp1">贷款金额(元)</span>
                <span class="sp2">{{items.loanAmount}}</span>
              </li>
              <li>
                <span class="sp1">还款方式</span>
                <span class="sp2">{{transitionRepayments(items.productRepaymentType)}}</span>
              </li>
              <li>
                <span class="sp1">分期期数</span>
                <span class="sp2">{{items.byStagesNum}}</span>
              </li>
              <li>
                <span class="sp1">贷款用途</span>
                <span class="sp2">{{items.loanUseFor}}</span>
              </li>
              <li>
                <span class="sp1">负责人</span>
                <span class="sp2">{{items.userIdString}}</span>
              </li>
            </ul>
          </div>
          <div class="content">
            <p class="info-p">认证信息</p>
            <ul class="info-ul">
              <li>
                <span class="sp1">实名认证</span>
                <span class="sp2" :class="{'red': !authentications.includes(9)}">{{authentications.includes(9)? '已认证' : '未认证'}}</span>
              </li>
              <li>
                <span class="sp1">人脸识别</span>
                <span class="sp2" :class="{'red': !authentications.includes(18)}">{{authentications.includes(18)? '已认证' : '未认证'}}</span>
              </li>
              <li>
                <span class="sp1">银行卡认证</span>
                <span class="sp2" :class="{'red': !authentications.includes(10)}">{{authentications.includes(10)? '已认证' : '未认证'}}</span>
              </li>
              <li>
                <span class="sp1">运营商</span>
                <span class="sp2" :class="{'red': !authentications.includes(12)}">{{authentications.includes(12)? '已认证' : '未认证'}}</span>
              </li>
              <li>
                <span class="sp1">京东</span>
                <span class="sp2" :class="{'red': !authentications.includes(13)}">{{authentications.includes(13)? '已认证' : '未认证'}}</span>
              </li>
              <li>
                <span class="sp1">淘宝</span>
                <span class="sp2" :class="{'red': !authentications.includes(14)}">{{authentications.includes(14)? '已认证' : '未认证'}}</span>
              </li>
              <li>
                <span class="sp1">支付宝</span>
                <span class="sp2" :class="{'red': !authentications.includes(16)}">{{authentications.includes(16)? '已认证' : '未认证'}}</span>
              </li>
            </ul>
          </div>
        </div>
      <div class="footer">
        <Button v-if="items.orderStatus == 1" size="default" type="success" class="btn" @click="handleUpdate">提交审核</Button>
        <!-- <Button v-if="items.orderStatus == 1" size="default" type="error" class="btn" @click="handleUpdate(7)">放弃申请</Button> -->
        <Button size="default" type="primary" class="btn" @click="handleBatch(0)">编辑负责人</Button>
      </div>
    </Drawer>
    <Modal title="预览图片" v-model="visible">
      <img :src="imgUrl" style="width: 100%" alt="预览">
    </Modal>
  </div>
</template>

<script>
import { getApplyList, getApplyPrincipal, saveApplyPrincipal, getApplyMsg, updateOrderStatus } from '@/utils/api'
import { repayments, thirdPartyVerification, producOrderAllStatus } from '@/utils'
export default {
  data() {
    return {
      formInline: {
        productName: '',
        customerName: '',
        channelName: '',
        orderStatus: 0
      },
      list: [],
      loading: true,
      page: 1,
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '姓名', key: 'customerName', align: 'center' },
        { title: '申请金额', key: 'loanAmount', align: 'center' },
        { title: '分期期数', key: 'byStagesNum', align: 'center' },
        { title: '渠道', key: 'channelName', align: 'center' },
        { title: '申请时间', key: 'createTime', align: 'center' },
        { title: '申请次数', key: 'applyCount', align: 'center' },
        { title: '终端来源', key: 'source', align: 'center' },
        { title: '申请状态', key: 'orderStatus', align: 'center',
        render: (h, params) => {
          return h('div', this.status.filter(it => it.id == params.row.orderStatus)[0].text)
        } },
        { title: '负责人', key: 'userName', align: 'center' }
      ],
      drawerShow: false,
      selection: [],
      value: '',
      batchs: [],
      total: 0,
      options: [],
      status: producOrderAllStatus(),
      id: '',
      loadDrawer: true,
      items: {},
      sfzImgs: [],
      imgUrl: '',
      visible: false,
      authentications: []
    }
  },
  mounted() {
    this.fetchApplyList()
    this.fetchApplyPrincipal()
  },
  computed: {
    isDisabled() {
      if (this.selection.length > 0) return false
      return true
    }
  },
  methods: {
    handleView(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleSelectChange(selection) {
      this.selection = selection
    },
    handleUpdate() {
      updateOrderStatus({ customerId: this.id, status: 2 }).then(res => {
        if (res.state == 1) {
          this.$Message.success('更改成功')
          this.fetchApplyList()
          this.fetchApplyMsg()
        }
      })
    },
    handleBatch(type) {
      this.$Modal.confirm({
        render: (h) => {
          return h('Select', {
            props: {
              value: this.batchs,
              autofocus: true,
              size: 'default',
              placeholder: '更换负责人',
              clearable: true,
              multiple: true
            },
            on: {
              input: (val) => {
                this.batchs = val
              }
            }
          }, this.options.map(item => {
            return h('Option', {
              props: {
                value: item.userId,
                label: item.userName,
                key: item.userId
              }
            })
          }))
        },
        onOk: () => {
          // console.log(this.value)
          this.editApplyPrincipal(type)
        }
      })
    },
    handleClick(row) {
      this.id = row.customerId
      this.drawerShow = true
      this.fetchApplyMsg()
    },
    handleSubmit() {
      this.fetchApplyList()
    },
    handleChange(val) {
      this.page = val
      this.fetchApplyList()
    },
    transitionRepayments(val) {
      const arr = repayments()
      let str = ''
      for (const o of arr) {
        if (val == o.value) {
          str = o.label
        }
      }
      return str
    },
    fetchApplyMsg() {
      this.loadDrawer = true
      this.sfzImgs.splice(0, this.sfzImgs.length)
      this.authentications.splice(0, this.authentications.length)
      getApplyMsg({ customerId: this.id }).then(res => {
        if (res.state == 1) {
          this.items = res.info.data.appleyDetail
          if (this.items.idCardPhotoPositiveNegative != '' && this.items.idCardPhotoPositiveNegative != null) {
            this.sfzImgs.push(this.items.idCardPhotoPositive)
          }
          if (this.items.idCardPhotoPositiveNegative != '' && this.items.idCardPhotoPositiveNegative != null) {
            this.sfzImgs.push(this.items.idCardPhotoPositiveNegative)
          }
          if (res.info.data.userAttestation && res.info.data.userAttestation.length > 0) {
            for (const o of res.info.data.userAttestation) {
              this.authentications.push(o.creditItemId)
            }
          }
          // console.log(this.authentications)
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    editApplyPrincipal(type) {
      const ids = []
      if (type == 0) {
        ids.push(this.id)
      } else if (type == 1) {
        for (const o of this.selection) {
          ids.push(o.customerId)
        }
      }
      const params = {
        customerIdString: ids.join(','),
        userIdString: this.batchs.join(',')
      }
      saveApplyPrincipal(params).then(res => {
        if (res.state == 1) {
          this.batchs.splice(0, this.batchs.length)
          this.fetchApplyList()
          if (type == 0) {
            this.fetchApplyMsg()
          }
        }
      })
    },
    fetchApplyPrincipal() {
      getApplyPrincipal({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.options = res.info.data
        }
      })
    },
    fetchApplyList() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.page = this.page
      params.limit = 20
      // params.orderStatus = this.formInline.orderStatus == 0? '' : this.formInline.orderStatus
      this.loading = true
      getApplyList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.data.applyList
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
  .controls {
    background-color: #F5F8FB;
    border-top: 1px solid #E1E7EB;
    border-left: 1px solid #E1E7EB;
    span {
      display: inline-block;
      width: 25%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-right: 1px solid #E1E7EB;
      border-bottom: 1px solid #E1E7EB;
    }
  }
  .sfz-img {
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      width: 150px;
      height: 150px;
      margin: 0 4px 4px 0;
      border: 1px solid #E1E7EB;
      position: relative;
      > img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        .mask {
          display: flex;
        }
      }
      .mask {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.6);
        color: #FFF;
        display: none;
        justify-content: center;
        align-items: center;
        .icon {
          cursor: pointer;
        }
      }
    }
  }
</style>
