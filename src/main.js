import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// vueX
import store from './store'

// 引入iconfont字体图标样式
import '@/assets/fonts/iconfont.css'
import 'amfe-flexible'

// 引入vant库并使用
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 引入动态设置rem值

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
