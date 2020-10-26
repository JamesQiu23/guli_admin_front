
import request from '@/utils/request'

export default{
  // 保存指定课程的一个章节信息
  saveChapterInfo(chapterForm) {
    return request({
      url: '/admin/edu/chapter/saveChapterInfo',
      method: 'post',
      data: chapterForm
    })
  },

  // 之所以是嵌套是因为一个章节可能有多个课时视频，多个课时视频放在章节的children属性中；
  chapterNestedList(courseId) {
    return request({
      url: `/admin/edu/chapter/get-chapterNested/${courseId}`,
      method: 'get'
    })
  },

  // 根据id删除章节
  removeChapter(id) {
    return request({
      url: `/admin/edu/chapter/remove-chapter/${id}`,
      method: 'delete'
    })
  },

  // 根据id查询章节
  getChapter(id) {
    return request({
      url: `/admin/edu/chapter/get-chapter/${id}`,
      method: 'get'
    })
  },

  // 更新章节
  updateChapter(chapter) {
    return request({
      url: '/admin/edu/chapter/update-chapter/',
      method: 'put',
      data: chapter
    })
  }

}
