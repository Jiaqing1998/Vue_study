<template>
  <ul
    class="user-comment"
  >
    <li
      class="user-information"
      v-for="(item, index) in data"
      :key="index"
    >
      <!-- 头像 -->
      <div class="user-img">
        <van-image
          round
          width="24"
          height="24"
          :src="item.aut_photo"
        />
      </div>
      <div class="user-display">
        <div class="user-id-goodjob">
          <span>{{ item.aut_name }}</span>
          <span>{{ item.like_count }}
            <van-icon
              :name="item.is_liking?'good-job':'good-job-o'"
              @click="$emit('like',item)"
              :color="item.is_liking?'orangered':'#999'"
            />
          </span>
        </div>
        <div class="user-content">
          {{ item.content }}
        </div>
        <div class="user-reply">
          <van-button
            icon-position="right"
            class="reply-btn"
            round
            color="#f7f8fa"
            size="small"
            @click="$emit('reply', item)"
          >
            {{ item.reply_count }}   回复
            <template #icon>
              <van-icon
                name="arrow"
                size="14px"
                color="#000"
              />
            </template>
          </van-button>

          <span>{{ getDate(item.pubdate) }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    getDate(time) {
      return moment(time).format('YYYY年MM月DD日');
    },
  }
};
</script>

<style lang="less" scoped>
  .user-comment {
    .user-information {
      display: flex;
      .user-display {
        flex: 1;
        .user-id-goodjob {
          display: flex;
          // width: 100%;
          justify-content: space-between;
        }
        .user-content {
          font-size: 12px;
          color: #999;
          word-break: break-all;
        }
      }
      .user-reply {
        color: #000;
        font-size: 14px;
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
</style>
