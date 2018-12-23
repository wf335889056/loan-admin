<template>
  <div class="content">
    <ul class="info-ul" v-if="Object.keys(risk).length > 0">
      <li>
        <span class="sp1">是否命中</span>
        <span class="sp2" :class="{'red': risk.found}">{{risk.found? '是' : '否'}}</span>
      </li>
      <li>
        <span class="sp1">欺诈分值</span>
        <span class="sp2">{{risk.score}}</span>
      </li>
      <!-- <li v-for="item in risk.risks">
        <span class="sp1">{{item.description}}</span>
        <span class="sp2">{{transitionVal(item.value)}}</span>
      </li> -->
    </ul>
    <p class="line-msg" v-else>暂无数据</p>
    <Divider>信贷反欺诈核查</Divider>
    <!-- <p class="info-p">信贷反欺诈核查</p> -->
    <Table :columns="columns" :data="risk.risks"></Table>
  </div>  
</template>

<script>
// 反欺诈
import { enTransitionCn } from '@/utils';
import test1json from '@/assets/test1.json'
export default {
  props: {
    obj: {
      type: Object,
      default: () => test1json.data.risk
    },
    standard: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {title: '风险描述', key: 'description', aglin: 'center'},
        {title: '风险等级', key: 'value', aglin: 'center'}
      ]
    }
  },
  computed: {
    risk() {
      const standardScore = this.standard.length > 0? this.standard[7] : 0
      if (this.obj['risk']) {
        const risk = this.obj.risk
        if (risk.score > Number(standardScore.autoMeasureValue) && standardScore.autoMeasureType == 1) {
          // console.log('反欺诈分偏高')
          const params = {
            creditAutoCheckMeasureId: standardScore.autoId,
            creditAutoResult: '不合格'
          }
          this.$emit('updateAutoResult', params)
        }
        return risk
      }
      return {}
    }
  },
  methods: {
    transitionVal(val) {
      return enTransitionCn(val)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
