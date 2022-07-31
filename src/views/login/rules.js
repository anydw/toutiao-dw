export const mobileRules = [
  { required: true, message: '请填写用户名' },
  { pattern: /^1[0-9]\d{9}$/, message: '请输入11位手机号' }
]
export const codeRules = [
  { required: true, message: '请填写密码' },
  { pattern: /^[0-9]{6}$/, message: '验证码格式不正确' }
]
