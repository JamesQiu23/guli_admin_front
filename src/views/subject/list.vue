<template>
  <div>
    <el-tree :data="data" :props="defaultProps" />
  </div>
</template>
<script>
import subjectApi from '@/api/subject'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      data: []
    }
  },
  created() {
    this.getSubjectNestedList()
  },
  methods: {
    getSubjectNestedList() {
      subjectApi.subjectNestedList()
        .then(response => {
          console.log(response)
          this.data = response.data.items
        })
    }
  }
}
</script>
