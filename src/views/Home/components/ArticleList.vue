<template>
  <div>
    <!-- 向上刷新,可以调用同一个方法 -->
    <van-pull-refresh
     v-model="refreshloading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="沒有更多文章了"
        :finished="isfinished"
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
      >
        <Articles
          v-for="item in articlesList"
          :key="item.art_id"
          :ArticlesInfo="item"
        ></Articles>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import Articles from '@/components/Articles'
export default {
  name: 'ArticleList',
  components: { Articles },
  props: {
    id: {
      // 引入方式
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articlesList: [], // 先定义
      loading: false, // 触发事件的默认值是false
      isfinished: false,
      error: false,
      refreshloading: false
    }
  },
  // 调用函数
  created() {
    this.getArticleAPIFirst()
  },
  methods: {
    // 获取第一页数据
    async getArticleAPIFirst() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        // console.log(data)
        this.articlesList = data.data.results
        // 保存下一页的时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        // console.log(error)
        this.$toast.fail('刷新')
      }
    },
    // 加载下一页文章
    async loadNextPageArticle() {
      try {
        // console.log('加载下一页文章')
        // 把data解构  方便取用
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        //  console.log(data);
        // 在之前定义的数组里面存储最新的数据
        if (data.data.pre_timestamp === null) {
          this.isfinished = true
        }
        // 刷新判断条件
        if (this.refreshloading) {
          this.articlesList.unshift(...data.data.results)
        } else {
          this.articlesList.push(...data.data.results)
        }
        // 更新时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        console.log(error)
        this.error = true
      } finally {
        // 重新再调用触发事件
        this.loading = false
        this.refreshloading = false
      }
    }
  }
}
</script>

<style></style>
