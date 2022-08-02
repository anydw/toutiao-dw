import request from '@/utils/request'

export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
