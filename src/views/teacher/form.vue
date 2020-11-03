<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" />
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 上传讲师头像 -->
      <el-form-item label="讲师头像">
        <el-upload
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess"
          :action="BASE_API+'/admin/oss/file/upload?module=avatar'"
          class="avatar-uploader">
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
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
import teacherApi from '@/api/teacher'

export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      // 初始化讲师默认数据
      teacher: {
        id: null,
        sort: 0,
        level: 1,
        avatar: null // 当用户上传图片成功后会返回图片地址，成功回调函数会将此地址放到data的teacher的avator属性中
      },
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  },

  created() {
    // console.log('获取到的id：' + this.$route.params.id)
    // 获取id对应的讲师信息回显
    // 只有更新跳转到此组件时才需要执行查询方法
    if (this.$route.params.id) {
      this.teacher.id = this.$route.params.id
      this.fetchDataById(this.$route.params.id)
    }
    console.log('有没有id呢?' + this.teacher.id)
  },

  methods: {
    handleAvatarError() {
      console.log('error')
      this.$message.error('上传失败,服务器繁忙')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' // 值和数据类型都相等
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(response, file) {
      if (response.code === 20000) {
        console.log(response) // 打印响应
        this.teacher.avatar = response.data.imageURL // 获取响应中的图片路径
        console.log(this.teacher.avatar)
        this.$forceUpdate() // 加载后强制渲染(其实就是刷新页面)
      } else {
        this.$message.error(response.message) // 有异常
      }
    },
    saveOrUpdate() { // 管你是保存还是修改，只要你点了页面的保存，我就不允许你再点
      this.saveBtnDisabled = true
      if (!this.teacher.id) { // 之后再根据是否有id来判断是新增还是更新
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 新增讲师
    saveData() {
      // debugger
      teacherApi.save(this.teacher)
        .then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/teacher' })
        })
    },

    // 根据id查询记录
    fetchDataById(id) {
      teacherApi.getById(id)
        .then(response => {
          this.teacher = response.data.item
        })
    },

    // 根据id更新记录
    updateData() {
      // teacher数据的获取
      console.log(this.teacher)
      teacherApi.updateById(this.teacher)
        .then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/teacher' })
        })
    }

    // // 条件查询分页显示
    // getTeacherPage() {
    //   teacherApi.pageList(this.page, this.limit, this.seachObj)
    //     .then(response => {
    //       console.log(response)
    //       this.items = response.data.pageModel.records
    //       // total 总记录条数,  size:当前页查询到几条记录  , pages:总页码
    //       this.total = response.data.pageModel.total
    //     })
    // },

  }
}
</script>
