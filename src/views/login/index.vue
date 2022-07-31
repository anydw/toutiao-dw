<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!--表单验证 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            class="code-button"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.43rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCodeApi } from '@/api'
import { mobileRules, codeRules } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    // 登录部分
    async onSubmit() {
      const data = { mobile: this.mobile, code: this.code }
      try {
        const {
          data: { data: token }
        } = await login(data)
        this.$store.commit('STE_TOKEN', token)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        try {
          await getCodeApi(this.mobile)
          this.$toast.success('验证码获取成功')
          // 显示倒计时
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 404) {
            console.log(error.response.data.message)
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
}
.code-button {
  background-color: #eeeeee;
  .van-button__content {
    color: #a9929b;
  }
}
</style>
