<template>
  <div>
    <p class="title"><Tag color="warning">授权信息</Tag></p>
    <div class="content">
      <Table :columns="columns1" :data="list1"></Table>
    </div>
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
      type: Array
    },
    updates: {
      type: Array
    }
  },
  data() {
    return {
      columns1: [
        { title: '授权编号', key: 'name', align: 'center' },
        { title: '审批人', key: 'name', align: 'center' },
        { title: '授信额度', key: 'name', align: 'center' },
        { title: '日期', key: 'name', align: 'center' }
      ],
      columns2: [
        { title: '姓名', key: 'name', align: 'center' },
        { title: '修改内容', key: 'name', align: 'center' },
        { title: '修改时间', key: 'name', align: 'center' },
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
