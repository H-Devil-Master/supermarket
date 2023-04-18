import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//引入Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fa/css/all.css';
import store from './store'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
