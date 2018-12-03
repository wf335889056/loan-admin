<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.phone" clearable placeholder="电话号码" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.channelName" clearable placeholder="客户来源" />
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
      <Table :loading="loading" :columns="columns" :data="list"></Table>
      <Page :current="page" :page-size="20" :total="total" show-total class="page" @on-change="handleChange" />
    </div>
  </div>
</template>

<script>
import { getPotentialCustomers, blackOrNoteCustom } from '@/utils/api'
export default {
  data() {
    return {
      formInline: {
        phone: '',
        channelName: ''
      },
      list: [],
      loading: true,
      page: 1,
      columns: [
        { title: '电话号码', key: 'userAppPhone', align: 'center' },
        { title: '客户来源', key: 'channelName', align: 'center' },
        { title: '备注', key: 'userRemark', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
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
                  this.id = params.row.userAppId
                  this.handleUpdate()
                }
              }
            }, '备注')
          }
        }
      ],
      value: '',
      total: 0,
      id: ''
    }
  },
  mounted() {
    this.fetchPotentialCustomers()
  },
  methods: {
    handleSubmit() {
      this.fetchPotentialCustomers()
    },
    handleChange(val) {
      this.page = val
      this.fetchPotentialCustomers()
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
              this.fetchPotentialCustomers()
              this.value = ''
            }
          })
        }
      })
    },
    fetchPotentialCustomers() {
      const params = this.formInline
      params.companyId = this.$store.getters.userInfo.companyId
      params.page = this.page
      params.limit = 20
      this.loading = true
      getPotentialCustomers(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.customerPool
          this.total = res.info.channelNumber
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