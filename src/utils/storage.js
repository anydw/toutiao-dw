// 封装本地存储
class Storage {
  get(key) {
    // getItem(key:string):string
    // JSON.parse() 只能转化JSON格式的字符串
    const value = localStorage.getItem(key)
    try {
      // 如果是JSON 直接parse流程 返回
      return JSON.parse(value)
    } catch {
      // 不是JOSN直接返正常的值
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    // value不是对象
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
