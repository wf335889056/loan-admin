<template>
  <div class="content">
    <ul class="info-ul" style="margin-bottom: 30px;">
      <li v-for="item in reportInfos">
        <span class="sp1">{{item.key}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <Table :columns="columns" :data="checkPoints"></Table>
  </div>
</template>

<script>
// 贷前综合风险报告
import test4Json from '@/assets/test4.json'
import { enTransitionCn } from '@/utils'
export default {
  props: {
    obj: {
      type: Object,
      default: () => test4Json.data
    }
  },
  data() {
    return {
      columns: [
        {
          type: 'expand',
          accordion: true,
          width: 50,
          render: (h, params) => {
            const list = params.row.riskDetails != null? params.row.riskDetails : []
            return h('Table', {
              props: {
                row: params.row,
                data: list,
                columns: [
                  { title: '风险详情ID', key: 'riskDetailId', align: 'center' },
                  { title: '风险详情名称', key: 'riskDetailName', align: 'center' },
                  { title: '风险详情说明', key: 'riskDetailValue', align: 'center' }
                ]
              }
            })
          }
        },
        { title: '风险ID', key: 'riskId', align: 'center' },
        { title: '风险名称', key: 'riskName', align: 'center' },
        { 
          title: '风险等级', 
          key: 'riskLevel', 
          align: 'center',
          render: (h, params) => {
            return h('div', enTransitionCn(params.row.riskLevel))
          }
        },
        { 
          title: '是否命中该风险', 
          key: 'hit', 
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.hit? '是' : '否')
          }
        }
      ]
    }
  },
  computed: {
    reportInfos() {
      const arrs = []
      if (this.obj['reportInfo']) {
        const temp = this.obj['reportInfo']
        for (const i in temp) {
          arrs.push({
            key: this.transitionReportInfo(i),
            value: temp[i]
          })
        }
      }
      return arrs
    },
    checkPoints() {
      return this.obj['checkPoints'].length > 0? this.obj['checkPoints'] : []
    }
  },
  mounted() {
    // console.log(this.checkPoints)
  },
  methods: {
    transitionReportInfo(val) {
      switch(val) {
        case 'reportId':
        return '报告序号'
        case 'reportTime':
        return '报告时间'
        case 'score':
        return '总体评分'
        case 'suggest':
        return '结果'
        default:
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
