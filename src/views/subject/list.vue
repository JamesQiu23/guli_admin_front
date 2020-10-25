<template>
  <div>
    <el-input
      v-model="filterText"
      style="margin:20px; width:30%"
      placeholder="输入关键字进行过滤"/>
    <el-tree
      ref="subjectsTree"
      :default-expand-all="false"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      style="margin:30px" />
  </div>
</template>
<script>
import subjectApi from '@/api/subject'
export default {
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      // 获取tree 调用它的过滤方法 传入监听到的值，筛选tree内的数据
      this.$refs.subjectsTree.filter(val)
      // filter方法接收一个任意类型的参数，该参数会在filter-node-method的方法中作为第一个参数
    }
  },
  // 页面刚被加载
  created() {
    this.getSubjectNestedList()
  },
  methods: {
    getSubjectNestedList() {
      subjectApi.getSubjectList()
        .then(response => {
          console.log(response)
          this.data = response.data.items
        })
    },
    // tree过滤节点数据的方法，判断数据集合中的每一条数据是否需要显示，返回true显示
    filterNode(value, data) { // value就是搜索框内的文本值
      if (!value) return true // 如果输入搜索框内容为空，则轮询的这条不用判断是否匹配搜索内容，直接就显示
      // data.title  表示读取数据的标题
      // data代表数据源中的每一条课程分类数据，title代表数据的title属性值
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
