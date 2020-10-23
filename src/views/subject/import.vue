
<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-button type="text" @click="open">模板说明</el-button>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="defaultExcelTemplate">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :file-list="fileList"
          :on-remove="handleRemove"
          :auto-upload="false"
          :limit="3"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-exceed="handleSize"
          class="upload-demo"
          action="http://localhost:8023/admin/edu/subject/import">
          <!-- action地址需要修改为项目的处理文件上传的地址 -->
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button>
          <div slot="tip" class="el-upload__tip">请注意：只能上传依据课程模板格式填写的课程分类excel文档</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultExcelTemplate: process.env.OSS_PATH + '/myfile/课程分类列表模板.xls', // 默认Excel模板
      // 完整访问地址：https://my-oos-bucket01.oss-cn-shanghai.aliyuncs.com/myfile/课程分类列表模板.xls
      // 设置为处理后的也可以正常访问：defaultExcelTemplate: process.env.OSS_PATH + '/myfile/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB%E5%88%97%E8%A1%A8%E6%A8%A1%E6%9D%BF.xls',

      importBtnDisabled: false, // 导入按钮是否禁用
      fileList: [],
      count: 0
    }
  },

  methods: {
    open() {
      this.$alert('亲，请严格按照模板文件的格式填写课程列表，否则可能无法导入成功', '请注意')
    },
    handleSuccess() { // 上传成功后将待上传区的文件列表清空
      this.count = 0
      this.fileList = []
    },

    // 设置每次最多上传三份文件
    handleSize(files, fileList) {
      if (fileList.length > 3) {
        this.$message.warning('每次最多上传三份文件')
      }
    },
    submitUpload() {
      if (this.count === 0) {
        this.$message.warning('请选择要上传的文件! ')
        return
      }
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.count = fileList.length
      console.log('handleChange的length是' + fileList.length)
    },
    // 每次移除文件后就更新count的值，因为提交文件时需要判断文件数量是否为0
    handleRemove(file, fileList) {
      this.count = this.fileList.length
    }
  }
}
</script>

