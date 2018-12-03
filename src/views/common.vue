<template>
  <div class="container">
    <Row class="row">
      <Col span="4" class="col1">
        <div class="login">
          <img :src="logo" alt="logo">
          <div class="text">
            小优信息 </br>
            为您提供优质服务
          </div>
        </div>
        <div class="center">
          <Menu theme="primary" :active-name="activeNames" :open-names="openNames" accordion class="menu" width="auto" @on-select="handleSelect">
            <template v-for="(item, index) in menus">
              <Submenu :name="String(index)" v-if="item.childer">
                <template slot="title">
                  <Icon :type="item.icon" /> {{item.name}}
                </template>
                <template v-if="item.childer.length > 0">
                  <MenuItem v-for="(it, n) in item.childer" :key="n" :name="index + '-' + n">{{it.name}}</MenuItem>
                </template>
              </Submenu>
              <MenuItem :name="String(index)" v-else>
                <Icon :type="item.icon" />{{item.name}}
              </MenuItem>
            </template>
          </Menu>
          <div class="title">
            <p>{{userInfo.position}}: {{ userInfo.userName == '' || !userInfo.userName? userInfo.phone : userInfo.userName}}</p>
            <p><span @click="handleChangePassword" class="sp1">修改密码</span><span @click="handleLogOut" class="sp2">注销退出</span></p>
          </div> 
        </div>
        <div class="footer">小优智能云</div> 
      </Col>
      <Col span="20" class="col2">
        <router-view />
      </col>
    </Row>
    <Modal v-model="updateModel" title="重置密码">
      <Form :model="accountForm" :label-width="100" label-position="left">
        <FormItem label="姓名:">
          <Input v-model="accountForm.userName" size="default" clearable ></Input>
        </FormItem>
        <FormItem label="旧密码:">
          <Input v-model="accountForm.password" size="default" clearable ></Input>
        </FormItem>
        <FormItem label="新密码:">
          <Input v-model="accountForm.newPassword" size="default" clearable ></Input>
        </FormItem>
      </Form>
      <div slot="footer"> 
        <Button type="primary" size="default" long @click="updatePsswordOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import logo from '@/assets/logo_xyjr60.png'
  import { updateUserPassword } from '@/utils/api'
  export default {
    data() {
      return {
        logo,
        menus: [
          { name: '概览', path: '/', icon: 'ios-globe' },
          { name: '申请', path: '/apply', icon: 'ios-person-add-outline' },
          { name: '审核', path: '/audit', icon: 'ios-document-outline', childer: [
            { name: '审核管理', path: '/audit/index' },
            { name: '待签署合同', path: '/audit/other' }
          ] },
          { name: '放款管理', path: '/loan', icon: 'logo-yen', childer: [
            { name: '放款订单', path: '/loan/order' },
            { name: '账单列表', path: '/loan/list' },
            { name: '展期记录', path: '/loan/record' }
          ] },
          { name: '逾期管理', path: '/overdue', icon: 'ios-time-outline' },
          { name: '催收管理', path: '/collection', icon: 'ios-alarm-outline' },
          { name: '客户管理', path: '/custom', icon: 'ios-person-outline', childer: [
            { name: '客户列表', path: '/custom/index' },
            { name: '潜客池', path: '/custom/other' }
          ] },
          { name: '设置管理', path: '/setting', icon: 'ios-settings-outline', childer: [
            { name: '账户管理', path: '/setting/account' },
            { name: '产品管理', path: '/setting/product' },
            { name: '渠道管理', path: '/setting/channel' },
            { name: '财务管理', path: '/setting/finance' },
            // { name: '数据管理', path: '/setting/data' },
            { name: '合同管理', path: '/setting/contract' },
            { name: '公司信息', path: '/setting/company' },
            { name: '查询计费', path: '/setting/price' }
          ] },
          { name: '运营数据', path: '/operartion', icon: 'ios-paper-outline' }
        ],
        openNames: [],
        updateModel: false,
        accountForm: {
          userName: '',
          password: '',
          newPassword: ''
        }
      }
    },
    beforeMount() {
      if (this.userInfo.stateStatus == 0) {
        // stateStatus 0则禁用 1则启用
        this.$Message.error('账号已被禁用')
        this.handleLogOut()
      }
    },
    computed: {
      activeNames() {
        const activeName = window.sessionStorage.getItem('activeName')
        // console.log(activeName)
        this.openNames[0] = activeName
        if (activeName && activeName.includes('-')) {
          this.openNames[0] = activeName.split('-')[0]
        }
        // console.log(this.openNames)
        return activeName || '0'
      },
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      handleSelect(name) {
        // console.log(name)
        window.sessionStorage.setItem('activeName', name)
        const str = String(name)
        let path = null
        if (str.includes('-')) {
          const paths = str.split('-')
          // console.log(paths)
          const i = paths[0]
          const j = paths[1]
          // console.log(this.menus[i].childer[j])
          this.$router.push({ path: this.menus[i].childer[j].path })
        } else {
          // console.log(this.menus[name])
          this.$router.push({ path: this.menus[name].path })
        }
      },
      updatePsswordOk() {
        const params = this.accountForm
        params.userId = this.$store.getters.userInfo.userId
        updateUserPassword(params).then(res => {
          if (res.state == 1) {
            this.$Message.success('重置成功')
            this.$store.commit('SET_USERINFO', res.info)
          }
        })
      },
      handleChangePassword() {
        this.updateModel = true
      },
      handleLogOut() {
        this.logoutByUser()
        this.$router.push({ path: '/login' })
      },
      ...mapActions([
        'logoutByUser'
      ])
    }
  }
</script>

<style lang="less" scoped>
  .container {
    overflow: hidden;
    height: 100%;
    padding: 20px 20px 0 0;
    background-color: rgba(0,0,0,0.7);
    color: #FFF;
    > .row {
      height: 100%;
      .col1 {
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        .login {
          height: 80px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          .text {
            flex: 1;
            padding-left: 10px;
            font-size: 16px;
            color: #FFF;
          }
        }
        .center {
          flex: 1;
          overflow-y: auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          .menu {
            flex: 1;
            text-align: left;
            .ivu-menu-item > i {
              font-size: 16px;
            }
          }
          .title {
            padding: 10px 0;
            line-height: 30px;
            .sp1 {
              margin-right: 10px;
              cursor: pointer;
            }
            .sp2 {
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
        .footer {
          height: 60px;
          line-height: 60px;
          background-color: rgba(0,0,0,0.8);
        }
      }
      .col2 {
        height: 100%;
        padding: 20px 20px 80px 20px;
        background-color: #fff;
        overflow: auto;
        border-radius: 4px;
      }
    }
  }
</style>
