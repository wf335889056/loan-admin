<template>
  <div class="content">
    <ul class="info-ul" style="margin-bottom: 30px;">
      <li v-for="item in objData">
        <span class="sp1">{{item.key}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <Table :columns="columns" :data="listData"></Table>
  </div>
</template>

<script>
// 多头负债
import test3json from '@/assets/test3.json'
export default {
  props: {
    obj: {
      type: Object,
      default: () => test3json.data
    }
  },
  data() {
    return {
      columns: [
        { 
          title: '借款类型', 
          key: 'borrowType', 
          align: 'center',
          render: (h, params) => {
            const n = Number(params.row.borrowType)
            return h('div', n == 1? '个人信贷' : n == 2? '个人抵押' : n == 3? '企业信贷' : n == 4? '企业抵押' : '未知')
          }
        },
        { 
          title: '借款状态', 
          key: 'borrowState', 
          align: 'center',
          render: (h, params) => {
            const n = Number(params.row.borrowState)
            return h('div', n == 1? '拒贷' : n == 2? '批贷已放款' : n == 3? '待放款' : n == 4? '借款人放弃申请' : n == 5? '审核中' : n == 6? '待放款' : '未知')
          }
        },
        { 
          title: '合同金额', 
          key: 'borrowAmount', 
          align: 'center',
          render: (h, params) => {
            const n = Number(params.row.borrowAmount)
            return h('div', n == 1? '[1,2)' : n == 2? '[2,4)' : n == 3? '[4,6)' : n == 4? '[6,8)……' : n == -1? '[0.8,1)' : n == -2?'[0.6,0.8)' : n == -3? '[0.4,0.6)' : n == -4? '[0.3,0.4)' : n == -5? '[0.2,0.3)' : n == -6? '[0.1,0.2)' : n == -7? '[0,0.1)' : '未知')
          }
        },
        { title: '合同时期', key: 'contractDate', align: 'center' },
        { title: '批贷期数', key: 'loanPeriod', align: 'center' },
        { 
          title: '还款状态', 
          key: 'repayState', 
          align: 'center',
          render: (h, params) => {
            const n = Number(params.row.repayState)
            return h('div', n == 1? '正常' : n == 2? 'M1' : n == 3? 'M2' : n == 4? 'M3' : n == 5? 'M4' : n == 6? 'M5' : n == 7? 'M6' : n == 8? 'M6+' : n == 9? '已还清' : '未知')
          }
        },
        { title: '逾期金额', key: 'arrearsAmount', align: 'center' },
        { 
          title: '公司代码', 
          key: 'companyCode', 
          align: 'center',
          render: (h, params) => {
            const str = params.row.companyCode
            // console.log(str)
            if (str.includes('P2P') > 0) {
              return h('div', str + '不作为具体公司标识仅作为参与反馈公司的标示可以用于识别反馈公司的数量')
            } else if (str.includes('人人催') > 0) {
              return h('div', '这类数据是经过催收的人员名单')
            } else if (str.includes('风险名单') > 0) {
              return h('div', '这类数据是由人人催系统提供的风险预警名单表示客户存在风险')
            }
          }
        }
      ]
    }
  },
  mounted() {
  },
  computed: {
    objData() {
      const arrs = []
      for (const i in this.obj) {
        if (i != 'loanInfos') {
          arrs.push({
            key: this.transitionVal(i),
            value: this.obj[i] == 'false'? '否' : this.obj[i] == 'true'? '是' : this.obj[i]
          })
        }
      }
      return arrs
    },
    listData() {
      // console.log(this.obj['loanInfos'])
      return this.obj['loanInfos']? this.obj['loanInfos'] : []
    }
  },
  methods: {
    transitionVal(val) {
      switch(val) {
        case 'trxNo' :
        return '交易代码'
        case 'appNumber' :
        return '总记录条数'
        case 'overdue' :
        return '是否存在逾期记录'
        case 'totalAmount' :
        return '放款总金额'
        default :
        return 'default'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
