import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'
export const gettoken = () => storage.get(TOKEN)
export const settoken = (value) => storage.set(TOKEN, value)
export const removeToken = () => storage.remove(TOKEN)
