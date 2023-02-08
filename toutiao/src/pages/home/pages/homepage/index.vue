<template>
  <div>
    <div class="head">
      <!-- 导航栏 -->
      <van-tabs
        v-model="activeName"
        class="head-tab"
        @click="showChannel"
        @change="changeChannel"
      >
        <van-tab
          v-for="item in userChannels"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        />
      </van-tabs>
      <!-- 操作栏 -->
      <div class="operation">
        <!-- 搜索栏 -->
        <van-icon
          name="search"
          size="24px"
          @click="serch"
        />
        <!-- 添加删除栏 -->
        <van-icon
          name="plus"
          size="24px"
          @click="showPopup"
        />
        <!-- 弹出层 -->
        <van-popup
          v-model="show"
          position="right"
          :style="{ height: '100%', width: '100%' }"
        >
          <!-- 关闭按钮 -->
          <div class="onClose">
            <van-icon
              class="close"
              name="cross"
              @click="back"
            />
          </div>
          <!-- 我的频道 -->
          <div class="channel">
            <div class="my-channel">
              <span class="channel-title">我的频道:</span>
              <span class="go-channel">点击进入频道</span>
            </div>
            <!-- 编辑按钮 -->
            <div>
              <van-button
                round
                type="primary"
                @click="showClose"
                ref="edit"
                class="edit"
              >
                编辑
              </van-button>
            </div>
          </div>
          <!-- 频道列表 -->
          <div class="channel-list">
            <van-row type="flex">
              <van-col>
                <van-tag
                  class="like"
                  size="medium"
                  type="primary"
                  :closeable="showLike"
                  @close="deleteChannel(item.id)"
                  v-for="item in userChannels"
                  :key="item.id"
                  @click="goChannel(item.id)"
                  :class="{ active: activeName === item.id }"
                >
                  {{ item.name }}
                </van-tag>
              </van-col>
            </van-row>
          </div>
          <!-- 可选频道 -->
          <div class="select-channel">可选频道</div>
          <!-- 可选频道列表 -->
          <div class="select-channel-list">
            <van-row type="flex">
              <van-col>
                <van-tag
                  ref="change"
                  class="like"
                  :closeable="false"
                  size="medium"
                  type="primary"
                  @click="
                    addChannel({ channels: [{ id: item.id, seq: item.id }] })
                  "
                  v-for="item in restChannels"
                  :key="item.id"
                >
                  + {{ item.name }}
                </van-tag>
              </van-col>
            </van-row>
          </div>
        </van-popup>
      </div>
    </div>
    <template>
      <div class="content">
        <router-view />
        <!-- 引入子组件 -->
        <!-- 方法名= 方法 -->
        <!--  @detail="onDetail" -->
        <article-list
          :data="list"
          :req="onReq"
          :closeable="true"
          @close="onArticleClose"
        />
      </div>
    </template>
  </div>
