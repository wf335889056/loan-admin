<template>
  <div>
    <Form :model="form" :label-width="150" style="text-align: left;">
      <FormItem label="渠道名:">
        <Input v-model="form.channelName" size="large" clearable></Input>
      </FormItem>
      <FormItem label="渠道简称:">
        <Input v-model="form.channelNameShort" size="large" clearable></Input>
      </FormItem>
      <FormItem label="公司全称:">
        <Input v-model="form.channelCompanyName" size="large" clearable></Input>
      </FormItem>
      <FormItem label="业务类型:">
        <Input v-model="form.channelBusinessType" size="large" clearable></Input>
      </FormItem>
      <FormItem label="渠道管理员:">
        <template v-for="(item, index) in admins">
          <div style="margin-bottom: 20px;">
            <Select v-model="item.userId" size="large" style="width: 60%;" >
              <Option v-for="item in options1" :value="item.userId" :key="item.userId" :label="item.userName"></Option>
            </Select>
            <Button type="error" shape="circle" icon="ios-trash-outline" @click="handleDelete(admins, index)"></Button>
          </div>
        </template>
        <button class="btn-add" @click.stop.prevent="handleAddAdmins">新增</button>
      </FormItem>
      <FormItem label="产品ID:">
        <template v-for="(item, index) in products">
          <div style="margin-bottom: 20px;">
            <Select v-model="item.channelProductId" size="large" style="width: 60%;" >
              <Option v-for="item in options2" :value="item.userId" :key="item.userId" :label="item.userName"></Option>
            </Select>
            <Button type="error" shape="circle" icon="ios-trash-outline" @click="handleDelete(products, index)"></Button>
          </div>
        </template>
        <button class="btn-add" @click.stop.prevent="handleAddProducts">新增</button>
      </FormItem>
      <FormItem label="联系人:">
        <template v-for="(item, index) in contacts">
          <div style="margin-bottom: 20px;">
            <Input v-model="item.linkmanName" size="large" clearable placeholder="联系人姓名" style="width: 30%;"></Input>
            <Input v-model="item.linkmanPhone" size="large" clearable placeholder="联系人电话号码" style="width: 30%;"></Input>
            <Button type="error" shape="circle" icon="ios-trash-outline" @click="handleDelete(contacts, index)"></Button>
          </div>
        </template>
        <p style="text-align: left; font-size: 18px;margin-bottom: 10px; color: red;">*联系人手机会收到订单短信通知。</p>
        <button class="btn-add" @click.stop.prevent="handleAddContacts">新增联系人</button>
      </FormItem>
    </Form>
  </div>  
</template>

<script>
import { getAccountListAndMsg } from '@/utils/api'
export default {
  props: {
    form: {
      type: Object,
      default: {}
    },
    admins: {
      type: Array
    },
    products: {
      type: Array
    },
    contacts: {
      type: Array
    }
  },
  data() {
    return {
      options1: [],
      options2: []
    }
  },
  beforeMount() {
    this.fetchAccountListAndMsg()
  },
  mounted() {
    
  },
  methods: {
    handleAddAdmins() {
      this.admins.push('')
    },
    handleAddProducts() {
      this.products.push({
        channelProductId: ''
      })
    },
    handleAddContacts() {
      this.contacts.push({
        linkmanName: '',
        linkmanPhone: ''
      })
    },
    handleDelete(list, index) {
      list.splice(index, 1)
    },
    fetchAccountListAndMsg() {
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        type: 2,
        userId: '',
        limit: 0,
        page: 0
      }
      getAccountListAndMsg(params).then(res => {
        if (res.state == 1) {
          this.options1 = res.info.userAccountList
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-add {
    display: block;
    clear: both;
    overflow: hidden;
    background: transparent;
    height: 50px;
    line-height: 50px;
    color: #4A90E2;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
    border: 0;
    outline: 0;
    &:hover {
      color: #49a9ee;
    }
  }
</style>
