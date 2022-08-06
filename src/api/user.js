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

/**
 * @param {String}获取用户个人信息
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 如果传的是对象，axios默认将对象转成JOSN并且加上content-type=application/json
// 如果传的是form表单，那么axios会将表单提交给后端，并且默认的加上content-type=application/json
// 如果后端要的是表单(form-data)
// const fm =new FormData()
// fm.APPEND(表单的name 表单项)
/**
 * 上传头像
 * @param {*} file 图片的file对象
 * @returns Promise
 */

export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
