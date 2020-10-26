<template>
  <!-- 添加和修改章节表单 -->
  <el-dialog :visible="dialogVisible" title="添加章节" @close="close()">
    <el-form label-width="120px">
      <el-form-item label="章节标题">
        <el-input v-model="chapter.title"/>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="chapter.sort" :min="0"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import chapterApi from '@/api/chapter'
export default {

  data() {
    return {
      dialogVisible: false, // 此变量用于是否显示"模态框"
      chapter: { // 这是章节对象，里面包含此章节的基本信息
        sort: 0
      }
    }
  },

  methods: {
    // 当父组件调用这个方法开启'模态框'时，需要确认这次打开是用于新增还是用于修改，修改就需要回显
    open(chapterId) {
      // 新增传递参数为空，修改则需要回显则传递章节的id用于查询数据再回显
      if (chapterId) {
        chapterApi.getChapter(chapterId)
          .then(response => {
            // 将获取的章节对象赋给模态框收集数据池：data内的chapter
            this.chapter = response.data.item
            this.dialogVisible = true
          })
      } else {
        // 新增则直接显示一个空的模态框
        this.dialogVisible = true
      }
    },

    close() { // 每次关闭模态框就是将模态框可视化取消，同时清零模态框的收集池
      this.dialogVisible = false
      this.formReset()
    },

    // 这是模态框的确定按钮，如果是更新则已经调用了查询方法进行回显了，所以chapter容器肯定有章节id；新增则没有
    saveOrUpdate() {
      if (!this.chapter.id) { // 新增则chapter对象就是初始状态，肯定是没有id的
        this.save()
      } else {
        this.update()
      }
      this.formReset() // 无论是新增还是更新，都需要将收集数据的容器清空，以免接下来点击新增时出现上次的数据
    },

    // 清空模态框的章节信息收集容器，避免新增时回显
    formReset() {
      this.chapter = {
        sort: 0
      }
    },

    save() {
      // 给chapter对象设置章节所属的课程id
      this.chapter.courseId = this.$parent.$parent.courseId // 当时将课程id存到了form.vue页面，用于到上一页的回显
      chapterApi.saveChapterInfo(this.chapter)
        .then(response => {
          this.$message.success(response.message)
          // 新增成功后需要调用父组件的查询章节课时嵌套集合的方法重新获取数据集合到vue的data内，同时getChapterNestedList方法内部刷新了页面
          this.$parent.getChapterNestedList()
        })
        // 关闭模态框放在这里是，无论异步请求成功或失败，都要关闭模态框
      this.close()
    },

    update() {
      chapterApi.updateChapter(this.chapter)
        .then(response => {
          this.$message.success(response.message)
          this.$parent.getChapterNestedList()
        })
      // 关闭模态框放在这里是，无论异步请求成功或失败，都要关闭模态框
      this.close()
    }
  }
}
</script>
