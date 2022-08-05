<template>
  <div>
    <!-- 顶部搜索框 -->
    <!-- ios系统下在组件外层加一个form标签 可以让弹出键盘出现搜索选项 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggesttion></SearchSuggesttion>
    <SearchResult></SearchResult> -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggesttion from './components/SearchSuggesttion.vue'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggesttion
  },
  data() {
    return {
      // 初始值绑定值为空
      keywords: '',
      // 用来记录用户是否搜索了
      isShowSearchResults: false
    }
  },
  // 点击事件的方法
  methods: {
    onSearch() {
      this.isShowSearchResults = true
    },
    onSearchFocus() {
      // 有值显示搜索建议
      // keyword为'' 显示搜索历史
      this.isShowSearchResults = false
    }
  },
  computed: {
    componentName() {
      // 等于空的时候显示搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
        // 有值的时候显示搜索结果
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      // 如果上述两个条件都不满足 显示搜索建议
      return 'SearchSuggesttion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [roue='button'] {
    color: #fff;
  }
}
</style>
