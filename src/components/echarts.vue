<template>
  <div id="myChart" style="height: 400px;"></div>
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
  },
  data() {
    return {
    }
  },
  mounted() {
    this.echartsInit()
  },
  methods: {
    echartsInit() {
      const myChart = echarts.init(document.getElementById('myChart'), 'macarons')
      myChart.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
          data:['笔数','金额']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
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
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '金额',
            type: 'bar',
            data: [5, 50, 36, 100, 0, 20]
          },
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
