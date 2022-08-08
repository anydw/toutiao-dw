<template>
  <div>
    <!-- 图片 -->
    <div class="exit_img">
      <img src="@/assets/images/banner.png" alt="" />
      <div class="mobile">
        <img src="@/assets/images/mobile.png" alt="" />
      </div>
      <p @click="$router.push('/login')">登录/注册</p>
    </div>
    <!-- 主体 -->
    <div>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="star-o" text="收藏" to="/" />
        <van-grid-item icon="clock-o" text="历史" url="/" />
      </van-grid>
      <van-cell title="消息通知" is-link url="/" />
      <van-cell title="小智同学" is-link to="/" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.exit_img {
  position: relative;
  img {
    width: 100%;
  }
  .mobile {
    position: fixed;
    top: 100px;
    left: 330px;
    width: 100px;
    height: 100px;
    // background-color: pink;
    border-radius: 50%;
    img {
      width: 120px;
      height: 120px;
    }
  }
  p {
    position: absolute;
    top: 220px;
    left: 330px;
    font-size: 30px;
    text-align: center;
    color: #fff;
  }
}
</style>
