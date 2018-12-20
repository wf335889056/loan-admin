<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" :disabled="isDisabled" style="margin-bottom: 30px;margin-right: 20px;" @click="handleBatch">批量分配  </Button>
      <Button type="success" size="large" style="margin-bottom: 30px" @click="handleExport">导出</Button>
    </Row>
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline" inline>
        <Col span="22">
          <FormItem>
            <Input type="text" v-model="formInline.customerName" clearable placeholder="客户姓名" />
          </FormItem>
          <FormItem>
            <Input v-model="formInline.customerPhone" clearable placeholder="客户手机号" />
          </FormItem>
          <FormItem>
            <Input type="text" v-model="formInline.userName" clearable placeholder="负责人" />
          </FormItem>
          <FormItem>
            <Select v-model="formInline.repaymentStatus" clearable placeholder="当前状态">
              <Option :value="0">全部</Option>
              <Option :value="2">还款完成</Option>
              <Option :value="3">逾期</Option>
              <Option :value="4">还款中</Option>
            </Select>
          </FormItem>
          </br>
          <FormItem>
            <DatePicker type="date" placeholder="预计还款开始时间" format="yyyy-MM-dd" 
            v-model="formInline.billEndDateStartTime" @on-change="handleTimeChangeA"></DatePicker>
          </FormItem>
          <FormItem>
            <DatePicker type="date" placeholder="预计还款结束时间" format="yyyy-MM-dd" 
            v-model="formInline.billEndDateEndTime" @on-change="handleTimeChangeB"></DatePicker>
          </FormItem>
          <FormItem>
            <DatePicker type="date" placeholder="实际还款开始时间" format="yyyy-MM-dd" 
            v-model="formInline.backMoneyTimeStartTime" @on-change="handleTimeChangeC"></DatePicker>
          </FormItem>
          <FormItem>
            <DatePicker type="date" placeholder="实际还款结束时间" format="yyyy-MM-dd" 
            v-model="formInline.backMoneyTimeEndTime" @on-change="handleTimeChangeD"></DatePicker>
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
      <Table :loading="loading" :columns="columns" :data="list" ref="table" @on-selection-change="handleSelectChange"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
    <!-- <Modal v-model="modalFormShow" title="退还费用">
      <ul class="info-ul">
        <li style="width: 100%">
          <span class="sp1">客户银行卡</span>
          <span class="sp2">{{formReturn.bankCard}}</span>  
        </li>
        <li style="width: 100%">
          <span class="sp1">放款渠道</span>
          <span class="sp2">富友</span>  
        </li>
        <li style="width: 100%">
          <span class="sp1">费用名称</span>
          <span class="sp2">
            <Input v-model="formReturn.nowRepayMoney"></Input>  
          </span>  
        </li>
        <li style="width: 100%">
          <span class="sp1">费用金额(元)</span>
          <span class="sp2">
            <Input v-model="formReturn.nowRepayMoney"></Input>  
          </span>  
        </li>
        <li>
          <span class="sp1">可使用金额(元)</span>
          <span class="sp2">{{formReturn.balance}}</span>  
        </li>
        <li>
          <span class="sp1">手续费(元)</span>
          <span class="sp2">{{formReturn.serviceMoney}}</span>  
        </li>
      </ul>
      <div style="margin-top: 10px">
        <Input type="textarea" v-model="formReturn.remark" placeholder="输入备注信息"></Input>
      </div>
      <div slot="footer">
        <Button type="primary" size="default" long @click="handleUpdateSubmit">确认提交</Button>
      </div> -->
    </Modal>
  </div>
</template>

