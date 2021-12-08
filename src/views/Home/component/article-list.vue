<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell
          v-for="(article,index) in list"
          :key="index"
          :title="article.title"
        ></van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props:{
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: '刷新成功'
    };
  },
  methods:{
    async onLoad(){
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // timestamp 简单理解就是请求数据的页码
          // 请求第1页数据: 当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timerstamp || Date.now(),
          with_tops: 1 // 是否包含置顶,进入页面第一次请求时要包含置顶文章，1-包含指定，0-不包含
        })
        // 2. 把请求结果数据放到list数组中
        const { result } = data.data
        // 数组的展开操作符 它会把数组元素一个一个拿出来
        this.list.push(...result)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;
        // 4. 判断数据是否全部加载完成
        if(result.length){
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了,将 finished 设置为 true
          this.finished = true
        }

      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh(){

      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 2. 将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false;

        // 更新下了刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.refreshSuccessText = '刷新失败'
        this.isRefreshLoading = false
      }

    }
  }
};
</script>

<style lang="less" scoped>
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
