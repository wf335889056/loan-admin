<template>
  <div class="content">
    <p class="line-msg">{{validateMsg}}</p>
  </div>
</template>

<script>
// 三网手机二要素验证
export default {
  props: {
    obj: {
      type: Object
    }
  },
  computed: {
    validateMsg() {
      return this.obj.validateMsg
    }
  }
}
</script>

<style lang="less" scoped>

</style>
