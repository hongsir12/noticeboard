import Vue from 'vue'
import {
  DatePicker,
  Table,
  Card,
  Button,
  TableColumn,
  Select,
  Option,
  Input,
  Upload,
  Menu,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Switch,
  Message,
  MessageBox
} from 'element-ui'
import jq from 'jquery'
import store from './store'
import App from './App.vue'
import router from './router'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
// 引入字体文件
import './assets/font/iconfont.css'
import vueXlsxTable from 'vue-xlsx-table'
import moment from 'moment'
import ace from 'ace-builds'
// 引入全局css
import './assets/css/global.less'
import componentsInstall from '@/components/install'
import {request} from '@/utils/request.js'
window.$ = jq
// 将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = window.echarts
// 将全局的moment对象挂载到vue的原型对象上
Vue.prototype.$moment = moment
Vue.prototype.$bus = new Vue()
// Vue.prototype.$erd = ElementResizeDetectorMaker()
Vue.prototype.$request = request
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
Vue.config.productionTip = false
Vue.use(vueXlsxTable,{rABS:false})
Vue.use(ace)
Vue.use(componentsInstall)
// 全局注册
Vue.use(dataV)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(Card)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Switch)
// 转换时间格式挂载到Date原型对象上
Date.prototype.format = function (fmt) { //author: meizz   
  var o = {
      "M+": this.getMonth() + 1,                 //月份   
      "d+": this.getDate(),                    //日   
      "h+": this.getHours(),                   //小时   
      "m+": this.getMinutes(),                 //分   
      "s+": this.getSeconds(),                 //秒   
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
      "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Number.prototype.toHHmmss = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
