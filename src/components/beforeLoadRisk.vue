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
    <Divider>身份证或手机号在多平台申请借款报告</Divider>
    <Table :columns="columns" :data="list2"></Table>
    <Divider>身份证或手机号在多平台申请借款被拒</Divider>
    <Table :columns="columns" :data="list5"></Table>
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
    },
    standard: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      result: [],
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
      this.result.splice(0, this.result.length)
      const standardScore = this.standard.length > 0? this.standard[1] : 0
      const arrs = []
      if (this.obj['reportInfo']) {
        const temp = this.obj['reportInfo']
        for (const i in temp) {
          arrs.push({
            key: this.transitionReportInfo(i),
            value: temp[i]
          })
          // 贷前综合风险值(分)
          if (i == 'score' && standardScore.autoMeasureType == 1 && temp[i] < Number(standardScore.autoMeasureValue)) {
            this.result.push({
              creditAutoCheckMeasureId: standardScore.autoId,
              creditAutoResult: '不通过'
            })
          } 
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
      // console.log(newVal)
      const standard = []
      const standards = this.standard.length > 0? this.standard : []
      // 法院失信名单(个)
      this.list1 = newVal.slice(0, 5)
      const hitList1Len = this.list1.filter(it => it.hit).length
      if (hitList1Len > Number(standards[3].autoMeasureValue) && standards[3].autoMeasureType == 1) {
        standard.push({
          creditAutoCheckMeasureId: standards[3].autoId,
          creditAutoResult: '不通过'
        })
      }
      // 24个月多平台借款数量(个)
      this.list2 = newVal.slice(5, 10)
      for (const o of this.list2) {
        if (o.riskId == 'apply_plats_24_month') {
          const month24BorrowList = o.riskDetails
          if (month24BorrowList !== null && Array.isArray(month24BorrowList)) {
            const month24BorrowNumber = month24BorrowList[0].riskDetailValue
            if (Number(month24BorrowNumber) > Number(standards[4].autoMeasureValue) && standards[4].autoMeasureType == 1) {
              standard.push({
                creditAutoCheckMeasureId: standards[4].autoId,
                creditAutoResult: '不通过'
              })
            }
          }
        }
      }
      // 24个月逾期记录数量(条)
      this.list3 = newVal.slice(15, 20)
      for (const o of this.list3) {
        if (o.riskId == 'over_due_24_month') {
          const month24overdue = o.riskDetails
          if (month24overdue !== null && standards[6].autoMeasureType == 1 && Array.isArray(month24overdue)) {
            const month24overdueLen = month24overdue[0].riskDetailValue.length > 0? month24overdue[0].riskDetailValue.length : 0
            if (month24overdueLen > Number(standards[6].autoMeasureValue)) {
              standard.push({
                creditAutoCheckMeasureId: standards[6].autoId,
                creditAutoResult: '不通过'
              })
            }
          }
        }
      }
      // 简单风险命中数量(个)(上限8个)
      this.list4 = newVal.slice(20)
      const hitListLen = this.list4.filter(it => it.hit).length
      if (hitListLen < Number(standards[2].autoMeasureValue) && standards[2].autoMeasureType == 1) {
        standard.push({
          creditAutoCheckMeasureId: standards[2].autoId,
          creditAutoResult: '失败'
        })
      }
      // 24个月多平台被拒绝数量(个)
      this.list5 = newVal.slice(10, 15)
      for (const o of this.list2) {
        if (o.riskId == 'reject_plats_24_month') {
          const month24RejectList = o.riskDetails
          if (month24RejectList !== null && Array.isArray(month24RejectList)) {
            const month24RejectList = month24RejectList[0].riskDetailValue
            if (Number(month24RejectList) > Number(standards[5].autoMeasureValue) && standards[5].autoMeasureType == 1) {
              standard.push({
                creditAutoCheckMeasureId: standards[5].autoId,
                creditAutoResult: '失败'
              })
            }
          }
        }
      }
      this.$emit('updateAutoResult', this.result.concat(standard))
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
