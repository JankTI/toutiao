<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          >
          </van-image>
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
          >
            编辑资料
          </van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid
      class="grid-nav"
      :column-num="2"
      clickable
    >
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link></van-cell>
    <van-cell class="mb-9" title="小智同学" is-link></van-cell>
    <van-cell
      v-if="user"
      clickable
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: "MyIndex",
  data() {
    return {
      userInfo: {} // 用户信息
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    // 如果用户登录了 则请求加载用户信息数据
    if(this.user){
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout(){
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // on confirm
        // 确认退出: 清除登录状态(容器中的user + 本地存储中的user)
        this.$store.commit('setUser',null)
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    },
    async loadUserInfo(){
      try{
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试。')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-container{
  .header{
    height: 180px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img{
        width: 76px;
        height: 76px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .user-info{
    .base-info{
      height: 115px;
      padding: 38px 16px 11px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 66px;
          height: 66px;
          margin-right: 11px;
          border: 4px solid #fff;
        }
        .name{
          font-size: 15px;
          color: #fff;
        }
      }
    }
    .data-stats{
      display: flex;
      .data-item{
        height: 65px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 10px;
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 70px;
      i.iconfont {
        font-size: 22px;
      }
      .icon-shoucang{
        color: #eb5253
      }
      .icon-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 14px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
