<template>
  <div id="app-container">
    <!-- 条件查询分页数据的表单 -->
    <el-form :inline="true" class="demo-form-inline" style="margin-top:20px;margin-left:10px">
      <el-form-item>
        <el-input v-model="seachObj.name" placeholder="讲师名"/>
      </el-form-item>
      <el-form-item >
        <el-select v-model="seachObj.level" placeholder="讲师头衔">
          <el-option label="首席讲师" value="1"/>
          <el-option label="高级讲师" value="2"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-col :span="11">
          <el-form-item >
            <el-date-picker v-model="seachObj.startDate" type="date" placeholder="选择开始日期" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker v-model="seachObj.endDate" type="date" placeholder="选择截止日期" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-button icon="el-icon-search" type="primary" @click="getTeacherPage" >查询</el-button>
      <el-button @click="clearData">清空</el-button>
    </el-form>
    <el-table :data="items" stripe style="width: 100%">
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
          <!-- 用于显示当前row是总记录数的第几项 -->
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100"/>
      <el-table-column
        prop="avatar"
        label="头像">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" :src="scope.row.avatar" style="width:50px ; height:50px" alt="">
          <img v-else src="https://my-oos-bucket01.oss-cn-shanghai.aliyuncs.com/myphoto/a7.jpg" style="width:50px ; height:50px" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="简介"
      />
      <el-table-column
        prop="level"
        label="级别"
        width="100">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.level==1"
            type="primary" >首席讲师</el-tag>
          <el-tag
            v-if="scope.row.level==2"
            type="success" >高级讲师</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="joinDate"
        label="加入时间"/>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<script>
// 引入需要使用的js组件
import teacherApi from '@/api/teacher'
export default {
  data() {
    return {
      items: [], // 用来接受讲师列表数据
      // 分页查询的条件的默认属性值
      page: 1,
      limit: 5,
      seachObj: {},
      total: 0
    }
  },
  created() {
    this.getTeacherPage()
    // this.getTeacherList() // 查询所有
  },

  methods: {
    // 更新讲师方法
    handleEdit(id) {
      // 将id携带到 编辑表单页面  :path: 'edit/:id'
      this.$router.push(`/teacher/edit/${id}`) // 跳转到 teacherEdit组件中时，vue代码中可以以id为key获取id值
    },
    // 删除讲师单击事件方法
    handleDelete(teacher) {
      // alert(id)
      // teacherApi.teacherRemove(id)
      this.$confirm(`此操作将永久删除<<${teacher.name}>>, 是否继续?`, '删除讲师', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确认按钮的处理代码
        return teacherApi.teacherRemove(teacher.id)
      }).then(response => { // 处理上面删除请求的响应
        // 删除成功提示
        this.$message.success(response.message)
        // 刷新当前页面
        this.getTeacherPage()
      }).catch(() => { // 点击取消按钮的处理代码
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    clearData() {
      this.seachObj = {}
      this.getTeacherPage()
    },
    // 每页显示记录条数更新时调用
    handleSizeChange(limit) {
      // alert(limit)
      this.limit = limit
      // 数据改变时重新加载分页数据
      this.getTeacherPage()
    },
    // 页码更新时调用
    handleCurrentChange(page) {
      // alert(page)
      this.page = page
      this.getTeacherPage()
    },
    // 条件查询分页显示
    getTeacherPage() {
      teacherApi.pageList(this.page, this.limit, this.seachObj)
        .then(response => {
          console.log(response)
          this.items = response.data.pageModel.records
          // total 总记录条数,  size:当前页查询到几条记录  , pages:总页码
          this.total = response.data.pageModel.total
        })
    },
    getTeacherList() {
      teacherApi.list()
        .then(response => {
          // console.log(response.data.items)
          this.items = response.data.items
        })
    }
  }
}
</script>
