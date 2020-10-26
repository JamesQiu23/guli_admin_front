<template>
  <div>
    <el-form ref="form" :model="courseInfo" style="margin:30px" label-width="80px">

      <!-- 课程标题 -->
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" style="width:200px"/>
      </el-form-item>

      <!-- 课程讲师列表选择 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <!-- 课程类别列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select v-model="courseInfo.subjectParentId" placeholder="请选择" @change="subjectChanged">
          <el-option
            v-for="item in subjectNestedList"
            :key="item.id"
            :label="item.title"
            :value="item.id"/>
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId">
          <el-option
            v-for="item in subjectChildren"
            :key="item.id"
            :label="item.title"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <!-- 总课时设置 -->
      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="1" controls-position="right" />
      </el-form-item>

      <!-- 写课程简介 -->
      <el-form-item label="课程简介">
        <tinymce :height="200" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 上传课程封面 -->
      <el-form-item label="课程封面">
        <!-- 上传组件 -->
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="http://localhost:8024/admin/oss/file/upload?module=cover">
          <!-- 如果存在就显示 -->
          <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <!-- 设置课程价格 -->
      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right" /> &nbsp; 元
      </el-form-item>

    </el-form>

    <!-- 保存并到下一步的按钮 -->
    <div style="text-align:center">
      <el-button type="primary" @click="saveAndNext">保存并下一步</el-button>
    </div>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import courseApi from '@/api/course'
import teacherApi from '@/api/teacher'
import subjectApi from '@/api/subject'

import Tinymce from '@/components/Tinymce'

export default {
  // 此页面是form.vue的子组件，但是它可以引入子组件，就是Tinymce
  components: {
    Tinymce
  },

  data() {
    return {
      subjectChildren: [],
      subjectNestedList: [],
      teacherList: [],
      // 表单双向绑定courseInfo，表单内的每一项绑定对应的courseInfo.xx属性
      courseInfo: {
        teacherId: '',
        subjectParentId: '',
        subjectId: '',
        title: '',
        price: '',
        lessonNum: '',
        description: '',
        cover: ''
      }
    }
  },

  created() {
    this.getTeacherList()
    this.getSubjectNestedList()
    if (this.$parent.courseId) {
      this.getCourseInfo(this.$parent.courseId)
    }
  },

  methods: {
    saveAndNext() {
      if (this.$parent.courseId) {
        courseApi.updateCourseInfo(this.$parent.courseId, this.courseInfo)
          .then(response => {
            this.$message.success('课程信息修改成功')
            this.$parent.active = 1
          })
      } else {
        courseApi.saveCourseInfo(this.courseInfo)
          .then(response => {
            this.$message.success('保存信息成功')
            // 如果第一页保存到数据库成功，则将返回的这个课程的id保存到父组件中，返回上一页时可以依据此id查询到回显
            console.log(response.data.courseId)
            this.$parent.courseId = response.data.courseId
            // 保存成功则跳转到第二步
            this.$parent.active = 1 // this代表Info的vue对象,this.$parent 获取Info的vue对象的父组件(form)
          })
      }
    },

    // 查询讲师集合，用于下拉框选择课程的讲师
    getTeacherList() {
      teacherApi.list()
        .then(response => {
          this.teacherList = response.data.items
        })
    },

    // 查询课程类别的集合，用于下拉框选择课程类别
    getSubjectNestedList() {
      subjectApi.getSubjectList()
        .then(response => {
          this.subjectNestedList = response.data.items
        })
    },

    // 绑定一级分类的下拉框
    subjectChanged() {
      // this.subjectChildren = []
      // this.courseInfo.subjectId = ''

      // 当一级分类的下拉框改变，则获取当前选定的一级分类的二级分类集合，赋值给当前vue的data的subjectChildren集合
      this.subjectNestedList.forEach(levelOneSubject => {
        if (levelOneSubject.id === this.courseInfo.subjectParentId) {
          this.subjectChildren = levelOneSubject.children
          return
        }
      })
    },

    // 处理课程封面上传成功进行回显
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.imageURL
    },

    // 在课程方面上传前进行校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    },

    // 根据id查询上一页保存的courseInfo的信息
    getCourseInfo(id) {
      console.log('这个方法执行了，id是' + id)
      courseApi.getCourseInfo(id)
        .then(response => {
          this.courseInfo = response.data.item
          // 获取一级课程分类id
          const subjectParentId = this.courseInfo.subjectParentId
          // 根据一级课程分类的id获取 二级分类的集合，初始化subjectChildren
          this.subjectNestedList.forEach(subject => {
            if (subject.id === subjectParentId) {
              this.subjectChildren = subject.children // 不是说不知道二级课程的id，返回的courseInfo对象中就有，显示也是显示的id而不是title
              // 是没法在select的众多options中根据二级课程的id显示对应的title即课程名，因为二级课程的选项集合没有初始化(subjectChildren)
            }
          })
        })
    }
  }
}
</script>
