<template>
  <div>
    <!-- 搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <div>
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="item in myChannel" :key="item.id" :title="item.name">
          <ArticleList :id="item.id"></ArticleList>
        </van-tab>
        <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
      </van-tabs>
    </div>
    <!-- 频道弹层 -->
    <div>
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <!-- 给组件添加自定义事件 close -->
        <ChannelPopup
          :myChannel="myChannel"
          @close="show = false"
          @change-active="active = $event"
          @del-channel="delChannel"
          @add-channel="addChannel"
        ></ChannelPopup>
      </van-popup>
    </div>
  </div>
</template>

<script>
import ChannelPopup from './components/ChannelPopup.vue'
import ArticleList from './components/ArticleList.vue'
import {
  getMyChannel,
  delChannels,
  addChannel,
  setMyChannelTOlocal,
  getMyChannelTOlocal
} from '@/api'
export default {
  data() {
    return {
      active: 0,
      myChannel: [],
      show: false
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  // 引入注册组件
  components: {
    ArticleList,
    ChannelPopup
  },
  // 在创建完成后可以调用定义函数方法
  created() {
    this.getMyChannel()
  },
  methods: {
    initMyChannel() {
      if (this.isLogin) {
        // 用户登录了 先发送请求获取数据
        this.getMyChannel()
      } else {
        // 用户未登录 从本地存储的数据里面拿到
        const myChannel = getMyChannelTOlocal()
        if (myChannel) {
          // 本地存储有myChannel数据 从本地拿
          this.myChannel = myChannel
        } else {
          // 本地没有数据的话 就重新从服务端获取
          this.getMyChannel()
        }
      }
    },
    // 获取频道列表
    async getMyChannel() {
      try {
        const { data } = await getMyChannel()
        this.myChannel = data.data.channels
        // console.log(data)
      } catch (error) {
        console.log(error)
        this.$$toast.fail('获取频道失败，请刷新')
      }
    },
    // 删除频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await delChannels(id)
        } else {
          setMyChannelTOlocal(
            (this.myChannel = this.myChannel.filter((item) => item.id !== id))
          )
        }
        // 删除服务器数据
        // 更新视图
        this.myChannel = this.myChannel.filter((item) => item.id !== id)
        this.$toast.success('删除成功')
      } catch (error) {
        this.$toast.fail('删除失败')
      }
    },
    // 添加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannel.length)
        } else {
          setMyChannelTOlocal([...this.myChannel, channel])
        }
        this.myChannel.push(channel)
        this.$toast.success('添加成功')
      } catch (error) {
        this.$toast.fail('添加失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 999;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;
  // position: fixed;
  // top: 92px;
  // left: 0;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
