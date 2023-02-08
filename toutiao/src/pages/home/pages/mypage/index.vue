<template>
  <div id="my">
    <!-- 上半部分 -->
    <header>
      <div class="top">
        <div class="image">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="userInfo.photo"
          />
        </div>
        <h1>{{ userInfo.name }}</h1>
        <div
          class="person"
          @click="person"
        >
          <label>
            个人信息
            <van-icon name="arrow" />
          </label>
        </div>
      </div>
      <div class="fiend">
        <ul>
          <li>
            <div>{{ userInfo.art_count }}</div>
            <div>动态</div>
          </li>
          <li>
            <div>{{ userInfo.follow_count }}</div>
            <div>关注</div>
          </li>
          <li>
            <div>{{ userInfo.fans_count }}</div>
            <div>粉丝</div>
          </li>
          <li>
            <div>{{ userInfo.like_count }}</div>
            <div>被赞</div>
          </li>
        </ul>
      </div>
    </header>
    <!-- 下半部分 -->
    <div class="grid">
      <van-grid :border="false">
        <van-grid-item
          icon="more-o"
          text="消息通知"
        />
        <van-grid-item
          icon="like-o"
          text="我的收藏"
        />
        <van-grid-item
          icon="clock-o"
          text="阅读历史"
        />
        <van-grid-item
          icon="bulb-o"
          text="我的作品"
        />
      </van-grid>
    </div>
    <div class="serve">
      <h3>更多服务</h3>
      <van-grid :border="false">
        <van-grid-item
          icon="question-o"
          text="用户反馈"
        />
        <van-grid-item
          icon="phone-circle-o"
          text="小智同学"
        />
      </van-grid>
    </div>
  </div>
</template>
<script>
import * as userApi from '@/api/user';
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  async created() {
    const res = await userApi.getUserInfo();
    console.log(res.data.data);
    this.userInfo = res.data.data;
  },
  methods: {
    person() {
      this.$router.push('/person');
    },
  },

};
</script>

<style scoped lang= 'less'>
* {
  margin: 0;
  padding: 0;
}
  #my {
    background-color: #f8f8f8;
    height: 100%;
    position: absolute;
    header {
      display: flex;
      flex-direction: column;
      height: 270px;
      width: 100%;
      border-radius: 0 0 60px 60px;
      background: linear-gradient(to  right bottom, #4b4877 ,#a0a2c9);
      .top {
        display: flex;
        height: 50%;
        align-items: center;
        .image {
        margin-left: 20px;
      }
      h1 {
        margin-left: 20px;
        font-size: 22px;
        color: #fff;
      }
      .person {
        margin-left: 50px;
        color: #eaffff;
      }
      }
      .fiend {
        ul {
          display: flex;
          padding: 0 32px;
          justify-content: space-around;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #fff;
            font-size: 16px;
            div {
              padding: 4px;
            }
          }
        }
      }
    }
    .grid{
        position: absolute;
        top : 210px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        .van-grid{
            background: #fff;
            border-radius: 20px;
            padding: 10px;
        }
          }
    .serve{
        position: absolute;
        top : 380px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        background-color:#fff;
        overflow: hidden;
        border-radius: 20px;
        h3{
            font-size: 18px;
            color: #000;
            margin-bottom: 10px;
            background-color: #fff;
            font-weight: normal;
            padding: 5px 15px;
        }
        .van-grid{
            background: #fff;
        }
    }
  }

</style>
