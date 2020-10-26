<template>
  <div>
    <!-- 添加章节按钮 -->
    <div>
      <el-button type="primary" @click="addChapter">添加章节</el-button>
    </div>

    <!-- 章节列表 -->
    <ul class="chapterList">
      <li
        v-for="chapter in chapterList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>
              {{ video.title }}
              <el-tag v-if="!video.videoSourceId" size="mini" type="danger">
                {{ '尚未上传视频' }}
              </el-tag>
              <span class="acts">
                <el-tag v-if="video.free" size="mini" type="success">{{ '免费观看' }}</el-tag>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 章节表单对话框 TODO
      vue对象如果需要自定义查找组件，可以通过ref定义值，通过vue对象  this.$refs.key
    -->
    <chapter-form ref="chapterForm" />
    <!-- 课时表单对话框 TODO -->

    <div style="text-align:center">

      <el-button type="primary" @click="previous">上一步</el-button>
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
// 引入组件
import ChapterForm from '@/views/course/components/Chapter/Form'

export default {
  components: {
    ChapterForm
  },
  data() {
    return {
      chapterList: []
    }
  },
  created() {
    console.log(this.$parent.courseId)
  },
  methods: {
    // 添加章节
    addChapter() {
      this.$refs.chapterForm.open()
    },
    next() {
      this.$parent.active = 2 // 跳转到发布页
    },
    previous() {
      this.$parent.active = 0 // 回到info页
    }
  }
}
</script>
