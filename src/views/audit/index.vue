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
              <Input v-model="formInline.phone" clearable placeholder="客户手机号" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.orderStatus" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="2">审核中</Option>
                <Option :value="13">审核被拒</Option>
                <Option :value="14">审核通过</Option>
              </Select>
            </FormItem>
            </br>
            <FormItem>
              <DatePicker type="date" placeholder="开始时间" 
              v-model="formInline.startTime" @on-change="handleTimeChangeA"></DatePicker>
            </FormItem>
            <FormItem>
              <DatePicker type="date" placeholder="结束时间" 
              v-model="formInline.endTime" @on-change="handleTimeChangeB"></DatePicker>
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
    <Drawer title="借款审核" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <Spin fix size="large" v-if="loadDrawer"></Spin>
      <div class="detail" v-else>
        <p class="title"><Tag color="warning">审核信息</Tag></p>
        <div class="content">
          <ul class="info-ul">
            <li>
              <span class="sp1">申请编号</span>
              <span class="sp2">{{auditInfo.applyCode}}</span>
            </li>
            <li>
              <span class="sp1">审核状态</span>
              <span class="sp2">{{status.filter(it => it.id == auditInfo.checkStatus)[0].text}}</span>
            </li>
            <li>
              <span class="sp1">审核通过时间</span>
              <span class="sp2">{{auditInfo.orderCheckTime}}</span>
            </li>
          </ul>
        </div>
        <p class="title"><Tag color="warning">机审结果</Tag></p>
        <div class="content">
          <ul class="info-ul" v-if="standardResult.length > 0">
            <li v-for="item in standardResult" :key="item.creditAutoCheckMeasureId">
              <span class="sp1">{{item.title}}</span>
              <span class="sp2" :class="{'red': item.creditAutoResult == '不合格'}">{{item.creditAutoResult}}</span>
            </li>
          </ul>
          <p class="line-msg" v-else>符合机审标准, 可放款</p>
        </div>
        <template v-if="auditResult !== null">
          <p class="title"><Tag color="warning">审核结果</Tag></p>
          <div class="content">
            <ul class="info-ul">
              <li>
                <span class="sp1">审核状态</span>
                <span class="sp2">{{allStatus.filter(it => it.id == auditResult.orderStatus)[0].text}}</span>
              </li>
              <li>
                <span class="sp1">操作员</span>
                <span class="sp2">{{auditResult.userName}}</span>
              </li>
              <li>
                <span class="sp1">还款方式</span>
                <span class="sp2">{{setRepaymentType(auditResult.productRepaymentType)}}</span>
              </li>
              <li>
                <span class="sp1">利率/期(%)</span>
                <span class="sp2">{{auditResult.creditRate}}</span>
              </li>
              <li>
                <span class="sp1">手续费(%)</span>
                <span class="sp2">{{auditResult.procedureRate}}</span>
              </li>
              <li>
                <span class="sp1">产品期数</span>
                <span class="sp2">{{auditResult.productCycleNum}}</span>
              </li>
              <li>
                <span class="sp1">授信额度</span>
                <span class="sp2">{{auditResult.creditMoney}}</span>
              </li>
              <li>
                <span class="sp1">合同编号</span>
                <span class="sp2">{{auditResult.bargainId}}</span>
              </li>
              <li>
                <span class="sp1">签署电子合同</span>
                <span class="sp2">{{auditResult.electronicBargainStatus == 0? '关闭' : '开启'}}</span>
              </li>
              <li>
                <span class="sp1">手续费支付方式</span>
                <span class="sp2">{{auditResult.productProcedurePayType == 1? '按期支付' : auditResult.productProcedurePayType == 2? '贷前扣除' : ''}}</span>
              </li>
              <li>
                <span class="sp1">资方</span>
                <span class="sp2">{{auditResult.capitalTitle}}</span>
              </li>
            </ul>
          </div>
        </template>
        <p class="title"><Tag color="warning">基础信息</Tag></p>
        <div class="content">
          <p class="info-p">客户信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">客户姓名</span>
              <span class="sp2">{{customerInfo.customerName}}</span>
            </li>
            <li>
              <span class="sp1">客户手机号</span>
              <span class="sp2">{{customerInfo.customerPhone}}</span>
            </li>
            <li>
              <span class="sp1">客户身份证号码</span>
              <span class="sp2">{{customerInfo.customerIdcard}}</span>
            </li>
            <li>
              <span class="sp1">客户备注</span>
              <span class="sp2">{{customerInfo.customerRemark}}</span>
            </li>
          </ul>
          <p class="info-p">申请信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">申请产品</span>
              <span class="sp2">{{applyDetail.productName}}</span>
            </li>
            <li>
              <span class="sp1">贷款金额</span>
              <span class="sp2">{{applyDetail.loanAmount}}</span>
            </li>
            <li>
              <span class="sp1">手机系统</span>
              <span class="sp2">{{applyDetail.customerPhoneOs}}</span>
            </li>
            <li>
              <span class="sp1">还款方式</span>
              <span class="sp2">{{setRepaymentType(applyDetail.productRepaymentType)}}</span>
            </li>
            <li>
              <span class="sp1">产品利息计算周期</span>
              <span class="sp2">{{applyDetail.productInterestType == 1? '放款后第二天开始计算' : '当天开始计算'}}</span>
            </li>
            <li>
              <span class="sp1">期数和利率</span>
              <span class="sp2">{{applyDetail.cycleNumAndRate}}</span>
            </li>
            <li>
              <span class="sp1">渠道</span>
              <span class="sp2">{{applyDetail.channelName}}</span>
            </li>
            <li>
              <span class="sp1">产品标准期利率</span>
              <span class="sp2">{{applyDetail.productCycleRateNormal}}</span>
            </li>
            <li>
              <span class="sp1">最大手续费</span>
              <span class="sp2">{{applyDetail.productProcedureMax}}</span>
            </li>
            <li>
              <span class="sp1">手续费支付方式</span>
              <span class="sp2">{{applyDetail.productProcedurePayType == 1? '按期支付' : applyDetail.productProcedurePayType == 2? '贷前扣除' : '贷后支付'}}</span>
            </li>
            <li>
              <span class="sp1">业务员</span>
              <span class="sp2">{{applyDetail.businessAdmin}}</span>
            </li>
            <li>
              <span class="sp1">罚息计算方式</span>
              <span class="sp2">{{applyDetail.defaultType}}</span>
            </li>
          </ul>
          <p class="info-p">职业信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">职位</span>
              <span class="sp2">{{jobInfo.customerPosition == 1? '企业主' : jobInfo.customerPosition == 2? '高级管理' : jobInfo.customerPosition == 3? '管理' : jobInfo.customerPosition == 4? '普通职员' : '未知'}}</span>
            </li>
            <li>
              <span class="sp1">工资收入</span>
              <span class="sp2">{{jobInfo.customerEarning == 1? '2000-4000' : jobInfo.customerEarning == 2? '4000-6000' : jobInfo.customerEarning == 3? '5000-8000' : jobInfo.customerEarning == 4? '8000-12000' : jobInfo.customerEarning == 5? '12000及以上' : ''}}</span>
            </li>
            <li>
              <span class="sp1">公司名称</span>
              <span class="sp2">{{jobInfo.customerCompanyName}}</span>
            </li>
            <li>
              <span class="sp1">公司地址</span>
              <span class="sp2">{{jobInfo.customerCompanyAddress}}</span>
            </li>
            <li>
              <span class="sp1">公司电话</span>
              <span class="sp2">{{jobInfo.customerCompanyPhone}}</span>
            </li>
          </ul>
          <p class="info-p">联系人信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">联系人姓名</span>
              <span class="sp2">{{linkman.urgencyPeopleName}}</span>
            </li>
            <li>
              <span class="sp1">联系人电话</span>
              <span class="sp2">{{linkman.urgencyPeoplePhone}}</span>
            </li>
            <li>
              <span class="sp1">紧急联系人关系类型</span>
              <span class="sp2">{{linkman.urgencyPeopleType == 1? '亲戚' : linkman.urgencyPeopleType == 2? '配偶' : linkman.urgencyPeopleType == 3? '子女' : linkman.urgencyPeopleType == 4? '朋友' : ''}}</span>
            </li>
          </ul>
          <p class="info-p">申请表</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">贷款用途</span>
              <span class="sp2">{{applyInfo.loanUseFor}}</span>
            </li>
            <li>
              <span class="sp1">还款方式</span>
              <span class="sp2">{{setRepaymentType(applyInfo.productRepaymentType)}}</span>
            </li>
            <li>
              <span class="sp1">分期期数</span>
              <span class="sp2">{{applyInfo.byStagesNum}}</span>
            </li>
            <li>
              <span class="sp1">贷款金额</span>
              <span class="sp2">{{applyInfo.loanAmount}}</span>
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
        <p class="title"><Tag color="warning">风控信息</Tag></p>
        <tabView :options="controls" :userCustom="userOption" :customInfo="customOption" @isRefreshAutoResult="refreshAutoResult"/>
        <p class="title"><Tag color="warning">历史进件</Tag></p>
        <div class="content">
          <Table :columns="columns2" :data="historys"></Table>
        </div>
        <authorizationAndUpdate :authorizations="creditList" :updates="editLogList" />
      </div>
      <div class="footer">
        <template v-if="auditInfo.checkStatus != 0">
          <Button v-if="canAudit == 1 && auditInfo.checkStatus != 10" size="default" type="success" class="btn" @click="handlePass">审核通过</Button>
          <Button v-if="canAudit == 1 && auditInfo.checkStatus != 10" size="default" type="error" class="btn" @click="handleReject">审核被拒</Button>
        </template>
        <Button size="default" type="success" class="btn" @click="handleUpdate">客户备注</Button>
        <Button size="default" type="primary" class="btn" @click="handleBatch(0)">编辑负责人</Button>
      </div>
    </Drawer>
    <Modal v-model="modelShow" :title="modelTitle">
      <template v-if="modelType == 0">
        <ul class="info-ul">
          <li style="width: 100%;">
            <span class="sp1">是否拉黑</span>
            <span class="sp2">
              <Select v-model="formReject.blackStatus" placeholder="选择">
                <Option :value="0">不拉黑</Option>
                <Option :value="1">拉黑</Option>
              </Select>
            </span>
          </li>
        </ul>
        <div style="margin-top: 10px"> 
          <Input v-model="formReject.customerRemark" placeholder="输入拒绝原因" type="textarea"></Input>
        </div>
      </template>
        <template v-if="modelType == 1">
          <ul class="info-ul">
            <li>
              <span class="sp1">授信额度(元)</span>
              <span class="sp2">
                <Input v-model="formPass.creditMoney" :readonly="auditInfo.checkStatus != 1" placeholder="输入授信额度"></Input>
              </span>
            </li>
            <li>
              <span class="sp1">还款方式</span>
              <span class="sp2">{{setRepaymentType(formPass.productRepaymentType)}}</span>
            </li>
            <li>
              <span class="sp1">授信期数</span>
              <span class="sp2">{{formPass.productCycleNum}}</span>
            </li>
            <li>
              <span class="sp1">利率/期(%)</span>
              <span class="sp2">
                <!-- <Input v-model="formPass.creditRate"></Input> -->
                <span class="sp2">{{formPass.creditRate}}</span>
              </span>
            </li>
            <li>
              <span class="sp1">手续费支付方式</span>
              <span class="sp2">{{formPass.productProcedurePayType == 1? '按期值' : formPass.productProcedurePayType == 2? '贷前扣除' : ''}}</span>
            </li>
            <!-- <li>
              <span class="sp1">手续费/平台费(%)</span>
              <span class="sp2">
                 <Input v-model="formPass.procedureRate"></Input>
              </span>
            </li> -->
            <li>
              <span class="sp1">资方</span>
              <span class="sp2">{{formPass.capitalTitle}}</span>
            </li>
            <li style="width: 100%;">
              <span class="sp1">合同名称</span>
              <span class="sp2">{{formPass.bargainName}}</span>
            </li>
            <!-- <li style="width: 100%;">
              <span class="sp1">签署电子合同</span>
              <span class="sp2">
                <i-switch size="large" v-model="formPass.electronicBargainStatus" :true-value="1" :false-value="0">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                <RadioGroup v-model="formPass.electronicBargainStatus">
                  <Radio :label="0">否</Radio>
                  <Radio :label="1">是</Radio>
                </RadioGroup>
              </span>
            </li> -->
          </ul>
          <div style="margin-top: 10px"> 
            <Input v-model="formPass.riskControl" type="textarea" placeholder="输入风控措施" :readonly="auditInfo.checkStatus != 1"></Input>
          </div>
          <div style="margin-top: 10px"> 
            <Input v-model="formPass.loansSuggest" type="textarea"  placeholder="贷后管理建议" :readonly="auditInfo.checkStatus != 1"></Input>
          </div>
          <!-- <p style="text-align: left; font-size: 16px;color: red;">*开启后会要求客户签署电子合同, 客户签署后生成放款订单, 在平台生成具有法律意义的借款凭证。 若通过借款平台放款, 则无需开启</p> -->
        </template>
      </Form>
      <div slot="footer">
        <!-- 0拒绝 1通过 -->
        <Button v-if="modelType == 0" type="primary" size="default" long @click="handleRejectSubmit">提交</Button>
        <Button v-if="modelType == 1" type="primary" size="default" long @click="handlePassSubmit">提交</Button>
      </div>
    </Modal>
    <Modal v-model="auditModelShow" title="机审结果">
      <ul class="info-ul" v-if="standardResult.length > 0">
        <li v-for="item in standardResult" :key="item.creditAutoCheckMeasureId">
          <span class="sp1">{{item.title}}</span>
          <span class="sp2" :class="{'red': item.creditAutoResult == '不合格'}">{{item.creditAutoResult}}</span>
        </li>
      </ul>
      <p class="line-msg" v-else>符合机审标准, 可放款</p>
      <div slot="footer">
          <Button type="primary" size="default" long @click="auditModelShow = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import tabView from '@/components/tabView16'
