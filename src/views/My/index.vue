<template>
  <div class="login_body">
    <header>
      <div v-if="isLogin">
        <login :imgAndName="imgAndName"></login>
      </div>
      <div v-else>
        <exit></exit>
      </div>
    </header>
    <footer>
      <van-button
        type="primary"
        block
        color="#fff"
        v-if="isLogin"
        @click="logout"
        ><span>退出</span></van-button
      >
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import exit from './components/exit.vue'
import login from './components/login.vue'
export default {
  data() {
    return {
      imgAndName: {}
    }
  },
  components: { exit, login },

  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('STE_TOKEN', {})
    },
    async getUserInfoImg() {
      const { data } = await getUserInfo()
      console.log(data)
      this.imgAndName = data.data
    }
  },
  created() {
    this.getUserInfoImg()
  }
}
</script>

<style scoped lang="less">
.login_body {
  background-color: #ccc;
}
footer {
  span {
    color: red;
  }
}
</style>
