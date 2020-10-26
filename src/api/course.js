import request from '@/utils/request'

export default{
  // 保存课程的详细信息
  saveCourseInfo(courseInfo) {
    return request({
      url: '/admin/edu/course/saveCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },

  // 查询上一步骤的内容
  getCourseInfo(id) {
    return request({
      url: `/admin/edu/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },

  // 修改课程信息
  updateCourseInfo(id, courseInfo) {
    return request({
      url: '/admin/edu/course/updateCourseInfo',
      method: 'put',
      params: { id },
      data: courseInfo
    })
  }

}
