<template>
  <div>
    <ul class="ul-box">
      <li v-for="item in optionsList" :key="item.id" :class="{'active': item.checked}" @click="handleToggle(item)">
        <Icon type="md-checkbox" v-if="item.checked" />
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { thirdPartyVerification } from '@/utils'
  export default {
    props: {
      checkedList: {
        type: Array
      }
    },
    data() {
      return {
        options: thirdPartyVerification()
      }
    },
    computed: {
      optionsList() {
        const options = this.options
        for (const o of options) {
          this.checkedList.forEach(it => {
            if (it.checked && it.id == o.id) {
              o.checked = true
            }
          })
        }
        return options
      }
    },
    methods: {
      handleToggle(item) {
        item.checked = !item.checked
        const list = this.options.filter(it => it.checked)
        this.$emit('update', list)
      }
    }
  }
</script>

<style lang="less" scoped>
  .ul-box{
    li {
      display: inline-block;
      padding: 10px 15px;
      color: #4081e9;
      background-color: #fff;
      font-size: 16px;
      line-height: 20px;
      cursor: pointer;
      border: 1px solid #4081e9;
      margin: 10px;
      &.active {
        color: #fff;
        background-color: #4081e9;
      }
    }
  }
</style>
