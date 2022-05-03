import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUi from 'element-ui';  //ElementUi的组件库
import 'element-ui/lib/theme-chalk/index.css'  //ElementUi的样式
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
import * as echarts from 'echarts'
import "echarts-gl"

Vue.prototype.$echarts = echarts

Vue.prototype.$tinymce = tinymce;

Vue.use(VueTinymce)

Vue.use(ElementUi);

/* 配置当前环境是开发环境还是生产环境 默认false是开发环境
  消息提示的环境配置（即是否报错，是否报全），开发环境会报全错误
  false 开发环境：VUE会提供很多警告来方便调试代码
  true 生产环境：只有简单警告，反而会增加应用体积
*/
Vue.config.productionTip = false;
//process.env.NODE_ENV -- 是环境变量  用来判断是开发环境还是生产环境  development 或者 production


// console.log(process.env.VUE_APP_BASE_API);

import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils"

// 每次打开浏览器都判断浏览器本地中user里有没有数据
const user = storageUtils.getUser();
// 如果有，就将数据存储在缓存中
if (user && user._id) {
  memoryUtils.user = user
}

/* 启动项目时，就启动路由守卫 permission.js */
import './permission'

new Vue({
  router,
  render: (h) => h(App),  //相当于template 底层渲染方法
}).$mount("#app");

