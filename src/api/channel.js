import request from '@/utils/request'
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
