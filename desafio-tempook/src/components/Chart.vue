<template>
<div>
  <v-chart :options='options'/>
</div>
</template>

<style>
  .echarts {
    width: 600px;
    height: 300px;
  }
</style>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/grid'

  export default {
    name: 'Chart',
    props: ['graphData'],
    components: {
      'v-chart': ECharts
    },
    data () {
      let data = []

      for (let i = 0; i <= 360; i++) {
          let t = i / 180 * Math.PI
          let r = Math.sin(2 * t) * Math.cos(2 * t)
          data.push([r, i])
      }

      return {
        options: {
          
      xAxis: {
          type: 'category',
          data: this.graphData.x
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: this.graphData.y,
          type: 'line'
      }]
        }
      }
    }
  }
</script>