<template>
  <div class="all">
    <van-nav-bar
      class="nav"
      left-arrow
      @click-left="goBack"
    >
      <template #right>
        <van-icon
          name="ellipsis"
          size="18"
          color="#999"
        />
      </template>
    </van-nav-bar>

    <div class="display">
      <!-- 标题 -->
      <h3
        class="title"
        ref="navBar"
      >
        {{ articleList.title }}
      </h3>
      <!-- 时间-阅读量-评论数 -->
      <div class="time-read-comm">
        <span>{{ articleList.pubdate }}</span>
        <span>|</span>
        <span>{{ articleList.read_count }}</span>
        <span>|</span>
        <span>{{ articleList.comm_count }}</span>
      </div>
      <van-sticky @change="onTop">
        <div
          class="top"
          v-if="isOnTop"
        >
          <van-image
            round
            width="28"
            height="28"
            :src="articleList.aut_photo"
          />
          <div class="aut-name">{{ articleList.aut_name }}</div>
          <div>
            <van-button
              round
              :type="articleList.is_followed ? 'default' : 'primary'"
              :plain="articleList.is_followed"
              class="follow-btn"
              @click="onFollow"
            >
              {{ articleList.is_followed ? "已关注" : "+关注" }}
            </van-button>
          </div>
        </div>
        <div
          class="img-aut-follow"
          v-else
        >
          <van-image
            round
            width="28"
            height="28"
            :src="articleList.aut_photo"
          />
          <div class="aut-name">{{ articleList.aut_name }}</div>
          <span />
          <div>
            <van-button
              round
              :type="articleList.is_followed ? 'default' : 'primary'"
              :plain="articleList.is_followed"
              class="follow-btn"
              @click="onFollow"
            >
              {{ articleList.is_followed ? "已关注" : "+关注" }}
            </van-button>
          </div>
        </div>
      </van-sticky>

      <!-- v-html -->
      <div
        class="content"
        v-html="articleList.content"
      />
      <div class="time">发布文章时间为：{{ getDate(articleList.pubdate) }}</div>
      <div class="comm-like">
        <van-cell-group>
          <van-cell
            :title="`全部评论 (${articleList.comm_count})`"
            :value="`${articleList.like_count} 点赞`"
          />
        </van-cell-group>
      </div>
      <div
        class="comment-section"
        ref="bottom"
      >
        <van-empty
          description="还没有人评论"
          v-if="commentList.length === 0"
        />
        <!-- 渲染评论显示区域 -->
        <comment-list
          v-else
          :data="commentList"
          :loading="loading"
          @reply="onCommentReply"
          @like="onCommentLike"
        />

        <div class="bottom">
          <van-goods-action>
            <van-goods-action-button
              type="danger"
              text=""
              @click="show = true"
            />
            <van-goods-action-icon
              icon="chat-o"
              text="评论"
              :badge="articleList.comm_count"
              @click="onChat"
            />
            <!-- ______________________________________________________________ -->
            <van-goods-action-icon
              icon="good-job-o"
              text="点赞"
              @click="onGoodJob"
              ref="goodJob"
              :color="articleList.attitude === 1 ? 'red' : ''"
            />
            <van-goods-action-icon
              icon="like-o"
              text="收藏"
              @click="onCollect"
              ref="like"
              :color="articleList.is_collected === true ? 'red' : ''"
            />
            <!-- _________________________________________________________________________ -->
            <van-goods-action-icon
              icon="share -o"
              text="收藏"
              @click="showShare = true"
            />
            <van-share-sheet
              v-model="showShare"
              title="立即分享给好友"
              :options="options"
              @select="onSelect"
            />
          </van-goods-action>
        </div>
      </div>
      <!-- 弹出层位置放在整个网页的最后 -->
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
      >
        <van-nav-bar
          title="评论文章"
          right-text="发表"
          left-arrow
          @click-left="onOff"
          @click-right="onSend"
        />

        <van-field
          v-model.trim="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="说点什么好呢"
          show-word-limit
          class="textarea"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import * as articleApi from '@/api/article';
