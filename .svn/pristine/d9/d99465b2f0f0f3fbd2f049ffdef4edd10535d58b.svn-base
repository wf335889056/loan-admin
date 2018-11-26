<template>
  <div class="tab-box">
    <Tabs type="card" @on-click="handleClick" v-model="tabsName">
      <TabPane v-for="(item, index) in tabs" :label="item.title" :key="item.id" :name="String(index)">
        <antiFraud v-if="item.id == 2" />
        <longDebt v-if="item.id == 4" />
        <longBorrowing v-if="item.id == 5" />
        <networkPhoneThree v-if="item.id == 11" />
        <beforeLoadRisk v-if="item.id == 3" />
        <breakFaith v-if="item.id == 7" />
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
export default {
  components: { antiFraud, longBorrowing, longDebt, networkPhoneThree, beforeLoadRisk, breakFaith },
  data() {
    return {
      tabs: thirdPartyVerification(),
      tabsName: '0'
    }
  },
  mounted() {
  },
  methods: {
    handleClick(name) {
      const index = Number(name)
      if (index > 1) {
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
