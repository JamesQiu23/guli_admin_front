import request from '@/utils/request'

export default{
  // 加载课程列表的方法
  getSubjectList() {
    return request({
      url: '/admin/edu/subject/getSubjectList',
      method: 'get'
    })
  }
}
