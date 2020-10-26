<template>
  <div>
    <div style="text-align:center">
      <el-button type="primary" @click="previous">上一步</el-button>
      <el-button type="primary" @click="next">发布课程</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    previous() {
      this.$parent.active = 1 // chapter页面
    },
    next() {
      this.$parent.active = 3 // 读取就是发布页面，点击即进行发布给服务器
    }
  }
}
</script>
