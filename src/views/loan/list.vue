<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" :disabled="isDisabled" style="margin-bottom: 30px;margin-right: 20px;" @click="handleBatch">批量分配  </Button>
    </Row>
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="负责人" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.select" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="1">未还款</Option>
                <Option :value="2">逾期</Option>
                <Option :value="3">还款完成</Option>
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
      <Table :loading="loading" :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {},
      list: [{ name: 12313 }],
      loading: true,
      page: 1,
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '客户姓名', key: 'name', align: 'center' },
        { title: '手机号码', key: 'name', align: 'center' },
        { title: '申请状态', key: 'name', align: 'center' },
        { title: '账单金额', key: 'name', align: 'center' },
        { title: '当前状态', key: 'name', align: 'center' },
        { title: '账单日期', key: 'name', align: 'center' },
        { title: '展期次数', key: 'name', align: 'center' },
        { title: '负责人', key: 'name', align: 'center' },
        {
          title: '操作',
          width: 200,
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2db7f5',
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleReturn()
                  }
                }
              }, '退还费用'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2db7f5',
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleUpdate()
                  }
                }
              }, '修改备注')
            ])
          }
        }
      ],
      drawerShow: false,
      checkId: null,
      selection: [],
      options: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  computed: {
    isDisabled() {
      if (this.selection.length > 0) return false
      return true
    }
  },
  methods: {
    handleNext() {
    },
    handleSelectChange(selection) {
      console.log(selection)
      this.selection = selection
    },
    handleBatch() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Select', {
            props: {
              value: this.value,
              autofocus: true,
              size: 'default',
              placeholder: '更换负责人',
              clearable: true
            },
            on: {
              input: (val) => {
                this.value = val
              }
            }
          }, this.options.map(item => {
            return h('Option', {
              props: {
                value: item,
                label: item,
                key: item
              }
            })
          }))
        },
        onOk: () => {
          console.log(this.value)
        }
      })
    },
    handleReturn() {
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
          console.log(this.value)
          this.value = ''
        }
      })
    },
    handleEdit() {
    },
    handleSubmit() {
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
