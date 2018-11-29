<template>
  <div>
          <Form :model="form" :label-width="150" style="text-align: left;">
            <FormItem label="产品名称:">
              <Input v-model="form.productName" size="large" clearable></Input>
            </FormItem>
            <FormItem label="产品描述:">
              <Input v-model="form.description" size="large" clearable></Input>
            </FormItem>
            <FormItem label="产品logo:">
              <uploadImage :uploadList="imgs" @upload="imageSuccess" :uploadMax="1"/>
            </FormItem>
            <!-- <p style="text-align: right; font-size: 20px;margin-bottom: 10px;">*相关通知短信会发送至此手机号</p> -->
            <FormItem label="产品类型:">
              <Input value="金融贷款产品" size="large" clearable :readonly="true"></Input>
            </FormItem>
            <div v-for="(item, index) in interests" :key="index">
              <FormItem label="还款方式和利率:">
                <Button v-if="index != (interests.length - 1)" type="error" shape="circle" icon="ios-trash-outline" style="float:right;" @click.stop.prevent="handleDelete(interests, index)"></Button>
                <p>还款方式:
                  <Select v-model="item.repaymentType" size="large" clearable>
                    <Option v-for="n in options" :value="n.value" :key="n.value" :label="n.label"></Option>
                  </Select>
                  <div class="ddd" v-if="item.repaymentType == 3 || item.repaymentType == 6 || item.repaymentType == 9 || item.repaymentType == 12">每期天数:
                    <InputNumber :min="0" v-model="item.repaymentDays" style="width: 100px;" size="large"></InputNumber>天
                  </div>
                </p>
                <div v-if="item.repaymentType < 14">
                  利息计算周期:
                  <Select v-model="item.interestType" size="large" clearable>
                    <Option :value="1">放款后第二天开始计算利息</Option>
                    <Option :value="2">放款日当天开始计算利息</Option>
                  </Select>
                </div>
                <div v-else>
                  还款日配置:
                  <div class="ddd">
                    每月固定还款日期: <InputNumber :min="0" v-model="item.repayDayEvryMonth" style="width: 100px;" size="large"></InputNumber>号
                  </div> 
                  <div class="dd">
                    最后一期还款日期:
                    <Select v-model="item.repayLastCycleDay" size="large" clearable>
                      <Option :value="1">到期日</Option>
                      <Option :value="2">固定还款日</Option>
                    </Select>
                  </div> 
                  <div class="dd">
                    年利率转换日利率时天数:
                    <Select v-model="item.yearChangeRate" size="large" clearable>
                      <Option :value="1">365天</Option>
                      <Option :value="2">360天</Option>
                    </Select>
                  </div> 
                </div>
                <p>设置期数&利率:
                  <ul v-if="item.repaymentType != 13 && item.repayCycle">
                    <li v-for="(it, i) in item.repayCycle" style="margin-bottom: 10px;">
                      <span style="margin-right: 30px;"><InputNumber :min="0" v-model="it.cycleNum" style="width: 100px;"size="large"></InputNumber>  期  </span>
                      <span style="margin-right: 30px;"><InputNumber :min="0" v-model="it.cycleRateNormal" style="width: 150px;" size="large" placeholder="标准月利率"></InputNumber>% (月)</span>
                      <span style="margin-right: 30px;"><InputNumber :min="0" v-model="it.cycleRateLeast" style="width: 150px;" size="large" placeholder="最低月利率"></InputNumber>% (月)</span>
                      <Button type="error" shape="circle" icon="ios-trash-outline" @click.stop.prevent="handleDelete(item.repayCycle, i)"></Button>
                    </li>
                    <button class="btn-add" @click.stop.prevent="handleAddRepayCycle(item.repayCycle, index)">添加</button>
                    <p style="text-align: left; font-size: 18px;margin-bottom: 10px; color: red;">*等本等息形式每月还款额为： 贷款额/期数 + 贷款额*费率。</p>
                  </ul>
                  <div v-if="item.repaymentType == 13" class="dd">
                    <div class="ddd">日息(利息):
                      <InputNumber :min="0" v-model="item.dayInterest" style="width: 100px;" size="large"></InputNumber>%
                    </div>
                    <div class="dd">支持放款周期:
                      <CheckboxGroup v-model="item.supportCycle" size="large">
                        <Checkbox label="1">1周</Checkbox>
                        <Checkbox label="2">2周</Checkbox>
                        <Checkbox label="3">1个月</Checkbox>
                        <Checkbox label="4">2个月</Checkbox>
                        <Checkbox label="5">3个月</Checkbox>
                        <Checkbox label="6">6个月</Checkbox>
                        <Checkbox label="7">9个月</Checkbox>
                        <Checkbox label="8">1年</Checkbox>
                        <Checkbox label="9">
                          <InputNumber :min="0" v-model="item.cycleDays" size="large"></InputNumber>天
                        </Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
                </p>
              </FormItem>
            </div>
            <p><button class="btn-add" @click.stop.prevent="handleAddInterests">增加还款方式</button></p>
            <FormItem label="手续费:">
              <p>
                <i-switch size="large" v-model="form.procedureStatus" :true-value="1" :false-value="0">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </p>
              <template v-if="form.procedureStatus == 1">
                <div style="margin-bottom: 10px;margin-top: 10px;">
                  手续费支付方式: 
                  <RadioGroup v-model="form.procedurePayType" size="large" style="margin-left: 50px;">
                    <Radio :label="1">按期支付</Radio>
                    <Radio :label="2">贷前扣除</Radio>
                    <Radio :label="2">贷后支付</Radio>
                  </RadioGroup>
                  <span style="float:right;">最大手续费：<InputNumber :min="0" v-model="form.procedureMax" style="width: 100px;" size="large"></InputNumber>元</span>
                </div>
                <ul>
                  <li style="margin-bottom: 10px;margin-top: 10px;" v-for="(item, index) in services" :key="index">
                    <span style="margin-right: 20px;">手续费名称: <Input v-model="item.procedureName" size="large" style="width: 200px;"></Input></span>
                    <span style="margin-right: 20px;">收取方式: 
                      <Select v-model="item.procedureChargeType" size="large" clearable style="width: 200px;">
                        <Option :value="1">固定费用(元)</Option>
                        <Option :value="2">按借款金额比例(%)</Option>
                      </Select>
                      <InputNumber :min="0" v-model="item.procedureMoney" style="width: 100px;" size="large"></InputNumber>
                    </span>
                    <Button type="error" shape="circle" icon="ios-trash-outline" @click.stop.prevent="handleDelete(services, index)"></Button>
                  </li>
                  <button class="btn-add" @click.stop.prevent="handleAddServices">新增手续费</button>
                </ul>
              </template>
            </FormItem>
            <FormItem label="提前还款:">
              <p>
                <i-switch size="large" v-model="form.aheadReypayStatus" :true-value="1" :false-value="0">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </p>
              <template v-if="form.aheadReypayStatus">
                <RadioGroup v-model="form.aheadReypayInterestType" size="large" style="margin-bottom: 10px;margin-top: 10px;">
                  <Radio :label="1">按日计息
                    <span style="margin-left: 30px;">
                      日息:
                      <InputNumber :min="0" v-model="form.aheadReypayInterestDayRate" style="width: 100px;" size="large"></InputNumber>%
                    </span>
                  </Radio>
                  <Radio :label="2">按当前还款周期利息计算</Radio>
                </RadioGroup>
                <div style="margin-bottom: 10px;margin-top: 10px;">
                  <Checkbox v-model="form.aheadReypayDeditStatus">有违约金</Checkbox>
                  <p v-if="form.aheadReypayDeditStatus">剩余未还本金的比例: <InputNumber :min="0" v-model="form.aheadReypayDeditRatio" style="width: 100px;"   size="large"></InputNumber>%</p>
                </div>
              </template>
            </FormItem>
            <FormItem label="罚息&计算方式:">
              <div class="check-box">
                <Checkbox v-model="form.defaultDayStatus" size="large">
                  <RadioGroup v-model="form.defaultDayType" size="large">
                    <Radio :label="1" :disabled="form.defaultDayStatus == false">按日复利计算</Radio>
                    <Radio :label="2" :disabled="form.defaultDayStatus == false">按日单利计算</Radio>
                  </RadioGroup>
                  <span style="margin-left: 30px;">
                    利率:
                    <InputNumber :min="0" v-model="form.defaultDayRate" style="width: 100px;" :disabled="form.defaultDayStatus == false" size="large"></InputNumber>%
                  </span>
                </Checkbox>
              </div>
              <div class="check-box">
                <Checkbox v-model="form.defaultMonthStatus" size="large">
                  <RadioGroup v-model="form.defaultMonthType" size="large">
                    <Radio :label="1" :disabled="form.defaultMonthStatus == false">按月复利计算</Radio>
                    <Radio :label="2" :disabled="form.defaultMonthStatus == false">按月单利计算</Radio>
                  </RadioGroup>
                  <span style="margin-left: 30px;">
                    利率:
                    <InputNumber :min="0" v-model="form.defaultMonthRate" style="width: 100px;" :disabled="form.defaultMonthStatus == false" size="large"></InputNumber>%
                  </span>
                </Checkbox>
              </div>
              <div class="check-box">
                罚息上限：本金额的: <InputNumber :min="0" v-model="form.defaultMax" style="width: 100px;" size="large"></InputNumber>%
              </div>
              <p style="text-align: left; font-size: 18px;margin-bottom: 10px; color: red;">*按日，按月独立计算，可相互叠加。</p>
            </FormItem>
            <FormItem label="贷款支付给:">
              <RadioGroup v-model="form.payFor" size="large">
                <Radio :label="1">渠道商（消费场景，适用消费分期）</Radio>
                <Radio :label="2">贷款人（适用现金贷）</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="最高放贷金额:">
              <InputNumber v-model="form.payMoneyMax" :min="0" style="width: 60%;" size="large"></InputNumber>元
            </FormItem>
            <FormItem label="放贷须过几级审批:">
              <RadioGroup v-model="form.auditLevel" size="large">
                <Radio :label="1">1级</Radio>
                <Radio :label="2">2级</Radio>
                <Radio :label="3">3级</Radio>
              </RadioGroup>
            </FormItem>
            <!-- <FormItem label="产品申请限制:">
            </FormItem> -->
            <FormItem label="有未还清贷款时继续申请:">
              <i-switch size="large" v-model="form.applyAllowDebtStatus" :true-value="1" :false-value="0">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="申请人数配置:">
              <span>增长系数：<InputNumber :min="0" v-model="form.applyAddNum" size="large"></InputNumber></span>
              <span style="margin-left: 50px;">保底数量：<InputNumber :min="0" v-model="form.applyLeastPeopleNum" size="large"></InputNumber></span>
            </FormItem>
            <FormItem label="产品利率显示:">
              <p>产品列表利率文案</p>
              <Input v-model="form.rateTxt" size="large" clearable></Input>
              <p>申请表页面是否显示
                <i-switch  size="large" v-model="form.rateShowStatus" :true-value="1" :false-value="0">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </p>
            </FormItem>
            <FormItem label="重复查询大数据期限:">
              <InputNumber :min="0" v-model="form.againBigdataDays" style="width: 60%;" size="large"></InputNumber>天
            </FormItem>
          </Form>
  </div>
