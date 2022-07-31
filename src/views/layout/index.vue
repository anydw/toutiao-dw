<template>
  <div>
    <router-view></router-view>
    <div>
      <van-tabbar route>
        <van-tabbar-item v-for ="(item,index) in tabbarData" :key="index" :to="item.to">
            <template #icon>
                <span :class="`toutiao ${item.icon}`"></span>
                <span>{{item.text}}</span>
            </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     tabbarData: [
        {
          to: '/layout/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/layout/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/layout/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/layout/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
    ] 
    }
 }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon){
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-evenly;
    height: 100%;
    font-size: 30px;
    .toutiao{
        font-size: 40px;
    }
}
</style>
