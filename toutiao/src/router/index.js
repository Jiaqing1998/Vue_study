import VueRouter from 'vue-router';
import Vue from 'vue';

// 引入组件
import Login from '@/pages/login';
import Home from '@/pages/home';
import homepage from '@/pages/home/pages/homepage';
import qapage from '@/pages/home/pages/qapage';
import videopage from '@/pages/home/pages/videopage';
import mypage from '@/pages/home/pages/mypage';
import person from '@/pages/person';
import search from '@/pages/search';
import searchResult from '@/pages/searchResult';
import newsDetail from '@/pages/newsDetails';

// 配置路由 由路径和组件组成
Vue.use(VueRouter);
const routes = [
  {
    path: '/login',
    component: Login
  },
  { path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: homepage,
      },
      {
        path: '/qa',
        component: qapage,
      },
      {
        path: '/video',
        component: videopage,
      },
      {
        path: '/my',
        component: mypage,
      }
    ] },
  {
    path: '/person',
    component: person
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/searchResult',
    component: searchResult
  },
  // 路由传参
  {
    path: '/newsDetails/:id',
    name: 'newsDetail',
    component: newsDetail
  }

];

// 与main.js的 import router from  '@/router'对应
export default new VueRouter({
  routes
});
