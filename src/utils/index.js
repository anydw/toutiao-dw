/**
 * 封装成可以解析的base64
 * @param {*} file 图片
 * @returns
 */
export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
