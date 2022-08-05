<template>
  <div>
    <van-cell
      v-for="(item, index) in hightlightsuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// lodash引入debounce组件 需要加上花括号
import { debounce } from 'lodash'
import { getSearchSuggestionsApi } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    hightlightsuggestions() {
      // 正则表达式 i不区分大小写 g是所有
      const reg = new RegExp(this.keywords, 'ig')
      // 返回将现在的数组用map映射，item是原数组
      return this.suggestions.map((item) =>
        // 用原来的数组写替换 最后用模板字符串
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestions()
      }
    }
  },
  methods: {
    // 1.延迟执行，开启定时器
    // 2.清掉上一次的定时器，可以把ID挂载在都能拿到的地方也可以挂载在window上面
    // getSearchSuggestions() {
    //   clearTimeout(this.id)
    //   this.id = setTimeout(async () => {
    //     try {
    //       const { data } = await getSearchSuggestionsApi(this.keywords)
    //       console.log(data)
    //       this.suggestions = data.data.options
    //     } catch (error) {
    //       this.$toast.fail('获取搜索建议失败')
    //     }
    //   }, 300)
    // }
    getSearchSuggestions: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsApi(this.keywords)
        console.log(data)
        // boolean可以用来过滤数组里面的假值 等价于filter((str)=>boolean(str))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
