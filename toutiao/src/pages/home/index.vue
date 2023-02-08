<template>
  <div>
    <!-- <router-link to="/">首页</router-link>
    <router-link to="/video">视频页</router-link>
    <router-link to="/qa">问答页</router-link> -->
    <div class="win">
      <router-view />
    </div>
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
    >
      <van-tabbar-item
        icon="home-o"
        to="/"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        icon="search"
        to="/qa"
      >
        问答
      </van-tabbar-item>
      <van-tabbar-item
        icon="friends-o"
        to="/video"
      >
        视频
      </van-tabbar-item>
      <van-tabbar-item
        to="/my"
      >
        <van-icon
          name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
          size="25px"
        />
        <br>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
  },

};
</script>


<style >
.win {
  /* outline: 1px solid red; */
  height: calc(100vh - 50px);
}
</style>
