import Vue from 'vue'
import Vuex from 'vuex'
import { gettoken, settoken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  // JSON.parse(localStorage.getItem("HEIMA_TOUTIAO_TOKEN"))||{}
  // 存储状态
  state: {
    //  tokenObj:storage.get("HEIMA_TOUTIAO_TOKEN") || {}
    tokenObj: gettoken() || {}
  },
  getters: {},
  // 同步修改状态
  mutations: {
    STE_TOKEN(state, payload) {
      // 将token存入VUEX
      state.tokenObj = payload
      // token存入本地
      console.log(11111)
      // localStorage.setItem("HEIMA_TOUTIAO_TOKEN",JSON.stringify(payload))
      // storage.set("HEIMA_TOUTIAO_TOKEN",payload)
      settoken(payload)
    }
  },
  actions: {},
  modules: {}
})
