<template>
  <div class="exit_body">
    <!-- 图片 -->
    <div class="exit_img">
      <img src="@/assets/images/banner.png" alt="" />
      <div class="mobile">
        <img :src="this.imgAndName.photo" alt="" />
      </div>
    </div>
    <!-- 功能 -->
    <div class="exit_button">
      <van-button
        type="default"
        @click="$router.push('/user')"
        round
        size="mini"
        >编辑资料</van-button
      >
    </div>
    <div class="exit_comment">
      <div>
        <span>0</span>
        <p>头条</p>
      </div>
      <div>
        <span>0</span>
        <p>粉丝</p>
      </div>
      <div>
        <span>0</span>
        <p>关注</p>
      </div>
      <div>
        <span>0</span>
        <p>获赞</p>
      </div>
    </div>
    <!-- 名字 -->
    <div class="exit_name"><p>{{this.imgAndName.name}}</p></div>
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
export default {
  props: {
    imgAndName: {
      type: Object
    }
  }
}
</script>

<style scoped lang="less">
.exit_body {
  background-color: #ccc;
  .exit_img {
    position: relative;
    img {

      width: 100%;
    }
    .mobile {
      position: fixed;
      top: 140px;
      left: 45px;
      width: 2.53rem;
      height: 2.53rem;
      // background-color: pink;
      // border-radius: 50%;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
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
  .exit_comment {
    display: flex;
    justify-content: space-around;
    flex-flow: row;
    // justify-items: center;
    align-items: center;
    width: 10rem;
    position: absolute;
    top: 3.7rem;
    left: 0;
    font-size: 0.34rem;
    color: #fff;
    div {
      text-align: center;
    }
  }
  .exit_button {
    position: absolute;
    top: 2.3rem;
    right: 0.37rem;
  }
  .exit_name {
    position: absolute;
    top: 2rem;
    left: 3.2rem;
    color: #fff;
    font-size: 0.4rem;
  }
}
</style>
