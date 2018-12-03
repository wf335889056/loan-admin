<template>
  <div>
    <!-- <p class="info-p">授权信息</p> -->
    <p class="title"><Tag color="warning">授权信息</Tag></p>
    <div class="content">
      <Table :columns="columns1" :data="list1"></Table>
    </div>
    <!-- <p class="info-p">修改记录</p> -->
    <p class="title"><Tag color="warning">修改记录</Tag></p>
    <div class="content">
      <Table :columns="columns2" :data="list2"></Table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authorizations: {
      type: Array,
      default: () => []
    },
    updates: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns1: [
        // { title: '手续费/审核费', key: 'procedureRate', align: 'center' },
        // { title: '产品期数', key: 'productCycleNum', align: 'center' },
        { title: '审批人', key: 'userName', align: 'center' },
        { title: '授信额度', key: 'creditMoney', align: 'center' },
        { title: '日期', key: 'createTime', align: 'center' }
      ],
      columns2: [
        { title: '姓名', key: 'editName', align: 'center' },
        { title: '修改内容', key: 'editContent', align: 'center' },
        { title: '修改时间', key: 'createTime', align: 'center' },
      ]
    }
  },
  computed: {
    list1() {
      return this.authorizations.length > 0? this.authorizations : []
    },
    list2() {
      return this.updates.length > 0? this.updates : []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
