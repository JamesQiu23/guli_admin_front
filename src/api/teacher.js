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

  // 根据id获取到teacher对象
  getById(id) {
    return request({
      url: `/admin/edu/teacher/getById/${id}`,
      method: 'get'
    })
  },

  updateById(teacher) {
    return request({
      url: '/admin/edu/teacher/update',
      method: 'put', // 虽然是提交表单，但是务必注意提交后端是PutMapping
      data: teacher // 将数据放到data中就是请求体提交，也即json方式，后端就应该使用@RequestBody接收
    })
  }

}
