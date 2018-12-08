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
      <li v-for="item in risk.risks">
        <span class="sp1">{{item.description}}</span>
        <span class="sp2">{{transitionVal(item.value)}}</span>
      </li>
    </ul>
    <p class="line-msg" v-else>暂无数据</p>
  </div>  
</template>

<script>
// 反欺诈
import { enTransitionCn } from '@/utils';
import test1json from '@/assets/test1.json'
export default {
  props: {
    risk: {
      type: Object,
      default: () => test1json.data.risk
    }
  },
  mounted() {
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
