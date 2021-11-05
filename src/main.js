import Vue from 'vue'

import jq from 'jquery'
import store from './store'
import App from './App.vue'
import router from './router'

import './utils/element.js'
import {request} from '@/utils/request.js'
import './utils/util.js'


// 引入字体文件
import './assets/font/iconfont.css'
// 引入全局css
import './assets/css/global.less'

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import vueXlsxTable from 'vue-xlsx-table'
import moment from 'moment'
import ace from 'ace-builds'
import componentsInstall from '@/components/install'

window.$ = jq
// 将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = window.echarts
// 将全局的moment对象挂载到vue的原型对象上
Vue.prototype.$moment = moment
Vue.prototype.$bus = new Vue()
// Vue.prototype.$erd = ElementResizeDetectorMaker()
Vue.prototype.$request = request

Vue.config.productionTip = false
Vue.use(vueXlsxTable,{rABS:false})
Vue.use(ace)
Vue.use(componentsInstall)
Vue.use(dataV)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
