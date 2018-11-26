<template>
  <div> 
    <Row style="position: relative;">
      <p class="p">渠道详情</p>
      <div class="btn-box">
        <Button type="primary" size="large" @click="handleStart">启动</Button>
        <Button type="primary" size="large" @click="handleForbidden">禁用</Button>
      </div>
    </Row>
    <Divider />
    <Collapse v-model="collapse" accordion>
      <Panel name="1">渠道基本信息
        <div slot="content">
          <newChannel :form="formChannel" />
          <p style="text-align: center;margin: 20px 0;"><Button type="info" size="default" icon="md-checkbox-outline" @click="handleSubmitA">保存</Button></p>
        </div>
      </Panel>
      <Panel name="2">业务二维码
        <div slot="content">
          <div class="channel-box">
            <div class="d3">
              <div class="qr-image"><img  src="" alt=""></div>
              <p>【怡云贷】</p>
              <p>扫描申请贷款</p>
            </div>
            <div class="d4">
              <div style="margin-top: 100px;margin-bottom: 20px;">
                <Button type="primary" size="default" @click="handleDown" icon="ios-cloud-upload-outline">下载二维码</Button>
              </div>
              <p>1.下载后修改文件后缀名为：.jpg</p>
              <p>2.请将此二维码发送至【怡云贷】,作为贷款业务申请入口</p>
              <p>3.客户扫描此二维码时,会被标记为【怡云贷】的客户</p>
            </div>
          </div>
        </div>
      </Panel>
      <Panel name="3">客户端渠道简称
        <div slot="content">
          <div class="channel-box">
            <div class="d1">怡云贷</div>
            <div class="d2">
              <p>1.让客户在手机App内的借款页面输入该渠道简称进行搜索</p>
              <p>2.搜索后点击相应的贷款产品即可申请</p>
            </div>
          </div>
        </div>
      </Panel>
      <Panel name="4">放款限额
        <div slot="content">
          <div class="check-box">
            <Checkbox v-model="single" >保证金（未还款本金最大值）
              <span style="margin-left: 50px;"><InputNumber :min="0" v-model="form.input"></InputNumber>元</span>
            </Checkbox>
          </div>
          <div class="check-box">
            <Checkbox v-model="single">未还款本金提醒金额</Checkbox>
            <span style="margin-left: 50px;"><InputNumber :min="0" v-model="form.input"></InputNumber>元</span>
          </div>
          <div class="check-box">
            <Checkbox v-model="single">每日放款订单数</Checkbox>
            <span style="margin-left: 50px;"><InputNumber :min="0" v-model="form.input"></InputNumber>单</span>
          </div>
          <p style="text-align: center;margin: 20px 0;"><Button type="info" size="default" icon="md-checkbox-outline" @click="handleSubmitB">保存</Button></p>
        </div>
      </Panel>
      <Panel name="5">推广链接
        <div slot="content">
          <p>https://ylxd.yunlibeauty.com/ylxd/home?channelId=3362&cid=1168</p>
        </div>
      </Panel>
      <Panel name="6">合作产品
        <div slot="content">
         <Table :columns="columns1" :data="lsit1"></Table>
        </div>
      </Panel>
      <Panel name="7">修改记录
        <div slot="content">
          <Table :columns="columns2" :data="lsit2"></Table>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import newChannel from '@/components/newChannel.vue'
export default {
  components: { newChannel },
  data() {
    return {
      formChannel: {},
      collapse: '1',
      lsit1: [],
      lsit2: [],
      columns1: [
        { title: '产品编号', key: 'name', align: 'center' },
        { title: '状态', key: 'name', align: 'center' },
        { title: '产品名称', key: 'name', align: 'center' },
        { title: '推广地址', key: 'name', align: 'center' }
      ],
      columns2: [
        { title: '用户编号', key: 'name', align: 'center' },
        { title: '用户名', key: 'name', align: 'center' },
        { title: '修改项', key: 'name', align: 'center' },
        { title: '修改详情', key: 'name', align: 'center' },
        { title: '修改时间', key: 'name', align: 'center' }
      ],
      single: false,
      form: {}
    }
  },
  methods: {
    handleSubmitA() {
    },
    handleSubmitB() {
    },
    handleDown() {

    },
    handleStart() {
    },
    handleForbidden() {
    }
  }
}
</script>

<style lang="less" scoped>
  .p {
    font-size: 30px;
    color: #508cee;
    margin: 10px 0;
  }
  .btn-box {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -18px;
  }
  .channel-box {
    display: flex;
    .d1 {
      width: 30%;
      text-align: center;
      line-height: 80px;
      height: 80px;
      font-size: 18px;
      font-weight: bold;
    }
    .d2 {
      flex: 1;
      line-height: 40px;
      font-size: 16px;
    }
    .d3 {
      width: 400px;
      .qr-image {
        padding: 10px;
        height: 400px;
        border: 1px solid #d6dde1;
        img {
          width: 380px;
          height: 380px;
        }
      }
      p {
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
    }
    .d4 {
      flex: 1;
      padding-left: 50px;
      p {
        line-height: 50px;
        font-size: 16px;
      }
    }
  }
</style>
