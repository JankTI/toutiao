<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable>
      <!-- <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel"></article-list>
      </van-tab> -->
      <van-tab title="标签1">
        <article-list :channel="channel"></article-list>
      </van-tab>
      <van-tab title="标签2">内容2</van-tab>
      <van-tab title="标签3">内容3</van-tab>
      <van-tab title="标签4">内容4</van-tab>
      <van-tab title="标签3">内容3</van-tab>
      <van-tab title="标签4">内容4</van-tab>
      <div slot="nav-right" class="placehloder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article-list'
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
    };
  },
  created(){
    this.loadChannels()
  },
  methods: {
    async loadChannels(){
      try{
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      }catch (err){
        this.$toast('获取频道数据失败')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 87px;
  padding-bottom: 50px;
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon{
      font-size: 16px;
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__wrap{
      height: 41px;
      position: fixed;
      top: 46px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab{
      min-width: 100px;
      border-right: 1px solid #edeff3;
      font-size: 15px;
      color:#777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav{
      padding-bottom: 0px;
    }
    .van-tabs__line{
      bottom: 4px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }
    .placehloder{
      width: 33px;
      height: 41px;
      flex-shrink: 0;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      width: 33px;
      height: 41px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: .502;
      i.iconfont{
        font-size: 16px;
      }
      &:before{
        content: "";
        width: 1px;
        height: 100%;
        position: absolute;
        left: 0;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
