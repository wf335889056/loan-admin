<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增申请</Button>
      <Button type="primary" size="large" :disabled="isDisabled" style="margin-bottom: 30px;margin-right: 20px;" @click="handleBatch">批量分配  </Button>
    </Row>
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="产品名称" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="客户姓名" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="渠道" />
            </FormItem>
            <FormItem>
              <Select v-model="formInline.select" clearable placeholder="当前状态">
                <Option :value="0">全部</Option>
                <Option :value="1">资料填写中</Option>
                <Option :value="2">审核中</Option>
                <Option :value="3">还款中</Option>
                <Option :value="4">待签署合同</Option>
                <Option :value="5">放款中</Option>
                <Option :value="6">未通过</Option>
                <Option :value="7">放弃申请</Option>
                <Option :value="8">还款完成</Option>
                <Option :value="9">还款有逾期</Option>
                <Option :value="10">订单取消</Option>
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
    <Drawer :title="drawerTitle" v-model="drawerShow" width="60" class="drawer">
      <div class="detail">
        <template v-if="drawerType == 0">
          <div class="form">
            <p class="title"><Tag color="warning">请填写客户信息</Tag></p>
            <Form :model="form" :label-width="80">
              <FormItem label="客户姓名:">
                <Input v-model="form.input" size="large" clearable placeholder="输入客户姓名"></Input>
              </FormItem>
              <FormItem label="身份证号:">
                <Input v-model="form.input" size="large" clearable placeholder="输入身份证号码"></Input>
              </FormItem>
              <FormItem label="手机号:">
                <Input v-model="form.input" size="large" clearable placeholder="输入手机号码"></Input>
              </FormItem>
              <p style="text-align: right; font-size: 20px;margin-bottom: 10px;">*相关通知短信会发送至此手机号</p>
              <FormItem label="渠道名:">
                <Select v-model="form.select" size="large" clearable placeholder="选择渠道名">
                </Select>
              </FormItem>
              <FormItem label="产品名:">
                <Select v-model="form.select" size="large" clearable placeholder="选择产品名">
                </Select>
              </FormItem>
            </Form>
          </div>
        </template>
        <template v-else>
          <div class="content">
            <p class="info-p">客户信息</p>
            <ul class="info-ul">
              <li>
                <span class="sp1">申请编号</span>
                <span class="sp2">116820181122131524284620159255</span>
              </li>
              <li>
                <span class="sp1">申请状态</span>
                <span class="sp2">授信审核中</span>
              </li>
              <li>
                <span class="sp1">客户姓名</span>
                <span class="sp2">曾凡祥</span>
              </li>
              <li>
                <span class="sp1">客户电话</span>
                <span class="sp2">138****9033</span>
              </li>
              <li>
                <span class="sp1">客户身份证号</span>
                <span class="sp2">532***********3611</span>
              </li>
              <li>
                <span class="sp1">负责人</span>
                <span class="sp2">13818251878</span>
              </li>
            </ul>
          </div>
          <div class="content">
            <p class="info-p">申请信息</p>
            <ul class="info-ul">
              <li>
                <span class="sp1">贷款金额</span>
                <span class="sp2">1</span>
              </li>
              <li>
                <span class="sp1">还款方式</span>
                <span class="sp2">等本等息（按周还款）</span>
              </li>
              <li>
                <span class="sp1">分期期数</span>
                <span class="sp2">1期 (日利率0%)</span>
              </li>
              <li>
                <span class="sp1">贷款用途</span>
                <span class="sp2">1</span>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <div class="footer">
        <template v-if="drawerType == 0">
          <Button size="default" type="info" class="btn" @click="handleNext">下一步</Button>
        </template>
        <template v-else>
          <Button size="default" type="info" class="btn" @click="handleBatch">编辑负责人</Button>
        </template>
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
        { title: '分期期数', key: 'name', align: 'center' },
        { title: '渠道', key: 'name', align: 'center' },
        { title: '申请时间', key: 'name', align: 'center' },
        { title: '申请次数', key: 'name', align: 'center' },
        { title: '终端来源', key: 'name', align: 'center' },
        { title: '申请状态', key: 'name', align: 'center' },
        { title: '负责人', key: 'name', align: 'center' }
      ],
      drawerShow: false,
      checkId: null,
      drawerTitle: '新增申请',
      drawerType: 0,
      selection: [],
      form: {},
      value: '',
      options: [1,2,3,4,5,6,7]
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
    handleAdd() {
      this.drawerType = 0
      this.drawerTitle = '新增申请'
      this.drawerShow = true
    },
    handleClick(row) {
      // console.log(row)
      this.drawerType = 1
      this.drawerTitle = '申请资料详情'
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
