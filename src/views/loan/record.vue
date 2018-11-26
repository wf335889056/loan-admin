<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.select" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="1">待确认</Option>
                <Option :value="2">已完成</Option>
                <Option :value="3">已取消</Option>
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
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="展期详情" v-model="drawerShow" width="60" class="drawer">
      <div class="detail">
      </div>
      <div class="footer">
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
        { title: '客户名称', key: 'name', align: 'center' },
        { title: '发起时间', key: 'name', align: 'center' },
        { title: '总费用', key: 'name', align: 'center' },
        { title: '天数', key: 'name', align: 'center' },
        { title: '日利率(&)', key: 'name', align: 'center' },
        { title: '状态', key: 'name', align: 'center' },
        { title: '发起方', key: 'name', align: 'center' }
      ],
      drawerShow: false,
      checkId: null
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
