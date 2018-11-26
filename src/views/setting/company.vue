<template>
  <div>
    <Divider>公司信息</Divider>
    <div class="box">
      <ul>
        <li><span class="sp1">公司全称:</span><span class="sp2">{{company.companyName}}</span></li>
        <li><span class="sp1">邮箱:</span><span class="sp2">{{company.companyEmail}}</span></li>
        <li><span class="sp1">电话:</span><span class="sp2">{{company.companyPhone}}</span></li>
        <li><span class="sp1">地址:</span><span class="sp2">{{company.companyAddress}}</span></li>
        <li><span class="sp1">统一信用代码:</span><span class="sp2">{{company.companyTrustCode}}</span></li>
        <li><span class="sp1">公司法人:</span><span class="sp2">{{company.companyLegalPerson}}</span></li>
        <li><span class="sp1">法人身份证:</span><span class="sp2">{{company.companyLegalPersonIdcard}}</span></li>
          <li><span class="sp1">公司签章:</span><span class="sp2">
          <img :src="company.companyBargainSealUrl" alt="合同章">
          </span></li>
        <li><span class="sp1">营业执照:</span><span class="sp2">
          <img :src="company.companyBusinessLicense" alt="营业执照">
          </span></li>
      </ul>
    </div>
    <Divider>资方信息</Divider>
    <div class="box">
      <ul>
        <li><span class="sp1">资方名称:</span><span class="sp2">{{companyCapital.capitalTitle}}</span></li>
        <li><span class="sp1">放款人:</span><span class="sp2">{{companyCapital.capitalName}}</span></li>
        <li><span class="sp1">放款人身份证号:</span><span class="sp2">{{companyCapital.capitalIdcard}}</span></li>
        <li><span class="sp1">放款人手机号:</span><span class="sp2">{{companyCapital.capitalPhone}}</span></li>
        <li><span class="sp1">资方统一信用代码:</span><span class="sp2">{{companyCapital.trustCode}}</span></li>
        <li><span class="sp1">资方公司邮箱:</span><span class="sp2">{{companyCapital.companyEmail}}</span></li>
        <li><span class="sp1">资方类型:</span><span class="sp2">{{companyCapital.ifPersonal == 0? '公司' : '个人'}}</span></li>
        <li><span class="sp1">资方公司签章:</span><span class="sp2">
          <img :src="company.companySignatureUrl" alt="合同章">
          </span></li>
      </ul>
    </div>
     <Divider>公司描述</Divider>
     <div class="box">
       <ul>
        <li><span class="sp1">公司简称:</span><span class="sp2">
          <Input size="default" type="textarea" v-model="company.companyShortName" :rows="4"></Input>
          </span></li>
        <li><span class="sp1">公司描述:</span><span class="sp2">
          <Input size="default" type="textarea" v-model="company.companyDescribe" :rows="4"></Input>
          </span></li>
        <li><span class="sp1">公司logo:</span><span class="sp2">
          <div v-if="company.companyLogoUrl != ''" class="logo-box">
            <img :src="company.companyLogoUrl" alt="公司logo">
            <div class="mask">
              <Icon class="icon" type="md-trash" size="20" @click="handleDelete" />
            </div>
          </div>
          <Upload v-else
          :action="$uploadUrl" 
          accept=".png,.jpg,jpeg"
          :on-success="logoSuccess">
            <Button icon="ios-cloud-upload-outline">上传logo</Button>
          </Upload>
          </span></li>
          <li><span class="sp1">&nbsp;</span>
            <span class="sp2">
              <Button type="primary" size="default" @click="handleSubmit" style="margin-top: 80px;margin-right: 100px;">保存</Button>
            </span>
          </li>
       </ul>
     </div>
  </div>
</template>

<script>
import { getCompanyMsg, updateCompanyMsg } from '@/utils/api'
export default {
  data() {
    return {
      company: {
        companyShortName: '',
        companyDescribe: '',
        companyLogoUrl: ''
      },
      companyCapital: {}
    }
  },
  mounted() {
    this.fetchCompanyMsg()
  },
  methods: {
    handleDelete() {
      this.company.companyLogoUrl = ''
    },
    handleSubmit() {
      const params = {
        companyId: this.$store.getters.userInfo.companyId,
        companyShortName: this.company.companyShortName,
        companyLogoUrl: this.company.companyLogoUrl,
        companyDescribe: this.company.companyDescribe,
      }
      updateCompanyMsg(params).then(res => {
        if (res.state == 1) {
          if (res.state == 1) {
            this.$Message.success('保存成功')
            this.fetchCompanyMsg()
          }
        }
      })
    },
    logoSuccess(response, file, fileList) {
      if (response.state == 1) {
        this.company.companyLogoUrl = response.info.imgPath
      }
    },
    fetchCompanyMsg() {
      getCompanyMsg({ companyId: this.$store.getters.userInfo.companyId }).then(res => {
        if (res.state == 1) {
          this.company = res.info.company
          this.companyCapital = res.info.companyCapital
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .box {
    background-color: #F0F8FF;
    border: 1px solid #E8E8E8;
    padding: 16px;
    ul {
      overflow: hidden;
      li {
        width: 50%;
        padding: 10px;
        color: #333;
        font-size: 16px;
        float: left;
        line-height: 20px;
        display: flex;
        .sp1 {
          display: inline-block;
          width: 200px;
        }
        .sp2 {
          flex: 1;
          display: inline-block;
          color: #999999;
        }
      }
    }
  }
  .logo-box {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &:hover {
      .mask {
        display: flex;
        .icon {
          color: #FFF;
        }
      }
    }
    .mask {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.7);
      display: none;
      justify-content: center;
      align-items: center;
      .icon {
        cursor: pointer;
      }
    }
  }
</style>