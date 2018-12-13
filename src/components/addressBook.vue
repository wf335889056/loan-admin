<template>
  <div class="content">
    <ul class="info-ul">
      <li v-for="item in list">
        <span class="sp1">{{item.name}}</span>
        <span class="sp2">{{item.phone}}</span>
      </li>
    </ul>
  </div>  
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>

