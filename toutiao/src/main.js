import Vue from 'vue';
import App from './App.vue';
import {
  Button,
  Icon,
  Field,
  Form,
  Image as VanImage,
  Grid,
  GridItem,
  NavBar,
  Popup,
  Cell,
  CellGroup,
  DatetimePicker,
  Tab,
  Tabs,
  Search,
  Col,
  Row,
  Tag,
  List,
  Empty,
  sticky,
  Tabbar,
  TabbarItem,
} from 'vant';
import router from '@/router';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Form);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(NavBar);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(DatetimePicker);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tag);
Vue.use(List);
Vue.use(Empty);
Vue.use(sticky);
Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  // 挂在vue实例上
  router,
}).$mount('#app');
