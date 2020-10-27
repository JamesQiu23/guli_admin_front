<template>
  <!-- 添加和修改课时表单 -->
  <el-dialog :visible="dialogVisible" :title="title" @close="close()">
    <el-form :model="video" label-width="120px">
      <el-form-item label="课时标题">
        <el-input v-model="video.title"/>
      </el-form-item>
      <el-form-item label="课时排序">
        <el-input-number v-model="video.sort" :min="0" />
      </el-form-item>
      <el-form-item label="是否免费">
        <el-radio-group v-model="video.free">
          <el-radio :label="true">免费</el-radio>
          <el-radio :label="false">默认</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 上传视频 TODO -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import videoApi from '@/api/video'

export default {
  data() {
    return {
      title: '添加课时', // 打开模态框默认是显示"添加课时"
      dialogVisible: false, // 默认关闭'模态框'不显示
      video: {
        sort: 0,
        free: false
      }
    }
  },

  methods: {
    // 打开接收收集课时信息的容器模态框
    open(chapterId, courseId, videoId) {
      // 和章节的思路一样，如果有课时id，则此id用于回显说明是修改；没有课时id则是新增
      if (videoId) {
        // 根据id查询video信息，并放到数据data池内，用于回显
        videoApi.getVideo(videoId)
          .then(response => {
            this.video = response.data.item
          })
        this.dialogVisible = true
      } else { // 没有videoId则是新增课时，直接打开收集的模态框即可
        if (chapterId) {
          this.video.chapterId = chapterId
        }
        if (courseId) {
          this.video.courseId = courseId
        }
        this.dialogVisible = true
      }
    },

    close() {
      this.dialogVisible = false
      this.formReset()
    },
    // 清空模态框保存在data容器video中的内容
    formReset() {
      this.video = {
        sort: 0,
        free: false
      }
    },

    // 点击模态框的确定按钮后，触发这个方法，是保存或修改
    saveOrUpdate() {
      if (this.video.id) {
        this.update()
      } else {
        this.save()
      }
    },

    // 新增课时
    save() {
      videoApi.saveVideo(this.video)
        .then(response => {
          this.$message.success(response.message)
          this.close() // 关闭对话框,清理对话框存储的上次数据
          this.$parent.getChapterNestedList() // 父组件页面重新查询章节和课时的嵌套集合，之后刷新页面重新抓取数据
        })
    },

    update() {
      videoApi.updateVideo(this.video)
        .then(response => {
          this.$message.success(response.message)
          // 关闭对话框
          this.close()
          // 更新父组件的 章节课时的嵌套列表
          this.$parent.getChapterNestedList()
        })
    },

    delete(videoId) {
      videoApi.deleteVideo(videoId)
        .then(response => {
          this.$message.success(response.message)
          this.$parent.getChapterNestedList()
        })
    }

  }
}
</script>
