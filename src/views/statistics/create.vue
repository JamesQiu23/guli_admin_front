<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="日期">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="选择要统计的日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-button
        :disabled="btnDisabled"
        type="primary"
        @click="genarateData()">生成</el-button>
    </el-form>

  </div>
</template>

<script>
import statisticsApi from '@/api/statistics'

export default {
  data() {
    return {
      day: '',
      btnDisabled: false
    }
  },

  methods: {
    genarateData() {
      this.btnDisabled = true // 新统计数据未生成之前禁止反复提交生成申请
      statisticsApi.createStatistics(this.day).then(response => {
        this.btnDisabled = false // 新数据生成之后恢复按钮可用，这样可以再生成数据(后端会删除之前的再生成新的)
        this.$message.success('生成成功')
      })
    }
  }
}
</script>
