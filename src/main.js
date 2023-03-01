import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import dataV from '@jiaminghi/data-view'
import global from './utils/global' // 全局方法

Vue.use(global)

Vue.use(ElementUI);

Vue.use(dataV)

Vue.prototype.$axios = axios

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
