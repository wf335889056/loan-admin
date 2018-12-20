<template>
  <div class="form">
    <Form :model="form" label-position="left" :label-width="280" class="standard">
      <Divider orientation="left">运营商</Divider>
      <FormItem label="入网时长时间低于(月):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入月份"></InputNumber >
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="前十个有效手机号码与通讯录对比命中记录(个):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入比对个数"></InputNumber >
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="通讯录和通话记录比对(个):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入比对个数"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="手机号码不重复号码低于(个):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入不重复个数"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="平均通话时长低于(秒):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入时长"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="手机未实名认证(未获取数据不包括在内):">
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <Divider orientation="left">淘宝支付宝</Divider>
      <FormItem label="芝麻分值大于(分):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入分值"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="花呗当期逾期状态(已逾期):">
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="借呗当期逾期状态(已逾期):">
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="淘宝收货地址(无):">
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="花呗额度(元):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入额度"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="借呗额度(秒):">
        <InputNumber  v-model="form.input1" class="w100px" placeholder="输入额度"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="绑定信用卡张数(张):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入张数"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <Divider orientation="left">其他</Divider>
      <FormItem label="年龄限制(岁):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入起始年龄"></InputNumber>
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入结束年龄"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="贷前综合风险值(分):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入数值"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="简单风险命中数量(个):">
        <InputNumber v-model="form.input1" class="w100px" :max="8" placeholder="输入个数"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="法院失信名单(个):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入个数"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="多平台借款数量(个):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入数量"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="多平台被拒绝数量(张):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入数量"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="逾期记录数量(张):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入数量"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem label="信贷反欺诈分值(分):">
        <InputNumber v-model="form.input1" class="w100px" placeholder="输入数值"></InputNumber>
        <Select v-model="form.input1" class="w100px" placeholder="选择审核方式">
          <Option :value="1">系统审核</Option>
          <Option :value="2">人工审核</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button size="default" type="primary" class="btn" @click="handleSubmit">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      months: [1,2,3,4,5,6,7,8,9,10,11,12]
    }
  },
  methods: {
    handleSubmit() {
    }
  }
}
</script>

<style lang="less" scoped>
  .standard {
    text-align: left;
  }
</style>
