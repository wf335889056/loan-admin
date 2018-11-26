<template>
  <div class="content">
    <p class="line-msg">{{validateMsg}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonData: {"code":200,"msg":"成功","data":{"name":"田晓徵","mobile":"13180050758","validateCode":1,"validateMsg":"认证一致"}}
    }
  },
  computed: {
    validateMsg() {
      return this.jsonData.data.validateMsg
    }
  }
}
</script>

<style lang="less" scoped>

</style>
