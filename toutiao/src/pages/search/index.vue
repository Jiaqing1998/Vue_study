<template>
  <div>
    <van-search
      shape="round"
      v-model.trim="value"
      show-action
      placeholder="请输入搜索关键词"
      @input="onInput(value)"
      @search="onSearch"
    >
      <template #left>
        <van-icon
          name="arrow-left"
          @click="onBack"
        />
      </template>
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>
    <template v-if="!value">
      <!-- 历史记录栏 -->
      <van-cell-group v-show="searchResult.length>0 ? true : false">
        <van-cell
          title="历史记录"
        >
          <template #right-icon>
            <van-icon
              name="delete"
              @click="deleteAllHistory"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 历史记录列表 -->
      <van-cell-group>
        <van-cell
          :title="item"
          v-for="item in searchResult"
          :key="item"
          @click="onSearch(item)"
        >
          <van-icon
            name="cross"
            @click="deleteHistory(item)"
          />
        </van-cell>
      </van-cell-group>
    </template>
    <!-- 模糊查询 -->
    <van-cell-group>
      <van-cell
        v-for="option in options"
        :key="option"
        icon="search"
      >
        <template #title>
          <div v-html="highlight(option)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import * as searchApi from '@/api/search.js';
export default {

  data() {
    return {
      value: '',
      searchResult: JSON.parse(localStorage.getItem('searchResult')) || [],
      options: [],
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    async onInput(value) {
      if (!value) {
        return;
      }
      const res = await searchApi.getSearchSuggest(value);
      this.options = res.data.data.options.filter((op) => typeof op === 'string');
    },
    // 高亮关键字
    highlight(str) {
      return str.replace(this.value, `<span class="highlight">${this.value}</span>`);
    },
    // 搜索点击事件
    // 这里的value是形式参数
    onSearch(value) {
      // 先取历史记录
      const searchResult = JSON.parse(localStorage.getItem('searchResult')) || [];
      // 如果没有value就推入一个新项且保存到本地
      if (!searchResult.includes(value)) {
        searchResult.push(value);
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
      }
      // 跳转到搜索结果页面
      this.$router.push({
        path: '/searchResult',
        // query会拼接在问号后面
        // 例如：/searchResult?q=aaa
        query: {
          q: value,
        },
      });

    },
    // 删除全部历史记录
    deleteAllHistory() {
      // 删除渲染的searchResult
      this.searchResult = [];
      // 更新本地的searchResult
      localStorage.setItem('searchResult', JSON.stringify(this.searchResult));
    },
    // 删除当前历史记录
    deleteHistory(item) {
      console.log('删除当前历史记录');
      // 删除渲染的searchResult
      this.searchResult = this.searchResult.filter((i) => i !== item);
      // 更新本地的searchResult
      localStorage.setItem('searchResult', JSON.stringify(this.searchResult));
    },
  },
  created() {
    // 取出数据
    this.searchResult = JSON.parse(localStorage.getItem('searchResult')) || [];
  }
};
</script>

<style lang="less" scoped>
/deep/ .highlight {
  color: @primary;
}
</style>