</template>

<script>
import uploadImage from './uploadImage.vue'
export default {
  components: { uploadImage },
  props: {
    form: {
      type: Object
    },
    services: {
      type: Array
    },
    interests: {
      type: Array
    },
    images: {
      type: Array
    }
  },
  data() {
    return {
      options: [
        { value: 1, label: '等本等息 (按月还款)' },
        { value: 2, label: '等本等息 (按周还款)' },
        { value: 3, label: '等本等息 (自定义周期)' },
        { value: 4, label: '先息后本 (按月还款)' },
        { value: 5, label: '先息后本 (按周还款)' },
        { value: 6, label: '先息后本 (自定义周期)' },
        { value: 7, label: '等额本息 (按月还款)' },
        { value: 8, label: '等额本息 (按周还款)' },
        { value: 9, label: '等额本息 (自定义周期)' },
        { value: 10, label: '等额本金 (按月还款)' },
        { value: 11, label: '等额本金 (按周还款)' },
        { value: 12, label: '等额本金 (自定义周期)' },
        { value: 13, label: '利随本金 (到期还款)' },
        { value: 14, label: '等额本金 (固定还款日)' },
        { value: 15, label: '等额本息 (固定还款日)' },
        { value: 16, label: '先息后本 (固定还款日)' },
        { value: 17, label: '等本等息 (固定还款日)' }
      ]
    }
  },
  computed: {
    imgs() {
      return this.images
    }
  },
  methods: {
    imageSuccess(data) {
      if (data.type == 0) {
        this.images = []
      } else if (data.type == 1) {
        this.images.push({ url: data.file })
      }
    },
    handleDelete(list, index) {
      list.splice(index, 1)
    },
    handleAddRepayCycle(list, index) {
      list.push({
        cycleRateId: '',
        cycleNum: 0,
        cycleRateNormal: 0,
        cycleRateLeast: 0
      })
    },
    handleAddServices() {
      this.services.push({ 
        procedureId: '', 
        procedureName: '', 
        procedureChargeType: 1, 
        procedureMoney: 0 
      })
    },
    handleAddInterests() {
      this.interests.push({
        repaymentId: '',
        repaymentType: '',
        repaymentDays: 0,
        interestType: 1,
        dayInterest: 0,
        supportCycle: '',
        cycleDays: 0,
        repayDayEvryMonth: 0,
        repayLastCycleDay: 0,
        yearChangeRate: '',
        repayCycle: [{
          cycleRateId: '',
          cycleNum: 0,
          cycleRateNormal: 0,
          cycleRateLeast: 0
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-add {
    display: block;
    clear: both;
    overflow: hidden;
    background: transparent;
    height: 50px;
    line-height: 50px;
    color: #508cee;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
    border: 0;
    outline: 0;
    &:hover {
      color: #49a9ee;
    }
  }
  .dd {
    margin-bottom: 10px;
  }
  .ddd {
    margin: 10px 0;
  }
</style>


