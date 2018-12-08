<template>
  <div class="content">
    <Divider>基本信息</Divider>
    <ul class="info-ul">
      <li v-for="item in userInfo">
        <span class="sp1">{{transitionKey(item.key)}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <Divider>手机号基本信息</Divider>
    <ul class="info-ul">
      <li v-for="item in phoneInfo">
        <span class="sp1">{{transitionKey(item.key)}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <Divider>月使用情况（按月汇总,汇总近6个月的）</Divider>
    <Table :columns="columns1" :data="cellBehaviors"></Table>
    <Divider>社交圈分析</Divider>
    <p class="info-p">朋友圈联系人数量</p>
    <ul class="info-ul">
      <li v-for="item in summary">
        <span class="sp1">{{transitionKey(item.key)}}</span>
        <span class="sp2">{{item.value}}</span>
      </li>
    </ul>
    <p class="info-p">朋友圈近6月（0-180天）联系人</p>
    <Table :columns="columns2" :data="peerNumlist"></Table>
    <p class="info-p">朋友圈近6月（0-180天）通话地</p>
    <Table :columns="columns3" :data="locationToplist"></Table>
    <Divider>通话详单（近6月）</Divider>
    <Table :columns="columns4" :data="callContactDetail"></Table>
  </div>
</template>

<script>
import json5dData from '@/assets/test5.json'
export default {
  props: {
    obj: {
      type: Object,
      // default: () => json5dData.data
    }
  },
  data() {
    return {
      columns1: [
        { title: '月份', key: 'cell_mth', align: 'center' },
        { title: '短信次数', key: 'sms_cnt', align: 'center' },
        { title: '流量使用', key: 'net_flow', align: 'center' },
        { title: '消费金额', key: 'total_amount', align: 'center' },
        { title: '通话次数', key: 'call_cnt', align: 'center' },
        { title: '通话时长(秒)', key: 'call_time', align: 'center' },
        { title: '主叫次数', key: 'dial_cnt', align: 'center' },
        { title: '主叫时长(秒)', key: 'dial_time', align: 'center' },
        { title: '被叫次数', key: 'dialed_cnt', align: 'center' },
        { title: '被叫时长(秒)', key: 'dialed_time', align: 'center' },
        { title: '充值次数', key: 'rechange_cnt', align: 'center' },
        { title: '充值金额()', key: 'rechange_amount', align: 'center' }
      ],
      columns2: [
        { title: '对方号码', key: 'peer_number', align: 'center' },
        { title: '通话地', key: 'peer_num_loc', align: 'center' },
        { title: '号码类型', key: 'group_name', align: 'center' },
        { title: '号码标识', key: 'company_name', align: 'center' },
        { title: '通话次数', key: 'call_cnt', align: 'center' },
        { title: '通话时长(秒)', key: 'call_time', align: 'center' },
        { title: '主叫次数', key: 'dial_cnt', align: 'center' },
        { title: '主叫时长(秒)', key: 'dial_time', align: 'center' },
        { title: '被叫次数', key: 'dialed_cnt', align: 'center' },
        { title: '被叫时长(秒)', key: 'dialed_time', align: 'center' }
      ],
      columns3: [
        { title: '通话地', key: 'location', align: 'center' },
        { title: '通话号码数', key: 'peer_number_cnt', align: 'center' },
        { title: '通话次数', key: 'call_cnt', align: 'center' },
        { title: '通话时长（秒）', key: 'call_time', align: 'center' },
        { title: '主叫次数', key: 'dial_cnt', align: 'center' },
        { title: '被叫次数', key: 'dialed_cnt', align: 'center' },
        { title: '主叫时长(秒)', key: 'dial_time', align: 'center' },
        { title: '被叫时长（秒）', key: 'dialed_time', align: 'center' }
      ],
      columns4: [
        { title: '联系人号码', key: 'peer_num', align: 'center' },
        // { title: '与联系人关系', key: 'p_relation', align: 'center' },
        { title: '通话地', key: 'city', align: 'center' },
        { title: '号码类型', key: 'group_name', align: 'center' },
        { title: '号码标识', key: 'company_name', align: 'center' },
        { title: '近1周（最近7天）通话次数', key: 'call_cnt_1w', align: 'center' },
        { title: '近1月（最近30天）通话次数', key: 'call_cnt_1m', align: 'center' },
        { title: '近3月（最近0-90天）通话次数', key: 'call_cnt_3m', align: 'center' },
        { title: '近6月（最近0-180天）通话次数', key: 'call_cnt_6m', align: 'center' },
        { title: '近3月通话时长（秒）', key: 'call_time_3m', align: 'center' },
        { title: '近6月通话时长（秒）', key: 'call_time_6m', align: 'center' },
        { title: '近3月工作日是否全天联系', key: 'call_if_whole_day_3m', align: 'center',
        render: (h, params) => {
          return h('div', params.row.call_if_whole_day_3m? '是' : '否')
        } },
        { title: '近6月工作日是否全天联系', key: 'call_if_whole_day_6m', align: 'center',
        render: (h, params) => {
          return h('div', params.row.call_if_whole_day_6m? '是' : '否')
        } },
        { title: '最后一次通话时间', key: 'trans_end', align: 'center' }
      ]
    }
  },
  computed: {
    userInfo() {
      return this.obj.user_basic
    },
    phoneInfo() {
      return this.obj.cell_phone
    },
    cellBehaviors() {
      return this.obj.cell_behavior[0].behavior
    },
    summary() {
      return this.obj.friend_circle.summary
    },
    peerNumlist() {
      return this.obj.friend_circle.peer_num_top_list[1].top_item
    },
    locationToplist() {
      return this.obj.friend_circle.location_top_list[1].top_item
    },
    callContactDetail() {
      return this.obj.call_contact_detail
    }
  },
  mounted() {
    // console.log(json5dData)
  },
  methods: {
    transitionKey(n) {
      switch(n) {
        case 'name':
        return '姓名'
        case 'id_card':
        return '身份证号码'
        case 'gender':
        return '性别'
        case 'age':
        return '年龄'
        case 'constellation':
        return '星座'
        case 'province':
        return '所属省'
        case 'city':
        return '所属市'
        case 'region':
        return '所属县'
        case 'native_place':
        return '籍贯'
        case 'mobile':
        return '手机号码'
        case 'carrier_name':
        return '用户姓名'
        case 'carrier_idcard':
        return '用户身份证号码'
        case 'reg_time':
        return '开户时间'
        case 'in_time':
        return '开户时长'
        case 'email':
        return '邮箱'
        case 'address':
        return '地址'
        case 'reliability':
        return '是否实名'
        case 'phone_attribution':
        return '手机号码归属地'
        case 'live_address':
        return '居住地址'
        case 'available_balance':
        return '余额'
        case 'package_name':
        return '套餐'
        case 'bill_certification_day':
        return '账单认证日期'
        case 'friend_num_3m':
        return '近3月朋友联系数量'
        case 'good_friend_num_3m':
        return '近3月好朋友联系数量（联系10次以上）'
        case 'friend_city_center_3m':
        return '近3月朋友圈中心城市'
        case 'is_city_match_friend_city_center_3m':
        return '近3月朋友圈中心地是否与手机归属地一致'
        case 'inter_peer_num_3m':
        return '近3月互通电话号码数目'
        case 'friend_num_6m':
        return '近6月朋友联系数量'
        case 'good_friend_num_6m':
        return '近6月好朋友联系数量（联系10次以上）'
        case 'friend_city_center_6m':
        return '近6月朋友圈中心城市'
        case 'is_city_match_friend_city_center_6m':
        return '近6月朋友圈中心地是否与手机归属地一致'
        case 'inter_peer_num_6m':
        return '近6月互通电话号码数目'
        default: 
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
