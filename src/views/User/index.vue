<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 用户信息  -->
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
      ><UpdateAvator
        :photo="photo"
        v-if="isShowAvator"
        @updata-Avator="userInfo.photo = $event"
      ></UpdateAvator
    ></van-popup>
    <!-- 更新昵称 -->
    <div>
      <van-cell
        title="昵称"
        is-link
        :value="this.value"
        @click="isShowNname = true"
      >
      </van-cell>
      <van-popup
        position="bottom"
        v-model="isShowNname"
        :style="{ height: '100%', width: '100%' }"
      >
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <van-cell-group>
          <van-field
            v-model="value"
            placeholder="请输入新的昵称"
            show-word-limit
            maxlength="11"
          />
        </van-cell-group>
      </van-popup>
    </div>
    <!-- 更新性别 -->
    <div>
      <van-cell
        title="性别"
        is-link
        :value="columns[userInfo.gender]"
        @click="isShowSex = true"
      >
      </van-cell>
      <van-popup
        v-model="isShowSex"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-picker
          v-if="isShowSex"
          title="更新性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          :default-index="userInfo.gender"
        />
      </van-popup>
    </div>
    <!-- 更改年龄 -->
    <div>
      <van-cell
        title="年龄"
        is-link
        :value="this.timer"
        @click="isShowAge = true"
      >
      </van-cell>
      <van-popup
        v-model="isShowAge"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          ref="timers"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="cancel"
          @confirm="confirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { resolveToBase64 } from '@/utils'
import UpdateAvator from './components/UpdateAvator.vue'
import { getUserInfo, upLoadName, upLoadSex, upLoadAge } from '@/api'

export default {
  name: 'User',
  components: {
    UpdateAvator
  },
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: '',
      isShowNname: false,
      value: '',
      isShowSex: false,
      columns: ['男', '女'],
      isShowAge: false,
      minDate: new Date(1910, 0, 1),
      maxDate: new Date(2025, 10, 1),
      timer: ''
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
        // console.log(data)
        this.userInfo = data.data
        this.value = data.data.name
        this.timer = data.data.birthday
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
    },
    // 关闭弹层
    onClickLeft() {
      this.getUserInfo()
      this.isShowNname = false
    },
    // 更新昵称
    async onClickRight() {
      try {
        const { data } = await upLoadName(this.value)
        this.isShowNname = false
        // console.log(data)
        this.value = data.data.name
      } catch (error) {}
    },
    // 更新性别
    async onConfirm(value, index) {
      // console.log(123, value, index)
      try {
        await upLoadSex(index)
        // console.log(data)
        this.userInfo.gender = index
        this.isShowSex = false
      } catch (error) {}
    },
    onCancel() {
      this.isShowSex = false
    },
    // 更新年龄
    cancel() {
      this.isShowAge = false
    },
    async confirm() {
      this.timer = this.$refs.timers.getPicker().getValues().join('-')
      await upLoadAge(this.timer)
      this.isShowAge = false
      // console.log(data)
      // console.log(this.timer);
    }
  },
  computed: {
    currentDate: {
      get() {
        const arr = this.timer.split('-')
        arr[1] -= 1
        return new Date(...arr)
      },
      set() {}
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
