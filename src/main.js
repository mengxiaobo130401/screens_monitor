// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import vueg from 'vueg'
import 'vueg/css/transition-min.css'
Vue.use(vueg, router);

Vue.use(ElementUi);

//修改axios原型链
Vue.prototype.Axios = axios;
//修改echarts原型链
Vue.prototype.Echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
