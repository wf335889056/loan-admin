<template>
    <div class="container">
      <Spin fix>
        <Icon type="ios-loading" :size="40" class="demo-spin-icon-load"></Icon>
      </Spin>
    </div>
</template>
<script>
  import bridge from '@/utils/bridge'
  export default {
    beforeMount() {
      this.mobile = this.$route.query.mobile
      this.taskId = this.$route.query.taskId
      this.type = this.$route.query.type
    },
    mounted() {
      const res = {
        mobile: this.mobile,
        taskId: this.taskId,
        type: this.type
      }
      bridge.callhandler(res, () => {
        console.log('==============>>>')
        console.log(res)
        console.log('<<<==============')
      })
    }
  }
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: #fff;
  }
  .demo-spin-icon-load{
  	animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
  	from { transform: rotate(0deg);}
  	50%  { transform: rotate(180deg);}
  	to   { transform: rotate(360deg);}
  }
</style>
