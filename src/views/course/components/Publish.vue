<template>
  <div>
    <!--课程预览-->
    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ coursePublish.levelOneTitle }} — {{ coursePublish.levelTwoTitle }}</span></p>
        <p>课程讲师：{{ coursePublish.name }}</p>
        <h3 class="red">￥{{ coursePublish.price }}元</h3>
      </div>
    </div>

    <div style="text-align:center">
      <el-button type="primary" @click="previous">上一步</el-button>
      <el-button :disabled="flag" type="primary" @click="publishCourse">发布课程</el-button>
    </div>
  </div>
</template>
<script>

import courseApi from '@/api/course'
export default {
  data() {
    return {
      flag: false, // 用于标记提交按钮，防止重复提交
      coursePublish: {}
    }
  },

  created() {
    this.getPublisInfo(this.$parent.courseId)
  },

  methods: {
    previous() {
      this.$parent.active = 1 // chapter页面
    },
    next() {
      this.$parent.active = 3 // 读取就是发布页面，点击即进行发布给服务器
    },

    // 获取待发布课程的信息到数据池，用于显示
    getPublisInfo(courseId) {
      courseApi.getPublishInfo(courseId)
        .then(response => {
          this.coursePublish = response.data.item
        })
    },

    publishCourse() {
      courseApi.publishCourse(this.$parent.courseId)
        .then(response => {
          this.$message.success(response.message)
        })
    }
  }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>
