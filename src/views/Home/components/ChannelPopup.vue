<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-button"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannel"
        :key="item.id"
        :text="item.name"
        @click="changeActive(index,item)"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getallchannels } from '@/api'
export default {
  name: 'ChannelPopup',
  props: {
    myChannel: {
      // 我的频道
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      channelList: [] // 所有频道
    }
  },
  created() {
    this.getAllChannelsList()
  },
  methods: {
    // 获得所有频道的函数
    async getAllChannelsList() {
      const res = await getallchannels()
      console.log(res)
      this.channelList = res.data.data.channels
    },
    // 给我的频道绑定自定义点击事件
    changeActive(index, item) {
      // 根据isEdit事件来筛选
      if (this.isEdit) {
        if (item.name === '推荐') return
        console.log()
        this.$emit('del-channel', item.id)
      } else {
        // 点击关闭弹层
        this.$emit('close')
        // 关闭弹层的时候跳转到对应的模块
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      // 所有频道减去我的频道 筛选
      return this.channelList.filter(
        (aItem) => !this.myChannel.find((mItem) => aItem.id === mItem.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  padding-top: 1.33333rem;
  .edit-button {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
}
:deep(.van-grid-item__content) {
  background-color: #eee;
}
.recommend-item {
  :deep(.van-grid-item__content) {
    flex-direction: row;
    align-content: center;
  }
  :deep(.van-grid-item__icon) {
    font-size: 40px;
  }
}
:deep(.mychannel-item) {
  .van-grid-item__content {
    position: relative;
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }
  .van-icon-cross {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 30px;
    transform: translate(45%, -50%);
    border: 2px solid #000;
    border-radius: 50%;
    z-index: 300;
  }
}
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
</style>
