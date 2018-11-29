<template>
  <div class="tab-box">
    <Tabs type="card" @on-click="handleClick" v-model="tabsName">
      <TabPane v-for="(item, index) in tabs" :label="item.title" :key="item.id" :name="String(index)">
        <antiFraud v-if="item.id == 2" :risk="customInfo.antiFraud" />
        <longDebt v-if="item.id == 4" />
        <longBorrowing v-if="item.id == 5" />
        <networkPhoneThree v-if="item.id == 11" />
        <beforeLoadRisk v-if="item.id == 3" />
        <breakFaith v-if="item.id == 7" />
        <loanOverdue v-if="item.id == 8" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { thirdPartyVerification } from '@/utils'
import antiFraud from './antiFraud.vue'
import longBorrowing from './longBorrowing.vue'
import longDebt from './longDebt.vue'
import networkPhoneThree from './networkPhone3.vue'
import beforeLoadRisk from './beforeLoadRisk.vue'
import breakFaith from './breakFaith.vue'
import loanOverdue from './loanOverdue'
export default {
  components: { antiFraud, longBorrowing, longDebt, networkPhoneThree, beforeLoadRisk, breakFaith, loanOverdue },
  props: {
    userCustom: {
      type: Object
    },
    customInfo: {
      type: Object
    }
  },
  data() {
    return {
      tabs: thirdPartyVerification(),
      tabsName: '0'
    }
  },
  mounted() {
    console.log(this.customInfo)
  },
  methods: {
    handleClick(name) {
      const index = Number(name)
      if (index > 2) {
        this.$Modal.warning({
          title: '收费提示',
          content: '此内容资料将要进行收费, 是否继续浏览?',
          onOk: () => {
            console.log('watch')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
