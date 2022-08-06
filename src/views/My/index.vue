<template>
  <div>
    <header>
      <div v-if="isLogin">
        已登录的盒子
        <button @click="$router.push('/user')">编辑按钮</button>
      </div>
      <div v-else>未登录的盒子</div>
    </header>
    <main>收藏/历史/</main>
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('STE_TOKEN', {})
    }
  }
}
</script>

<style></style>
