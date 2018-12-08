<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" :disabled="isDisabled" style="margin-bottom: 30px;margin-right: 20px;" @click="handleBatch">批量分配  </Button>
    </Row>
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.customerName" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.productName" clearable placeholder="产品名称" />
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
      <Table :loading="loading" :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
    <!-- <Drawer title="借款审核" v-model="drawerShow" width="60" class="drawer">
      <div class="detail">
        
      </div>
      <div class="footer">
        <Button size="default" type="success" class="btn" @click="handleUpdate">客户备注</Button>
        <Button size="default" type="warning" class="btn" @click="handleEdit">编辑负责人</Button>
      </div>
    </Drawer> -->
  </div>
</template>

<script>
import { getAuditList, saveApplyPrincipal, getApplyPrincipal } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        channelName: '',
        customerName: '',
        productName: '',
        orderStatus: 4
      },
      list: [],
      loading: true,
      page: 1,
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '产品名称', key: 'productName', align: 'center' },
        { title: '客户姓名', key: 'customerName', align: 'center' },
        { title: '申请金额', key: 'loanAmount', align: 'center' },
        { title: '申请状态', key: 'checkStatus', align: 'center',
        render: (h, params) => {
          return h('div', '待签署合同')
        } },
        { title: '提交时间', key: 'applyCommitTime', align: 'center' },
        { title: '申请次数', key: 'applyCount', align: 'center' },
        { title: '下单时间', key: 'orderTime', align: 'center' },
        { title: '渠道', key: 'channelName', align: 'center' },
        { title: '业务经理', key: 'businessAdmin', align: 'center' },
        { title: '负责人', key: 'userName', align: 'center' },
        { title: '资方名称', key: 'capitalTitle', align: 'center' }
      ],
      drawerShow: false,
      selection: [],
      options: [],
      value: '',
      batchs: [],
      total: 0
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
          this.editApplyPrincipal()
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
              placeholder: '客户备注',
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
          console.log(this.value)
          this.value = ''
        }
      })
    },
    editApplyPrincipal() {
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
          this.fetchAuditList()
          this.batchs.splice(0, this.batchs.length)
        }
      })
    },
    handleClick(row) {
      this.drawerShow = true
    },
    handleSubmit() {
      this.fetchAuditList()
    },
    handleChange(val) {
      this.page = val
      this.fetchAuditList()
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
  }
}
</script>

<style lang="less" scoped>

</style>
