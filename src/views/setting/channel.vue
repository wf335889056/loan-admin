<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增渠道</Button>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick" @on-selection-change="handleSelectChange"></Table>
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="新增渠道" v-model="drawerShow" width="80" class="drawer">
      <div class="detail">
        <div class="form">
          <Divider>第一步</Divider>
          <p class="title"><Tag color="warning">设置渠道商基本信息</Tag></p>
          <newChannel :form="formChannel" />
        </div>
      </div>
      <div class="footer">
        <Button size="default" type="primary" class="btn" @click="handleSubmit">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import newChannel from '@/components/newChannel.vue'
export default {
  components: { newChannel },
  data() {
    return {
      formChannel: {},
      list: [{ name: 12313 }],
      loading: true,
      page: 1,
      columns: [
        { title: '渠道编号', key: 'name', align: 'center' },
        { title: '状态', key: 'name', align: 'center' },
        { title: '渠道名称', key: 'name', align: 'center' },
        { title: '已添加产品', key: 'name', align: 'center' },
        { title: '业务类型', key: 'name', align: 'center' },
        { title: '创建人', key: 'name', align: 'center' },
        { title: '创建时间', key: 'name', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            const forbidden = h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#2db7f5'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                }
              }
            }, '禁用')
            const start = h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#2db7f5'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                }
              }
            }, '启用')
            return params.status == 1? start : forbidden
          }
        }
      ],
      drawerShow: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    handleAdd() {
      this.drawerShow = true
    },
    handleClick(row) {
      console.log(row)
      this.$router.push({ path: '/setting/channelDetail' })
    },
    handleChange(val) {
      console.log(val)
    },
    handleSubmit() {
    },
    handleSelectChange() {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
