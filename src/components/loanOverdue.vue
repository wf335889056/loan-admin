<template>
  <div class="content">
    <ul class="info-ul">
      <li>
        <span class="sp1">姓名</span>
        <span class="sp2">{{results.data.name}}</span>
      </li>
      <li>
        <span class="sp1">身份证</span>
        <span class="sp2">{{results.data.sfz}}</span>
      </li>
      <li>
        <span class="sp1">逾期信息</span>
        <span class="sp2">{{results.message}}</span>
      </li>
      <li>
        <span class="sp1">时间</span>
        <span class="sp2">{{results.timestamp}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      json: {
        "code": "10000",
        "charge": false,
        "remain": 1305,
        "msg": "查询成功",
        "result": {
          "data": {
              "name": "朱一文",
              "sfz": "500230********0012"
          },
          "version": "",
          "status": 1,
          "message": "当前有超过45天的逾期",
          "timestamp": "2018-05-09 14:58:09.697",
          "host": "100.105.20.99",
          "acrossTime": 4
        }
      }
    }
  },
  computed: {
    results() {
      const json = this.json
      return json.result
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
