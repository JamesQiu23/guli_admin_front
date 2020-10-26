<template>
  <div>
    <el-steps :active="active" simple>
      <el-step title="步骤 1" icon="el-icon-edit"/>
      <el-step title="步骤 2" icon="el-icon-edit"/>
      <el-step title="步骤 3" icon="el-icon-upload"/>
    </el-steps>
    <!-- 使用子组件 -->
    <info v-if="active===0" />
    <chapter v-if="active===1" />
    <publish v-if="active===2" />
  </div>
</template>

<script>
// 在vue页面中引入子组件(子vue)：当前form.vue引入了 Info.vue ,Info是子组件，form是父组件
// 使用步骤：1、引入子组件  2、注册子组件  3、可以以标签的方式在页面中使用子组件
import Info from '@/views/course/components/Info'
import Chapter from '@/views/course/components/Chapter' // 默认查找Chapter/index
import Publish from '@/views/course/components/Publish'

export default {
  components: { // 注册引入的子组件给当前的vue对象
    Info, Chapter, Publish
  },
  data() {
    return {
      active: 0,
      courseId: ''
    }
  }
}
</script>
