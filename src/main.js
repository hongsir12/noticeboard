import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dataV from '@jiaminghi/data-view';
// 引入字体文件
import './assets/font/iconfont.css'
// 引入全局css
import './assets/css/global.less'
// 将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false

// 全局注册
Vue.use(dataV);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
