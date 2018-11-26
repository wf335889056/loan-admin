<template>
  <div class="wrapper">
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
                <Option :value="1">还款有逾期</Option>
                <Option :value="2">催收中</Option>
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
    <Tabs value="1">
      <TabPane label="今日逾期" name="1">
        <Table :loading="loading" :columns="columns" :data="list1"></Table>
      </TabPane>
      <TabPane label="昨日逾期" name="2">
        <Table :columns="columns" :data="list2"></Table>
      </TabPane>
      <TabPane label="逾期30天" name="3">
        <Table :columns="columns" :data="list3"></Table>
      </TabPane>
    </Tabs>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {},
      list1: [],
      list2: [],
      list3: [],
      loading: true,
      columns: [
        { title: '产品名称', key: 'name', align: 'center' },
        { title: '客户来源', key: 'name', align: 'center' },
        { title: '申请金额', key: 'name', align: 'center' },
        { title: '当前状态', key: 'name', align: 'center' },
        { title: '下单时间', key: 'name', align: 'center' },
        { title: '渠道', key: 'name', align: 'center' },
        { title: '业务经理', key: 'name', align: 'center' },
        { title: '负责人', key: 'name', align: 'center' },
        { title: '资方名称', key: 'name', align: 'center' }
      ],
      value: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    handleSubmit() {
    }
  }
}
</script>

<style lang="less" scoped>

</style>