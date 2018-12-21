<template>
  <div class="form">
    <Spin fix size="large" v-if="loadDrawer"></Spin>
    <Form v-else :model="form" label-position="left" :label-width="280" class="standard">
      <Divider orientation="left">运营商</Divider>
      <FormItem v-for="item in operator" :key="item.autoId" :label="item.title">
        <template v-if="item.autoId != 2 && item.autoId != 6">
          <InputNumber v-model="item.autoMeasureValue" class="w100px"></InputNumber>
        </template>
        <Select v-model="item.autoMeasureType" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <Divider orientation="left">淘宝支付宝</Divider>
      <FormItem v-for="item in aliy" :key="item.autoId" :label="item.title">
        <template v-if="item.autoId != 8 && item.autoId != 9 && item.autoId != 10">
          <InputNumber v-model="item.autoMeasureValue" class="w100px"></InputNumber>
        </template>
        <Select v-model="item.autoMeasureType" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <Divider orientation="left">其他</Divider>
      <FormItem v-for="item in other" :key="item.autoId" :label="item.title">
        <template v-if="item.autoId == 14">
          <InputNumber v-model="minAge" class="w100px"></InputNumber>
          <span style="color: #666">至</span>
          <InputNumber v-model="maxAge" class="w100px"></InputNumber>
        </template>
        <template v-else>
          <InputNumber v-model="item.autoMeasureValue" class="w100px"></InputNumber>
        </template>
        <Select v-model="item.autoMeasureType" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" size="default" @click="updatePsswordOk">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getStandardMsg, updateStandardMsg } from '@/utils/api'
export default {
  data() {
    return {
      form: {},
      other: [],
      aliy: [],
      operator: [],
      minAge: 0,
      maxAge: 0,
      loadDrawer: true
    }
  },
  beforeMount() {
    this.fetchStandardMsg()
  },
  methods: {
    updatePsswordOk() {
      this.other[0].autoMeasureValue = `${this.minAge}-${this.maxAge}`
      const params = {
        operatorJson: JSON.stringify(this.operator),
        aliyJson: JSON.stringify(this.aliy),
        otherJson: JSON.stringify(this.other),
        companyId: this.$store.getters.userInfo.companyId
      }
      updateStandardMsg(params).then(res => {
        if (res.state == 1) {
          this.$Message.success('保存成功')
          this.fetchStandardMsg()
        }
      })
    },
    fetchStandardMsg() {
      this.loadDrawer = true
      getStandardMsg({companyId: this.$store.getters.userInfo.companyId}).then(res => {
        if (res.state == 1) {
          this.operator = res.info.data.operator
          for (const o of this.operator) {
            o.title = this.transformKey(o.autoId)
            o.autoMeasureValue = Number(o.autoMeasureValue)
          }
          this.aliy = res.info.data.aliy
          for (const o of this.aliy) {
            o.title = this.transformKey(o.autoId)
            o.autoMeasureValue = Number(o.autoMeasureValue)
          }
          this.other = res.info.data.other
          for (const o of this.other) {
            o.title = this.transformKey(o.autoId)
            if (o.autoId == 14 && o.autoMeasureValue.includes('-')) {
              this.minAge = Number(o.autoMeasureValue.split('-')[0])
              this.maxAge = Number(o.autoMeasureValue.split('-')[1])
            } else {
              o.autoMeasureValue = Number(o.autoMeasureValue)
            }
          }
          setTimeout(() => {
            this.loadDrawer = false
          }, 1000)
        }
      })
    },
    transformKey(id) {
      switch(id) {
        case 1:
        return '入网时长时间低于(月):'
        case 2:
        return '前十个有效手机号码与通讯录对比命中记录(个):'
        case 3:
        return '通讯录和通话记录比对(个):'
        case 4:
        return '手机号码不重复号码低于(个):'
        case 5:
        return '平均通话时长低于(秒):'
        case 6:
        return '手机未实名认证(未获取数据不包括在内):'
        case 7:
        return '芝麻分值大于(分):'
        case 8:
        return '花呗当期逾期状态(已逾期):'
        case 9:
        return '借呗当期逾期状态(已逾期):'
        case 10:
        return '淘宝收货地址(无):'
        case 11:
        return '花呗额度(元):'
        case 12:
        return '借呗额度(秒):'
        case 13:
        return '绑定信用卡张数(张):'
        case 14:
        return '年龄限制(岁):'
        case 15:
        return '贷前综合风险值(分):'
        case 16:
        return '简单风险命中数量(个):'
        case 17:
        return '法院失信名单(个):'
        case 18:
        return '多平台借款数量(个):'
        case 19:
        return '多平台被拒绝数量(个):'
        case 20:
        return '逾期记录数量(条):'
        case 21:
        return '信贷反欺诈分值(分):'
        default:
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .standard {
    text-align: left;
  }
</style>
