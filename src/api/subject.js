import request from '@/utils/request'

export default{

  // 加载课程列表的方法
  getAllSubjects() {
    return request({
      url: '/admin/edu/subject/getAllSubjects',
      method: 'get'
    })
  }

}
