<template>
  <div class="wrapper">
    <Row>
      <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleAdd">新增账号</Button>
      <!-- <Button type="primary" size="large" style="margin-bottom: 30px;margin-right: 20px;" @click="handleRole">角色权限</Button> -->
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list" @on-row-click="handleClick"></Table>
      <Page :current="page" :page-size="20" :total="totalnumber" show-total class="page" @on-change="handleChange" />
    </div>
    <Drawer :title="drawerTitle" v-model="drawerShow" width="60" class="drawer" :mask-closable="false">
      <Spin fix size="large" v-if="loadDrawer"></Spin>
      <div class="detail" v-else>
        <div class="form" style="margin-top: 30px;">
          <Form :model="form" :label-width="150" style="text-align: left;">
            <FormItem label="手机号:">
              <Input v-model="form.phone" size="large" clearable></Input>
            </FormItem>
            <FormItem label="验证码:" v-if="id == ''">
              <Input v-model="form.code" size="large" clearable style="width: 60%;"></Input>
              <span class="span" @click="handleCode" :class="{'disabled': time != '获取验证码'}">{{time}}</span>
            </FormItem>
            <FormItem label="职位:">
              <Input v-model="form.position" size="large" clearable></Input>
            </FormItem>
            <FormItem label="审批级别:">
              <CheckboxGroup v-model="form.approvalLevel" size="large">
                <Checkbox label="0">无需审批</Checkbox>
                <Checkbox label="1">1级</Checkbox>
                <Checkbox label="2">2级</Checkbox>
                <Checkbox label="3">3级</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="角色名称:">
              <Input v-model="form.roleId" size="large" clearable></Input>
            </FormItem>
            <FormItem label="管理员身份:">
              <Select v-model="form.superAdmin" size="large">
                <Option :value="1">超级管理员</Option>
                <Option :value="0">普通管理员</Option>
              </Select>
            </FormItem>
            <FormItem label="权限选择:" v-if="form.superAdmin == 0">
              <CheckboxGroup v-model="roles">
                <Checkbox v-for="(item, index) in menus"  :label="item.name" :key="index" :disabled="index == 0"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="设置管理权限选择:" v-if="roles.includes('设置管理')">
              <CheckboxGroup v-model="rolesChilder">
                <Checkbox v-for="(item, index) in childer" :label="item.name" :key="index"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <p style="text-align: right; font-size: 20px;margin-bottom: 10px;color: red;">*该手机号第一次创建账号时，默认姓名和密码为手机号</p>
            <p style="text-align: right; font-size: 20px;margin-bottom: 10px;color: red;">*若登录者修改的是自身信息，请重新登录</p>
          </Form>
        </div>
      </div>
      <div class="footer">
        <Button size="default" type="primary" class="btn" @click="handleSubmit">保存</Button>
      </div>
    </Drawer>
    <Modal v-model="updateModel" title="重置密码">
      <Form :model="updateForm" :label-width="100" label-position="left">
        <FormItem label="姓名:">
          <Input v-model="updateForm.userName" size="default" clearable ></Input>
        </FormItem>
        <FormItem label="新密码:">
          <Input v-model="updateForm.password" size="default" clearable ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="default" long @click="updatePsswordOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getAccountListAndMsg, getAccountCode, addAndUpdateAccountMsg, updateAccountStatus, updateAccountPassword } from '@/utils/api'