</template>
<script>
import * as channelApi from '@/api/channel.js';
import * as searchApi from '@/api/search.js';
import articleList from '@/components/article-list/index.vue';
// import * as articleApi from '@/api/article.js';
let preTimestamp;
export default {
  components: {
    articleList,
  },
  data() {
    return {
      activeName: 0,
      channels: [],
      Allchannels: [],
      userChannels: [],
      show: false,
      showLike: false,
      searchResult: [],
      // 需要渲染的数据
      list: [],
    };
  },
  computed: {
    // 剩余频道
    restChannels() {
      return this.Allchannels.filter((item) => !this.userChannels.some((channel) => channel.id === item.id)
      );
    },
  },
  methods: {
    // 点击进入详情内容
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
    // 点击关闭按钮
    onArticleClose() {
      console.log('关闭了');
    },
    serch() {
      this.$router.push('/search');
    },
    showPopup() {
      this.show = true;
      channelApi
        .getUserChannels()
        .then((res) => {
          this.userChannels = res.data.data.channels;
        })
        .catch((err) => {
          console.log(err);
        });
      channelApi
        .getAllChannels()
        .then((res) => {
          this.Allchannels = res.data.data.channels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      this.show = false;
    },
    close() {
      this.show = false;
    },
    showClose() {
      this.showLike = !this.showLike;
      // 点击后按钮内容变化
      if (this.showLike) {
        this.$refs.edit.innerText = '完成';
        this.$refs.edit.style.backgroundColor = 'orangered';
        this.$refs.edit.style.color = '#fff';
      } else {
        this.$refs.edit.innerText = '编辑';
        this.$refs.edit.style.backgroundColor = '#fff';
        this.$refs.edit.style.color = 'orangered';
      }
      channelApi
        .getAllChannels()
        .then((res) => {
          this.Allchannels = res.data.data.channels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除频道
    deleteChannel(id) {
      console.log('正在删除');
      channelApi
        .deleteUserChannel(id)
        .then((res) => {
          console.log(res);
          // 删除后重新获取用户频道列表
          channelApi
            .getUserChannels()
            .then((res) => {
              this.userChannels = res.data.data.channels;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加频道
    addChannel(data) {
      console.log(data);
      // 添加
      channelApi
        .setUserChannels(data)
        .then((res) => {
          console.log(res);
          // 添加后重新获取用户频道列表
          channelApi
            .getUserChannels()
            .then((res) => {
              this.userChannels = res.data.data.channels;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转到频道页
    goChannel(id) {
      console.log(id);
      this.activeName = id;
      this.color = 'orangered';
      this.show = false;
      // 点击发请求更新数据
      channelApi.getArticleRecommend(this.activeName, Date.now).then((res) => {
        console.log(res);
        this.list = res.data.data.results;

      });

    },
    // 点击跳转对应视窗
    goSearch(name, title) {
      console.log(name, title);
      this.showChannel(name, title);
      this.$router.push('/search');
    },
    async showChannel() {
      const res = await channelApi.getArticleRecommend(this.activeName, Date.now());
      console.log(res);
      this.recommendResult = res.data.data.results;
    },
    // 删除搜索记录
    async deleteSearch(evevt, id) {
      evevt.stopPropagation();
      console.log(id);
      // 点击后删除id
      const res1 = await searchApi.dislikeArticle(id);
      console.log(res1.data.data.target);
      // 删除id
      this.searchResult = this.searchResult.filter((item) => item.art_id !== id);
      // 删除后重新获取搜索记录
      const res2 = await searchApi.getSearchResult(this.activeName);
      console.log(res2);
    },
    async changeChannel(id) {
      const res = await channelApi.getArticleRecommend(id, Date.now());
      preTimestamp = res.data.data.pre_timestamp;
      this.list = res.data.data.results;
    },
    async onReq() {
      const res = await channelApi.getArticleRecommend(this.activeName, !preTimestamp ? Date.now() : preTimestamp);
      preTimestamp = res.data.data.timestamp;
      this.list = this.list.concat(res.data.data.results);
      console.log(this.list);
      return true;
    }
  },
  created() {
    // 获取用户频道列表
    channelApi
      .getUserChannels()
      .then((res) => {
        this.userChannels = res.data.data.channels;
      })
      .catch((err) => {
        console.log(err);
      });
    // 获取所有频道列表
    channelApi
      .getAllChannels()
      .then((res) => {
        this.Allchannels = res.data.data.channels;
      })
      .catch((err) => {
        console.log(err);
      });
    // 获取搜索记录
    channelApi
      .getArticleRecommend(this.activeName, Date.now())
      .then((res) => {
        this.searchResult = res.data.data.results;
      })
      .catch((err) => {
        console.log(err);
      });

  },
};
</script>
<style lang="less" scoped>
.head {
  display: flex;
  .head-tab {
    flex: 1;
    overflow: hidden;
    /deep/ .van-tab--active span {
      font-size: 18px;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 40px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
      // 点击穿透
      pointer-events: none;
    }
  }
}
.operation {
  display: flex;

  align-items: center;
  // 关闭按钮
  .onClose {
    display: flex;
    .close {
      margin-left: auto;
    }
  }
  // 我的频道
  .channel {
    padding: 16px;
    display: flex;
    .my-channel {
      width: 80%;
      .channel-title {
        font-size: 16px;
      }
      .go-channel {
        font-size: 12px;
        color: #999;
      }
    }
    .edit {
      padding: 0 20px;
      font-size: 12px;
      height: 20px;
    }
  }
  // 频道列表
  .channel-list {
    padding: 16px;
    van-row {
      flex-wrap: wrap;
    }
    .like {
      color: #999;
      padding: 15px 25px;
      margin: 5px 8px 5px 0;
      border-radius: 20px;
      background: #f7f8fa;
      text-align: center;
    }
    & .active {
      color: orangered;
    }
  }
  // 可选频道
  .select-channel {
    padding: 16px;
    font-size: 16px;
  }
  // 可选频道列表
  .select-channel-list {
    padding: 16px;
    van-row {
      flex-wrap: wrap;
    }
    .like {
      color: #999;
      padding: 15px 25px;
      margin: 5px 0;
      border-radius: 20px;
      background: #f7f8fa;
      text-align: center;
    }
  }
}
</style>


