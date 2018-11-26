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
              <Input type="text" v-model="formInline.name" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="产品名称" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="负责人" />
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
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="借款审核" v-model="drawerShow" width="60" class="drawer">
      <div class="detail">
        
      </div>
      <div class="footer">
        <Button size="default" type="success" class="btn" @click="handleUpdate">客户备注</Button>
        <Button size="default" type="warning" class="btn" @click="handleEdit">编辑负责人</Button>
      </div>
    </Drawer>
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
        { title: '产品名称', key: 'name', align: 'center' },
        { title: '姓名', key: 'name', align: 'center' },
        { title: '申请金额', key: 'name', align: 'center' },
        { title: '申请状态', key: 'name', align: 'center' },
        { title: '提交时间', key: 'name', align: 'center' },
        { title: '渠道', key: 'name', align: 'center' },
        { title: '业务经理', key: 'name', align: 'center' },
        { title: '负责人', key: 'name', align: 'center' },
        { title: '资方名称', key: 'name', align: 'center' }
      ],
      drawerShow: false,
      checkId: null,
      selection: [],
      options: [],
      value: ''
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
    handleEdit() {
    },
    handleClick(row) {
      console.log(row)
      this.drawerShow = true
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
