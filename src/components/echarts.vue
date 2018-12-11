<template>
  <div ref="myChart" style="height: 400px;"></div>
</template>

<script>
// const echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/bar')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题

export default {
  props: {
    datas: {
      type: Object
    }
  },
  mounted() {
    this.echartsInit()
  },
  methods: {
    echartsInit() {
      const myChart = echarts.init(this.$refs.myChart, 'macarons')
      myChart.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
          data:['笔数','金额']
        },
        xAxis: {
          data: this.datas.dateList
        },
        yAxis: [
          {
            name: '数值',
            type: 'value'
          }
        ],
        series: [
          {
            name: '笔数',
            type: 'line',
            data: this.datas.billCountList
          },
          {
            name: '金额',
            type: 'bar',
            data: this.datas.moneyList
          }
        ]
      })
    }
  }
}
</script>