<template>
  <div>
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 引入子组件 -->
    <!-- @detail="onDetail" -->
    <article-list
      :data="list"
      :req="onReq"
      :closeable="false"
    />
  </div>
</template>

<script>
import * as searchApi from '@/api/search.js';
import ArticleList from '@/components/article-list/index.vue';
export default {
  components: {
    ArticleList,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    // onDetail(id) {
    //   console.log(id);
    //   this.$router.push({
    //     path: '/newsDetails',
    //     // query会拼接在问号后面
    //     // 例如：/searchResult?q=aaa
    //     query: {
    //       q: id,
    //     },
    //   });

    // },
    onClickLeft() {
      this.$router.go(-1);
    },
    async onReq(currentPage) {
      const res = await searchApi.getSearchResult(this.$route.query.q, currentPage);
      this.list = this.list.concat(res.data.data.results);
      console.log(this.list);
      return res.data.data.results.length === 10;
    }
  },
};
</script>
