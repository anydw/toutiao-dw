import request from '@/utils/request'
import storage from '@/utils/storage'
// import store from '@/store'
export const getMyChannel = () => {
  // 获取用户的频道
  return request({
    url: '/v1_0/user/channels'
    // headers: {
    // // Bearer后面需要加上一个空格
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}

// 获取所有频道列表
export const getallchannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * @param {*} target 频道id
 * @returns Promise
 */
export const delChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
// 不要忘记引用storage
// set 方法需要传入值
const HEIMA_TOUTIAO_MYCHANNEL = 'HEIMA_TOUTIAO_MYCHANNEL'
export const setMyChannelTOlocal = (MyChannels) => {
  storage.set(HEIMA_TOUTIAO_MYCHANNEL, MyChannels)
}
// get方法需要return一个值回来
export const getMyChannelTOlocal = () => {
  return storage.get(HEIMA_TOUTIAO_MYCHANNEL)
}
