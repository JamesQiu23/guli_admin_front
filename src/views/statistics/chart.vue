
<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <el-row>
      <el-col :span="12">
        <div id="register_num" class="chart" style="height:500px;" />
      </el-col>
      <el-col :span="12">
        <div id="login_num" class="chart" style="height:500px;" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="video_view_num" class="chart" style="height:500px;" />
      </el-col>
      <el-col :span="12">
        <div id="course_num" class="chart" style="height:500px;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import statisticsApi from '@/api/statistics'
import echarts from 'echarts'
export default {
  data() {
    return {
      btnDisabled: false,
      begin: '',
      end: ''
    }
  },
  methods: {
    echartsInit(divId, xData, yData, title) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(divId))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: title
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: yData
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    showChart() {
      this.btnDisabled = true
      console.log('打印看起始时间')
      console.log(this.begin + ',' + this.end)
      if (this.begin.length > 0 && this.end.length > 0) {
        statisticsApi.showCharts(this.begin, this.end)
          .then(response => {
            console.log(response.data.map)
            // 使用echarts渲染数据显示到页面中
            const registerNumMap = response.data.map.registerNumMap
            this.echartsInit('register_num', registerNumMap.xData, registerNumMap.yData, '注册用户数量')
            const loginNumMap = response.data.map.loginNumMap
            this.echartsInit('login_num', loginNumMap.xData, loginNumMap.yData, '日活跃用户数量')
            const videoViewNumMap = response.data.map.videoViewNumMap
            this.echartsInit('video_view_num', videoViewNumMap.xData, videoViewNumMap.yData, '视频播放数量')
            const couseNumMap = response.data.map.couseNumMap
            this.echartsInit('course_num', couseNumMap.xData, couseNumMap.yData, '课程发布数量')

            this.btnDisabled = false
          })
      } else {
        this.$message.warning('请选择开始和结束日期')
      }
    }

  }
}
</script>
