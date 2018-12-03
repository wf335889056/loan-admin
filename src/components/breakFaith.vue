<template>
  <div class="content">
    <p class="info-p">记录数</p>
    <p class="line-msg" style="margin-bottom: 30px;">{{obj.listNum}}</p>
    <Table :columns="columns" :data="results"></Table>
  </div>
</template>

<script>
// 失信
export default {
  props: {
    obj: {
      type: Object
    }
  },
  data() {
    return {
      columns: [
        { title: '姓名', key: 'iname', align: 'center' },
        { title: '年龄', key: 'age', align: 'center' },
        { title: '性别', key: 'sexy', align: 'center' },
        { title: '案件受理机构', key: 'gistUnit', align: 'center' },
        { title: '卡号', key: 'cardNum', align: 'center' },
        { title: '案件编号', key: 'caseCode', align: 'center' },
        { title: '地区', key: 'areaName', align: 'center' },
        { title: '执行部分', key: 'performance', align: 'center' },
        { title: '立案日期', key: 'regDate', align: 'center' },
        { title: '归属义务', key: 'disruptTypeName', align: 'center' },
        { title: '履行情况', key: 'performance', align: 'center' }
      ]
    }
  },
  computed: {
    results() {
      return this.obj.result
    }
  }
}
</script>

<style lang="less" scoped>

</style>
