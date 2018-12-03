<template>
  <div class="tab-box">
    <Tabs type="card" @on-click="handleClick" v-model="tabsName">
      <TabPane v-for="(item, index) in tabs" :label="item.title" :key="item.id" :name="String(index)">
        <operator v-if="item.id == 12" />
        <antiFraud v-if="item.id == 2" :risk="customInfo.antiFraud" />
        <longDebt v-if="item.id == 4" :obj="id4Data" />
        <longBorrowing v-if="item.id == 5" :obj="id5Data" />
        <!-- <networkPhoneThree v-if="item.id == 11" :obj="id11Data" /> -->
        <beforeLoadRisk v-if="item.id == 3" :obj="id3Data" />
        <breakFaith v-if="item.id == 7" :obj="id7Data" />
        <loanOverdue v-if="item.id == 8" :obj="id8Data" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { thirdPartyVerification } from '@/utils'
import { getThirdPartyMsg } from '@/utils/thirdPartyApi'
import antiFraud from './antiFraud.vue'
import longBorrowing from './longBorrowing.vue'
import longDebt from './longDebt.vue'
import networkPhoneThree from './networkPhone3.vue'
import beforeLoadRisk from './beforeLoadRisk.vue'
import breakFaith from './breakFaith.vue'
import loanOverdue from './loanOverdue'
import operator from './operator'

export default {
  components: { antiFraud, longBorrowing, longDebt, networkPhoneThree, beforeLoadRisk, breakFaith, loanOverdue, operator },
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
      tabsName: '0',
      id4Data: {},
      id5Data: {},
      id11Data: {},
      id3Data: {},
      id7Data: {},
      id8Data: {} 
    }
  },
  mounted() {
    // console.log(this.customInfo)
  },
  methods: {
    handleClick(name) {
      const index = Number(name)
      const id = this.tabs[index].id
      if (id == 4 && Object.keys(this.id4Data).length != 0) return
      if (id == 5 && Object.keys(this.id5Data).length != 0) return
      if (id == 11 && Object.keys(this.id11Data).length != 0) return
      if (id == 3 && Object.keys(this.id3Data).length != 0) return
      if (id == 7 && Object.keys(this.id7Data).length != 0) return
      if (id == 8 && Object.keys(this.id8Data).length != 0) return
      if (index > 2) {
        this.$Modal.warning({
          title: '收费提示',
          content: '此内容资料将要进行收费, 是否继续浏览?',
          onOk: () => {
            // console.log('watch')
            this.fetchThirdPartyMsg(id)
          }
        })
      }
    },
    fetchThirdPartyMsg(id) {
      const params = {
        phone: this.userCustom.phone,
        idcard: this.userCustom.idcard,
        userName: this.userCustom.customerName,
        userAppId: this.userCustom.userAppId,
        id
      }
      getThirdPartyMsg(params).then(res => {
        if (res.state == 1) {
          // console.log(res.info.jsonObject)
          const data = JSON.parse(res.info.jsonObject)
          console.log(data)
          if (id == 4) {
            this.id4Data = data.data
          } else if (id == 5) {
            this.id5Data = data.data
          } else if (id == 11) {
            this.id11Data = data.data
          } else if (id == 3) {
            this.id3Data = data.data
          } else if (id == 7) {
            this.id7Data = data.data
          } else if (id == 8) {
            this.id8Data = typeof data.result == 'object'? data.result : {}
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