<script>
import { getBillLianList, remarkAuditPeople, saveApplyPrincipal, getApplyPrincipal, 
getRerurnLoanOrderMsg, getBillLianListExport } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        repaymentStatus: 0,
        userName: '',
        customerName: '',
        billEndDateEndTime: '',
        billEndDateStartTime: '',
        backMoneyTimeStartTime: '',
        backMoneyTimeEndTime: '',
        customerPhone: ''
      },
      list: [],
      loading: true,
      page: 1,
      total: 0,
      formReturn: {
        balance: 0,
        bankCard: '',
        serviceMoney: ''
      },
      drawerShow: false,
      modalFormShow: false,
      id: '',
      selection: [],
      options: [],
      value: '',
      batchs: [],
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '客户姓名', key: 'customerName', align: 'center' },
        { title: '手机号码', key: 'customerPhone', align: 'center' },
        { title: '账单金额', key: 'TotalBillMoney', align: 'center' },
        { title: '当前状态', key: 'repaymentStatus', align: 'center',
        render: (h, params) => {
          return h('div', params.row.repaymentStatus == 2? '还款完成' : params.row.repaymentStatus == 3? '逾期' : '还款中')
        } },
        { title: '账单日期', key: 'billDate', align: 'center' },
        { title: '展期次数', key: 'deferCount', align: 'center' },
        { title: '负责人', key: 'userName', align: 'center' },
        { title: '操作', width: 200, key: 'action', align: 'center',
          render: (h, params) => {
            return h('div', [
              // h('Button', {
              //   props: {
              //     type: 'text',
              //     size: 'small'
              //   },
              //   style: {
              //     color: '#2db7f5',
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.id = params.row.customerId
              //       this.handleReturn()
              //     }
              //   }
              // }, '退还费用'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2db7f5',
                },
                on: {
                  click: () => {
                    this.id = params.row.customerId
                    this.handleUpdate()
                  }
                }
              }, '修改备注')
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.fetchBillLianList()
  },
  computed: {
    isDisabled() {
      if (this.selection.length > 0) return false
      return true
    }
  },
  methods: {
    handleTimeChangeA(val) {
      this.formInline.billEndDateStartTime = val
    },
    handleTimeChangeB(val) {
      this.formInline.billEndDateEndTime = val
    },
    handleTimeChangeC(val) {
      this.formInline.backMoneyTimeStartTime = val
    },
    handleTimeChangeD(val) {
      this.formInline.backMoneyTimeEndTime = val
    },
    handleExport() {
      getBillLianListExport({companyId: this.$store.getters.userInfo.companyId}).then(res => {
        if (res.state == 1) {
          this.$refs.table.exportCsv({
            filename: '账单列表',
            data: res.info.data,
            columns: [
              { title: '客户编号', key: 'customerId', align: 'center' },
              { title: '客户姓名', key: 'customerName', align: 'center' },
              { title: '手机号码', key: 'customerPhone', align: 'center' },
              { title: '账单金额', key: 'TotalBillMoney', align: 'center' },
              { title: '当前状态', key: 'repaymentStatus', align: 'center' },
              { title: '账单日期', key: 'billDate', align: 'center' },
              { title: '展期次数', key: 'deferCount', align: 'center' },
              { title: '负责人', key: 'userName', align: 'center' }
            ]
          })
        }
      })
    },
    handleSelectChange(selection) {
      this.selection = selection
    },
    handleBatch() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Select', {
            props: {
              value: this.batchs,
              autofocus: true,
              size: 'default',
              placeholder: '更换负责人',
              clearable: true
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
          this.editApplyPrincipal()
        }
      })
    },
    handleReturn() {
      const params = {
        customerId: this.id,
        companyId: this.$store.getters.userInfo.companyId
      }
      getRerurnLoanOrderMsg(params).then(res => {
        if (res.state == 1) {
          for (const i in this.formReturn) {
            if (res.info.data[i]) {
              this.formReturn[i] = res.info.data[i]
            }
          }
          this.modalFormShow = true
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
              placeholder: '修改备注',
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
              this.fetchBillLianList()
              this.value = ''
            }
          })
        }
      })
    },
    editApplyPrincipal() {
      const ids = []
      for (const o of this.selection) {
        ids.push(o.customerId)
      }
      const params = {
        customerIdString: ids.join(','),
        userIdString: this.batchs.join(',')
      }
      saveApplyPrincipal(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('更换成功')
          this.fetchBillLianList()
          this.batchs.splice(0, this.batchs.length)
        }
      })
    },
    handleSubmit() {
      this.fetchBillLianList()
    },
    handleChange(val) {
      this.page = val
      this.fetchBillLianList()
    },
    fetchApplyPrincipal() {
      getApplyPrincipal({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.options = res.info.data
        }
      })
    },
    fetchBillLianList(form) {
      const params = this.formInline
      params.limit = 20
      params.page = this.page
      params.companyId = this.$store.getters.userInfo.companyId
      this.loading = true
      getBillLianList(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.data.billList
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
