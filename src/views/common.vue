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
  import { menusList } from '@/utils'
  export default {
    data() {
      return {
        logo,
        menus: [],
        openNames: [],
        updateModel: false,
        accountForm: {
          userName: '',
          password: '',
          newPassword: ''
        }
      }
    },
    created() {
      const menuArrs = []
      const menuAllArrs = menusList
      if (this.userInfo.permission != '') {
        const permission = this.userInfo.permission.split(',')
        for (const o of permission) {
          for (const q of menuAllArrs) {
            if (o == q.name) {
              if (o.name == '设置管理') {
                menuArrs.push({
                  ...q,
                  childer: []
                })
              } else {
                menuArrs.push(q)
              }
            }
          }
        }
        if (this.userInfo.adminPermission != '') {
          const adminPermission = this.userInfo.adminPermission.split(',')
          const adminMenus = menusList[7]
          const childers = []
          for (const z of adminPermission) {
            for (const y of adminMenus) {
              if (z == y.name) {
                childers.push(y)
              }
            }
          }
          for (const a of menuArrs) {
            if (a.name == '设置管理') {
              a.childer = childers
            } 
          }
        }
        this.menus = menuArrs
      } else {
        this.menus = menuAllArrs
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
