<template>
  <div class="content">
    <Table :columns="columns" :data="results" v-if="results.length > 0"></Table>
    <p class="line-msg" v-else>暂未数据</p>
  </div>
</template>

<script>
export default {
  porps: {
    obj: {
      type: Object
    }
  },
  data() {
    return {
      columns: [
        { title: '涉案类型', key: 'crimeType', align: 'center' },
        { title: '前科案件数量', key: 'count', align: 'center' },
        { title: '最新一条前科案件描述', key: 'caseType', align: 'center' },
        { title: '前科', key: 'caseSurce', align: 'center' },
        { title: '最新一条前科案件时间范围', key: 'casePeriod', align: 'center' },
        { title: '前科案件严重程度', key: 'caseLevel', align: 'center' }
      ]
    }
  },
  computed: {
    results() {
      try {
        if (this.obj.result && typeof this.obj.result == 'object') {
          return this.obj.result
        }
      } catch(e) {
        return []
      }
    }
  },
  methods: {
    transitionKey(n) {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
