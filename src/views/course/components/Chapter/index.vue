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
            <el-button type="text" @click="updateChapter(chapter.id)" >编辑</el-button>
            <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
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
                <el-button type="text" >删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 章节表单对话框 TODO
      vue对象如果需要自定义查找组件，可以通过ref定义值，通过vue对象  this.$refs.key
    -->
    <!-- <chapter-form ref="chapterForm" /> -->
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
import chapterApi from '@/api/chapter'
export default {
  components: {
    // 注册vue子组件
    ChapterForm
  },
  data() {
    return {
      chapterList: []
    }
  },

  // created() {
  //   this.getChapterNestedList()
  // },

  methods: {
    // 回到上一页
    previous() {
      this.$parent.active = 0
    },

    // 到下一页去
    next() {
      this.$parent.active = 2
    },

    // 添加章节
    addChapter() {
      // 打开子组件的收集框
      this.$refs.chapterForm.open()
    },

    // 添加章节和修改章节都是要使用到同一个模态框，我们将待修改的章节id给模态框页面，由那边处理
    // 注意，对比，新增没传入任何参数给open()方法，修改则传入了章节id给open()方法
    updateChapter(id) {
      // 查询要编辑的chapter数据：可以将id交给子组件来查询
      this.$refs.chapterForm.open(id)
    },

    // 获取到章节层叠嵌入集合
    getChapterNestedList() {
      chapterApi.chapterNestedList(this.$parent.courseId)
        .then(response => {
          this.chapterList = response.data.items
          this.$forceUpdate() // 虽然vue数据池的数据是更新了，但是页面需要刷新才能再次抓取data内的数据
        })
    },

    deleteChapter(id) {
      this.$confirm('此操作将永久删除该章节，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => { // 这个.then表示点击了"确定"按钮后的行动
          return chapterApi.removeChapter(id)
        }).then(response => { // 这个.then是指异步请求成功后的动作(删除成功)
          this.getChapterNestedList() // 调用的方法可以重新查询data数据池的数据并刷新页面
          this.$message.success(response.message)
        })
        .catch((response) => { // 这个.catch表示点击"取消"按钮后的动作
          if (response === 'cancel') {
            this.$message.info('取消删除')
          }
        })
    }

  }
}
</script>

<style scoped>
.chapterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #DDD;
}
</style>
