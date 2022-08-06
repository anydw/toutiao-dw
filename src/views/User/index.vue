<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 用户信息 -->
    <van-cell title="头像" is-link>
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="userInfo.photo"
        @click="$refs.file.click()"
      />
      <!-- 使用input框的文件提交功能，并隐藏  accept是限制图片格式 -->
      <input
        type="file"
        ref="file"
        hidden
        accept="png,jfit"
        @change="selectPhoto"
      />
    </van-cell>
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      :style="{ height: '100%', width: '100%' }"
      closeable
      ><UpdateAvator :photo="photo" v-if="isShowAvator" @updata-Avator='userInfo.photo=$event'></UpdateAvator
    ></van-popup>
  </div>
</template>

<script>
import { resolveToBase64 } from '@/utils'
import UpdateAvator from './components/UpdateAvator.vue'
import { getUserInfo } from '@/api'
export default {
  name: 'User',
  components: {
    UpdateAvator
  },
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取个人资料信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败,请刷新')
      }
    },
    // 处理图片上传
    async selectPhoto(e) {
      // 获取file对象
      const file = e.target.files[0]

      // console.log(123)
      // 把file对象转成img的src可识别的格式
      const url = await resolveToBase64(file)
      this.photo = url
      // 清空value，可以让用户选择同一张图片
      e.target.value = ''
      this.isShowAvator = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