import * as userApi from '@/api/user';
import * as commentApi from '@/api/comment';
import withGoBack from '@/mixins/with-go-back';
import 'highlight.js/styles/github.css';
import moment from 'moment';
import { Toast } from 'vant';
import commentList from '@/components/comment-list';
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ShareSheet,
} from 'vant';

export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [ShareSheet.name]: ShareSheet,
    commentList,
  },
  mixins: [withGoBack],
  data() {
    return {
      message: '',
      show: false,
      articleList: {},
      commentList: [],
      value: '',
      active: 0,
      isOnTop: false,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      isBottom: false,
      isGoodJob: false,
      list: [],
      loading: false,
      finished: false,
      articleListLike: {},
      articleListDisLike: {},
      isClick: false,
    };
  },
  methods: {
    // 点赞
    async onCommentLike(item) {
      const res = await articleApi[item.is_liking ? 'getArticleDisLike' : 'getArticleLike'](this.$route.params.id);
      console.log(item);
      console.log(res);
      this.refresh();
    },
    async onCommentReply() {
      console.log(123);
    },
    // 发表评论
    async onSend() {
      if (this.message === '') {
        Toast('评论不能为空');
        return;
      }
      const res = await commentApi.postComment(this.$route.params.id, this.message);
      Toast('评论成功');
      this.refresh();
      this.show = false;
    },

    getDate(time) {
      return moment(time).format('YYYY年MM月DD日');
    },
    onOff() {
      this.show = false;
    },
    // 点赞文章
    async onGoodJob() {
      console.log(this.articleList.attitude);
      const res = await articleApi[this.articleList.attitude === 1 ? 'getArticleDisLike' : 'getArticleLike'](this.$route.params.id);
      Toast('点赞成功');
      this.refresh();
    },
    // 收藏文章
    async onCollect() {
      console.log(this.articleList.is_collected);
      const res = await articleApi[this.articleList.is_collected === true ? 'getArticleDisCollect' : 'getArticleCollect'](this.$route.params.id);
      Toast('收藏成功');
      this.refresh();
    },
    onChat() {
      this.$refs[this.isBottom ? 'navBar' : 'bottom'].scrollIntoView();
      this.isBottom = !this.isBottom;
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    onTop() {
      this.isOnTop = !this.isOnTop;
    },
    async refresh() {
      // 获取文章详情
      const res = await articleApi.getArticle(this.$route.params.id);
      this.articleList = res.data.data;
      // 获取评论列表
      const res1 = await commentApi.getComments({
        type: 'a',
        source: this.$route.params.id,
      });
      this.commentList = res1.data.data.results;
    },
    onFollow() {
      userApi[this.articleList.is_followed ? 'unfollow' : 'follow'](
        this.articleList.aut_id
      )
        .then(() => {
          Toast.success('成功');
          this.refresh();
        })
        .catch(() => {
          Toast.fail('失败');
        });
    },
  },
  async created() {
    this.refresh();
  },
};
</script>

<style lang="less" scoped>

/deep/.van-icon-arrow-left {
  color: #999;
}
/deep/ .van-nav-bar__text {
  color: @primary;
}
.textarea {
  border-radius: 10px;
  background-color: #f7f8fa;
  width: 90%;
  // 居中显示
  margin: 16px auto;
}
.display {
  .top {
    display: flex;
    align-items: center;
    // 固定定位
    position: absolute;
    top: 0;
    left: 50px;
    z-index: 9;
    .aut-name {
      flex: 1;
      margin-left: 10px;
    }
    .follow-btn {
      border: none;
    }
  }
  overflow: auto;
  padding: 0 16px;
  height: calc(100vh - 88px);
  .title {
    font-weight: 400;
  }
  .time-read-comm {
    span {
      font-size: 12px;
      color: #999;
      margin-right: 6px;
    }
  }
  .img-aut-follow {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .aut-name {
      flex: 1;
      margin-left: 10px;
    }
  }
  .time {
    text-align: right;
    font-size: 0.32rem;
    color: #a5a6ab;
    padding-top: 0.66667rem;
  }

}
.bottom {
  display: flex;
  height: 20px;
  align-items: center;
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    .van-grid-item {
      /deep/.van-icon {
        font-size: 20px;
      }
    }
  }
}
</style>