import { menusList } from '@/utils'
export default {
  data() {
    return {
      id: '',
      loading: true,
      loadDrawer: false,
      page: 1,
      list: [],
      totalnumber: 0,
      menus: menusList,
      roles: ['概览'],
      rolesChilder: [],
      columns: [
        { title: '用户名', key: 'userName', align: 'center' },
        { title: '角色名称', key: 'roleId', align: 'center' },
        { title: '状态', key: 'stateStatus', align: 'center',
          render: (h, params) => {
            const forbidden = h('div', {
              style: {
                color: 'red'
              }
            }, '已禁用')
            return params.row.stateStatus == 0? forbidden : h('div', '已启用')
        } },
        { title: '职位', key: 'position', align: 'center' },
        { title: '手机号', key: 'phone', align: 'center' },
        { title: '创建时间', key: 'creationTime', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            // stateStatus 0 禁用 1启用
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
                  this.fetchAccountStatus(params.row.userId, 1)
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
                  this.fetchAccountStatus(params.row.userId, 2)
                }
              }
            }, '禁用') // 启用状态 禁用按钮
            const update = h('Button', {
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
                  this.id = params.row.userId
                  this.updateForm.userName = params.row.userName
                  this.updateModel = true
                  
                }
              }
            }, '重置密码')
            return h('div', [params.row.stateStatus == 1? start : forbidden, update])
          }
        }
      ],
      drawerShow: false,
      drawerTitle: '新增账户',
      form: {},
      time: '获取验证码',
      timer: null,
      updateModel: false,
      updateForm: {
        userName: '',
        password: ''
      }
    }
  },
  mounted() {
    this.fetchAccountListAndMsg()
  },
  computed: {
    childer() {
      let arrs = []
      for (const o of this.menus) {
        if (o.name == '设置管理') {
          arrs = o.childer
        }
      }
      return arrs
    },
    disabled() {
      if (this.rolesChilder.length > 0) return true
    }
  },
  watch: {
    roles(newVal, oldVal) {
      if (!newVal.includes('设置管理')) {
        this.rolesChilder.splice(0, this.rolesChilder.length)
      }
    }
  },
  methods: {
    updatePsswordOk() {
      const params = this.updateForm
      params.userId = this.id
      updateAccountPassword(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('重置成功')
          this.updateForm.password = ''
          this.fetchAccountListAndMsg()
        }
      })
    },
    handleAdd() {
      this.drawerTitle = '新增账户'
      this.id = ''
      this.loadDrawer = false
      this.form = {
        phone: '',
        code: '',
        position: '',
        approvalLevel: [],
        roleId: '',
        superAdmin: 0
      }
      this.drawerShow = true
    },
    handleRole() {
      this.$router.push({ path: '/setting/roles' })
    },
    handleSubmit() {
      // if (this.)
      const params = this.form
      if (this.id == '') {
        for (const i in this.form) {
          if (this.form[i] == '') {
            this.$Message.error('请填入完整信息')
            return
          }
        }
        params.userId = ''
        params.companyId = this.$store.getters.userInfo.companyId
      } else {
        params.userId = this.id
      }
      params.approvalLevel = this.form.approvalLevel.join(',')
      params.permission = this.roles.join(',')
      params.adminPermission = this.rolesChilder.join(',')
      addAndUpdateAccountMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.drawerShow = false
          this.fetchAccountListAndMsg()
        }
      })
    },
    handleChange(page) {
      this.page = page
      this.fetchAccountListAndMsg()
    },
    handleCode() {
      if (this.time != '获取验证码') return
      if (this.form.phone.length != 11 || this.form.phone == '') {
        this.$Message.error('手机号格式不正确, 不可为空')
        return
      }
      getAccountCode({ phone: this.form.phone, companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.$Message.success(res.info)
          let time = 60
          this.timer = setInterval(() => {
            if (time <= 1) {
              this.time = '获取验证码'
              clearInterval(this.timer)
              return
            }
            time--
            this.time = time + 's'
          }, 1000)
        } 
      })
    },
    handleClick(row) {
      this.id = row.userId
      this.drawerTitle = '账户详情'
      this.loadDrawer = true
      this.drawerShow = true
      this.fetchAccountMsg()
    },
    fetchAccountMsg() {
      const params = {
        companyId: '',
        type: 1,
        userId: this.id,
        limit: 0,
        page: 0
      }
      getAccountListAndMsg(params).then(res => {
        if (res.state == 1) {
          this.form = res.info.user
          const approvalLevel = this.form.userApproveLevel.split(',')
          for (let i = 0; i < approvalLevel.length; i++) {
            if (approvalLevel[i] == '') approvalLevel.splice(i, 1)
          }
          this.form.approvalLevel = approvalLevel.length > 0? approvalLevel : []
          const permission = res.info.user.permission
          if (permission != '') {
            this.roles = permission.split(',')
          } else {
            this.roles.splice(0, this.roles.length)
          }
          if (!this.roles.includes('概览')) {
            this.roles.push('概览')
          }
          const adminPermission = res.info.user.adminPermission
          this.rolesChilder = adminPermission != ''? adminPermission.split(',') : []
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    fetchAccountStatus(id, val) {
      updateAccountStatus({ userId: id, type: val }).then(res => {
        if (res.state == 1) {
          this.$Message.success('更改成功')
          this.fetchAccountListAndMsg()
        }
      })
    },
    fetchAccountListAndMsg() {
      this.loading = true
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        type: 0,
        userId: '',
        limit: 20,
        page: this.page
      }
      getAccountListAndMsg(params).then(res => {
        if (res.state == 1) {
          this.list = res.info.userList
          this.totalnumber = res.info.totalnumber
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .span {
    display: inline-block;
    cursor: pointer;
    margin-left: 30px;
    padding: 0 15px;
    background-color: #4A90E2;
    color: #FFF;
    &.disabled {
      background-color: #F5F5F5;
      color: #999;
    }
  }
</style>
