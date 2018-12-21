<template>
  <div class="content">
    <!-- <p class="info-p">报告信息</p> -->
    <Divider>报告信息</Divider>
    <ul class="info-ul" style="margin-bottom: 30px;">
      <li v-for="item in reportInfos">
        <span class="sp1">{{item.key}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <!-- <p class="info-p">失信被执行人与法院被执行人</p> -->
    <Divider>失信被执行人与法院被执行人</Divider>
    <Table :columns="columns" :data="list1"></Table>
    <!-- <p class="info-p">身份证或手机号在多平台申请借款报告和身份证或手机号在多平台申请借款被拒</p> -->
    <Divider>身份证或手机号在多平台申请借款报告和身份证或手机号在多平台申请借款被拒</Divider>
    <Table :columns="columns" :data="list2"></Table>
    <!-- <p class="info-p">逾期记录</p> -->
    <Divider>逾期记录</Divider>
    <Table :columns="columns" :data="list3"></Table>
    <!-- <p class="info-p">简单风险命中信息</p> -->
    <Divider>简单风险命中信息</Divider>
    <Table :columns="columns" :data="list4"></Table>
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
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      columns: [
        { title: '风险名称', key: 'riskName', align: 'center', width: 300 },
        { title: '风险等级', key: 'riskLevel', align: 'center',
          render: (h, params) => {
            return h('div', enTransitionCn(params.row.riskLevel))
          }
        },
        { title: '是否命中该风险', key: 'hit', align: 'center',
          render: (h, params) => {
            const isHit = h('div', {
              style: {
                color: 'red'
              }
            }, '是')
            const noHit = h('div', '否')
            return params.row.hit? isHit : noHit
          }
        },
        { title: '备注', key: 'hit', align: 'center', width: 300,
          render: (h, params) => {
            if (!params.row.hit) {
              return h('div', '未命中')
            }
            const list = params.row.riskDetails != null? params.row.riskDetails : []
            return h('div', list.map(it => {
              try {
                const arrs = JSON.parse(it.riskDetailValue)
                if (typeof arrs == 'object') {
                  if (Array.isArray(arrs)) {
                    return h('div', arrs.map(i => h('p', `逾期金额:${i.overDueAmount}, 逾期日期:${i.overDueDate}`)))
                  }
                } else {
                  return h('p',`${it.riskDetailName}: ${it.riskDetailValue}`)
                }
              } catch(e) {
                return h('p',`${it.riskDetailName}: ${it.riskDetailValue}`)
              }
            }))
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
      return this.obj['checkPoints'] && this.obj['checkPoints'].length > 0? this.obj['checkPoints'] : []
    }
  },
  watch: {
    checkPoints(newVal, oldVal) {
      // console.log(oldVal)
      // console.log(newVal)
      this.list1 = newVal.slice(0, 4)
      this.list2 = newVal.slice(5, 14)
      this.list3 = newVal.slice(15, 19)
      this.list4 = newVal.slice(20)
    }
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
