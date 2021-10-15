import Vue from 'vue'
import {DatePicker,Table,Card} from 'element-ui'
import App from './App.vue'
import router from './router'
// 将自动注册所有组件为全局组件
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
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(Card)



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
