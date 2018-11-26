<template>
  <div>
    <Row style="position: relative;">
      <p class="p">产品详情</p>
      <div class="btn-box">
        <Button type="primary" size="large" @click="handleStart">启动</Button>
        <Button type="primary" size="large" @click="handleForbidden">禁用</Button>
      </div>
    </Row>
    <Divider />
    <Collapse v-model="collapse" accordion>
      <Panel name="1">产品基本信息
        <div slot="content">
          <newProductOne :form="formProduct" />
          <p style="text-align: center;margin: 20px 0;"><Button type="info" size="default" icon="md-checkbox-outline" @click="handleSubmitA">保存</Button></p>
        </div>
      </Panel>
      <Panel name="2">客户风控资料
        <div slot="content">
          <newProductTwo :checkedList="listProduct" @update="updateList" />
          <p style="text-align: center;margin: 20px 0;"><Button type="info" size="default" icon="md-checkbox-outline" @click="handleSubmitB">保存</Button></p>
        </div>
      </Panel>
      <Panel name="3">合作渠道
        <div slot="content">
          <Table :columns="columns1" :data="lsit1"></Table>
        </div>
      </Panel>
      <Panel name="4">选择授权合同
      </Panel>
      <Panel name="5">选择借款和展期合同
        <div slot="content">
          <Table :columns="columns2" :data="lsit2"></Table>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import newProductOne from '@/components/newProduct1.vue'
import newProductTwo from '@/components/newProduct2.vue'
export default {
  components: { newProductOne, newProductTwo },
  data() {
    return {
      collapse: '1',
      listProduct: [],
      formProduct: {},
      lsit1: [],
      lsit2: [],
      columns1: [
        { title: '渠道编号', key: 'name', align: 'center' },
        { title: '渠道名称', key: 'name', align: 'center' },
        { title: '状态', key: 'name', align: 'center' },
        { title: '业务类型', key: 'name', align: 'center' }
      ],
      columns2: [
        { title: '合同编号', key: 'name', align: 'center' },
        { title: '合同名称', key: 'name', align: 'center' },
        { title: '合同类型', key: 'name', align: 'center' }
      ]
    }
  },
  methods: {
    updateList(data) {
      this.listProduct = data
    },
    handleStart() {
    },
    handleForbidden() {
    },
    handleSubmitA() {
      console.log(this.formProduct)
    },
    handleSubmitB() {
      console.log(this.listProduct)
    }
  }
}
</script>

<style lang="less" scoped>
  .p {
    font-size: 30px;
    color: #508cee;
    margin: 10px 0;
  }
  .btn-box {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -18px;
  }
</style>
