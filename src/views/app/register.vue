<template>
  <div class="container">
    <img class="top-image" :src="topImage" alt="top">
    <div class="center">
      <p class="p1">最高借款额度(元)</p>
      <p class="p2">50,000</p>
      <p class="p1">1000元借一天最低仅0.1元</p>
      <div class="form-app">
        <div class="input">
          <input type="number" v-model="phone" :maxlength="11" placeholder="请输入手机号">
        </div>
        <div class="input">
          <input type="number" v-model="code"  placeholder="获取验证码">
          <span class="code" :class="{'gray': time != '获取验证码'}" @click="handleCode">{{time}}</span>
        </div>
      </div>
      <div class="btn-box">
        <img :src="btnImage" alt="btn" @click="handleSubmit">
        <p class="p4">阅读并接受《小优金融用户协议》</p>
      </div>
    </div>
    <div class="footer">
      <img class="partner-image" :src="partnerImage" alt="partner">
    </div>
  </div>
</template>

<script>
import topImage from '@/assets/top@2x.png'
import btnImage from '@/assets/button_cked@2x.png'
import partnerImage from '@/assets/foot@2x.png'
import { sendH5Code, h5Register } from '@/utils/api'
export default {
  data() {
    return {
      topImage,
      btnImage,
      partnerImage,
      phone: '',
      code: '',
      time: '获取验证码',
      timer: null
    }
  },
  beforeMount() {
    document.title = '小优金融 - 小额贷服务'
    this.companyId = this.$route.query.companyId || 0
    this.channelId = this.$route.query.channelId || 0
  },
  methods: {
    handleSubmit() {
      const params = {
        companyId: this.companyId,
        channelId: this.channelId,
        userAppPhone: this.phone,
        msgCode: this.code
      }
      h5Register(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('注册成功')
          this.$router.push({ path: '/appDownload' })
        }
      })
    },
    handleCode() {
      if (this.time != '获取验证码') return
      const param = {
        companyId: this.companyId,
        userAppPhone: this.phone,
        type: 1
      }
      sendH5Code(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('发送成功')
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
    }
  },
  beforeDestroy() {
    clearInterval(this.timer) 
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #fff;
  }
  .top-image {
    width: 100%;
  }
  .footer {
    width: 100%;
    display: flex;
    padding-bottom: 24px;
    .partner-image {
      margin: 0 auto;
      width: 274px;
    }
  }
  .center {
    margin-top: 27px;
    margin-bottom: 90px;
    text-align: center;
    .p1 {
      color:rgba(85,85,85,1);
      font-size:14px;
    }
    .p2 {
      font-size:50px;
      color:rgba(51,51,51,1);
      font-weight: bold;
    }
    .p3 {
      font-size:12px;
      color:rgba(102,102,102,1);
    }
    .form-app {
      margin-top: 26px;
      margin-bottom: 12px;
      padding: 0 35px;
      .input {
        margin-bottom: 10px;
        position: relative;
        input {
          width: 100%;
          height: 44px;
          line-height: 44px;
          font-size:16px;
          border:1px solid #C4C4C4;
          border-radius: 4px;
          text-align: center;
          outline: none;
          padding: 0 15px;
          &:focus {
            border-color: #4A90E2;
          }
        }
        .code {
          display: inline-block;
          position: absolute;
          font-size:12px;
          line-height: 20px;
          color:rgba(74,144,226,1);
          right: 15px;
          top: 50%;
          margin-top: -10px;
          &.gray {
            color: gray
          }
        }
      }
    }
    .btn-box {
      img {
        width: 274px;
      }
      .p4 {
        font-size:10px;
        color:rgba(102,102,102,1);
      }
    }
  }
</style>
