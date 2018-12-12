<template>
  <div class="content">
    <p class="info-p">财富信息</p>
    <ul class="info-ul">
      <li v-for="item in wealthInfo">
        <span class="sp1">{{item.key}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <p class="info-p">地址分析</p>
    <ul class="info-ul">
      <li v-for="item in addressAnalysis.fundamentalPointAnalysis">
        <span class="sp1">{{item.key}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <!-- <p class="info-p">常用地址</p>
    <Table :columns="columns" :data="addressAnalysis.fommonlyUsedAddress"></Table> -->
    <p class="info-p">总体消费</p>
    <ul class="info-ul">
      <li v-for="item in consumptionAnalysis">
        <span class="sp1">{{item.key}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object
    }
  },
  data() {
    return {
      columns: [
        { title: '收货地址', key: 'deliverAddress', align: 'center' },
        { title: '收货城市', key: 'deliverCity', align: 'center' },
        { title: '地址类型', key: 'deliverAddressType', align: 'center' },
        { title: '最近一次订单月数差', key: 'useMonth', align: 'center' },
        { title: '最近一次订单天数差', key: 'lastDeliverPastCur', align: 'center' },
        { title: '最近一次订单', key: 'lastDeliverTime', align: 'center' },
        { title: '收货人姓名', key: 'deliverName', align: 'center' },
        { title: '收货人电话号码', key: 'deliverPhone', align: 'center' },
        { title: '订单金额之和', key: 'deliverAmt', align: 'center' }
      ]
    }
  },
  computed: {
    wealthInfo() {
      const arrs = []
      if (this.obj.hasOwnProperty('wealthInfo')) {
        const totalssets = this.obj.wealthInfo.totalssets
        for (const i in totalssets) {
          arrs.push({
            key: this.transitionKey(i),
            value: totalssets[i]
          })
        }
      }
      return arrs
    },
    addressAnalysis() {
      const arrs = []
      if (this.obj.hasOwnProperty('addressAnalysis')) {
        const temp = this.obj.addressAnalysis
        for (const i in temp.fundamentalPointAnalysis) {
          arrs.push({
            key: this.transitionKey(i),
            value: temp.fundamentalPointAnalysis[i]
          })
        }
        return {
          fommonlyUsedAddress: temp.commonlyUsedAddress && temp.commonlyUsedAddress.length > 0? temp.commonlyUsedAddress.length : [],
          fundamentalPointAnalysis: arrs
        }
      }
      return {
        fommonlyUsedAddress: [],
        fundamentalPointAnalysis: arrs
      }
    },
    consumptionAnalysis() {
      const arrs = []
      if (this.obj.hasOwnProperty('consumptionAnalysis')) {
        const temp = this.obj.consumptionAnalysis.totalConsumption
        if (temp && temp.totalConsumAmt) {
          for (const i in temp.totalConsumAmt) {
            if (i != 'sum') {
              arrs.push({
                key: i,
                value: temp.totalConsumAmt[i]
              })
            }
          }
        }
      }
      return arrs
    }
  },
  methods: {
    transitionKey(n) {
      switch(n) {
        case 'balance':
        return '支付宝账户余额金额'
        case 'yueEBaoAmt':
        return '余额宝账户金额'
        case 'totalProfit':
        return '支付宝历史累计收益金额'
        case 'huaiBeiLimit':
        return '用户花呗的授信额度'
        case 'huaiBeiCanUseLimit':
        return '用户花呗的可用授信额度'
        case 'selfAddressChange': 
        return '用户本人收货的地址的数量判断'
        case 'selfCityChange': 
        return '用户本人收货地址对应的城市数量判断'
        case 'nonselfAddressChange': 
        return '用户本人为收货人的地址数量判断'
        case 'selfAddressCnt': 
        return '已完成的订单'
        case 'avgSelfAddressCnt': 
        return '本人收货订单数量/本人使用地址数量'
        case 'selfCityCnt': 
        return '本人的订单中，地址中的不同城市数量'
        case 'avgSelfCityCnt': 
        return '本人收货订单数量/本人使用地址的城市数量'
        case 'nonselfAddressCnt': 
        return '收货人姓名不是其本人的订单中，不同地址的数量'
        case 'avgNonselfAddressCnt': 
        return '非本人收货订单数量/非本人收件人使用地址数量'
        default: 
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
