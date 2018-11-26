<template>
  <div class="wrapper">
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
              <Select v-model="formInline.select" clearable placeholder="贷款状态">
                <Option :value="0">全部</Option>
                <Option :value="1">无贷款</Option>
                <Option :value="2">贷款中</Option>
                <Option :value="3">审核中</Option>
                <Option :value="4">逾期</Option>
                <Option :value="5">拉黑</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formInline.select" clearable placeholder="会员状态">
                <Option :value="0">全部</Option>
                <Option :value="1">未申请</Option>
                <Option :value="2">待审核</Option>
                <Option :value="3">通过</Option>
                <Option :value="4">未通过</Option>
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
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="客户详情" v-model="drawerShow" width="60" class="drawer">
      <div class="detail">
        <p class="title"><Tag color="warning">客户信息</Tag></p>
        <div class="content">
          <p class="info-p">基础信息</p>
          <ul class="info-ul">
            <li>
              <span class="sp1">客户姓名</span>
              <span class="sp2">叶挺</span>
            </li>
            <li>
              <span class="sp1">手机号码</span>
              <span class="sp2">12313213</span>
            </li>
            <li>
              <span class="sp1">客户身份证号</span>
              <span class="sp2">4654654654</span>
            </li>
            <li>
              <span class="sp1">客户贷款状态</span>
              <span class="sp2">审核中</span>
            </li>
          </ul>
          <p class="info-p">审核信息</p>
          <p class="line-msg">暂无数据</p>
        </div>
        <tabView />
      </div>
      <div class="footer">
        <Button size="default" type="error" class="btn" @click="handleBlack">拉黑</Button>
        <Button size="default" type="success" class="btn" @click="handleUpdate">备注</Button>
      </div>
    </Drawer>
    <Modal v-model="balckConfirm" title="用户拉黑" @on-ok="handleDelete">
      <p style="padding: 40px 0; font-size: 24px; text-align: center; color: red;">确定将此用户拉黑?</p>
    </Modal>
  </div>
</template>

<script>
import tabView from '@/components/tabView16.vue'

export default {
  components: { tabView },
  data() {
    return {
      formInline: {},
      list: [{ name: 12313 }],
      loading: true,
      page: 1,
      columns: [
        { title: '姓名', key: 'name', align: 'center' },
        { title: '电话号码', key: 'name', align: 'center' },
        { title: '身份证号码', key: 'name', align: 'center' },
        { title: '注册时间', key: 'name', align: 'center' },
        { title: '上次访问时间', key: 'name', align: 'center' },
        { title: '渠道', key: 'name', align: 'center' },
        { title: '备注', key: 'name', align: 'center' },
        { title: '贷款状态', key: 'name', align: 'center' },
        { title: '会员状态', key: 'name', align: 'center' }
      ],
      drawerShow: true,
      checkId: null,
      balckConfirm: false,
      value: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
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
              size: 'default'
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
    handleDelete() {
      console.log('删除')
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
