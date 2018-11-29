<template>
<div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增合同  </Button>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
    </div>
    <Drawer :title="drawerTitle" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <Spin fix size="large" v-if="loadDrawer"></Spin>
      <div class="detail" v-else>
        <div class="form" style="margin-top: 30px;">
          <Form :model="form" :label-width="150" style="text-align: left;">
            <FormItem label="合同文档:">
              <Upload type="drag" accept=".doc" :action="$uploadUrl" 
              :before-upload="beforeUpload" :on-success="uploadSuccess"
              :on-remove="uploadRemove" :default-file-list="files">
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>上传合同, 仅支持.doc格式,且只能上传一份</p>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="合同名称:">
              <Input v-model="form.bargainName" size="large" clearable></Input>
            </FormItem>
            <FormItem label="合同类型:">
              <Select v-model="form.bargainType" size="large" clearable>
                <Option :value="1">授权合同</Option>
                <Option :value="2">借款合同</Option>
                <Option :value="3">展期合同</Option>
              </Select>
            </FormItem>
            <FormItem label="签署方式:">
              <Select v-model="form.signWay" size="large" clearable>
                <Option :value="1">手写签名</Option>
                <Option :value="2">电子签名</Option>
              </Select>
            </FormItem>
            <FormItem label="签署类型:">
              <Select v-model="form.signType" size="large" clearable>
                <Option :value="1">公司</Option>
                <Option :value="2">个人</Option>
              </Select>
            </FormItem>
            <FormItem label="客户签章坐标:">
              <span class="span">X: <InputNumber size="large" :min="0" v-model="form.clientCoordX"></InputNumber></span>
              <span class="span">Y: <InputNumber size="large" :min="0" v-model="form.clientCoordY"></InputNumber></span>
              <span class="span">page: <InputNumber size="large" :min="0" v-model="form.clientCoordPage"></InputNumber></span>
            </FormItem>
            <FormItem label="出借人签章坐标:">
              <span class="span">X: <InputNumber size="large" :min="0" v-model="form.companyCoordX"></InputNumber></span>
              <span class="span">Y: <InputNumber size="large" :min="0" v-model="form.companyCoordY"></InputNumber></span>
              <span class="span">page: <InputNumber size="large" :min="0" v-model="form.companyCoordPage"></InputNumber></span>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="footer">
        <Button size="default" type="primary" class="btn" @click="handleSubmit">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { getContractList, getContractMsg, updateContractStatus, updateContractMsg } from '@/utils/api'
export default {
  data() {
    return {
      id: '',
      list: [],
      loading: true,
      loadDrawer: true,
      page: 1,
      columns: [
        { title: '合同编号', key: 'bargainId', align: 'center' },
        { title: '合同名称', key: 'bargainName', align: 'center' },
        { title: '合同类型', key: 'signType', align: 'center',
          render: (h, params) => {
            return h('div', params.row.signWay == 1? '授权合同' : params.row.signWay == 2? '借款合同' : '展期合同')
          } },
        { title: '签署方式', key: 'signWay', align: 'center',
          render: (h, params) => {
            return h('div', params.row.signWay == 1? '手写签名' : '电子签名')
          } },
        { title: '状态', key: 'status', align: 'center', 
          render: (h, params) => {
            const forbidden = h('div', {
              style: {
                color: 'red'
              }
            }, '禁用')
            return params.row.status == 0? forbidden : h('div', '开启')
          } },
        { title: '创建人', key: 'userName', align: 'center' },
        { title: '创建时间', key: 'createTime', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            // status 0 禁用 1启用
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
                  this.fetchContractStatus(params.row.bargainId, 1)
                }
              }
            }, '启用') // 禁用状态 启用按钮
            const start = h('Button', {
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
                  this.fetchContractStatus(params.row.bargainId, 0)
                }
              }
            }, '禁用') // 启用状态 禁用按钮
            const down = h('Button', {
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
                  window.open(params.row.bargainUrl)
                }
              }
            }, '下载')
            return h('div', [params.row.status == 1? start : forbidden, down])
          }
        }
      ],
      drawerShow: false,
      drawerTitle: '新增合同',
      form: {},
      files: []
    }
  },
  mounted() {
    this.fetchContractList()
  },
  methods: {
    beforeUpload(file) {
      // console.log(file)
      if (file.type != 'application/msword') {
        this.$Message.error('只能上传.doc后缀格式的word文档')
        return false
      }
      if (this.files.length > 0) {
        this.$Message.error('最多可上传1份合同')
        return false
      }
      return true
    },
    uploadSuccess(response, file, fileList) {
      if (response.state == 1) {
        this.form.bargainUrl = response.info.imgPath
        this.files.push({ url: response.info.imgPath, name: '合同文档' })
      }
    },
    uploadRemove(file, fileList) {
      this.form.bargainId = ''
      this.files.length = 0
    },
    handleSubmit() {
      const params = this.form
      if (this.id == '') {
        params.bargainId = ''
        params.companyId = this.$store.getters.userInfo.companyId
        params.userId = this.$store.getters.userInfo.userId  
      }
      updateContractMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.drawerShow = false
          this.fetchContractList()
        }
      })
    },
    handleAdd() {
      this.loadDrawer = false
      this.drawerTitle = '新增合同'
      this.id = ''
      this.form = {
        bargainName: '',
        bargainType: '',
        signWay: '',
        signType: '',
        clientCoordX: 0,
        clientCoordY: 0,
        clientCoordPage: 1,
        companyCoordX: 0,
        companyCoordY: 0,
        companyCoordPage: 1,
        bargainUrl: ''
      }
      this.drawerShow = true
    },
    handleClick(row) {
      this.drawerTitle = '合同详情'
      this.drawerShow = true
      this.id = row.bargainId
      this.fetchContractMsg(row.bargainId)
    },
    fetchContractStatus(id, val) {
      updateContractStatus({ bargainId: id, bargainStatus: val}).then(res => {
        if (res.state == 1) {
          this.$Message.success('更改成功')
          this.fetchContractList()
        }
      })
    },
    fetchContractMsg(id) {
      this.loadDrawer = true
      getContractMsg({ bargainId: id }).then(res => {
        if (res.state == 1) {
          this.files.length = 0
          this.form = res.info.data
          this.files.push({ url: this.form.bargainUrl, name: '合同文档' })
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    fetchContractList() {
      this.loading = true
      getContractList({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.list = res.info.data
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .span {
    margin-right: 10px;
  }
</style>
