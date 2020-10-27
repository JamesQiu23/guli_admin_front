import request from '@/utils/request' // 引入axios实例对象

export default {
  // 保存课时信息
  saveVideo(video) {
    return request({
      url: '/admin/edu/video/save-video',
      method: 'post',
      data: video
    })
  },

  // 删除课时视频
  deleteVideo(videoId) {
    return request({
      url: `/admin/edu/video/delete-video/${videoId}`,
      method: 'delete'
    })
  },

  // 根据id查询课时video
  getVideo(videoId) {
    return request({
      url: `/admin/edu/video/get-video/${videoId}`,
      method: 'get'
    })
  },

  updateVideo(video) {
    return request({
      url: '/admin/edu/video/update-video',
      method: 'put',
      data: video
    })
  }
}
