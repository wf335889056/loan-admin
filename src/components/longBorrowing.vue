<template>
  <div class="content" style="margin-top: 0;">
    <template v-for="item in data">
      <Divider style="margin-top: 30px;">{{item.title}}</Divider>
      <Table :columns="item.key" :data="item.table"></Table>
    </template>
  </div>
</template>

<script>
// 多头借贷
import test2json from '@/assets/test2.json'
export default {
  props: {
    obj: {
      type: Object,
      default: () => test2json.data
    }
  },
  data() {
    return {
      application: [
        { title: '申请机构编号', key: 'platformCode', align: 'center' },
        { 
          title: '机构类型', 
          key: 'platform', 
          align: 'center',
          render: (h, params) => {
            const platform = Number(params.row.platform)
            return h('div', platform == 0? '全部' : platform == 1? '银行' : '非银行')
          }
        },
        { title: '申请金额/单位(万)', key: 'applicationMoney', align: 'center' },
        { title: '申请结果', key: 'applicationResult', align: 'center' },
        { title: '申请时间', key: 'applicationTime', align: 'center' }
      ],
      arrearage: [
        { title: '机构编号', key: 'platformCode', align: 'center' },
        { title: '欠款金额/单位(万)', key: 'arrearageMoney', align: 'center' }
      ],
      loanlenders: [
        { title: '放款机构编号', key: 'platformCode', align: 'center' },
        { 
          title: '机构类型', 
          key: 'platform', 
          align: 'center',
          render: (h, params) => {
            const platform = Number(params.row.platform)
            return h('div', platform == 0? '全部' : platform == 1? '银行' : '非银行')
          }
        },
        { title: '放款金额', key: 'loanlendersMoney', align: 'center' },
        { title: '放款时间', key: 'loanlendersTime', align: 'center' }
      ],
      overdue: [
        { title: '机构编号', key: 'platformCode', align: 'center' },
        { title: '逾期金额/单位(万)', key: 'overdueMoney', align: 'center' },
        { title: '逾期次数', key: 'overdueCounts', align: 'center' },
        { title: '逾期时间', key: 'overdueTime', align: 'center' }
      ],
      registration: [
        { title: '注册机构编号', key: 'platformCode', align: 'center' },
        { 
          title: '机构类型', 
          key: 'platform', 
          align: 'center',
          render: (h, params) => {
            const platform = Number(params.row.platform)
            return h('div', platform == 0? '全部' : platform == 1? '银行' : '非银行')
          }
        },
        { title: '注册时间', key: 'registerTime', align: 'center' }
      ],
      rejection: [
        { title: '驳回机构编号', key: 'platformCode', align: 'center' },
        { 
          title: '机构类型', 
          key: 'platform', 
          align: 'center',
          render: (h, params) => {
            const platform = Number(params.row.platform)
            return h('div', platform == 0? '全部' : platform == 1? '银行' : '非银行')
          }
        },
        { title: '驳回时间', key: 'rejectionTime', align: 'center' }
      ]
    }
  },
  mounted() {
    // console.log(test2json)
  },
  computed: {
    data() {
      const arrs = []
      // console.log(this.obj)
      for (const i in this.obj) {
        if (Array.isArray(this.obj[i])) {
          arrs.push({
            key: this[i],
            title: this.transitionVal(i),
            table: this.obj[i] == null? [] : this.obj[i]
          })
        }
      }
      return arrs
    }
  },
  methods: {
    transitionVal(val) {
      switch(val) {
        case 'application' :
        return '申请贷款信息'
        case 'arrearage' :
        return '欠款信息'
        case 'loanlenders' :
        return '放款信息'
        case 'overdue' :
        return '逾期信息'
        case 'registration' :
        return '注册信息'
        case 'rejection' :
        return '拒绝信息'
        default :
        return 'default'
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

