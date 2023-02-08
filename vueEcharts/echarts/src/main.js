import Vue from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'
import 'echarts'


Vue.component('ECharts', ECharts);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
