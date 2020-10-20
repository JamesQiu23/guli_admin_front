import request from '@/utils/request' // 引入axios实例对象

export default {
  // 查询全部
  list() {
    return request({
      url: '/admin/edu/teacher/list',
      method: 'get'
    })
  },

  // 分页查询
  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/teacher/list/${page}/${limit}`,
      method: 'get',
      params: searchObj // 查询条件封装的对象
    })
  },

  // 根据ID删除
  removeById(id) {
    return request({
      url: `/admin/edu/teacher/remove/${id}`,
      method: 'delete'
    })
  },

  // 新增对象
  save(teacher) {
    return request({
      url: '/admin/edu/teacher/save',
      method: 'post',
      data: teacher
    })
  },

  getById(id) {
    return request({
      url: `/admin/edu/teacher/getById/${id}`,
      method: 'get'
    })
  },

  // 5、根据id查询讲师
  teacherQueryById(id) {
    return request({
      url: `/admin/edu/teacher/get/${id}`,
      method: 'get'
    })
  }
}
