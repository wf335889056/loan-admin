<template>
  <div class="tab-box">
    <Tabs type="card" @on-click="handleClick" v-model="tabsName">
      <TabPane v-for="(item, index) in tabs" :label="item.title" :key="item.id" :name="String(index)">
        <operator v-if="item.id == 12" :obj="customInfo.operator" />
        <antiFraud v-if="item.id == 2" :risk="id2Data"/>
        <longDebt v-if="item.id == 4" :obj="id4Data" />
        <longBorrowing v-if="item.id == 5" :obj="id5Data" />
        <!-- <networkPhoneThree v-if="item.id == 11" :obj="id11Data" /> -->
        <beforeLoadRisk v-if="item.id == 3" :obj="id3Data" />
        <breakFaith v-if="item.id == 7" :obj="id7Data" />
        <loanOverdue v-if="item.id == 8" :obj="id8Data" />
        <publicSecurity v-if="item.id == 6" :obj="id6Data" />
        <taoBao v-if="item.id == 14" :obj="customInfo.taoBao" />
        <jingDong v-if="item.id == 13" :obj="customInfo.jingDong" />
        <addressBook v-if="item.id == 17" :list="customInfo.addressBook" />
        <zhiFuBao v-if="item.id == 16" :obj="customInfo.zhiFuBao" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { thirdPartyVerification } from '@/utils'
import { getThirdPartyMsg, getThirdPartyVerify } from '@/utils/thirdPartyApi'
import antiFraud from './antiFraud.vue'
import longBorrowing from './longBorrowing.vue'
import longDebt from './longDebt.vue'
import networkPhoneThree from './networkPhone3.vue'
import beforeLoadRisk from './beforeLoadRisk.vue'
import breakFaith from './breakFaith.vue'
import loanOverdue from './loanOverdue'
import operator from './operator'
import publicSecurity from './publicSecurity'
import taoBao from './taobao'
import jingDong from './jingdong'
import addressBook from './addressBook'
import zhiFuBao from './zhiFuBao'
export default {
  components: { antiFraud, longBorrowing, longDebt, networkPhoneThree, beforeLoadRisk, breakFaith, 
  loanOverdue, operator, publicSecurity, taoBao, jingDong, addressBook, zhiFuBao },
  props: {
    options: {
      type: Array
    },
    userCustom: {
      type: Object
    },
    customInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tabsName: '0',
      id2Data: {},
      id4Data: {},
      id5Data: {},
      id6Data: {},
      id11Data: {},
      id3Data: {},
      id7Data: {},
      id8Data: {},
      id13Data: {
        wealthInfo: {},
        addressAnalysis: {},
        consumptionAnalysis: {}
      },
      id14Data: {
        wealthInfo: {},
        addressAnalysis: {},
        consumptionAnalysis: {}
      },
      id16Data: {}
    }
  },
  computed: {
    tabs() {
      const arrs = thirdPartyVerification()
      const tabs = []
      if (!this.options) {
        return arrs
      } else {
        for (const o of arrs) {
          for (let i = 0; i < this.options.length; i++) {
            if (o.id == this.options[i]) {
              tabs.push(o)
            }
          }
        }
        return tabs
      }
    }
  },
  methods: {
    handleClick(name) {
      console.log(this.userCustom)
      const index = Number(name)
      const id = this.tabs[index].id
      if (id == 17 || id == 12 || id == 13 || id == 14 || id == 16) return
      if (id == 4 && Object.keys(this.id4Data).length != 0) return
      if (id == 5 && Object.keys(this.id5Data).length != 0) return
      if (id == 11 && Object.keys(this.id11Data).length != 0) return
      if (id == 3 && Object.keys(this.id3Data).length != 0) return
      if (id == 7 && Object.keys(this.id7Data).length != 0) return
      if (id == 8 && Object.keys(this.id8Data).length != 0) return
      if (id == 13 && Object.keys(this.id13Data).length != 3) return
      if (id == 14 && Object.keys(this.id14Data).length != 3) return
      const params = {
        id,
        userAppId: this.userCustom.userAppId,
        phone: this.userCustom.phone,
        idcard: this.userCustom.idcard,
        userName: this.userCustom.customerName,
        companyId: this.$store.getters.userInfo.companyId,
        userId: this.$store.getters.userInfo.userId
      }
      getThirdPartyVerify(params).then(res => {
        if (res.state == 1) {
          if (res.info.type == 1) {
            this.$Modal.confirm({
              title: '收费提示',
              content: '此内容资料将要进行收费, 是否继续浏览? (仅首次查询收费)',
              onOk: () => {
                this.fetchThirdPartyMsg(id)
              }
            })
          } else if (res.info.type == 0) {
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
            } else if (id == 2) {
              this.id2Data = data.data.risk
            } else if (id ==6) {
              this.id6Data = data.data
            }
          }
        }
      })
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
          let data
          try {
            data = JSON.parse(res.info.jsonObject)
          } catch (e) {
            return
          }
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
          } else if (id == 2) {
            this.id2Data = data.data.risk
          } else if (id ==6) {
            this.id6Data = data.data
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
