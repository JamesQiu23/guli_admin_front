import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/teacher',
    name: 'Dashboard'
  },
  {
    path: '/teacher',
    redirect: '/teacher/list',
    name: 'Teacher',
    component: Layout,
    meta: { title: '讲师管理' },
    children: [
      {
        path: 'list',
        name: 'TeacherList',
        component: () => import('@/views/teacher/list'),
        meta: { title: '讲师列表', icon: '' }
      },
      {
        path: 'create',
        name: 'TeacherCreate',
        component: () => import('@/views/teacher/form'),
        meta: { title: '添加讲师' }
      },
      {
        path: 'edit/:id', // 修改讲师会携带此讲师id进行路由跳转
        name: 'TeacherEdit',
        component: () => import('@/views/teacher/form'),
        // 这个页面和添加讲师的页面在同一个vue页面上，因为vue是动态加载生成某部分页面；
        meta: { title: '编辑讲师' },
        hidden: true // 注意这里，这个
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },

  // 课程分类管理的路由设置
  {
    path: '/subject',
    name: 'Subject',
    component: Layout,
    redirect: '/subject/list',
    meta: { title: '课程类别管理' },
    children: [
      {
        path: 'list',
        name: 'SubjectList',
        component: () => import('@/views/subject/list'), // component设置此路由的页面(一般是导入vue页面)
        meta: { title: '课程类别列表' }
      },
      {
        path: 'import',
        name: 'SubjectImport',
        component: () => import('@/views/subject/import'),
        meta: { title: '导入课程类别列表' }
      }
    ]
  },
  {
    path: '/course',
    redirect: '/course/list',
    name: 'Course',
    component: Layout,
    meta: { title: '课程管理' },
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: '' }
      },
      {
        path: 'form',
        name: 'CourseForm',
        component: () => import('@/views/course/form'),
        meta: { title: '课程发布' }
      },
      {
        path: 'info/:id',
        name: 'CourseInfoEdit',
        component: () => import('@/views/course/form'),
        meta: { title: '编辑课程' },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'CourseChapterEdit',
        component: () => import('@/views/course/form'),
        meta: { title: '编辑大纲' },
        hidden: true
      }
    ]
  },

  // 广告推荐与推荐位路由配置
  {
    path: '/ad',
    component: Layout, // 这个是页面布局的，比如面包屑、左侧导航栏等
    redirect: '/ad/list', //
    name: 'Ad',
    meta: { title: '内容管理' },
    children: [
      {
        path: 'list',
        name: 'AdList',
        component: () => import('@/views/ad/list'),
        meta: { title: '广告推荐' }
      },
      {
        path: 'create',
        name: 'AdCreate',
        component: () => import('@/views/ad/form'),
        meta: { title: '添加广告推荐' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'AdEdit',
        component: () => import('@/views/ad/form'),
        meta: { title: '修改广告推荐' },
        hidden: true
      },

      {
        path: 'type-list',
        name: 'AdTypeList',
        component: () => import('@/views/adType/list'),
        meta: { title: '推荐位' }
      },
      {
        path: 'type-create',
        name: 'AdTypeCreate',
        component: () => import('@/views/adType/form'),
        meta: { title: '添加推荐位' },
        hidden: true
      },
      {
        path: 'type-edit/:id',
        name: 'AdTypeEdit',
        component: () => import('@/views/adType/form'),
        meta: { title: '修改推荐位' },
        hidden: true
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
