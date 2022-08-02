<template>
  <div>
    <!-- 没有图片 通过data里面的cover.type的值来判断-->
    <van-cell
      v-if="ArticlesInfo.cover.type === 0"
      :title="ArticlesInfo.title"
      :label="`${this.ArticlesInfo.aut_name} ${this.ArticlesInfo.comm_count}评论 ${this.ArticlesInfo.pubdate}`"
    />
    <!-- 1张图片 -->
    <van-cell
      v-if="ArticlesInfo.cover.type === 1"
      :title="ArticlesInfo.title"
      :label="`${this.ArticlesInfo.aut_name} ${this.ArticlesInfo.comm_count}评论 ${this.ArticlesInfo.pubdate}`"
    >
      <van-image width="50" height="50" :src="ArticlesInfo.cover.images[0]" />
    </van-cell>
    <!-- 3张图片 -->
    <van-cell
      v-if="ArticlesInfo.cover.type === 3"
      :title="ArticlesInfo.title"
      :label="`${this.ArticlesInfo.aut_name} ${this.ArticlesInfo.comm_count}评论 ${this.ArticlesInfo.pubdate}`"
    >
      <van-image
        v-for="(item, index) in ArticlesInfo.cover.images"
        :key="index"
        width="50"
        height="50"
        :src="item"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'Articles',
  props: {
    ArticlesInfo: {
      // 从父组件传值过来
      type: Object,
      default: () => ({}) // 对象和数组的默认值 必须用函数返回
    }
  },
  computed: {
    // lable () {
    //  `${this.ArticlesInfo.aut_name} ${this.ArticlesInfo.comm_count}评论 ${this.ArticlesInfo.pubdate}`
    // }
  }
}
</script>

<style></style>
