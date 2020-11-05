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
  },

  // 获取待发布课程的信息
  getPublishInfo(courseId) {
    return request({
      url: `/admin/edu/course/getPublishInfo/${courseId}`,
      method: 'get'
    })
  },

  // 课程发布，将课程的状态改为normal(默认是draft草稿)
  publishCourse(courseId) {
    return request({
      url: `/admin/edu/course/publish-course/${courseId}`,
      method: 'put'
    })
  },

  getPageList(page, limit, searchObj) {
    return request({
      url: `admin/edu/course/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  }
}
