<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增渠道</Button>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
      <Page :current="page" :page-size="20" :total="listTotal" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer title="新增渠道" v-model="drawerShow" width="80" class="drawer">
      <div class="detail">
        <div class="form">
          <Divider>第一步</Divider>
          <p class="title"><Tag color="warning">设置渠道商基本信息</Tag></p>
          <newChannel :form="formChannel" :admins="channelAdminList" :products="channelProduct" />
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
import { getChannelLisgOrMsg, addOrUpdateChannelMsg, updateChannelStatus } from '@/utils/api'
import { mapGetters } from 'vuex'
export default {
  components: { newChannel },
  data() {
    return {
      formChannel: {
        channelId: '',
        channelName: '',
        channelNameShort: '',
        channelCompanyName: '',
        channelBusinessType: '',
        channelLinkman: '',
        userName: ''
      },
      channelAdminList: [],
      channelProduct: [],
      list: [],
      listTotal: 0,
      loading: true,
      page: 1,
      columns: [
        { title: '渠道编号', key: 'channelId', align: 'center' },
        { title: '状态', key: 'channelStatus', align: 'center',
        render: (h, params) => {
          const forbidden = h('div', {
              style: {
                color: 'red'
              }
            }, '已禁用')
            return params.row.channelStatus == 0? forbidden : h('div', '已启用')
        } },
        { title: '渠道名称', key: 'channelName', align: 'center' },
        { title: '已添加产品', key: 'productName', align: 'center' },
        { title: '业务类型', key: 'channelBusinessType', align: 'center' },
        { title: '创建人', key: 'userName', align: 'center' },
        { title: '创建时间', key: 'createTime', align: 'center' },
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
                color: 'red'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                  this.fetchChannelStatus(params.row.channelId, 2)
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
                  this.fetchChannelStatus(params.row.channelId, 1)
                }
              }
            }, '启用')
            return params.row.channelStatus == 0? start : forbidden
          }
        }
      ],
      drawerShow: false
    }
  },
  mounted() {
    this.fetchChannelLisgOrMsg()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleAdd() {
      this.drawerShow = true
    },
    handleClick(row) {
      this.$router.push({ 
        path: '/setting/channelDetail',
        query: { id: row.channelId }
      })
    },
    handleChange(page) {
      this.page = page
      this.fetchChannelLisgOrMsg()
    },
    handleSubmit() {
    },
    fetchChannelLisgOrMsg() {
      const params = {
        channelId: 0,
        companyId: this.userInfo.companyId,
        limit: 20,
        page: this.page
      }
      this.loading = true
      getChannelLisgOrMsg(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.channelList
          this.listTotal = res.info.channelNumber
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    },
    fetchChannelStatus(id, val) {
      const params = {
        type: val,
        channelId: id
      }
      updateChannelStatus(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('更改成功')
          this.fetchChannelLisgOrMsg()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