import authorizationAndUpdate from '@/components/authorizationAndUpdate.vue'
import { getAuditList, saveApplyPrincipal, getApplyPrincipal, remarkAuditPeople, 
getAuditMsg, getAudioPassMsg, passLoanAudio, rejectLoanAudio, getStandardResult } from '@/utils/api'
import { repayments, producOrderAllStatus, transformStandard } from '@/utils'
export default {
  components: { authorizationAndUpdate, tabView },
  data() {
    return {
      formInline: {
        channelName: '',
        customerName: '',
        productName: '',
        orderStatus: 0,
        phone: '',
        startTime: '',
        endTime: ''
      },
      sfzImgs: [],
      list: [],
      loading: true,
      loadDrawer: true,
      page: 1,
      status: [
        { id: 1, text: '一审中' },
        { id: 2, text: '二审中' },
        { id: 3, text: '三审中' },
        { id: 10, text: '授信审核通过' },
        { id: 0, text: '资料审核未通过' }
      ],
      allStatus: producOrderAllStatus(),
      drawerShow: false,
      checkId: null,
      selection: [],
      options: [],
      value: '',
      batchs: [],
      total: 0,
      id: '',
      customStatus: '',
      modelShow: false,
      modelTitle: '',
      modelType: null,
      formReject: {
        blackStatus: 0,
        customerRemark: ''
      },
      formPass: {
        creditMoney: 0,
        productRepaymentType: '',
        productCycleNum: '',
        creditRate: '',
        productProcedurePayType: '',
        procedureRate: '',
        capitalTitle: '',
        bargainId: '',
        bargainName: '',
        riskControl: '',
        loansSuggest: '',
        productCycleRateNormal: ''
      },
      editLogList: [],
      creditList: [],
      customerInfo: {},
      auditInfo: {},
      applyInfo: {},
      jobInfo: {},
      linkman: {},
      applyDetail: {},
      canAudit: 0,
      repayments: repayments(),
      historys: [],
      controls: [],
      auditResult: {},
      userOption: {},
      customOption: {
        operator: {},
        addressBook: [],
        jingDong: {},
        taoBao: {},
        zhiFuBao: {}
      },
      auditModelShow: false,
      auditResultReject: {},
      standardResult: [],
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '客户姓名', key: 'customerName', align: 'center' },
        { title: '申请金额', key: 'loanAmount', align: 'center' },
        { title: '申请状态', key: 'checkStatus', align: 'center',
        render: (h, params) => {
          return h('div', this.status.filter(it => it.id == params.row.checkStatus)[0].text)
        } },
        { title: '提交时间', key: 'applyCommitTime', align: 'center' },
        { title: '申请次数', key: 'applyCount', align: 'center' },
        { title: '下单时间', key: 'orderTime', align: 'center' },
        { title: '渠道', key: 'channelName', align: 'center' },
        { title: '业务经理', key: 'businessAdmin', align: 'center' },
        { title: '负责人', key: 'userName', align: 'center' },
        { title: '资方名称', key: 'capitalTitle', align: 'center' },
        { title: '操作', key: 'action', width: 100, align: 'center',
        render: (h, params) => {
          return h('Button', {
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
                this.id = params.row.customerId
                this.fetchStandardResult()
                this.auditModelShow = true
              }
            }
          }, '机审结果')
        } }
      ],
      columns2: [
        { title: '申请时间', key: 'applyTime', align: 'center' },
        { title: '姓名', key: 'customerName', align: 'center' },
        { title: '手机号', key: 'customerPhone', align: 'center' },
        { title: '审核状态', key: 'checkStatus', align: 'center',
        render: (h, params) => {
          return h('div', this.status.filter(it => it.id == params.row.checkStatus)[0].text)
        } },
        { title: '授信额度(元)', key: 'loanAmount', align: 'center' },
        { title: '放款订单状态', key: 'orderStatus', align: 'center',
        render: (h, params) => {
          return h('div', this.allStatus.filter(it => it.id == params.row.orderStatus)[0].text)
        } },
        { title: '还款进度', key: 'repaySchedule', align: 'center' }
      ]
    }
  },
  mounted() {
    this.fetchAuditList()
    this.fetchApplyPrincipal()
  },
  computed: {
    isDisabled() {
      if (this.selection.length > 0) return false
      return true
    }
  },
  methods: {
    refreshAutoResult(bool) {
      if (bool) {
        setTimeout(() => {
          this.fetchStandardResult()
        }, 1000)
      }
    },
    fetchStandardResult() {
      this.standardResult.splice(0, this.standardResult.length)
      const params = {
        customerId: this.id,
        companyId: this.$store.getters.userInfo.companyId
      }
      getStandardResult(params).then(res => {
        if (res.state == 1) {
          // console.log(res.info)
          this.standardResult = res.info.data
          for (const o of this.standardResult) {
            o.title = transformStandard(o.creditAutoCheckMeasureId)
          }
        }
      })
    },
    handleTimeChangeA(val) {
      this.formInline.startTime = val
    },
    handleTimeChangeB(val) {
      this.formInline.endTime = val
    },
    handleSelectChange(selection) {
      this.selection = selection
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
          this.editApplyPrincipal(type)
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
          const params = {
            customerRemark: this.value,
            customerId: this.id
          }
          remarkAuditPeople(params).then(res => {
            if (res.state == 1) {
              this.$Message.success('备注成功')
              this.fetchAuditList()
              this.fetchAuditMsg()
              this.value = ''
            }
          })
        }
      })
    },
    handleClick(row) {
      this.id = row.customerId
      this.customStatus = row.checkStatus
      this.drawerShow = true
      this.fetchAuditMsg()
    },
    handleSubmit() {
      this.fetchAuditList()
    },
    handleChange(val) {
      this.page = val
      this.fetchAuditList()
    },
    handlePassSubmit() {
      // console.log(this.formPass.creditMoney)
      if (this.formPass.creditMoney == '') {
        this.$Message.error('授信额度不能为空')
        return false
      }
      this.fetchPassLoanAudio()
    },
    handlePass() {
      this.modelShow = true
      this.modelTitle = '添加授信结论'
      this.modelType = 1
    },
    fetchAuditPassMsg() {
      const params = {
        customerId: this.id,
        companyId: this.$store.getters.userInfo.companyId
      }
      getAudioPassMsg(params).then(res => {
        if (res.state == 1) {
          for (const o in this.formPass) {
            if (o == 'creditMoney') {
              this.formPass[o] = res.info.data[o] == 0? '' : res.info.data[o]
            } else {
              this.formPass[o] = res.info.data[o]
            }
          }
          // this.formPass.creditMoney = ''
        }
      })
    },
    fetchPassLoanAudio() {
      const params = this.formPass
      params.userId = this.$store.getters.userInfo.userId
      params.customerId = this.id
      params.checkStatus = this.customStatus
      params.electronicBargainStatus = 0
      passLoanAudio(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('审核通过')
          this.modelShow = false
          this.fetchAuditList()
          this.fetchAuditMsg()
        }
      })
    },
    handleRejectSubmit() {
      this.fetctRejectLoanAudio()
    },
    handleReject() {
      this.modelShow = true
      this.modelTitle = '被拒'
      this.modelType = 0
    },
    fetctRejectLoanAudio() {
      const params = {
        customerId: this.id,
        userId: this.$store.getters.userInfo.userId,
        checkStatus: this.customStatus,
        customerRemark: this.formReject.customerRemark,
        blackStatus: this.formReject.blackStatus
      }
      rejectLoanAudio(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('拒贷成功')
          this.modelShow = false
          this.fetchAuditList()
          this.fetchAuditMsg()
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
          this.$Message.success('更换成功')
          this.batchs.splice(0, this.batchs.length)
          this.fetchAuditList()
          if (type == 0) {
            this.fetchAuditMsg()
          }
        }
      })
    },
    fetchAuditMsg() {
      const params = {
        customerId: this.id,
        userId: this.$store.getters.userInfo.userId,
        checkStatus: this.customStatus
      }
      this.loadDrawer = true
      this.sfzImgs.splice(0, this.sfzImgs.length)
      getAuditMsg(params).then(res => {
        if (res.state == 1) {
          this.canAudit = res.info.data.canCheck
          this.editLogList = res.info.data.editLogList
          this.creditList = res.info.data.creditList
          this.customerInfo = res.info.data.customerInfo
          this.auditInfo = res.info.data.checkInfo
          this.applyInfo = res.info.data.applyTable
          this.applyDetail = res.info.data.applyProductInfo
          this.jobInfo = res.info.data.professionInfo
          this.linkman = res.info.data.urgencyPeopleInfo
          this.historys = res.info.data.idcardApplyList
          this.auditResult = res.info.data.checkResult
          this.controls = res.info.data.riskControlInfo.creditItemType.split(',')
          this.userOption = {
            phone: this.customerInfo.customerPhone,
            idcard: this.customerInfo.customerIdcard,
            customerName: this.customerInfo.customerName,
            userAppId: res.info.data.userAppId,
            customerId: this.id
          }
          this.sfzImgs.push(this.customerInfo.idCardPhotoPositive)
          this.sfzImgs.push(this.customerInfo.idCardPhotoPositiveNegative)
          // 人脸识别
          if (res.info.data.xx != '' && res.info.data.xx !== null) {
            const imgs = JSON.parse(res.info.data.xx)
            for (const o of imgs) {
              this.sfzImgs.push(o.img)
            }
          }
          // 运营商
          if (res.info.data.yys != '' && res.info.data.yys !== null) {
            const operator = JSON.parse(res.info.data.yys)
            if (operator.code == 200) {
              this.customOption.operator = operator.data
            }
          } else {
            this.customOption.operator = {}
          }
          // 通讯录
          if (res.info.data.tx != '' && res.info.data.tx !== null) {
            const addressBook = JSON.parse(res.info.data.tx)
            this.customOption.addressBook = addressBook
          } else {
            this.customOption.addressBook = []
          }
          // 京东
          if (res.info.data.jd != '' && res.info.data.jd !== null) {
            const jd = JSON.parse(res.info.data.jd)
            if (jd.code == 200) {
              this.customOption.jingDong = jd.data
            }
          }
          // 淘宝
          if (res.info.data.tb != '' && res.info.data.tb !== null) {
            const tb = JSON.parse(res.info.data.tb)
            if (tb.code == 200) {
              this.customOption.taoBao = tb.data
            }
          } else {
            this.customOption.taoBao = {}
          }
          // 支付宝
          if (res.info.data.zfb != '' && res.info.data.zfb !== null) {
            const zfb = JSON.parse(res.info.data.zfb)
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
      }).then(() => {
        this.fetchStandardResult()
        this.fetchAuditPassMsg()
      })
    },
    fetchApplyPrincipal() {
      getApplyPrincipal({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.options = res.info.data
        }
      })
    },
    fetchAuditList() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.userId = this.$store.getters.userInfo.userId
      params.limit = 20
      params.page = this.page
      this.loading = true
      getAuditList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.data.checkList
          this.total = res.info.data.count
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    },
    setRepaymentType(n) {
      try {
        const str = this.repayments.filter(it => it.value == n)[0].label
        return str
      } catch(e) {
        return n
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
