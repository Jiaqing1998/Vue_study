<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <div
        class="list-item"
        v-for="(item, index) in data"
        :key="index"
        @click.stop="goDetail(item.art_id)"
      >
        <!-- item是给onDetail所传的参数 -->
        <!-- @click="$emit('detail', item.art_id)" -->
        <div>
          <!-- 样式1 -->
          <div
            class="one"
            v-if="item.cover.type === 3"
          >
            <div class="title">
              {{ item.title }}
            </div>
            <div
              class="images"
            >
              <van-image
                width="110"
                height="90"
                v-for="(i, index) in item.cover.images || []"
                :key="index"
                :src="i"
              />
            </div>
          </div>
          <!-- 样式2 -->
          <div
            class="two"
            v-else
          >
            <div class="title">
              {{ item.title }}
            </div>
            <div class="images">
              <van-image
                width="110"
                height="90"
                v-for="(subitem, k) in item.cover.images || []"
                :key="k"
                :src="subitem"
              />
            </div>
          </div>
          <div class="bottom">
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}</span>
            <span>{{ getDate(item.pubdate) }}</span>
            <!-- 删除图标 -->
            <van-icon
              v-if="closeable"
              @click="$emit('close')"
              name="delete"
              size="24px"
            />
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import moment from 'moment';
import { throttle } from 'lodash';
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    req: {
      type: Function,
      default: () => () => {},
    },
    closeable: {
      type: Boolean,
      default: true,
    },

  },
  data() {
    return {
      loading: false,
      finished: false,
      currentPage: 1,
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'newsDetail',
        params: {
          id,
        },
      });
    },
    // 触底事件
    onLoad() {
      this.refresh();
    },
    getDate(time) {
      return moment(time).toNow()
        .replace('后', '内');
    },
    refresh: throttle (async function() {
      const hasNext = await this.req(this.currentPage++);
      this.loading = false;
      if (!hasNext) {
        this.finished = true;
      }
    }, 500),


  },
};
</script>

<style lang="less" scoped>
  /deep/ .van-nav-bar__arrow {
    color: #999;
  }
  .list {
    overflow-y: auto;
    height: calc(100vh - 44px);
    .list-item {
     padding: 0 16px;
    .one {
      box-sizing: border-box;
      .images {
        display: flex;
        justify-content: space-between;
      }
    }
    .two {
      display: flex;
      width: 100%;
      // 左右分布
      justify-content: space-between;
      .text {
        width: calc(100% - 110px);
      }
      .images {
        margin-left: 10px;
      }
    }
    .title {
      font-size: 16px;
      color: #333;
    }
    // 底部样式
    .bottom {
      span {
        font-size: 12px;
        color: #999;
        margin-right: 16px;
      }
    }
  }
}
</style>
