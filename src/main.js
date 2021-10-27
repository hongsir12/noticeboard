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
} from 'element-ui'
import App from './App.vue'
import router from './router'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
// 引入字体文件
import './assets/font/iconfont.css'
import vueXlsxTable from 'vue-xlsx-table'
import moment from 'moment'
// 引入全局css
import './assets/css/global.less'
// 将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = window.echarts
// 将全局的moment对象挂载到vue的原型对象上
Vue.prototype.$moment = moment
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.use(vueXlsxTable,{rABS:false})
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

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
