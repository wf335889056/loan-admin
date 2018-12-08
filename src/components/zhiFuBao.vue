<template>
  <div class="content">
    <ul class="info-ul" v-if="Object.keys(zfbInfo).length > 0">
      <li>
        <span class="sp1">支付宝编号</span>
        <span class="sp2">{{zfbInfo.user_id}}</span>
      </li>
      <li>
        <span class="sp1">省份名称</span>
        <span class="sp2">{{zfbInfo.province}}</span>
      </li>
      <li>
        <span class="sp1">市名称</span>
        <span class="sp2">{{zfbInfo.city}}</span>
      </li>
      <li>
        <span class="sp1">支付宝昵称</span>
        <span class="sp2">{{zfbInfo.nick_name}}</span>
      </li>
      <li>
        <span class="sp1">是否是学生</span>
        <span class="sp2">{{zfbInfo.is_student_certified == 'T'? '是' : '否'}}</span>
      </li>
      <li>
        <span class="sp1">用户类型</span>
        <span class="sp2">{{zfbInfo.user_type == 1? '公司账户' : '个人账户'}}</span>
      </li>
       <li>
        <span class="sp1">用户状态</span>
        <span class="sp2">{{zfbInfo.user_status == 'T'? '已认证用户 ' : zfbInfo.user_status == 'Q'? '快速注册用户' : zfbInfo.user_status == 'B'? '被冻结账户' : '已注册，未激活的账户'}}</span>
      </li>
       <li>
        <span class="sp1">是否通过实名认证</span>
        <span class="sp2">{{zfbInfo.is_certified == 'T'? '是' : '否'}}</span>
      </li>
       <li>
        <span class="sp1">性别</span>
        <span class="sp2">{{zfbInfo.gender == 'F'? '女性' : '男性'}}</span>
      </li>
    </ul>
    <p class="line-msg" v-else>暂无数据</p>
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
      json: {
        "alipay_user_info_share_response": {
          "code": "10000",
          "msg": "Success",
          "user_id": "2088102104794936",
          "avatar": "http://tfsimg.alipay.com/images/partner/T1uIxXXbpXXXXXXXX",
          "province": "安徽省",
          "city": "安庆",
          "nick_name": "支付宝小二",
          "is_student_certified": "T",
          "user_type": "1",
          "user_status": "T",
          "is_certified": "T",
          "gender": "F"
        },
        "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
      }
    }
  },
  computed: {
    zfbInfo() {
      return this.json.alipay_user_info_share_response || {}
    }
  }
}
</script>

<style lang="less" scoped>

</style>
