<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.userName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.userStatus" clearable placeholder="贷款状态">
                <Option :value="0">全部</Option>
                <Option :value="1">无贷款</Option>
                <Option :value="2">审核中</Option>
                <Option :value="3">还款中</Option>
                <Option :value="9">逾期</Option>
                <Option :value="15">拉黑</Option>
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
        <p class="title"><Tag color="warning">客户信息</Tag></p>
        <div class="content">
          <p class="info-p">基础信息</p>
          <ul class="info-ul">
            <li style="width: 100%">
              <span class="sp1">客户姓名</span>
              <span class="sp2">{{userOption.customerName}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">手机号码</span>
              <span class="sp2">{{userOption.userAppPhone}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">客户身份证号</span>
              <span class="sp2">{{userOption.userIdcard}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">客户贷款状态</span>
              <span class="sp2">{{parseUserStatus(userOption.userStatus)}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">身份证是否认证</span>
              <span class="sp2">{{idCardCertification == 1? '已认证' : '未认证'}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">银行卡是否认证</span>
              <span class="sp2">{{bankCardFication == 1? '已认证' : '未认证'}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">客户地址</span>
              <span class="sp2">{{userOption.address}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">婚姻状态</span>
              <span class="sp2">{{userOption.customerMarriageStatus}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">公司名称</span>
              <span class="sp2">{{userOption.customerCompanyName}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">公司地址</span>
              <span class="sp2">{{userOption.customerCompanyAddress}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">公司电话</span>
              <span class="sp2">{{userOption.customerCompanyPhone}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">职务</span>
              <span class="sp2">{{userOption.customerPosition}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">收入</span>
              <span class="sp2">{{userOption.customerEarning}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">紧急联系人姓名</span>
              <span class="sp2">{{userOption.urgencyPeopleName}}</span>
            </li>
            <li style="width: 100%">
              <span class="sp1">紧急联系人手机号</span>
              <span class="sp2">{{userOption.urgencyPeoplephone}}</span>
            </li>
          </ul>
          <!-- <p class="info-p">审核信息</p>
          <p class="line-msg">暂无数据</p> -->
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
        <p class="title"><Tag color="warning">风控信息</Tag></p>
        <tabView :userCustom="userOption" :customInfo="customOption" />
      </div>
      <div class="footer">
        <Button v-if="userStatus == 15" size="default" type="success" class="btn" @click="handleRelieve">解除黑名单</Button>
        <Button v-else size="default" type="error" class="btn" @click="handleBlack">拉入黑名单</Button>
        <Button size="default" type="success" class="btn" @click="handleUpdate">客户备注</Button>
      </div>
    </Drawer>
    <Modal v-model="balckConfirm" title="用户拉黑" @on-ok="handleDelete">
      <p style="padding: 40px 0; font-size: 24px; text-align: center; color: red;">确定将此用户拉黑?</p>
      <div slot="footer">
        <Button type="primary" size="default" long @click="handleDelete">确定</Button>
      </div>
    </Modal>
    <Modal title="预览图片" v-model="visible">
      <img :src="imgUrl" style="width: 100%" alt="预览">
    </Modal>
  </div>
</template>

<script>
import tabView from '@/components/tabView16.vue'
import { blackOrNoteCustom, getCustomListOrMsg } from '@/utils/api'
export default {
  components: { tabView },
  data() {
    return {
      formInline: {
        userName: '',
        channelName: '',
        userStatus: 0
      },
      list: [],
      loading: true,
      loadDrawer: true,
      page: 1,
      columns: [
        { title: '姓名', key: 'customerName', align: 'center' },
        { title: '电话号码', key: 'userAppPhone', align: 'center' },
        { title: '身份证号码', key: 'userIdcard', align: 'center' },
        { title: '注册时间', key: 'registerTime', align: 'center' },
        { title: '上次访问时间', key: 'loginTime', align: 'center' },
        { title: '渠道', key: 'channelName', align: 'center' },
        { title: '备注', key: 'userRemark', align: 'center' },
        { title: '贷款状态', key: 'userStatus', align: 'center',
        render: (h, params) => {
          return h('div', this.parseUserStatus(params.row.userStatus))
        } }
      ],
      drawerShow: false,
      id: '',
      userStatus: 0,
      balckConfirm: false,
      value: '',
      total: 0,
      userOption: {},
      idCardCertification: 0,
      bankCardFication: 0,
      customOption: {
        operator: {},
        addressBook: [],
        jingDong: {},
        taoBao: {},
        zhiFuBao: {}
      },
      sfzImgs: [],
      imgUrl: '',
      visible: false
    }
  },
  mounted() {
    this.fetchCustomListOrMsg()
  },
  methods: {
    handleView(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleBlack() {
      this.balckConfirm = true
    },
    handleUpdate() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '输入客户备注',
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
          if (this.value == '') {
            this.$Message.error('请输入备注内容')
            return
          }
          const params = {
            type: 2,
            userAppId: this.id,
            note: this.value,
            i: 0
          }
          blackOrNoteCustom(params).then(res => {
            if (res.state == 1) {
              this.$Message.success('备注成功')
              this.fetchCustomListOrMsg()
              this.fetchCustomMsg()
              this.value = ''
            }
          })
        }
      })
    },
    handleRelieve() {
      const params = {
        type: 1,
        userAppId: this.id,
        note: '',
        i: 2
      }
      blackOrNoteCustom(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('解除成功')
          this.fetchCustomListOrMsg()
          this.fetchCustomMsg()
        }
      })
    },
    handleDelete() {
      const params = {
        type: 1,
        userAppId: this.id,
        note: '',
        i: 1
      }
      blackOrNoteCustom(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('拉黑成功')
          this.balckConfirm = false
          this.fetchCustomListOrMsg()
          this.fetchCustomMsg()
        }
      })
    },
    handleClick(row) {
      this.id = row.userAppId
      this.drawerShow = true
      this.fetchCustomMsg()
    },
    handleSubmit() {
      this.fetchCustomListOrMsg()
    },
    handleChange(val) {
      this.page = val
      this.fetchCustomListOrMsg()
    },
    fetchCustomMsg() {
      this.sfzImgs.splice(0, this.sfzImgs.length)
      const params = {
        userAppId: this.id,
        companyId: this.$store.getters.userInfo.companyId,
        page: 0,
        limit: 0,
        userName: '',
        channelName: '',
        userStatus: ''
      }
      this.loadDrawer = true
      getCustomListOrMsg(params).then(res => {
        if (res.state == 1) {
          this.userStatus = res.info.clientManagementDetails.userStatus
          this.userOption = res.info.clientManagementDetails
          this.userOption.idCardPhotoPositive != '' && this.sfzImgs.push(this.userOption.idCardPhotoPositive)
          this.userOption.idCardPhotoPositiveNegative != '' && this.sfzImgs.push(this.userOption.idCardPhotoPositiveNegative)
          this.bankCardFication = res.info.bankCardFication
          this.idCardCertification = res.info.idCardCertification
          // 人脸识别
          if (res.info.xx != '' && res.info.xx !== null) {
            const imgs = JSON.parse(res.info.xx)
            for (const o of imgs) {
              this.sfzImgs.push(o.img)
            }
          }
          // 运营商
          if (res.info.yys != '' && res.info.yys !== null) {
            const operator = JSON.parse(res.info.yys)
            if (operator.code == 200) {
              this.customOption.operator = operator.data
            }
          } else {
            this.customOption.operator = {}
          }
          // 通讯录
          if (res.info.tx != '' && res.info.tx !== null) {
            const addressBook = JSON.parse(res.info.tx)
            this.customOption.addressBook = addressBook
          } else {
            this.customOption.addressBook = []
          }
          // 京东
          if (res.info.jd != '' && res.info.jd !== null) {
            const jd = JSON.parse(res.info.jd)
            if (jd.code == 200) {
              this.customOption.jingDong = jd.data
            }
          }
          // 淘宝
          if (res.info.tb != '' && res.info.tb !== null) {
            const tb = JSON.parse(res.info.tb)
            if (tb.code == 200) {
              this.customOption.taoBao = tb.data
            }
          } else {
            this.customOption.taoBao = {}
          }
          // 支付宝
          if (res.info.zfb != '' && res.info.zfb !== null) {
            const zfb = JSON.parse(res.info.zfb)
            if (zfb.alipay_user_info_share_response.code == 10000) {
              this.customOption.zhiFuBao = zfb.alipay_user_info_share_response
            }
          } else {
            this.customOption.zhiFuBao = {}
          }
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    fetchCustomListOrMsg() {
      const params = {
        ...this.formInline,
        userAppId: '',
        companyId: this.$store.getters.userInfo.companyId,
        page: this.page,
        limit: 20
      }
      this.loading = true
      getCustomListOrMsg(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.clientManagementList
          this.total = res.info.channelNumber
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    },
    parseUserStatus(n) {
      return n == 1? '无贷款' : n == 2? '审核中' : n == 3? '还款中' : n == 9? '逾期' : n == 15? '拉黑' : null
    }
  }
}
</script>

<style lang="less" scoped>

</style>
