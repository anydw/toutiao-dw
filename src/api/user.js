import request from '@/utils/request'

/**
 * 登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    data,
    method: 'POST'
  })
}
export const getCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
