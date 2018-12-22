<template>
  <div class="container">
    <div class="login-box">
      <p class="title">小优信息管理系统</p>
      <div class="content">
        <div class="login-form">
          <div class="input">
            <Icon type="md-person" class="icon" />
            <input type="text" v-model="phone" :maxlength="11" placeholder="输入账号">
          </div>
          <div class="input">
            <Icon type="md-lock" class="icon" />
            <input type="password" v-model="password" placeholder="输入密码" @keyup.enter="handleLogin">
          </div>
        </div>
        <button class="login-btn" @click="handleLogin">登录</button>
        <p class="text"><span>小优金融</span>为你提供信息安全保障</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { accountLogin } from '@/utils/api'
  export default {
    data() {
      return {
        phone: '',
        password: ''
      }
    },
    methods: {
      handleLogin() {
        if (this.phone == '' || this.password == '') {
          this.$Message.error('请填入完整信息')
          return
        }
        if (this.phone.length != 11) {
          this.$Message.error('手机号格式不正确')
          return
        }
        accountLogin({ phone: this.phone, password: this.password }).then(res => {
          // console.log(res.info)
          if (res.state == 1) {
            this.$Message.success('登录成功')
            this.$store.dispatch('loginByUser', res.info).then(() => {
              setTimeout(() => {
                this.$router.push({ path: '/' })
              }, 1000)
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/font.css';
  .container {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
      width: 400px;
      text-align: center;
      .title {
        font-size:30px;
        font-weight: 500;
        margin-bottom: 60px;
        color: #FFF;
        font-family: 'themeFont' !important;
        letter-spacing: 4px;
      }
      .content {
        padding: 30px 36px 10px;
        background-color: #fff;
        border-radius: 8px;
        .login-form {
          border:1px solid #E7E6EB;
          margin-bottom: 30px;
          .input {
            position: relative;
            .icon {
              position: absolute;
              left: 10px;
              font-size: 20px;
              line-height: 30px;
              top: 50%;
              margin-top: -15px;
            }
            input {
              width: 100%;
              line-height: 44px;
              outline: none;
              height: 44px;
              padding: 0 30px 0 40px;
              font-size: 16px;
            }
            & + .input {
              border-top: 1px solid #E7E6EB;
            }
          }
        }
        .login-btn {
          font-size:14px;
          color:rgba(255,255,255,1);
          display: block;
          width: 100%;
          border: none;
          outline: none;
          line-height: 44px;
          border-radius: 4px;
          background:linear-gradient(270deg,rgba(46,164,248,1) 0%,rgba(90,132,236,1) 100%);
          margin-bottom: 40px;
          cursor: pointer;
        }
        .text {
          font-size: 14px;
          color: #B1B1B1;
          letter-spacing: 2px;
          span {
            font-family: 'themeFont' !important;
            font-size: 18px;
            color: #444444;
            font-weight: bold;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
